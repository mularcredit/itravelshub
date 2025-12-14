'use client';
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModernDatePicker = ({ name, endName, label = "Date", required = true, mode = "single" }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const formatDisplayDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDateChange = (dates) => {
        if (mode === 'range') {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
        } else {
            setStartDate(dates);
            setEndDate(null);
            setIsOpen(false); // Close on selection for single mode
        }
    };

    const displayText = () => {
        if (mode === 'range') {
            if (startDate && endDate) {
                return `${formatDisplayDate(startDate)} - ${formatDisplayDate(endDate)}`;
            } else if (startDate) {
                return `${formatDisplayDate(startDate)} - Select end`;
            }
            return 'Select dates';
        } else {
            return startDate ? formatDisplayDate(startDate) : 'Select date';
        }
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div className="searchbox-input">
                <label>{label}</label>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        color: startDate ? 'var(--white-color)' : '#f5f5f5',
                        backgroundColor: 'transparent',
                        border: 'none',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: '4px 0',
                        userSelect: 'none'
                    }}
                >
                    {displayText()}
                </div>

                {/* Hidden inputs for form submission */}
                <input
                    type="hidden"
                    name={name}
                    value={formatDate(startDate)}
                // Removed 'required' from hidden input to allow custom validation in parent
                />
                {mode === 'range' && (
                    <input
                        type="hidden"
                        name={endName || `${name}_end`}
                        value={formatDate(endDate)}
                    // Removed 'required' from hidden input to allow custom validation in parent
                    />
                )}
            </div>

            {/* Custom styled DatePicker */}
            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    zIndex: 10000,
                    marginTop: '8px'
                }}>
                    <DatePicker
                        selected={startDate}
                        onChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange={mode === 'range'}
                        inline
                        minDate={new Date()}
                        monthsShown={mode === 'range' ? 2 : 1}
                        calendarClassName="modern-calendar"
                    />
                </div>
            )}

            <style jsx global>{`
                .modern-calendar {
                    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
                    border: 1px solid #444;
                    border-radius: 16px;
                    padding: 20px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    font-family: var(--font-plus-jakarta-sans), sans-serif;
                }

                .modern-calendar .react-datepicker__header {
                    background: transparent;
                    border-bottom: 1px solid #444;
                    padding: 16px 0;
                }

                .modern-calendar .react-datepicker__current-month {
                    color: #fff;
                    font-size: 16px;
                    font-weight: 600;
                    margin-bottom: 12px;
                }

                .modern-calendar .react-datepicker__day-names {
                    margin-top: 12px;
                }

                .modern-calendar .react-datepicker__day-name {
                    color: #999;
                    font-size: 12px;
                    font-weight: 500;
                    width: 40px;
                    line-height: 40px;
                    margin: 2px;
                }

                .modern-calendar .react-datepicker__day {
                    color: #fff;
                    width: 40px;
                    height: 40px;
                    line-height: 40px;
                    margin: 2px;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    font-size: 14px;
                    font-weight: 500;
                }

                .modern-calendar .react-datepicker__day:hover {
                    background: #3a3a3a;
                    transform: scale(1.1);
                }

                .modern-calendar .react-datepicker__day--selected,
                .modern-calendar .react-datepicker__day--range-start,
                .modern-calendar .react-datepicker__day--range-end {
                    background: var(--primary-color1, #4CAF50) !important;
                    color: #fff !important;
                    font-weight: 600;
                    transform: scale(1.05);
                }

                .modern-calendar .react-datepicker__day--in-range {
                    background: rgba(76, 175, 80, 0.2) !important;
                    color: #fff !important;
                    border-radius: 0;
                }

                .modern-calendar .react-datepicker__day--keyboard-selected {
                    background: #3a3a3a;
                    color: #fff;
                }

                .modern-calendar .react-datepicker__day--disabled {
                    color: #555;
                    cursor: not-allowed;
                }

                .modern-calendar .react-datepicker__day--disabled:hover {
                    background: transparent;
                    transform: none;
                }

                .modern-calendar .react-datepicker__day--outside-month {
                    color: #555;
                }

                .modern-calendar .react-datepicker__navigation {
                    top: 20px;
                }

                .modern-calendar .react-datepicker__navigation-icon::before {
                    border-color: #fff;
                    border-width: 2px 2px 0 0;
                }

                .modern-calendar .react-datepicker__navigation:hover *::before {
                    border-color: var(--primary-color1, #4CAF50);
                }

                .modern-calendar .react-datepicker__month-container {
                    margin: 0 8px;
                }

                .modern-calendar .react-datepicker__day--today {
                    border: 2px solid var(--primary-color1, #4CAF50);
                    font-weight: 600;
                }

                /* Smooth animations */
                .modern-calendar .react-datepicker__day {
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default ModernDatePicker;
