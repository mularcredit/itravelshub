import dotenv from 'dotenv';
import { Duffel } from '@duffel/api';
import path from 'path';

// Manual env loading for standalone script
dotenv.config({ path: '.env.local' });

const duffel = new Duffel({
    token: process.env.DUFFEL_ACCESS_TOKEN,
});

async function runTest() {
    console.log("🦅 Testing Duffel API...");
    console.log("🔑 Token present?", !!process.env.DUFFEL_ACCESS_TOKEN);

    if (!process.env.DUFFEL_ACCESS_TOKEN) {
        console.error("❌ No Token found!");
        process.exit(1);
    }

    try {
        console.log("✈️ Searching JFK -> LHR (25th Dec 2025)...");
        const offerRequest = await duffel.offerRequests.create({
            slices: [
                {
                    origin: 'JFK',
                    destination: 'LHR',
                    departure_date: '2025-12-25',
                }
            ],
            passengers: [{ type: 'adult' }],
            cabin_class: 'economy',
        });

        console.log("✅ API Connectivity: SUCCESS");
        console.log(`📦 Offers Found: ${offerRequest.data.offers.length}`);

        if (offerRequest.data.offers.length > 0) {
            const first = offerRequest.data.offers[0];
            console.log(`🎫 Sample: ${first.owner.name} - ${first.total_amount} ${first.total_currency}`);
        }

    } catch (error) {
        console.error("❌ API Failed:", error.message);
        if (error.errors) console.error(error.errors);
    }
}

runTest();
