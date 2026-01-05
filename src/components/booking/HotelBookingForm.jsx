/**
 * Hotel Booking Form Component
 * Premium UI for processing hotel bookings locally
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import flags from 'country-flag-icons/react/3x2';
import { countryCodes } from '../../data/countryCodes';
import PaymentForm from './PaymentForm';

export default function HotelBookingForm({ hotel, checkIn, checkOut, onSuccess, onCancel }) {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Guest Details, 2: Payment, 3: Confirmation
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookingResult, setBookingResult] = useState(null);

    // Extract hotel details or use defaults
    const totalAmount = parseFloat((hotel.price || '0').replace(/[^0-9.]/g, '')) || 199.99; // Fallback price if parsing fails
    const currency = 'USD'; // Defaulting to USD as scraped data is often mixed or text

    // Guest state (Primary Guest)
    const [guest, setGuest] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+1',
        specialRequests: ''
    });

    const getCountryByDialCode = (dialCode) => {
        return countryCodes.find(c => c.dial_code === dialCode) || countryCodes.find(c => c.code === 'US');
    };

    const selectedCountry = getCountryByDialCode(guest.countryCode || '+1');
    const FlagComponent = flags[selectedCountry.code];

    const handleGuestChange = (field, value) => {
        setGuest(prev => ({ ...prev, [field]: value }));
    };

    const validateGuest = () => {
        if (!guest.title || !guest.firstName || !guest.lastName || !guest.email || !guest.phone) {
            setError('Please complete all required fields');
            return false;
        }
        return true;
    };

    const handleContinueToPayment = () => {
        if (validateGuest()) {
            setError(null);
            setStep(2);
        }
    };

    const handlePaymentSuccess = async (paymentMethod) => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Mock success response
            const bookingRef = 'HTL-' + Math.random().toString(36).substr(2, 9).toUpperCase();

            setBookingResult({
                id: bookingRef,
                status: 'CONFIRMED'
            });
            setStep(3);
            if (onSuccess) onSuccess({ id: bookingRef });

        } catch (err) {
            console.error('Booking error:', err);
            setError(err.message || 'Booking failed');
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="hotel-booking-form">
            {/* Progress Indicator */}
            <div className="booking-progress">
                <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Guest Details</div>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Payment</div>
                </div>
                <div className="progress-line"></div>
                <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Confirmation</div>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger">
                    <i className="bi bi-exclamation-triangle"></i> {error}
                </div>
            )}

            {/* Step 1: Guest Details */}
            {step === 1 && (
                <div className="guest-details-step">
                    <h3 className="section-title">
                        <i className="bi bi-person-fill"></i> Primary Guest Information
                    </h3>

                    <div className="passenger-card">
                        <div className="row g-3">
                            <div className="col-md-2">
                                <label className="form-label">Title *</label>
                                <select
                                    className="form-control"
                                    value={guest.title}
                                    onChange={(e) => handleGuestChange('title', e.target.value)}
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="MR">Mr</option>
                                    <option value="MRS">Mrs</option>
                                    <option value="MS">Ms</option>
                                    <option value="DR">Dr</option>
                                </select>
                            </div>

                            <div className="col-md-5">
                                <label className="form-label">First Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={guest.firstName}
                                    onChange={(e) => handleGuestChange('firstName', e.target.value)}
                                    placeholder="First name"
                                    required
                                />
                            </div>

                            <div className="col-md-5">
                                <label className="form-label">Last Name *</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={guest.lastName}
                                    onChange={(e) => handleGuestChange('lastName', e.target.value)}
                                    placeholder="Last name"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Email Address *</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={guest.email}
                                    onChange={(e) => handleGuestChange('email', e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Phone Number *</label>
                                <div className="phone-input-group">
                                    <div className="country-select-wrapper">
                                        <div className="country-flag-display" title={selectedCountry.name}>
                                            {FlagComponent && (
                                                <FlagComponent
                                                    title={selectedCountry.name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'block',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                            )}
                                        </div>
                                        {/* Visual display for the selected code */}
                                        <div className="country-code-display">
                                            {guest.countryCode || '+1'}
                                        </div>
                                        <select
                                            className="country-select"
                                            value={guest.countryCode || '+1'}
                                            onChange={(e) => handleGuestChange('countryCode', e.target.value)}
                                        >
                                            {countryCodes.map((country) => (
                                                <option key={country.code} value={country.dial_code}>
                                                    {country.name} ({country.dial_code})
                                                </option>
                                            ))}
                                        </select>
                                        <i className="bi bi-chevron-down" style={{ fontSize: '10px', marginLeft: '-15px', pointerEvents: 'none' }}></i>
                                    </div>
                                    <input
                                        type="tel"
                                        className="phone-input-native"
                                        value={guest.phone}
                                        onChange={(e) => handleGuestChange('phone', e.target.value)}
                                        placeholder="123 456 7890"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <label className="form-label">Special Requests (Optional)</label>
                                <textarea
                                    className="form-control"
                                    rows="3"
                                    value={guest.specialRequests}
                                    onChange={(e) => handleGuestChange('specialRequests', e.target.value)}
                                    placeholder="Near elevator, late check-in, etc."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        {onCancel && (
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={handleContinueToPayment}
                        >
                            Continue to Payment <i className="bi bi-arrow-right"></i>
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
                <div className="payment-step">
                    <h3 className="section-title">
                        <i className="bi bi-credit-card"></i> Payment Details
                    </h3>

                    {/* Hotel Summary */}
                    <div className="booking-summary-card">
                        <h5>Booking Summary</h5>
                        <div className="summary-item">
                            <span>Hotel:</span>
                            <span><strong>{hotel.name}</strong></span>
                        </div>
                        {(checkIn && checkOut) && (
                            <div className="summary-item">
                                <span>Dates:</span>
                                <span>{checkIn} to {checkOut}</span>
                            </div>
                        )}
                        <div className="summary-item">
                            <span>Room Type:</span>
                            <span>Standard Room</span>
                        </div>
                        <div className="summary-item total">
                            <span>Total Amount:</span>
                            <span className="total-price">{currency} {totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <PaymentForm
                        amount={totalAmount}
                        currency={currency}
                        customerEmail={guest.email}
                        onPaymentSuccess={handlePaymentSuccess}
                        onPaymentError={(err) => setError(err.message)}
                    />

                    <button
                        type="button"
                        className="btn btn-secondary mt-3"
                        onClick={() => setStep(1)}
                        disabled={loading}
                    >
                        <i className="bi bi-arrow-left"></i> Back to Guest Details
                    </button>
                </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && bookingResult && (
                <div className="confirmation-step">
                    <div className="success-icon">
                        <i className="bi bi-check-circle-fill"></i>
                    </div>
                    <h2 className="success-title">Hotel Booked!</h2>
                    <p className="success-message">
                        Your stay at <strong>{hotel.name}</strong> has been confirmed. A confirmation email has been sent to <strong>{guest.email}</strong>
                    </p>

                    <div className="booking-reference-card">
                        <h4>Booking Reference</h4>
                        <div className="reference-number">{bookingResult.id}</div>
                        <p className="reference-note">Please save this reference for check-in</p>
                    </div>

                    <div className="booking-details-card">
                        <h5>Booking Details</h5>
                        <div className="detail-row">
                            <span className="label">Hotel:</span>
                            <span className="value">{hotel.name}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Guest:</span>
                            <span className="value">{guest.title} {guest.firstName} {guest.lastName}</span>
                        </div>
                        <div className="detail-row">
                            <span className="label">Total Paid:</span>
                            <span className="value"><strong>{currency} {totalAmount.toFixed(2)}</strong></span>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                if (onSuccess) onSuccess(bookingResult);
                                router.push('/');
                            }}
                        >
                            Back to Home
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => window.print()}
                        >
                            <i className="bi bi-printer"></i> Print Confirmation
                        </button>
                    </div>
                </div>
            )}

            <style jsx>{`
        .hotel-booking-form {
          max-width: 900px;
          margin: 0 auto; /* Adjusted margins for modal context */
          padding: 20px;
        }

        /* Reuse CSS from FlightBookingForm (simplified for brevity) */
        .booking-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          padding: 20px 0;
        }
        
        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .step-number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: #7f8c8d;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%); /* Emerald theme */
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .progress-step.completed .step-number {
          background: #059669;
          color: white;
        }

        .step-label {
          font-size: 12px;
          color: #7f8c8d;
          font-weight: 500;
        }

        .progress-line {
          flex: 1;
          height: 2px;
          background: #e0e0e0;
          margin: 0 10px;
          max-width: 80px;
        }

        .passenger-card, .contact-card {
           background: white;
           border-radius: 12px;
           padding: 24px;
           margin-bottom: 20px;
           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); 
           border: 1px solid #f0f0f0;
        }
        
        .section-title {
           font-size: 16px;
           font-weight: 700;
           color: #1f2937;
           margin-bottom: 16px;
           display: flex;
           align-items: center;
           gap: 8px;
        }

        .form-label { font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; display: block;}
        .form-control { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; }
        .form-control:focus { outline: none; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }

        .phone-input-group {
          display: flex;
          align-items: center;
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: white;
          padding: 4px 8px;
          gap: 8px;
        }

        .phone-input-group:focus-within { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1); }

        /* Country Select Styles (Overlay Trick) */
         .country-select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .country-code-display {
          font-size: 14px;
          color: #374151;
          font-weight: 500;
          padding-right: 18px; 
        }

        .country-select {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }

        .phone-input-native {
          flex: 1;
          border: none;
          outline: none;
          font-size: 14px;
          color: #374151;
          width: 100%;
          padding: 6px 0;
        }

        .country-flag-display {
          width: 24px;
          height: 16px;
          margin-right: 8px;
          border-radius: 2px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px; }
        
        .btn { padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 8px;}
        .btn-primary { background: #10b981; color: white; }
        .btn-primary:hover { background: #059669; }
        .btn-secondary { background: #f3f4f6; color: #374151; }
        .btn-secondary:hover { background: #e5e7eb; }

        .booking-summary-card { background: #f9fafb; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #e5e7eb; }
        .summary-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e5e7eb; }
        .summary-item:last-child { border-bottom: none; }
        .summary-item.total { font-size: 18px; font-weight: 700; color: #10b981; }

        .confirmation-step { text-align: center; padding: 40px 20px; }
        .success-icon { font-size: 64px; color: #10b981; margin-bottom: 20px; }
        .booking-reference-card { background: #10b981; color: white; border-radius: 12px; padding: 24px; margin: 24px auto; max-width: 400px; }
        .reference-number { font-size: 24px; font-weight: 700; margin: 12px 0; letter-spacing: 1px; }

         @media (max-width: 768px) {
            .phone-input-group { flex-wrap: nowrap; }
         }
      `}</style>
        </div>
    );
}
