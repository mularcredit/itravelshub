import Amadeus from 'amadeus';

let amadeus;

// Lazy initialize Amadeus SDK
function getAmadeusClient() {
    if (amadeus) {
        return amadeus;
    }

    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        // Only log this warning once per server restart usually, but since this is inside a function 
        // that creates the singleton, it's fine.
        console.warn("⚠️ [getAmadeusClient] Amadeus credentials not found in environment.");
        console.warn("   Make sure AMADEUS_CLIENT_ID and AMADEUS_CLIENT_SECRET are set in .env.local");
        return null;
    }

    try {
        amadeus = new Amadeus({
            clientId: clientId,
            clientSecret: clientSecret
        });
        // process.env.NODE_ENV !== 'production' && console.log("✅ [getAmadeusClient] Amadeus SDK initialized successfully");
        return amadeus;
    } catch (e) {
        console.error("❌ [getAmadeusClient] Failed to initialize Amadeus SDK:", e.message);
        return null;
    }
}


export async function searchFlights(origin, destination, date, returnDate, adults = '1', children = '0') {
    console.log(`🔍 [searchFlights] Called with: ${origin} → ${destination} on ${date} (Return: ${returnDate || 'None'}) for ${adults} adults, ${children} children`);

    const amadeusClient = getAmadeusClient();

    console.log(`🔍 [searchFlights] Amadeus SDK initialized:`, !!amadeusClient);

    if (!amadeusClient) {
        console.error("❌ [searchFlights] Amadeus client not available. Cannot search.");
        return [];
    }

    try {
        console.log("📡 [searchFlights] Making Amadeus API call...");

        // Construct parameters object, filtering out undefined/null values
        const params = {
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: date,
            adults: adults.toString(),
            max: '10'
        };

        if (returnDate) {
            params.returnDate = returnDate;
        }

        // Add children if greater than 0
        if (parseInt(children) > 0) {
            params.children = children.toString();
        }

        let response;

        if (amadeusClient.shopping && amadeusClient.shopping.flightOffersSearch) {
            console.log("📡 [searchFlights] Using shopping.flightOffersSearch.get() with params:", params);
            response = await amadeusClient.shopping.flightOffersSearch.get(params);
        } else {
            console.log("📡 [searchFlights] Trying direct client.get() method with params:", params);
            response = await amadeusClient.client.get('/v2/shopping/flight-offers', params);
        }

        console.log("✅ [searchFlights] Amadeus API responded successfully");
        console.log("   Response data count:", response.data?.length || 0);

        if (!response.data || response.data.length === 0) {
            console.log("⚠️ [searchFlights] No flights found from Amadeus.");
            return [];
        }

        const mappedFlights = response.data.map(offer => {
            const itinerary = offer.itineraries[0];
            const segment = itinerary.segments[0];
            const lastSegment = itinerary.segments[itinerary.segments.length - 1];

            const carrierCode = segment.carrierCode;
            // Handle dictionary lookup safely
            const carrierName = (response.dictionaries &&
                response.dictionaries.carriers &&
                response.dictionaries.carriers[carrierCode])
                ? response.dictionaries.carriers[carrierCode]
                : carrierCode;

            const price = `${offer.price.currency} ${offer.price.total}`;

            // Format Times
            const dep = new Date(segment.departure.at);
            const arr = new Date(lastSegment.arrival.at);

            const depTime = dep.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
            const arrTime = arr.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

            // Format Duration
            const duration = itinerary.duration.replace('PT', '').toLowerCase();

            // Calculate stops
            const stopsCount = itinerary.segments.length - 1;
            const stopsText = stopsCount === 0 ? 'Direct' : `${stopsCount} stop${stopsCount > 1 ? 's' : ''}`;

            // Generate Skyscanner Link
            const cleanDate = date ? date.substring(2).replace(/-/g, '') : '';
            const cleanReturnDate = returnDate ? returnDate.substring(2).replace(/-/g, '') : '';
            const bookingLink = `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${cleanDate}${cleanReturnDate ? '/' + cleanReturnDate : ''}`;

            return {
                id: offer.id,
                airline: carrierName,
                price: price,
                departure: depTime,
                arrival: arrTime,
                duration: duration,
                stops: stopsText,
                bookingLink: bookingLink,
                origin: segment.departure.iataCode,
                destination: lastSegment.arrival.iataCode
            };
        });

        console.log("✅ [searchFlights] Returning", mappedFlights.length, "REAL flights from Amadeus");
        return mappedFlights;

    } catch (error) {
        console.error("❌ [searchFlights] Amadeus API Error:", error.response?.statusCode || error.code);
        console.error("   Error details:", error.response?.body || error.message);

        // Rethrow the error so the route handler can return specific error to client
        throw error;
    }
}

export async function checkConnection() {
    const amadeusClient = getAmadeusClient();
    if (!amadeusClient) return { success: false, error: 'Client not initialized' };

    try {
        console.log("📡 [checkConnection] Testing Amadeus with Location Search (LON)...");
        const response = await amadeusClient.referenceData.locations.get({
            keyword: 'LON',
            subType: 'CITY'
        });
        console.log("✅ [checkConnection] Success!");
        return { success: true, data: response.data };
    } catch (error) {
        console.error("❌ [checkConnection] Failed:", error.code || error.response?.statusCode);
        return { success: false, error: error };
    }
}
