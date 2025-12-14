'use client';

import React, { useState, useRef, useEffect } from 'react';

const GuestSelector = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
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

    const updateGuests = (type, delta) => {
        setGuests(prev => {
            const newValue = Math.max(type === 'children' ? 0 : 1, prev[type] + delta);
            return { ...prev, [type]: newValue };
        });
    };

    const totalGuests = guests.adults + guests.children;

    const renderRow = (label, subLabel, type, value) => {
        const canDecrement = type === 'children' ? value > 0 : value > 1;
        // Limit max for sanity (e.g. 9)
        const canIncrement = value < 9;

        return (
            <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>{label}</div>
                        {subLabel && <div style={{ color: '#999', fontSize: '12px' }}>{subLabel}</div>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                            type="button"
                            onClick={() => updateGuests(type, -1)}
                            disabled={!canDecrement}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid #4CAF50',
                                backgroundColor: !canDecrement ? '#333' : 'transparent',
                                color: !canDecrement ? '#666' : '#4CAF50',
                                fontSize: '18px',
                                cursor: !canDecrement ? 'not-allowed' : 'pointer',
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
                            {value}
                        </span>
                        <button
                            type="button"
                            onClick={() => updateGuests(type, 1)}
                            disabled={!canIncrement}
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid #4CAF50',
                                backgroundColor: !canIncrement ? '#333' : 'transparent',
                                color: !canIncrement ? '#666' : '#4CAF50',
                                fontSize: '18px',
                                cursor: !canIncrement ? 'not-allowed' : 'pointer',
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
        );
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div className="searchbox-input">
                <label>Guests & Rooms</label>
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
                        padding: '4px 0',
                        userSelect: 'none'
                    }}
                >
                    {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {guests.rooms} Room{guests.rooms !== 1 ? 's' : ''}
                </div>

                {/* Hidden inputs for form submission */}
                <input type="hidden" name="adults" value={guests.adults} />
                <input type="hidden" name="children" value={guests.children} />
                <input type="hidden" name="rooms" value={guests.rooms} />
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
                    {renderRow('Adults', 'Ages 13 or above', 'adults', guests.adults)}
                    {renderRow('Children', 'Ages 0-12', 'children', guests.children)}
                    {/* Render Rooms without margin bottom for cleaner look on last item, or generic is fine */}
                    {renderRow('Rooms', null, 'rooms', guests.rooms)}

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

export default GuestSelector;
