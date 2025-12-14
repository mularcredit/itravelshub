import { NextResponse } from 'next/server';
import { searchFlights, checkConnection } from '@/lib/amadeus';

export async function GET() {
    console.log('\n\n========== FLIGHT SEARCH DEBUG ==========\n');

    let connectivity = { success: false, status: 'NOT_ATTEMPTED' };

    try {
        // 1. Connectivity Check
        console.log("📡 [Debug] Testing Amadeus Connectivity...");
        connectivity = await checkConnection();
        console.log("📡 [Debug] Connectivity Result:", connectivity.success ? "OK" : "FAILED");

        // 2. Flight Search
        const flights = await searchFlights('JFK', 'LAX', '2025-12-20', undefined, '1', '0');

        console.log('\n========== DEBUG COMPLETE ==========\n\n');

        return NextResponse.json({
            success: true,
            connectivity: connectivity,
            flightCount: flights.length,
            isMockData: flights.length > 0 && flights[0].id?.startsWith('mock'),
            sampleFlight: flights[0] || null,
            allFlights: flights
        });
    } catch (error) {
        console.error('\n========== ERROR IN DEBUG ==========');
        console.error(error);
        console.log('\n========== DEBUG COMPLETE ==========\n\n');

        return NextResponse.json({
            success: false,
            connectivity: connectivity,
            error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
            rawError: JSON.stringify(error)
        }, { status: 200 });
    }
}
