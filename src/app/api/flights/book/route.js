/**
 * API Route: Book Flight
 * POST /api/flights/book
 * 
 * Creates a flight booking with payment processing
 */

import { NextResponse } from 'next/server';
import { createFlightBooking } from '@/lib/amadeusBooking';
import { createPaymentIntent, confirmPayment } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(request) {
    try {
        const body = await request.json();
        const {
            flightOffer,    // Confirmed flight offer from confirm-price
            travelers,      // Array of traveler details
            contact,        // Contact information
            paymentMethod   // Stripe payment method (optional for test mode)
        } = body;

        // Validate required fields
        if (!flightOffer || !travelers || !contact) {
            return NextResponse.json(
                { error: 'Missing required fields: flightOffer, travelers, contact' },
                { status: 400 }
            );
        }

        console.log(`✈️ [API: book-flight] Creating booking for ${travelers.length} traveler(s)`);

        // Extract pricing information
        const totalAmount = parseFloat(flightOffer.price?.total || 0);
        const currency = flightOffer.price?.currency || 'USD';

        // Step 1: Create payment intent
        console.log('💳 [API: book-flight] Creating payment intent...');
        const paymentIntent = await createPaymentIntent({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: currency.toLowerCase(),
            customerEmail: contact.emailAddress,
            metadata: {
                type: 'flight_booking',
                travelers: travelers.length,
                route: `${flightOffer.itineraries[0].segments[0].departure.iataCode} to ${flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1].arrival.iataCode}`
            }
        });

        // Step 2: Create booking in database (pending status)
        console.log('💾 [API: book-flight] Creating database record...');
        const booking = await prisma.booking.create({
            data: {
                bookingType: 'flight',
                status: 'pending',
                provider: 'amadeus',
                offerId: flightOffer.id,
                totalAmount: totalAmount,
                currency: currency,
                paymentStatus: 'pending',
                stripePaymentId: paymentIntent.id,
                customerEmail: contact.emailAddress,
                customerName: `${travelers[0].name.firstName} ${travelers[0].name.lastName}`,
                customerPhone: contact.phones?.[0]?.number || null,
                bookingDetails: {
                    flightOffer: flightOffer,
                    travelers: travelers,
                    contact: contact
                }
            }
        });

        console.log(`✅ [API: book-flight] Booking created with ID: ${booking.id}`);

        // Step 3: Attempt to create Amadeus booking
        // Note: In production, you'd wait for payment confirmation first
        // For now, we'll create the booking optimistically
        try {
            console.log('📡 [API: book-flight] Creating Amadeus booking...');
            const amadeusBooking = await createFlightBooking({
                flightOffer: flightOffer,
                travelers: travelers,
                contact: {
                    addresseeName: {
                        firstName: contact.emailAddress.split('@')[0],
                        lastName: 'Customer'
                    },
                    emailAddress: contact.emailAddress,
                    phones: contact.phones || [
                        {
                            deviceType: 'MOBILE',
                            countryCallingCode: '1',
                            number: '1234567890'
                        }
                    ]
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
                        flightOffer: flightOffer,
                        travelers: travelers,
                        contact: contact,
                        amadeusResponse: amadeusBooking
                    }
                }
            });

            console.log(`✅ [API: book-flight] Amadeus booking confirmed: ${amadeusBooking.id}`);

            return NextResponse.json({
                success: true,
                booking: {
                    id: booking.id,
                    bookingReference: amadeusBooking.id,
                    status: 'confirmed',
                    totalAmount: totalAmount,
                    currency: currency,
                    paymentIntentId: paymentIntent.id,
                    travelers: travelers.length,
                    itinerary: flightOffer.itineraries
                }
            });

        } catch (amadeusError) {
            console.error('❌ [API: book-flight] Amadeus booking failed:', amadeusError.message);

            // Update booking status to failed
            await prisma.booking.update({
                where: { id: booking.id },
                data: {
                    status: 'failed',
                    bookingDetails: {
                        flightOffer: flightOffer,
                        travelers: travelers,
                        contact: contact,
                        error: amadeusError.message
                    }
                }
            });

            return NextResponse.json(
                {
                    error: 'Booking failed: ' + amadeusError.message,
                    bookingId: booking.id
                },
                { status: 500 }
            );
        }

    } catch (error) {
        console.error('❌ [API: book-flight] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Booking failed' },
            { status: 500 }
        );
    }
}
