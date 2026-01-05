/**
 * API Route: Confirm Flight Price
 * POST /api/flights/confirm-price
 * 
 * Confirms the current price of a flight offer before booking
 */

import { NextResponse } from 'next/server';
import { confirmFlightPrice } from '@/lib/amadeusBooking';

export async function POST(request) {
    try {
        const body = await request.json();
        const { offerId } = body;

        if (!offerId) {
            return NextResponse.json(
                { error: 'Missing offerId' },
                { status: 400 }
            );
        }

        console.log(`📡 [API: confirm-price] Confirming price for offer: ${offerId}`);

        // Confirm current price with Amadeus
        const confirmedOffer = await confirmFlightPrice(offerId);

        return NextResponse.json({
            success: true,
            offer: confirmedOffer
        });

    } catch (error) {
        console.error('❌ [API: confirm-price] Error:', error.message);
        return NextResponse.json(
            { error: error.message || 'Failed to confirm price' },
            { status: 500 }
        );
    }
}
