const Amadeus = require('amadeus');

// Hardcoded credentials from lib/amadeus.js to test them
const clientId = 'oeGAHxIpwTIZTQaZv7nj0y1JpQB4i1xw';
const clientSecret = 'xoDpCaat5LxpyyQ8';

console.log("🔧 Testing Amadeus Credentials...");
console.log("   ID:", clientId);
console.log("   Secret:", clientSecret);

const amadeus = new Amadeus({
    clientId: clientId,
    clientSecret: clientSecret
});

async function testSearch() {
    try {
        console.log("📡 Making API call...");
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: 'JFK',
            destinationLocationCode: 'LHR',
            departureDate: '2026-01-15',
            adults: '1',
            max: '1'
        });
        console.log("✅ API Success!");
        console.log("   Data:", JSON.stringify(response.data[0], null, 2));
    } catch (error) {
        console.error("❌ API Failed!");
        console.error("   Code:", error.code);
        console.error("   Response:", error.response);
    }
}

testSearch();
