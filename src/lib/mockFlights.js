export function generateMockFlights(origin, destination, date, returnDate = null) {
    const airlines = [
        { name: 'Emirates', code: 'EK' },
        { name: 'Qatar Airways', code: 'QR' },
        { name: 'Delta Air Lines', code: 'DL' },
        { name: 'British Airways', code: 'BA' },
        { name: 'Lufthansa', code: 'LH' },
        { name: 'Air France', code: 'AF' },
        { name: 'Turkish Airlines', code: 'TK' },
        { name: 'United Airlines', code: 'UA' }
    ];

    const mockFlights = [];
    const numFlights = Math.floor(Math.random() * 5) + 5; // Generate 5-10 flights

    for (let i = 0; i < numFlights; i++) {
        const airline = airlines[Math.floor(Math.random() * airlines.length)];
        const price = Math.floor(Math.random() * 800) + 400; // Price between 400-1200

        // Random departure hour (06:00 to 22:00)
        const depHour = Math.floor(Math.random() * 16) + 6;
        const depMin = Math.floor(Math.random() * 60);

        // Random duration (4h to 14h)
        const durationHours = Math.floor(Math.random() * 10) + 4;
        const durationMins = Math.floor(Math.random() * 60);

        // Calculate Arrival
        let arrHour = (depHour + durationHours) % 24;
        let arrMin = (depMin + durationMins) % 60;

        const depTime = `${depHour.toString().padStart(2, '0')}:${depMin.toString().padStart(2, '0')}`;
        const arrTime = `${arrHour.toString().padStart(2, '0')}:${arrMin.toString().padStart(2, '0')}`;

        const duration = `${durationHours}h ${durationMins}m`;

        // Stops logic
        const stops = Math.random() > 0.6 ? 'Direct' : (Math.random() > 0.5 ? '1 stop' : '2 stops');

        // Clean dates for Skyscanner link
        const cleanDate = date ? date.substring(2).replace(/-/g, '') : '';
        const cleanReturnDate = returnDate ? returnDate.substring(2).replace(/-/g, '') : '';
        const bookingLink = `https://www.skyscanner.com/transport/flights/${origin}/${destination}/${cleanDate}${cleanReturnDate ? '/' + cleanReturnDate : ''}`;

        mockFlights.push({
            id: `mock-${Math.random().toString(36).substr(2, 9)}`,
            airline: airline.name,
            price: `USD ${price}`,
            departure: depTime,
            arrival: arrTime,
            duration: duration,
            stops: stops,
            bookingLink: bookingLink,
            origin: origin || 'JFK',
            destination: destination || 'LHR',
            isMock: true // Flag for UI if needed
        });
    }

    return mockFlights.sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')));
}
