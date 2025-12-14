'use client';

import DestinationInput from './DestinationInput';
import DateRangePicker from './DateRangePicker';
import GuestSelector from './GuestSelector';

export default function HotelSearchForm() {
    return (
        <div className="filter-area">
            <div className="row g-xl-4 gy-4">
                {/* Destination */}
                <div className="col-xl-4 col-md-6 d-flex justify-content-center divider">
                    <DestinationInput />
                </div>

                {/* Date Range */}
                <div className="col-xl-4 col-md-6 d-flex justify-content-center divider">
                    <DateRangePicker />
                </div>

                {/* Guests */}
                <div className="col-xl-4 col-md-6 d-flex justify-content-center">
                    <GuestSelector />
                </div>
            </div>
        </div>
    );
}
