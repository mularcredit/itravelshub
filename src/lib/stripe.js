/**
 * Stripe Payment Integration for TripRex
 * Handles payment processing for flight and hotel bookings
 */

import Stripe from 'stripe';

let stripeClient;

/**
 * Get Stripe client instance (singleton)
 */
function getStripeClient() {
    if (stripeClient) return stripeClient;

    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
        console.warn('⚠️ [stripe] STRIPE_SECRET_KEY not configured');
        return null;
    }

    stripeClient = new Stripe(secretKey, {
        apiVersion: '2023-10-16'
    });

    return stripeClient;
}

/**
 * Create a payment intent for booking
 * 
 * @param {Object} params - Payment parameters
 * @param {number} params.amount - Amount in cents (e.g., 10000 for $100.00)
 * @param {string} params.currency - Currency code (e.g., 'usd')
 * @param {string} params.customerEmail - Customer email
 * @param {Object} params.metadata - Additional metadata (booking details, etc.)
 * @returns {Promise<Object>} Stripe PaymentIntent object
 */
export async function createPaymentIntent({ amount, currency = 'usd', customerEmail, metadata = {} }) {
    console.log(`💳 [createPaymentIntent] Creating payment for ${currency.toUpperCase()} ${(amount / 100).toFixed(2)}`);

    const stripe = getStripeClient();

    if (!stripe) {
        console.warn('⚠️ [createPaymentIntent] Stripe not configured - skipping payment (TEST MODE)');
        return {
            id: 'test_' + Date.now(),
            client_secret: 'test_secret',
            status: 'test_mode',
            amount: amount,
            currency: currency
        };
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount), // Ensure integer
            currency: currency.toLowerCase(),
            receipt_email: customerEmail,
            metadata: {
                ...metadata,
                customerEmail: customerEmail
            },
            automatic_payment_methods: {
                enabled: true
            }
        });

        console.log('✅ [createPaymentIntent] Payment intent created:', paymentIntent.id);
        return paymentIntent;

    } catch (error) {
        console.error('❌ [createPaymentIntent] Failed:', error.message);
        throw new Error('Payment initialization failed: ' + error.message);
    }
}

/**
 * Confirm a payment
 * 
 * @param {string} paymentIntentId - Payment Intent ID
 * @returns {Promise<Object>} Confirmed payment intent
 */
export async function confirmPayment(paymentIntentId) {
    console.log(`✅ [confirmPayment] Confirming payment: ${paymentIntentId}`);

    const stripe = getStripeClient();

    if (!stripe) {
        console.warn('⚠️ [confirmPayment] Stripe not configured - returning test confirmation');
        return {
            id: paymentIntentId,
            status: 'succeeded',
            amount: 0
        };
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log('✅ [confirmPayment] Payment status:', paymentIntent.status);
        return paymentIntent;

    } catch (error) {
        console.error('❌ [confirmPayment] Failed:', error.message);
        throw new Error('Payment confirmation failed: ' + error.message);
    }
}

/**
 * Refund a payment
 * 
 * @param {string} paymentIntentId - Payment Intent ID to refund
 * @param {number} amount - Amount to refund in cents (optional, full refund if not specified)
 * @returns {Promise<Object>} Refund object
 */
export async function refundPayment(paymentIntentId, amount = null) {
    console.log(`💸 [refundPayment] Processing refund for: ${paymentIntentId}`);

    const stripe = getStripeClient();

    if (!stripe) {
        console.warn('⚠️ [refundPayment] Stripe not configured - skipping refund');
        return {
            id: 'test_refund_' + Date.now(),
            status: 'succeeded',
            amount: amount || 0
        };
    }

    try {
        const refundParams = { payment_intent: paymentIntentId };
        if (amount) refundParams.amount = Math.round(amount);

        const refund = await stripe.refunds.create(refundParams);

        console.log('✅ [refundPayment] Refund processed:', refund.id);
        return refund;

    } catch (error) {
        console.error('❌ [refundPayment] Failed:', error.message);
        throw new Error('Refund failed: ' + error.message);
    }
}

/**
 * Get payment details
 * 
 * @param {string} paymentIntentId - Payment Intent ID
 * @returns {Promise<Object>} Payment intent details
 */
export async function getPaymentDetails(paymentIntentId) {
    const stripe = getStripeClient();

    if (!stripe) {
        return { id: paymentIntentId, status: 'test_mode' };
    }

    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return paymentIntent;
    } catch (error) {
        console.error('❌ [getPaymentDetails] Failed:', error.message);
        throw new Error('Failed to retrieve payment: ' + error.message);
    }
}
