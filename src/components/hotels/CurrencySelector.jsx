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
        <div className="currency-selector-wrapper" ref={dropdownRef} style={{ position: 'relative', zIndex: 1001 }}>
            <button
                className="currency-selector-button"
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.transform = 'translateY(0)';
                }}
            >
                <Globe className="currency-icon" />
                <span className="currency-code">{selectedCurrency.code}</span>
                <ChevronDown className="chevron-icon" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
            </button>

            {isOpen && (
                <div className="currency-dropdown">
                    <div className="dropdown-header">
                        Select Currency
                    </div>
                    {currencies.map((c) => (
                        <div
                            key={c.code}
                            className={`currency-option ${currency === c.code ? 'active' : ''}`}
                            onClick={() => {
                                setCurrency(c.code);
                                setIsOpen(false);
                            }}
                            onMouseEnter={(e) => {
                                if (currency !== c.code) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                if (currency !== c.code) e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            <div className="currency-info">
                                <span className="currency-symbol">{c.symbol}</span>
                                <span className="currency-name">{c.name}</span>
                            </div>
                            {currency === c.code && <Check size={14} color="#34d399" />}
                        </div>
                    ))}
                </div>
            )}
            <style jsx>{`
                .currency-selector-wrapper {
                    position: relative;
                    z-index: 1001;
                }

                .currency-selector-button {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 12px;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50px;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    white-space: nowrap;
                }

                .currency-icon {
                    width: 14px;
                    height: 14px;
                    flex-shrink: 0;
                }

                .currency-code {
                    font-size: 12px;
                }

                .chevron-icon {
                    width: 12px;
                    height: 12px;
                    flex-shrink: 0;
                }

                .currency-dropdown {
                    position: absolute;
                    top: calc(100% + 8px);
                    right: 0;
                    width: 200px;
                    max-width: calc(100vw - 32px);
                    background: rgba(20, 20, 20, 0.95);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 6px;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                    overflow: hidden;
                    animation: fadeIn 0.2s ease-out;
                }

                .dropdown-header {
                    padding: 6px 10px;
                    font-size: 10px;
                    color: rgba(255,255,255,0.5);
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .currency-option {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 8px 10px;
                    border-radius: 6px;
                    cursor: pointer;
                    color: rgba(255,255,255,0.8);
                    background: transparent;
                    transition: background 0.2s;
                    margin-bottom: 2px;
                    min-height: 40px;
                }

                .currency-option.active {
                    color: #fff;
                    background: rgba(255,255,255,0.1);
                }

                .currency-info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .currency-symbol {
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.1);
                    font-size: 10px;
                    font-weight: bold;
                    font-family: monospace;
                    flex-shrink: 0;
                }

                .currency-name {
                    font-size: 13px;
                    font-weight: 500;
                }

                /* Tablet and above */
                @media (min-width: 768px) {
                    .currency-selector-button {
                        gap: 8px;
                        padding: 8px 16px;
                        font-size: 14px;
                    }

                    .currency-icon {
                        width: 16px;
                        height: 16px;
                    }

                    .currency-code {
                        font-size: 14px;
                    }

                    .chevron-icon {
                        width: 14px;
                        height: 14px;
                    }

                    .currency-dropdown {
                        width: 240px;
                        border-radius: 16px;
                        padding: 8px;
                    }

                    .dropdown-header {
                        padding: 8px 12px;
                        font-size: 11px;
                    }

                    .currency-option {
                        padding: 10px 12px;
                        border-radius: 8px;
                    }

                    .currency-symbol {
                        width: 24px;
                        height: 24px;
                        font-size: 12px;
                    }

                    .currency-info {
                        gap: 10px;
                    }

                    .currency-name {
                        font-size: 14px;
                    }
                }

                /* Small mobile optimization */
                @media (max-width: 375px) {
                    .currency-selector-button {
                        padding: 5px 10px;
                        gap: 4px;
                    }

                    .currency-code {
                        font-size: 11px;
                    }

                    .currency-dropdown {
                        width: 180px;
                    }

                    .currency-name {
                        font-size: 12px;
                    }
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
