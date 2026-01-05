'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import FlightCard from './FlightCard';
import FlightBookingForm from '../booking/FlightBookingForm';

const FlightResultsList = ({ flights }) => {
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showBookingModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showBookingModal]);

    const handleBookFlight = (flight) => {
        setSelectedFlight(flight);
        setShowBookingModal(true);
    };

    const handleCloseModal = () => {
        setShowBookingModal(false);
        setTimeout(() => setSelectedFlight(null), 300);
    };

    const handleBookingSuccess = (booking) => {
        alert(`Flight booked successfully! Reference: ${booking.id}`);
        handleCloseModal();
    };

    return (
        <>
            <div className="flight-results-list container mt-5">
                {flights.map((flight) => (
                    <FlightCard
                        key={flight.id}
                        flight={flight}
                        onBook={() => handleBookFlight(flight)}
                    />
                ))}
            </div>

            {/* Booking Modal - Rendered via Portal */}
            {showBookingModal && typeof window !== 'undefined' && ReactDOM.createPortal(
                <div className="booking-modal-overlay" onClick={handleCloseModal}>
                    <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                        {selectedFlight && (
                            <FlightBookingForm
                                flightOffer={selectedFlight}
                                onSuccess={handleBookingSuccess}
                                onCancel={handleCloseModal}
                            />
                        )}
                    </div>
                </div>,
                document.body
            )}

            <style jsx>{`
                .booking-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 100000;
                    animation: fadeIn 0.3s ease;
                    overflow-y: auto;
                    padding: 40px 20px;
                }

                .booking-modal-content {
                    background: #f5f5f5;
                    border-radius: 16px;
                    max-width: 1000px;
                    width: 100%;
                    margin: 0 auto;
                    position: relative;
                    animation: slideUp 0.3s ease;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    min-height: min-content;
                }

                .modal-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: white;
                    border: none;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 14px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    z-index: 10;
                }

                .modal-close:hover {
                    background: #f0f0f0;
                    transform: rotate(90deg);
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .booking-modal-content {
                        max-height: 100vh;
                        border-radius: 0;
                    }
                }
            `}</style>
        </>
    );
};

export default FlightResultsList;

