'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const RATES = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.78,
    JPY: 145.0,
    CAD: 1.35,
    AUD: 1.52,
    KES: 132.0
};

const SYMBOLS = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    CAD: 'C$',
    AUD: 'A$',
    KES: 'KSh'
};

const CurrencyContext = createContext(undefined);

export function CurrencyProvider({ children }) {
    const [currency, setCurrency] = useState('USD');

    useEffect(() => {
        // Smart Detection Logic
        const detectCurrency = () => {
            try {
                const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const locale = navigator.language;

                if (zone.includes('London') || locale === 'en-GB') {
                    setCurrency('GBP');
                } else if (zone.includes('Europe') || zone.includes('Paris') || zone.includes('Berlin')) {
                    setCurrency('EUR');
                } else if (zone.includes('Tokyo') || locale === 'ja-JP') {
                    setCurrency('JPY');
                } else if (zone.includes('Sydney') || zone.includes('Australia') || locale === 'en-AU') {
                    setCurrency('AUD');
                } else if (zone.includes('Toronto') || zone.includes('Vancouver') || locale === 'en-CA') {
                    setCurrency('CAD');
                } else if (zone.includes('Nairobi') || locale === 'sw-KE' || locale === 'en-KE') {
                    setCurrency('KES');
                }
                // Default remains USD
            } catch (e) {
                console.warn('Currency detection failed, defaulting to USD');
            }
        };

        detectCurrency();
    }, []);

    const convert = (amount) => {
        return amount * RATES[currency];
    };

    const format = (priceStr) => {
        // Strip non-numeric chars from string input
        const num = typeof priceStr === 'string'
            ? parseFloat(priceStr.replace(/[^0-9.]/g, ''))
            : priceStr;

        if (isNaN(num)) return typeof priceStr === 'string' ? priceStr : `${num}`;

        const converted = convert(num);

        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(converted);
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convert, format }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
    return context;
}
