/**
 * API Route: Book Hotel
 * POST /api/hotels/book
 * 
 * Creates a hotel booking with payment processing
 */

import { NextResponse } from 'next/server';
import { getHotelOffer, createHotelBooking } from '@/lib/amadeusBooking';
import { createPaymentIntent } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            offerId,        // Hotel offer ID from search
            guests,         // Array of guest details
            payment,        // Payment card information
            specialRequests // Special requests (optional)
        } = body;

        // Validate required fields
        if (!offerId || !guests || !payment) {
            return NextResponse.json(
                { error: 'Missing required fields: offerId, guests, payment' },
                { status: 400 }
            );
        }

        console.log(`🏨 [API: book-hotel] Creating booking for ${guests.length} guest(s)`);

        // Step 1: Get current hotel offer details
        console.log('📡 [API: book-hotel] Fetching hotel offer...');
        const hotelOffer = await getHotelOffer(offerId);

        // Extract pricing
        const totalAmount = parseFloat(hotelOffer.offers[0]?.price?.total || 0);
        const currency = hotelOffer.offers[0]?.price?.currency || 'USD';

        // Step 2: Create payment intent
        console.log('💳 [API: book-hotel] Creating payment intent...');
        const paymentIntent = await createPaymentIntent({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: currency.toLowerCase(),
            customerEmail: guests[0].contact?.email || 'guest@triprex.com',
            metadata: {
                type: 'hotel_booking',
                hotelId: hotelOffer.hotel?.hotelId,
                hotelName: hotelOffer.hotel?.name,
                guests: guests.length
            }
        });

        // Step 3: Create booking in database
        console.log('💾 [API: book-hotel] Creating database record...');
        const booking = await prisma.booking.create({
            data: {
                bookingType: 'hotel',
                status: 'pending',
                provider: 'amadeus',
                offerId: offerId,
                totalAmount: totalAmount,
                currency: currency,
                paymentStatus: 'pending',
                stripePaymentId: paymentIntent.id,
                customerEmail: guests[0].contact?.email || 'guest@triprex.com',
                customerName: `${guests[0].name.title} ${guests[0].name.firstName} ${guests[0].name.lastName}`,
                customerPhone: guests[0].contact?.phone || null,
                bookingDetails: {
                    hotelOffer: hotelOffer,
                    guests: guests,
                    payment: { vendor: payment.vendor }, // Don't store card details
                    specialRequests: specialRequests
                }
            }
        });

        console.log(`✅ [API: book-hotel] Booking created with ID: ${booking.id}`);

        // Step 4: Attempt to create Amadeus hotel booking
        try {
            console.log('📡 [API: book-hotel] Creating Amadeus hotel booking...');

            // Format guests for Amadeus API
            const formattedGuests = guests.map((guest, index) => ({
                id: index + 1,
                name: {
                    title: guest.name.title,
                    firstName: guest.name.firstName,
                    lastName: guest.name.lastName
                },
                contact: guest.contact || {
                    phone: '+11234567890',
                    email: 'guest@triprex.com'
                }
            }));

            const amadeusBooking = await createHotelBooking({
                offerId: hotelOffer.offers[0].id,
                guests: formattedGuests,
                payment: {
                    id: 1,
                    method: 'creditCard',
                    card: {
                        vendorCode: payment.vendor,
                        cardNumber: payment.cardNumber,
                        expiryDate: payment.expiryDate
                    }
                }
            });

            // Update booking with Amadeus reference
            await prisma.booking.update({
                where: { id: booking.id },
                data: {
                    providerRef: amadeusBooking.id,
                    status: 'confirmed',
                    paymentStatus: 'paid',
                    bookingDetails: {
                        hotelOffer: hotelOffer,
                        guests: guests,
                        specialRequests: specialRequests,
                        amadeusResponse: amadeusBooking
                    }
                }
            });

            console.log(`✅ [API: book-hotel] Amadeus booking confirmed: ${amadeusBooking.id}`);

            return NextResponse.json({
                success: true,
                booking: {
                    id: booking.id,
                    bookingReference: amadeusBooking.id,
                    status: 'confirmed',
                    hotelName: hotelOffer.hotel?.name,
                    totalAmount: totalAmount,
                    currency: currency,
                    paymentIntentId: paymentIntent.id,
                    guests: guests.length
                }
            });

        } catch (amadeusError) {
            console.error('❌ [API: book-hotel] Amadeus booking failed:', amadeusError.message);

            // Update booking status to failed
            await prisma.booking.update({
                where: { id: booking.id },
                data: {
                    status: 'failed',
                    bookingDetails: {
                        hotelOffer: hotelOffer,
                        guests: guests,
                        error: amadeusError.message
                    }
                }
            });

            return NextResponse.json(
                {
                    error: 'Hotel booking failed: ' + amadeusError.message,
                    bookingId: booking.id
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('❌ [API: book-hotel] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Booking failed' },
            { status: 500 }
        );
    }
}
