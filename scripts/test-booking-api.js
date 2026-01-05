/**
 * Test script for booking functionality
 * Run with: node scripts/test-booking-api.js
 * 
 * Prerequisites:
 * 1. Set up your .env.local with DATABASE_URL and other credentials
 * 2. Run: npx prisma generate && npx prisma db push
 * 3. Start dev server: npm run dev
 */

const fetch = require('node:fetch');

const BASE_URL = 'http://localhost:3000';

// Test data
const testFlightOffer = {
    id: 'test_offer_123',
    price: {
        total: '350.00',
        currency: 'USD'
    },
    itineraries: [{
        segments: [{
            departure: { iataCode: 'JFK', at: '2026-01-15T10:00:00' },
            arrival: { iataCode: 'LHR', at: '2026-01-15T22:00:00' },
            carrierCode: 'BA'
        }]
    }]
};

const testTravelers = [{
    id: '1',
    name: {
        firstName: 'John',
        lastName: 'Doe'
    },
    dateOfBirth: '1990-01-01',
    gender: 'MALE',
    contact: {
        emailAddress: 'john.doe@example.com',
        phones: [{
            deviceType: 'MOBILE',
            countryCallingCode: '1',
            number: '5551234567'
        }]
    },
    documents: [{
        documentType: 'PASSPORT',
        number: 'X1234567',
        expiryDate: '2030-12-31',
        issuanceCountry: 'US',
        nationality: 'US',
        holder: true
    }]
}];

const testContact = {
    emailAddress: 'john.doe@example.com',
    phones: [{
        deviceType: 'MOBILE',
        countryCallingCode: '1',
        number: '5551234567'
    }]
};

async function testConfirmPrice() {
    console.log('\n📡 Testing: Flight Price Confirmation');
    console.log('=====================================');

    try {
        const response = await fetch(`${BASE_URL}/api/flights/confirm-price`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                offerId: testFlightOffer.id
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log('✅ Price confirmation successful');
            console.log('   Response:', JSON.stringify(data, null, 2));
            return data.offer;
        } else {
            console.log('⚠️ Price confirmation failed (expected in test mode)');
            console.log('   Error:', data.error);
            return testFlightOffer; // Use test data
        }
    } catch (error) {
        console.log('❌ API call failed:', error.message);
        console.log('   Make sure dev server is running: npm run dev');
        return null;
    }
}

async function testFlightBooking() {
    console.log('\n✈️ Testing: Flight Booking');
    console.log('===========================');

    try {
        const response = await fetch(`${BASE_URL}/api/flights/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                flightOffer: testFlightOffer,
                travelers: testTravelers,
                contact: testContact
            })
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('✅ Flight booking successful!');
            console.log('   Booking ID:', data.booking.id);
            console.log('   Reference:', data.booking.bookingReference);
            console.log('   Total:', data.booking.currency, data.booking.totalAmount);
            return data.booking.id;
        } else {
            console.log('⚠️ Flight booking failed');
            console.log('   Error:', data.error);
            return null;
        }
    } catch (error) {
        console.log('❌ API call failed:', error.message);
        return null;
    }
}

async function testGetBooking(bookingId) {
    console.log('\n📋 Testing: Get Booking Details');
    console.log('================================');

    if (!bookingId) {
        console.log('⏭️ Skipping (no booking ID)');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`);
        const data = await response.json();

        if (response.ok) {
            console.log('✅ Retrieved booking successfully');
            console.log('   Status:', data.status);
            console.log('   Type:', data.bookingType);
            console.log('   Amount:', data.currency, data.totalAmount);
        } else {
            console.log('❌ Failed to retrieve booking');
            console.log('   Error:', data.error);
        }
    } catch (error) {
        console.log('❌ API call failed:', error.message);
    }
}

async function testCancelBooking(bookingId) {
    console.log('\n❌ Testing: Cancel Booking');
    console.log('===========================');

    if (!bookingId) {
        console.log('⏭️ Skipping (no booking ID)');
        return;
    }

    try {
        const response = await fetch(`${BASE_URL}/api/bookings/${bookingId}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok && data.success) {
            console.log('✅ Booking cancelled successfully');
            console.log('   Status:', data.booking.status);
        } else {
            console.log('⚠️ Cancellation failed');
            console.log('   Error:', data.error);
        }
    } catch (error) {
        console.log('❌ API call failed:', error.message);
    }
}

async function runTests() {
    console.log('\n🚀 TripRex Booking API Test Suite');
    console.log('==================================');
    console.log('Server:', BASE_URL);
    console.log('');

    // Test 1: Confirm price
    await testConfirmPrice();

    // Test 2: Create booking
    const bookingId = await testFlightBooking();

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 3: Get booking
    await testGetBooking(bookingId);

    // Wait a bit
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test 4: Cancel booking
    await testCancelBooking(bookingId);

    console.log('\n✅ Test suite completed!');
    console.log('\nNote: Some tests may show warnings if credentials are not fully configured.');
    console.log('This is expected. Follow SETUP.md to complete configuration.');
}

// Run tests
runTests().catch(console.error);
