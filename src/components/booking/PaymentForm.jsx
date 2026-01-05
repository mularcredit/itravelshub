/**
 * Mock Payment Form Component
 * Simulates payment processing without Stripe integration
 */

'use client';

import { useState } from 'react';

export default function PaymentForm({ amount, currency = 'USD', onPaymentSuccess, onPaymentError, customerEmail }) {
    const [processing, setProcessing] = useState(false);
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        // Basic validation
        if (!cardNumber || !cardName || !expiryDate || !cvv) {
            setError('Please fill in all card details');
            return;
        }

        if (cardNumber.replace(/\s/g, '').length !== 16) {
            setError('Card number must be 16 digits');
            return;
        }

        if (cvv.length !== 3) {
            setError('CVV must be 3 digits');
            return;
        }

        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const mockPaymentMethod = {
                id: 'mock_pm_' + Date.now(),
                type: 'card',
                card: {
                    brand: 'visa',
                    last4: cardNumber.slice(-4),
                    exp_month: expiryDate.split('/')[0],
                    exp_year: expiryDate.split('/')[1]
                },
                billing_details: {
                    name: cardName,
                    email: customerEmail
                }
            };

            if (onPaymentSuccess) {
                onPaymentSuccess(mockPaymentMethod);
            }
            setProcessing(false);
        }, 1500);
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.slice(0, 2) + '/' + v.slice(2, 4);
        }
        return v;
    };

    return (
        <div className="payment-form-wrapper">
            <div className="mock-mode-banner">
                <i className="bi bi-info-circle"></i>
                <strong>Demo Mode</strong> - This is a mock payment (no real charges will be made)
            </div>

            <div className="payment-summary">
                <div className="summary-row">
                    <span className="summary-label">Total Amount</span>
                    <span className="summary-amount">
                        {currency} {parseFloat(amount).toFixed(2)}
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="payment-form">
                <div className="form-group">
                    <label htmlFor="card-name" className="form-label">
                        <i className="bi bi-person"></i> Cardholder Name
                    </label>
                    <input
                        type="text"
                        id="card-name"
                        className="form-control"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="card-number" className="form-label">
                        <i className="bi bi-credit-card"></i> Card Number
                    </label>
                    <input
                        type="text"
                        id="card-number"
                        className="form-control"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="4242 4242 4242 4242"
                        maxLength="19"
                        required
                    />
                    <small className="text-muted">Use: 4242 4242 4242 4242 for testing</small>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="expiry" className="form-label">
                            <i className="bi bi-calendar"></i> Expiry Date
                        </label>
                        <input
                            type="text"
                            id="expiry"
                            className="form-control"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            maxLength="5"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cvv" className="form-label">
                            <i className="bi bi-shield-lock"></i> CVV
                        </label>
                        <input
                            type="text"
                            id="cvv"
                            className="form-control"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                            placeholder="123"
                            maxLength="3"
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger" role="alert">
                        <i className="bi bi-exclamation-triangle"></i> {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="btn btn-primary btn-lg btn-block payment-button"
                >
                    {processing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Processing...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-lock-fill me-2"></i>
                            Pay {currency} {parseFloat(amount).toFixed(2)}
                        </>
                    )}
                </button>

                <div className="payment-security-note">
                    <i className="bi bi-shield-check"></i>
                    Mock payment for testing - No real charges will be made
                </div>
            </form>

            <style jsx>{`
        .payment-form-wrapper {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .mock-mode-banner {
          background: #d1ecf1;
          color: #0c5460;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          border-left: 4px solid #17a2b8;
        }

        .payment-summary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 24px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .summary-label {
          font-size: 14px;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .summary-amount {
          font-size: 28px;
          font-weight: 700;
        }

        .payment-form {
          margin-top: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #2c3e50;
          font-size: 14px;
        }

        .form-control {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .text-muted {
          display: block;
          margin-top: 4px;
          font-size: 12px;
          color: #7f8c8d;
        }

        .payment-button {
          width: 100%;
          padding: 16px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .payment-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        }

        .payment-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .payment-security-note {
          text-align: center;
          font-size: 13px;
          color: #7f8c8d;
          margin-top: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .alert {
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .alert-danger {
          background-color: #fee;
          color: #e74c3c;
          border-left: 4px solid #e74c3c;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
}
