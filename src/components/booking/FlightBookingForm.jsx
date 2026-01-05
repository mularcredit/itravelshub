/**
 * Flight Booking Form Component
 * Premium UI for collecting passenger details and processing flight bookings
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import flags from 'country-flag-icons/react/3x2';
import { countryCodes } from '../../data/countryCodes';
import PaymentForm from './PaymentForm';

export default function FlightBookingForm({ flightOffer, onSuccess, onCancel }) {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Passenger Details, 2: Payment, 3: Confirmation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  // Extract flight details
  const totalAmount = parseFloat(flightOffer.price?.total || 0);
  const currency = flightOffer.price?.currency || 'USD';
  const travelersCount = flightOffer.travelerPricings?.length || 1;

  // Passenger state
  const [passengers, setPassengers] = useState(
    Array(travelersCount).fill(null).map((_, index) => ({
      id: `${index + 1}`,
      title: '',
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      passportNumber: '',
      nationality: '',
      expiryDate: ''
    }))
  );

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    countryCode: '+1'
  });

  const getCountryByDialCode = (dialCode) => {
    return countryCodes.find(c => c.dial_code === dialCode) || countryCodes.find(c => c.code === 'US');
  };

  const selectedCountry = getCountryByDialCode(contactInfo.countryCode || '+1');
  const FlagComponent = flags[selectedCountry.code];

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const validatePassengers = () => {
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.title || !p.firstName || !p.lastName || !p.dateOfBirth || !p.gender) {
        setError(`Please complete all required fields for Passenger ${i + 1}`);
        return false;
      }
    }
    if (!contactInfo.email || !contactInfo.phone) {
      setError('Please provide contact email and phone number');
      return false;
    }
    return true;
  };

  const handleContinueToPayment = () => {
    if (validatePassengers()) {
      setError(null);
      setStep(2);
    }
  };

  const handlePaymentSuccess = async (paymentMethod) => {
    setLoading(true);
    setError(null);

    try {
      // Format travelers for Amadeus API
      const travelers = passengers.map((p, index) => ({
        id: `${index + 1}`,
        dateOfBirth: p.dateOfBirth,
        name: {
          firstName: p.firstName,
          lastName: p.lastName
        },
        gender: p.gender,
        contact: index === 0 ? {
          emailAddress: contactInfo.email,
          phones: [{
            deviceType: 'MOBILE',
            countryCallingCode: contactInfo.countryCode.replace('+', ''),
            number: contactInfo.phone
          }]
        } : undefined,
        documents: p.passportNumber ? [{
          documentType: 'PASSPORT',
          number: p.passportNumber,
          expiryDate: p.expiryDate,
          nationality: p.nationality,
          holder: true
        }] : undefined
      }));

      const contact = {
        emailAddress: contactInfo.email,
        phones: [{
          deviceType: 'MOBILE',
          countryCallingCode: contactInfo.countryCode.replace('+', ''),
          number: contactInfo.phone
        }]
      };

      // Call booking API
      const response = await fetch('/api/flights/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flightOffer: flightOffer,
          travelers: travelers,
          contact: contact,
          paymentMethod: paymentMethod
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setBookingResult(data.booking);
        setStep(3);
        if (onSuccess) onSuccess(data.booking);
      } else {
        throw new Error(data.error || 'Booking failed');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message);
      setStep(2); // Stay on payment step
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flight-booking-form">
      {/* Progress Indicator */}
      <div className="booking-progress">
        <div className={`progress-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Passenger Details</div>
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

      {/* Step 1: Passenger Details */}
      {step === 1 && (
        <div className="passenger-details-step">
          <h3 className="section-title">
            <i className="bi bi-person-fill"></i> Passenger Information
          </h3>

          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-card">
              <h4 className="passenger-title">Passenger {index + 1}</h4>

              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label">Title *</label>
                  <select
                    className="form-control"
                    value={passenger.title}
                    onChange={(e) => handlePassengerChange(index, 'title', e.target.value)}
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
                    value={passenger.firstName}
                    onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                    placeholder="As per passport"
                    required
                  />
                </div>

                <div className="col-md-5">
                  <label className="form-label">Last Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.lastName}
                    onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                    placeholder="As per passport"
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Date of Birth *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={passenger.dateOfBirth}
                    onChange={(e) => handlePassengerChange(index, 'dateOfBirth', e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label">Gender *</label>
                  <select
                    className="form-control"
                    value={passenger.gender}
                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                    required
                  >
                    <option value="">Select</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label">Nationality</label>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.nationality}
                    onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                    placeholder="e.g., US"
                    maxLength={2}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Passport Number (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={passenger.passportNumber}
                    onChange={(e) => handlePassengerChange(index, 'passportNumber', e.target.value)}
                    placeholder="Passport number"
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label">Passport Expiry (Optional)</label>
                  <input
                    type="date"
                    className="form-control"
                    value={passenger.expiryDate}
                    onChange={(e) => handlePassengerChange(index, 'expiryDate', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Contact Information */}
          <div className="contact-card">
            <h4 className="passenger-title">
              <i className="bi bi-envelope"></i> Contact Information
            </h4>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  className="form-control"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
                <small className="text-muted">Booking confirmation will be sent here</small>
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
                      {contactInfo.countryCode || '+1'}
                    </div>
                    <select
                      className="country-select"
                      value={contactInfo.countryCode || '+1'}
                      onChange={(e) => setContactInfo({ ...contactInfo, countryCode: e.target.value })}
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
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    placeholder="123 456 7890"
                    required
                  />
                </div>
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

          {/* Flight Summary */}
          <div className="booking-summary-card">
            <h5>Booking Summary</h5>
            <div className="summary-item">
              <span>Route:</span>
              <span><strong>
                {flightOffer?.itineraries?.[0]?.segments?.[0]?.departure?.iataCode || 'N/A'} → {flightOffer?.itineraries?.[0]?.segments?.[(flightOffer?.itineraries?.[0]?.segments?.length || 1) - 1]?.arrival?.iataCode || 'N/A'}
              </strong></span>
            </div>
            <div className="summary-item">
              <span>Passengers:</span>
              <span>{travelersCount}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span className="total-price">{currency} {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <PaymentForm
            amount={totalAmount}
            currency={currency}
            customerEmail={contactInfo.email}
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentError={(err) => setError(err.message)}
          />

          <button
            type="button"
            className="btn btn-secondary mt-3"
            onClick={() => setStep(1)}
            disabled={loading}
          >
            <i className="bi bi-arrow-left"></i> Back to Passenger Details
          </button>
        </div>
      )}

      {/* Step 3: Confirmation */}
      {step === 3 && bookingResult && (
        <div className="confirmation-step">
          <div className="success-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <h2 className="success-title">Booking Confirmed!</h2>
          <p className="success-message">
            Your flight has been successfully booked. A confirmation email has been sent to <strong>{contactInfo.email}</strong>
          </p>

          <div className="booking-reference-card">
            <h4>Booking Reference</h4>
            <div className="reference-number">{bookingResult.bookingReference || bookingResult.id}</div>
            <p className="reference-note">Please save this reference for your records</p>
          </div>

          <div className="booking-details-card">
            <h5>Flight Details</h5>
            <div className="detail-row">
              <span className="label">Route:</span>
              <span className="value">{flightOffer.itineraries[0].segments[0].departure.iataCode} → {flightOffer.itineraries[0].segments[flightOffer.itineraries[0].segments.length - 1].arrival.iataCode}</span>
            </div>
            <div className="detail-row">
              <span className="label">Passengers:</span>
              <span className="value">{travelersCount}</span>
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
              onClick={() => router.push('/')}
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
        .flight-booking-form {
          max-width: 900px;
          margin: 40px auto;
          padding: 20px;
        }

        .booking-progress {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 40px;
          padding: 30px 0;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }

        .step-number {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #e0e0e0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 18px;
          color: #7f8c8d;
          transition: all 0.3s ease;
        }

        .progress-step.active .step-number {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .progress-step.completed .step-number {
          background: #27ae60;
          color: white;
        }

        .step-label {
          font-size: 13px;
          color: #7f8c8d;
          font-weight: 500;
        }

        .progress-line {
          flex: 1;
          height: 3px;
          background: #e0e0e0;
          margin: 0 10px;
          max-width: 120px;
        }

        .passenger-card, .contact-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .passenger-title, .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 500;
          color: #2c3e50;
          margin-bottom: 4px;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 13px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        /* Phone Input Custom Styling - Native Implementation */
        .phone-input-group {
          display: flex;
          align-items: center;
          width: 100%;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          background: white;
          padding: 8px 12px;
          gap: 12px;
          transition: border-color 0.3s ease;
        }

        .phone-input-group:focus-within {
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .country-select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          /* Ensure simpler layout */
        }

        .country-code-display {
          font-size: 14px;
          color: #2c3e50;
          font-weight: 500;
          padding-right: 18px; /* Space for chevron */
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
          color: #2c3e50;
          width: 100%;
          padding: 4px 0;
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

        .text-muted {
          font-size: 11px;
          color: #7f8c8d;
          display: block;
          margin-top: 4px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        .btn {
          padding: 12px 24px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          background: #e0e0e0;
          color: #2c3e50;
        }

        .btn-secondary:hover {
          background: #d0d0d0;
          transform: translateY(-1px);
        }

        .btn-lg {
          padding: 14px 28px;
          font-size: 14px;
        }

        .booking-summary-card {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-item.total {
          font-size: 18px;
          font-weight: 700;
          color: #667eea;
          margin-top: 8px;
        }

        .confirmation-step {
          text-align: center;
          padding: 40px 20px;
        }

        .success-icon {
          font-size: 80px;
          color: #27ae60;
          animation: scaleIn 0.5s ease;
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }

        .success-title {
          font-size: 32px;
          font-weight: 700;
          color: #2c3e50;
          margin: 20px 0;
        }

        .booking-reference-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px;
          padding: 30px;
          margin: 30px auto;
          max-width: 500px;
        }

        .reference-number {
          font-size: 32px;
          font-weight: 700;
          letter-spacing: 2px;
          margin: 16px 0;
        }

        .booking-details-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          margin: 20px auto;
          max-width: 500px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          text-align: left;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .alert {
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .alert-danger {
          background: #fee;
          color: #e74c3c;
          border-left: 4px solid #e74c3c;
        }

        @media (max-width: 768px) {
          .progress-line {
            max-width: 60px;
          }
          
          .step-label {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}
