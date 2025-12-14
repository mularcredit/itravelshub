import { NextResponse } from 'next/server';
import { searchFlights as searchAmadeus } from '@/lib/amadeus';
import { searchFlights as searchDuffel } from '@/lib/duffel';

export async function POST(request) {
    let origin, destination, date, returnDate, adults, children;

    try {
        const body = await request.json();
        ({ origin, destination, date, returnDate, adults = '1', children = '0' } = body);

        console.log("🔍 API: Search Flights Request", { origin, destination, date, returnDate, adults, children });

        // 1. Try Amadeus API first
        try {
            console.log("📡 Attempting Amadeus API...");
            const flights = await searchAmadeus(origin, destination, date, returnDate, adults, children);

            if (flights.length > 0) {
                console.log("✅ Amadeus returned results");
                return NextResponse.json(flights);
            }
            console.log("⚠️ Amadeus returned 0 flights. Trying fallback...");
        } catch (amadeusError) {
            console.error('⚠️ Amadeus API Failed:', amadeusError.message);
            console.log("🔄 Switching to Duffel API Fallback...");
        }

        // 2. Fallback to Duffel API (Real Data)
        try {
            console.log("🦅 Running Duffel API Search...");
            const duffelFlights = await searchDuffel(origin, destination, date, returnDate, adults, children);

            if (duffelFlights.length > 0) {
                console.log("✅ Duffel returned results:", duffelFlights.length);
                return NextResponse.json(duffelFlights);
            }
            console.log("⚠️ Duffel returned 0 flights.");
        } catch (duffelError) {
            console.error('⚠️ Duffel API Failed:', duffelError.message);
        }

        return NextResponse.json(
            { error: 'No flights found on any provider' },
            { status: 404 }
        );

    } catch (error) {
        console.error('❌ Flight Search Critical Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}

