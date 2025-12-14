// using global fetch


const BASE_URL = 'http://localhost:3000';

async function benchmarkHotels() {
    console.log('\n🏨 Testing /api/hotels/search...');
    const payload = {
        location: 'London',
        checkIn: '2025-06-01',
        checkOut: '2025-06-05',
        guests: {
            adults: 2,
            children: 0,
            rooms: 1
        }
    };

    const start = performance.now();
    try {
        const response = await fetch(`${BASE_URL}/api/hotels/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const duration = performance.now() - start;

        console.log(`Status: ${response.status}`);
        if (response.ok) {
            const data = await response.json();
            console.log(`Found: ${data.length || 0} hotels`);
            console.log(`Time: ${(duration / 1000).toFixed(2)} seconds`);
        } else {
            const text = await response.text();
            console.log(`Error: ${text}`);
            console.log(`Time: ${(duration / 1000).toFixed(2)} seconds`);
        }
    } catch (e) {
        console.error('Failed to fetch hotels:', e.message);
    }
}

async function benchmarkFlights() {
    console.log('\n✈️ Testing /api/flights/search...');
    const payload = {
        origin: 'JFK',
        destination: 'LHR',
        date: '2025-06-01',
        adults: 1
    };

    const start = performance.now();
    try {
        const response = await fetch(`${BASE_URL}/api/flights/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const duration = performance.now() - start;

        console.log(`Status: ${response.status}`);
        if (response.ok) {
            const data = await response.json();
            const count = Array.isArray(data) ? data.length : 0;
            console.log(`Found: ${count} flights`);
            console.log(`Time: ${(duration / 1000).toFixed(2)} seconds`);
        } else {
            const text = await response.text();
            console.log(`Error: ${text}`);
            console.log(`Time: ${(duration / 1000).toFixed(2)} seconds`);
        }
    } catch (e) {
        console.error('Failed to fetch flights:', e.message);
    }
}

async function run() {
    console.log('🚀 Starting API Benchmark...');
    await benchmarkFlights();
    await benchmarkHotels();
}

run();
