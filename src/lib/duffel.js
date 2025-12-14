import { Duffel } from '@duffel/api';

const duffel = new Duffel({
    token: process.env.DUFFEL_ACCESS_TOKEN,
});

export async function searchFlights(origin, destination, date, returnDate = null, adults = '1', children = '0') {
    console.log(`✈️ [Duffel] Searching: ${origin} -> ${destination} on ${date}`);

    if (!process.env.DUFFEL_ACCESS_TOKEN) {
        console.error("❌ [Duffel] Missing DUFFEL_ACCESS_TOKEN in .env.local");
        throw new Error("Duffel API Token missing");
    }

    try {
        // 1. Create Offer Request
        const slices = [
            {
                origin: origin,
                destination: destination,
                departure_date: date,
            }
        ];

        if (returnDate) {
            slices.push({
                origin: destination,
                destination: origin,
                departure_date: returnDate,
            });
        }

        /* 
           Duffel requires passengers to be defined by type.
           We'll simplify by mapping adults to 'adult' type.
           Infants/Children logic can be expanded later.
        */
        const passengers = Array(parseInt(adults)).fill({ type: 'adult' });
        // Add children if needed (future improvement)

        const offerRequest = await duffel.offerRequests.create({
            slices: slices,
            passengers: passengers,
            cabin_class: 'economy',
        });

        console.log(`✅ [Duffel] Offer Request Created: ${offerRequest.data.id}`);

        // 2. Duffel automatically searches. We can just return the offers attached to the request
        // OR list offers for this request. The create response typically includes some offers or we wait.
        // For simplicity in this integration, Duffel's create response 'offers' is usually what we want immediately for test mode.

        const offers = offerRequest.data.offers;
        console.log(`✅ [Duffel] Found ${offers.length} offers`);

        // Map Duffel offers to our app's internal format
        return offers.map(offer => {
            const slice = offer.slices[0];
            const segment = slice.segments[0]; // Simplification: Take first segment of first slice

            return {
                id: offer.id,
                airline: offer.owner.name,
                flightNumber: `${segment.operating_carrier_flight_number}`,
                departure: formatDuffelTime(segment.departing_at),
                arrival: formatDuffelTime(segment.arriving_at),
                duration: formatDuffelDuration(slice.duration),
                price: `${offer.total_currency} ${offer.total_amount}`,
                start: origin,
                end: destination,
                airplane: segment.aircraft?.name || 'Aircraft',
                stops: slice.segments.length > 1 ? `${slice.segments.length - 1} stops` : 'Direct',
                // Logo if available (Duffel sends logo_lockup_url on owner sometimes, but we'll use name)
            };
        });

    } catch (error) {
        console.error("❌ [Duffel] Search Failed:", error);
        // Log detailed Duffel errors
        if (error.errors) {
            error.errors.forEach(e => console.error(`   - ${e.code}: ${e.message}`));
        }
        throw error;
    }
}

function formatDuffelTime(isoString) {
    // 2023-12-25T10:30:00 -> 10:30
    return isoString.split('T')[1].substring(0, 5);
}

function formatDuffelDuration(isoDuration) {
    // P0DT4H30M -> 4h 30m (Simplistic regex parser for ISO 8601 duration)
    // Duffel might return simpler strings or object depending on version, 
    // but usually it's ISO 8601. 
    // Actually offer.slices[0].duration is ISO 8601 string (e.g. PT2H30M)

    // Quick parse:
    const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return isoDuration;
    const hours = match[1] ? match[1].replace('H', 'h') : '';
    const mins = match[2] ? match[2].replace('M', 'm') : '';
    return `${hours} ${mins}`.trim();
}
