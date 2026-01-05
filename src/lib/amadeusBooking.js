/**
 * Amadeus Booking API Integration
 * Handles flight and hotel booking operations
 */

import Amadeus from 'amadeus';

let amadeus;

// Initialize Amadeus client
function getAmadeusClient() {
    if (amadeus) return amadeus;

    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        console.error('❌ [amadeusBooking] Amadeus credentials missing');
        return null;
    }

    try {
        amadeus = new Amadeus({
            clientId: clientId,
            clientSecret: clientSecret
        });
        return amadeus;
    } catch (error) {
        console.error('❌ [amadeusBooking] Failed to initialize:', error.message);
        return null;
    }
}

/**
 * Confirm flight offer pricing before booking
 * CRITICAL: Always call this before booking to ensure price hasn't changed
 * 
 * @param {string} offerId - The offer ID from flight search results
 * @returns {Promise<Object>} Confirmed flight offer with guaranteed price
 */
export async function confirmFlightPrice(offerId) {
    console.log(`💰 [confirmFlightPrice] Confirming price for offer: ${offerId}`);

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        // Use Flight Offers Price API to confirm current price
        const response = await client.shopping.flightOffers.pricing.post(
            JSON.stringify({
                data: {
                    type: 'flight-offers-pricing',
                    flightOffers: [{ id: offerId }]
                }
            })
        );

        console.log('✅ [confirmFlightPrice] Price confirmed');
        return response.data;

    } catch (error) {
        console.error('❌ [confirmFlightPrice] Failed:', error.response?.body || error.message);
        throw new Error('Failed to confirm flight price: ' + (error.response?.body?.errors?.[0]?.detail || error.message));
    }
}

/**
 * Create flight booking with Amadeus
 * 
 * @param {Object} params - Booking parameters
 * @param {Object} params.flightOffer - Confirmed flight offer from confirmFlightPrice
 * @param {Array} params.travelers - Array of traveler objects with personal details
 * @param {Object} params.contact - Contact information
 * @returns {Promise<Object>} Booking confirmation with PNR
 */
export async function createFlightBooking({ flightOffer, travelers, contact }) {
    console.log('✈️ [createFlightBooking] Creating flight booking...');

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        // Create the booking using Flight Create Orders API
        const response = await client.booking.flightOrders.post(
            JSON.stringify({
                data: {
                    type: 'flight-order',
                    flightOffers: [flightOffer],
                    travelers: travelers,
                    remarks: {
                        general: [
                            {
                                subType: 'GENERAL_MISCELLANEOUS',
                                text: 'Booked via TripRex'
                            }
                        ]
                    },
                    ticketingAgreement: {
                        option: 'DELAY_TO_CANCEL',
                        delay: '6D' // Cancel if not ticketed within 6 days
                    },
                    contacts: [contact]
                }
            })
        );

        console.log('✅ [createFlightBooking] Booking created:', response.data.id);
        return response.data;

    } catch (error) {
        console.error('❌ [createFlightBooking] Failed:', error.response?.body || error.message);

        // Extract meaningful error message
        const errorDetail = error.response?.body?.errors?.[0]?.detail || error.message;
        throw new Error('Flight booking failed: ' + errorDetail);
    }
}

/**
 * Search and confirm hotel offer
 * Note: Amadeus Hotel Booking API workflow:
 * 1. Search hotels (already implemented in hotelScraper/amadeus.js)
 * 2. Get hotel offer by ID (this function)
 * 3. Book hotel (createHotelBooking)
 * 
 * @param {string} offerId - Hotel offer ID from search
 * @returns {Promise<Object>} Hotel offer details
 */
export async function getHotelOffer(offerId) {
    console.log(`🏨 [getHotelOffer] Fetching offer: ${offerId}`);

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        const response = await client.shopping.hotelOfferSearch(offerId).get();

        console.log('✅ [getHotelOffer] Offer retrieved');
        return response.data;

    } catch (error) {
        console.error('❌ [getHotelOffer] Failed:', error.response?.body || error.message);
        throw new Error('Failed to get hotel offer: ' + (error.response?.body?.errors?.[0]?.detail || error.message));
    }
}

/**
 * Create hotel booking with Amadeus
 * 
 * @param {Object} params - Booking parameters
 * @param {string} params.offerId - Hotel offer ID
 * @param {Array} params.guests - Array of guest objects with personal details
 * @param {Object} params.payment - Payment information
 * @returns {Promise<Object>} Hotel booking confirmation
 */
export async function createHotelBooking({ offerId, guests, payment }) {
    console.log('🏨 [createHotelBooking] Creating hotel booking...');

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        // Note: Amadeus Hotel Booking API is in beta
        // The actual endpoint might be different based on your API access level
        const response = await client.booking.hotelBookings.post(
            JSON.stringify({
                data: {
                    offerId: offerId,
                    guests: guests,
                    payments: [payment],
                    rooms: guests.map((guest, index) => ({
                        guestIds: [index + 1],
                        paymentId: 1,
                        specialRequest: guest.specialRequest || ''
                    }))
                }
            })
        );

        console.log('✅ [createHotelBooking] Booking created:', response.data.id);
        return response.data;

    } catch (error) {
        console.error('❌ [createHotelBooking] Failed:', error.response?.body || error.message);

        const errorDetail = error.response?.body?.errors?.[0]?.detail || error.message;
        throw new Error('Hotel booking failed: ' + errorDetail);
    }
}

/**
 * Cancel a booking (if supported by provider)
 * Note: Amadeus cancellation policies vary by airline/hotel
 * 
 * @param {string} bookingId - Booking ID to cancel
 * @param {string} type - 'flight' or 'hotel'
 * @returns {Promise<Object>} Cancellation confirmation
 */
export async function cancelBooking(bookingId, type = 'flight') {
    console.log(`❌ [cancelBooking] Cancelling ${type} booking: ${bookingId}`);

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        if (type === 'flight') {
            // Delete flight order
            const response = await client.booking.flightOrder(bookingId).delete();
            console.log('✅ [cancelBooking] Flight booking cancelled');
            return response.data;
        } else {
            // Hotel cancellation (if supported in your API tier)
            console.warn('⚠️ [cancelBooking] Hotel cancellation may need to be handled offline');
            throw new Error('Hotel cancellation not yet implemented - contact support');
        }

    } catch (error) {
        console.error('❌ [cancelBooking] Failed:', error.response?.body || error.message);
        throw new Error('Cancellation failed: ' + (error.response?.body?.errors?.[0]?.detail || error.message));
    }
}

/**
 * Retrieve booking details
 * 
 * @param {string} bookingId - Booking ID
 * @param {string} type - 'flight' or 'hotel'
 * @returns {Promise<Object>} Booking details
 */
export async function getBookingDetails(bookingId, type = 'flight') {
    console.log(`📋 [getBookingDetails] Retrieving ${type} booking: ${bookingId}`);

    const client = getAmadeusClient();
    if (!client) throw new Error('Amadeus client not available');

    try {
        if (type === 'flight') {
            const response = await client.booking.flightOrder(bookingId).get();
            console.log('✅ [getBookingDetails] Retrieved flight booking');
            return response.data;
        } else {
            // Hotel booking retrieval
            console.warn('⚠️ [getBookingDetails] Hotel retrieval coming soon');
            throw new Error('Hotel booking retrieval not yet implemented');
        }

    } catch (error) {
        console.error('❌ [getBookingDetails] Failed:', error.response?.body || error.message);
        throw new Error('Failed to retrieve booking: ' + (error.response?.body?.errors?.[0]?.detail || error.message));
    }
}
