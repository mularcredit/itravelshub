'use client';

import HotelCard from './HotelCard';

export default function ResultsList({ hotels, onSelectHotel }) {
    if (!hotels || hotels.length === 0) {
        return null;
    }

    return (
        <div className="row g-4 mt-4">
            {hotels.map((hotel, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4">
                    <HotelCard
                        hotel={hotel}
                        onSelect={onSelectHotel}
                    />
                </div>
            ))}
        </div>
    );
}
