'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from './CurrencyContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh' }
];

export default function CurrencySelector() {
    const { currency, setCurrency } = useCurrency();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedCurrency = currencies.find(c => c.code === currency) || currencies[0];

    return (
        <div className="currency-selector" ref={dropdownRef} style={{ position: 'relative', zIndex: 1001 }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                <Globe size={16} />
                <span>{selectedCurrency.code}</span>
                <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '240px',
                    background: 'rgba(20, 20, 20, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '8px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <div style={{ padding: '8px 12px', fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Select Currency
                    </div>
                    {currencies.map((c) => (
                        <div
                            key={c.code}
                            onClick={() => {
                                setCurrency(c.code);
                                setIsOpen(false);
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '10px 12px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                color: currency === c.code ? '#fff' : 'rgba(255,255,255,0.8)',
                                background: currency === c.code ? 'rgba(255,255,255,0.1)' : 'transparent',
                                transition: 'background 0.2s',
                                marginBottom: '2px'
                            }}
                            onMouseEnter={(e) => {
                                if (currency !== c.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (currency !== c.code) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: 'rgba(255,255,255,0.1)',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    fontFamily: 'monospace'
                                }}>{c.symbol}</span>
                                <span style={{ fontSize: '14px', fontWeight: '500' }}>{c.name}</span>
                            </div>
                            {currency === c.code && <Check size={14} color="#34d399" />}
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
