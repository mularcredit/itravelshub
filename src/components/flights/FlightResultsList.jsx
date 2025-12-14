import React from 'react';
import FlightCard from './FlightCard';

const FlightResultsList = ({ flights }) => {
    return (
        <div className="flight-results-list container mt-5">
            {flights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} />
            ))}
        </div>
    );
};

export default FlightResultsList;
