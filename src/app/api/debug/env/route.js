import { NextResponse } from 'next/server';

export async function GET() {
    const hasClientId = !!process.env.AMADEUS_CLIENT_ID;
    const hasClientSecret = !!process.env.AMADEUS_CLIENT_SECRET;

    return NextResponse.json({
        status: 'Environment Check',
        AMADEUS_CLIENT_ID: hasClientId ? `${process.env.AMADEUS_CLIENT_ID.substring(0, 8)}...` : 'MISSING',
        AMADEUS_CLIENT_SECRET: hasClientSecret ? `${process.env.AMADEUS_CLIENT_SECRET.substring(0, 8)}...` : 'MISSING',
        hasClientId,
        hasClientSecret,
        allEnvVars: Object.keys(process.env).filter(key => key.startsWith('AMADEUS'))
    });
}
