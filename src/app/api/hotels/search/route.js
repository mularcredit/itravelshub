import { NextResponse } from 'next/server';
const { searchHotels } = require('@/lib/hotelScraper');

export async function POST(request) {
    try {
        const body = await request.json();
        const { location, checkIn, checkOut, guests, offset = 0 } = body;

        // Basic validation
        if (!location || !checkIn || !checkOut || !guests || typeof guests !== 'object') {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const hotels = await searchHotels(location, checkIn, checkOut, guests, offset);

        return NextResponse.json(hotels);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
