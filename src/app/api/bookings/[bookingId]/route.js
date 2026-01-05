/**
 * API Route: Manage Bookings
 * GET /api/bookings/[bookingId] - Retrieve booking details
 * DELETE /api/bookings/[bookingId] - Cancel booking
 */

import { NextResponse } from 'next/server';
import { getBookingDetails, cancelBooking } from '@/lib/amadeusBooking';
import { refundPayment } from '@/lib/stripe';
import prisma from '@/lib/prisma';

/**
 * GET - Retrieve booking details
 */
export async function GET(request, { params }) {
    try {
        const { bookingId } = params;

        console.log(`📋 [API: bookings] Retrieving booking: ${bookingId}`);

        // Get booking from database
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        // Optionally fetch live status from Amadeus
        if (booking.providerRef && booking.status === 'confirmed') {
            try {
                const liveDetails = await getBookingDetails(
                    booking.providerRef,
                    booking.bookingType
                );

                return NextResponse.json({
                    ...booking,
                    liveDetails: liveDetails
                });
            } catch (error) {
                console.warn('⚠️ [API: bookings] Could not fetch live details:', error.message);
                // Return database record even if live fetch fails
            }
        }

        return NextResponse.json(booking);

    } catch (error) {
        console.error('❌ [API: bookings GET] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Failed to retrieve booking' },
            { status: 500 }
        );
    }
}

/**
 * DELETE - Cancel booking
 */
export async function DELETE(request, { params }) {
    try {
        const { bookingId } = params;

        console.log(`❌ [API: bookings] Cancelling booking: ${bookingId}`);

        // Get booking from database
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId }
        });

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            );
        }

        if (booking.status === 'cancelled') {
            return NextResponse.json(
                { error: 'Booking already cancelled' },
                { status: 400 }
            );
        }

        // Cancel with Amadeus
        if (booking.providerRef) {
            try {
                await cancelBooking(booking.providerRef, booking.bookingType);
                console.log('✅ [API: bookings] Amadeus cancellation successful');
            } catch (amadeusError) {
                console.error('⚠️ [API: bookings] Amadeus cancellation failed:', amadeusError.message);
                // Continue with local cancellation even if Amadeus fails
            }
        }

        // Process refund if payment was made
        if (booking.stripePaymentId && booking.paymentStatus === 'paid') {
            try {
                await refundPayment(booking.stripePaymentId);
                console.log('✅ [API: bookings] Refund processed');
            } catch (refundError) {
                console.error('⚠️ [API: bookings] Refund failed:', refundError.message);
            }
        }

        // Update database
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                status: 'cancelled',
                paymentStatus: 'refunded'
            }
        });

        return NextResponse.json({
            success: true,
            booking: updatedBooking,
            message: 'Booking cancelled successfully'
        });

    } catch (error) {
        console.error('❌ [API: bookings DELETE] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Failed to cancel booking' },
            { status: 500 }
        );
    }
}
