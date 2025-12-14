'use client';

import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

export default function DateRangePicker() {
    const [isOpen, setIsOpen] = useState(false);
    const [dateRange, setDateRange] = useState(undefined);

    const displayText = dateRange?.from && dateRange?.to
        ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
        : (dateRange?.from
            ? `${format(dateRange.from, 'MMM dd')} - Select end date`
            : 'Select dates');

    return (
        <div className="single-search-box" style={{ position: 'relative' }}>
            <div className="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width={23} height={23} viewBox="0 0 23 23">
                    <g clipPath={"url(#clip0_2037_326)"}>
                        <path d="M15.5978 13.5309L12.391 11.1258V6.22655C12.391 5.73394 11.9928 5.33575 11.5002 5.33575C11.0076 5.33575 10.6094 5.73394 10.6094 6.22655V11.5713C10.6094 11.8519 10.7412 12.1164 10.9657 12.2839L14.5288 14.9563C14.6826 15.0721 14.8699 15.1346 15.0624 15.1344C15.3341 15.1344 15.6013 15.0124 15.7759 14.7772C16.0717 14.3843 15.9916 13.8258 15.5978 13.5309Z" />
                        <path d="M11.5 0C5.15851 0 0 5.15851 0 11.5C0 17.8415 5.15851 23 11.5 23C17.8415 23 23 17.8415 23 11.5C23 5.15851 17.8415 0 11.5 0ZM11.5 21.2184C6.14194 21.2184 1.78156 16.8581 1.78156 11.5C1.78156 6.14194 6.14194 1.78156 11.5 1.78156C16.859 1.78156 21.2184 6.14194 21.2184 11.5C21.2184 16.8581 16.8581 21.2184 11.5 21.2184Z" />
                    </g>
                </svg>
            </div>
            <div className="searchbox-input">
                <label>Check in - Check out</label>
                <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: 'var(--white-color)', fontSize: '16px', fontWeight: '500' }}>
                    {displayText}
                </div>
                <input type="hidden" name="checkIn" value={dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : ''} />
                <input type="hidden" name="checkOut" value={dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : ''} />
            </div>

            {isOpen && (
                <>
                    <div className="position-fixed top-0 start-0 w-100 h-100" style={{ zIndex: 9998 }} onClick={() => setIsOpen(false)} />
                    <div className="position-absolute bg-white rounded-4 shadow-xl border-0 p-3" style={{ zIndex: 9999, top: '120%', left: '-20px', minWidth: '300px' }}>
                        <style>{`
                            .my-rdp {
                                --rdp-cell-size: 45px;
                                --rdp-accent-color: #10b981;
                                --rdp-background-color: #e0f2fe;
                                margin: 0;
                            }
                            /* Force the selected day (start/end) to be Green and Circular */
                            .my-selected-day {
                                background-color: #10b981 !important;
                                color: white !important;
                                border-radius: 100% !important;
                                font-weight: bold;
                                width: 100% !important;
                                height: 100% !important;
                            }
                            /* Style the middle range to be Light Green and Rectangular */
                            .my-range-middle {
                                background-color: #d1fae5 !important;
                                color: #065f46 !important;
                                border-radius: 0 !important;
                            }
                            /* Fix the range start/end connection points - Make them FULL circles */
                            .rdp-day_range_start.my-selected-day {
                                border-radius: 100% !important;
                            }
                            .rdp-day_range_end.my-selected-day {
                                border-radius: 100% !important;
                            }
                            /* Ensure the range middle styling doesn't bleed into the circles visually */
                            .my-range-middle {
                                background-color: #d1fae5 !important;
                                color: #065f46 !important;
                                border-radius: 0 !important;
                                /* Optional: add margin if you want separation, but usually connecting is fine */
                            }
                            /* General reset for perfect circles */
                            .rdp-day, .rdp-button_reset {
                                border-radius: 50%;
                            }
                            .rdp-table {
                                width: 100%;
                                max-width: 100%;
                            }
                        `}</style>
                        <DayPicker
                            className="my-rdp"
                            mode="range"
                            selected={dateRange}
                            modifiersClassNames={{
                                selected: 'my-selected-day',
                                range_middle: 'my-range-middle'
                            }}
                            onSelect={(range, selectedDay) => {
                                // Prevent deselecting if clicking the same day (optional preference)
                                // But standard behavior is toggle.
                                // If user clicks 'from' again, it resets? 
                                // Let's just set whatever comes.
                                setDateRange(range);

                                if (range?.from && range?.to) {
                                    setIsOpen(false);
                                }
                            }}
                            numberOfMonths={1}
                            pagedNavigation
                            showOutsideDays={false}
                            styles={{
                                root: { fontSize: '0.9rem' },
                                day_button: { minWidth: '32px', minHeight: '32px' },
                                day_selected: {
                                    backgroundColor: '#10b981 !important',
                                    color: 'white !important',
                                    fontWeight: '600',
                                    borderRadius: '50%'
                                },
                                day_range_middle: {
                                    backgroundColor: '#d1fae5',
                                    color: '#065f46'
                                }
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
