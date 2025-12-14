import React from 'react';

const FlightCard = ({ flight }) => {
    return (
        <div className="flight-card bg-white rounded-4 shadow-sm p-4 mb-3 d-flex align-items-center justify-content-between flex-wrap gap-3" style={{ border: '1px solid #eee' }}>
            {/* Airline Info */}
            <div className="d-flex align-items-center gap-3">
                <div className="airline-logo bg-light rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                    <i className="bi bi-airplane-engines text-primary fs-4"></i>
                </div>
                <div>
                    <h5 className="mb-0 fw-bold">{flight.airline}</h5>
                    <span className="text-muted small">{flight.class || 'Economy'}</span>
                </div>
            </div>

            {/* Flight Times */}
            <div className="d-flex align-items-center gap-4 text-center">
                <div>
                    <h4 className="mb-0 fw-bold">{flight.departure}</h4>
                    <span className="text-muted small">{flight.origin}</span>
                </div>
                <div className="flight-route position-relative" style={{ width: '100px' }}>
                    <div style={{ borderTop: '2px dashed #ccc', width: '100%', position: 'absolute', top: '50%' }}></div>
                    <i className="bi bi-airplane text-muted position-absolute" style={{ top: '0', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}></i>
                    <span className="text-muted" style={{ fontSize: '0.7rem', display: 'block', marginTop: '15px' }}>{flight.duration}</span>
                    <span className="text-muted small fw-bold" style={{ fontSize: '0.65rem', display: 'block' }}>{flight.stops}</span>
                </div>
                <div>
                    <h4 className="mb-0 fw-bold">{flight.arrival}</h4>
                    <span className="text-muted small">{flight.destination}</span>
                </div>
            </div>

            {/* Price & Action */}
            <div className="text-end">
                <h3 className="text-success fw-bold mb-2">{flight.price}</h3>
                <a
                    href={flight.bookingLink || '#'}
                    target={flight.bookingLink ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="btn btn-success rounded-pill px-4"
                    onClick={(e) => !flight.bookingLink && e.preventDefault()}
                >
                    {flight.bookingLink ? 'Book Now' : 'Select'}
                </a>
            </div>
        </div>
    );
};

export default FlightCard;
