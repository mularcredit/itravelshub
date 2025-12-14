import { NextResponse } from 'next/server';
const { scrapeHotelDetails } = require('@/lib/hotelScraper');

export async function POST(request) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 });
        }

        const details = await scrapeHotelDetails(url);

        if (!details) {
            return NextResponse.json({ error: 'Failed to fetch details' }, { status: 500 });
        }

        return NextResponse.json(details);
    } catch (error) {
        console.error('Error in hotel details API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
