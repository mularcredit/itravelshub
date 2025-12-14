'use client';
import React, { useState, useRef, useEffect } from 'react';

const PassengerSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const wrapperRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const totalPassengers = adults + children;

    const increment = (type) => {
        if (type === 'adults' && adults < 9) setAdults(adults + 1);
        if (type === 'children' && children < 9) setChildren(children + 1);
    };

    const decrement = (type) => {
        if (type === 'adults' && adults > 1) setAdults(adults - 1);
        if (type === 'children' && children > 0) setChildren(children - 1);
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div className="searchbox-input">
                <label style={{ color: '#fff' }}>Passengers</label>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        color: 'var(--white-color)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        padding: '8px 0'
                    }}
                >
                    {totalPassengers} {totalPassengers === 1 ? 'Passenger' : 'Passengers'}
                    {children > 0 && ` (${adults} Adult${adults > 1 ? 's' : ''}, ${children} Child${children > 1 ? 'ren' : ''})`}
                </div>

                {/* Hidden inputs for form submission */}
                <input type="hidden" name="adults" value={adults} />
                <input type="hidden" name="children" value={children} />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #444',
                        borderRadius: '12px',
                        marginTop: '8px',
                        padding: '20px',
                        zIndex: 10000,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                        minWidth: '280px'
                    }}
                >
                    {/* Adults */}
                    <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Adults</div>
                                <div style={{ color: '#999', fontSize: '12px' }}>12+ years</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => decrement('adults')}
                                    disabled={adults <= 1}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '1px solid #4CAF50',
                                        backgroundColor: adults <= 1 ? '#333' : 'transparent',
                                        color: adults <= 1 ? '#666' : '#4CAF50',
                                        fontSize: '18px',
                                        cursor: adults <= 1 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    −
                                </button>
                                <span style={{ color: '#fff', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                                    {adults}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => increment('adults')}
                                    disabled={adults >= 9}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '1px solid #4CAF50',
                                        backgroundColor: adults >= 9 ? '#333' : 'transparent',
                                        color: adults >= 9 ? '#666' : '#4CAF50',
                                        fontSize: '18px',
                                        cursor: adults >= 9 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Children */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>Children</div>
                                <div style={{ color: '#999', fontSize: '12px' }}>0-11 years</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <button
                                    type="button"
                                    onClick={() => decrement('children')}
                                    disabled={children <= 0}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '1px solid #4CAF50',
                                        backgroundColor: children <= 0 ? '#333' : 'transparent',
                                        color: children <= 0 ? '#666' : '#4CAF50',
                                        fontSize: '18px',
                                        cursor: children <= 0 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    −
                                </button>
                                <span style={{ color: '#fff', fontWeight: '600', minWidth: '20px', textAlign: 'center' }}>
                                    {children}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => increment('children')}
                                    disabled={children >= 9}
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        border: '1px solid #4CAF50',
                                        backgroundColor: children >= 9 ? '#333' : 'transparent',
                                        color: children >= 9 ? '#666' : '#4CAF50',
                                        fontSize: '18px',
                                        cursor: children >= 9 ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 0,
                                        lineHeight: 1
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #333' }}>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            style={{
                                width: '100%',
                                padding: '8px',
                                backgroundColor: '#4CAF50',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '600',
                                cursor: 'pointer'
                            }}
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PassengerSelector;
