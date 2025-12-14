'use client';
import React, { useState, useRef, useEffect } from 'react';
import { searchAirports } from '@/data/airports';

const AirportAutocomplete = ({ name, placeholder, label, required = true, defaultValue = '' }) => {
    const [inputValue, setInputValue] = useState(defaultValue);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedCode, setSelectedCode] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setSelectedCode('');
        setHighlightedIndex(-1);

        if (value.length >= 1) {
            const results = searchAirports(value);
            setSuggestions(results);
            setShowSuggestions(results.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelectAirport = (airport) => {
        setInputValue(`${airport.city}, ${airport.country} (${airport.code})`);
        setSelectedCode(airport.code);
        setShowSuggestions(false);
        setHighlightedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => prev < suggestions.length - 1 ? prev + 1 : prev);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        } else if (e.key === 'Enter' && highlightedIndex >= 0) {
            e.preventDefault();
            handleSelectAirport(suggestions[highlightedIndex]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
            setHighlightedIndex(-1);
        }
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
            <div className="searchbox-input">
                <label>{label}</label>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (inputValue.length >= 1) {
                            const results = searchAirports(inputValue);
                            setSuggestions(results);
                            setShowSuggestions(results.length > 0);
                        }
                    }}
                    placeholder={placeholder}
                    required={required}
                    autoComplete="off"
                    style={{
                        color: 'var(--white-color)',
                        backgroundColor: 'transparent',
                        border: 'none',
                        width: '100%',
                        fontSize: '16px',
                        fontWeight: '500',
                        outline: 'none'
                    }}
                />
                <input
                    type="hidden"
                    name={name}
                    value={selectedCode || inputValue.split('(')[1]?.split(')')[0] || inputValue.split(' ')[0] || inputValue}
                />
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div className="airport-dropdown" style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    width: '350px', // Increased width
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #444',
                    borderRadius: '12px',
                    marginTop: '8px',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    zIndex: 10000,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
                }}>
                    {suggestions.map((airport, index) => (
                        <div
                            key={`${airport.code}-${index}`}
                            onClick={() => handleSelectAirport(airport)}
                            style={{
                                padding: '12px 16px',
                                cursor: 'pointer',
                                borderBottom: index < suggestions.length - 1 ? '1px solid #333' : 'none',
                                transition: 'background-color 0.2s',
                                backgroundColor: highlightedIndex === index ? '#2a2a2a' : 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                            onMouseLeave={(e) => {
                                if (highlightedIndex !== index) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <div>
                                <div style={{ marginBottom: '4px' }}>
                                    <span style={{
                                        color: '#4CAF50',
                                        fontWeight: '700',
                                        fontSize: '14px',
                                        marginRight: '8px'
                                    }}>
                                        {airport.code}
                                    </span>
                                    <span style={{ color: '#fff', fontWeight: '600', fontSize: '14px' }}>
                                        {airport.city}
                                    </span>
                                </div>
                                <div style={{
                                    color: '#999',
                                    fontSize: '12px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <span>{airport.name}</span>
                                    <span style={{ color: '#666' }}>{airport.country}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AirportAutocomplete;
