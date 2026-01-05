'use client';

import { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, MapPin, Calendar, Users } from 'lucide-react';
import { useCurrency } from './CurrencyContext';

import ReactDOM from 'react-dom';
import HotelBookingForm from '../booking/HotelBookingForm';

export default function HotelDetailsModal({ hotel, isOpen, onClose }) {
    const currencyContext = useCurrency();
    const format = currencyContext?.format || ((p) => p);
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showBooking, setShowBooking] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEscape);
        }
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        console.log('HotelDetailsModal: isOpen changed', isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size, 0px)'; // Prevent shift
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            console.log('HotelDetailsModal: Resetting view and fetching details for', hotel?.name);
            setShowBooking(false); // Reset to details view on open
            setDetails(null); // Clear previous details

            if (hotel?.link) {
                setIsLoading(true);
                fetch('/api/hotels/details', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: hotel.link })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('HotelDetailsModal: Details fetched successfully');
                        setDetails(data);
                        setIsLoading(false);
                    })
                    .catch(err => {
                        console.error('HotelDetailsModal: Error fetching details:', err);
                        setIsLoading(false);
                    });
            } else {
                setIsLoading(false); // No link to fetch, show basic data immediately
            }
        }
    }, [isOpen, hotel]);

    if (!mounted || !isOpen || !hotel) {
        if (isOpen && !mounted) console.log('HotelDetailsModal: Waiting for mount...');
        return null;
    }

    console.log('HotelDetailsModal: Rendering', { showBooking, isLoading, hasDetails: !!details });

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 200000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        opacity: isOpen ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
    };

    const containerStyle = {
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        borderRadius: '24px',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'modalEntrance 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
    };

    const modalContent = (
        <div style={overlayStyle} onClick={onClose}>
            <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: '#ffffff',
                    borderBottom: '1px solid #f3f4f6',
                    padding: '24px 32px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 20
                }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '800',
                            color: '#111827',
                            margin: 0,
                            fontFamily: 'plus-jakarta-sans, sans-serif'
                        }}>
                            {showBooking ? 'Complete Your Booking' : hotel.name}
                        </h2>
                        {!showBooking && (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                                {hotel.rating !== 'N/A' && (
                                    <span style={{
                                        padding: '4px 12px',
                                        backgroundColor: '#ecfdf5',
                                        color: '#059669',
                                        borderRadius: '100px',
                                        fontSize: '12px',
                                        fontWeight: '700'
                                    }}>
                                        {hotel.rating} ★ Rating
                                    </span>
                                )}
                                <span style={{ fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={14} /> {hotel.location || 'Top Location'}
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: '#f9fafb',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                            color: '#6b7280'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; e.currentTarget.style.color = '#111827'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; e.currentTarget.style.color = '#6b7280'; }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div style={{ padding: '32px', flex: 1 }}>
                    {showBooking ? (
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <HotelBookingForm
                                hotel={hotel}
                                onCancel={() => setShowBooking(false)}
                                onSuccess={(result) => {
                                    console.log('HotelDetailsModal: Booking success');
                                }}
                            />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            {isLoading ? (
                                <div style={{ padding: '80px 0', textAlign: 'center' }}>
                                    <div className="flex space-x-2 justify-center">
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce"></div>
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-4 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                    <p style={{ marginTop: '16px', color: '#6b7280', fontWeight: '500' }}>Discovering hotel details...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Gallery Grid or Single Image Fallback */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: (details?.images && details.images.length > 1) ? 'repeat(4, 1fr)' : '1fr',
                                        gridTemplateRows: (details?.images && details.images.length > 1) ? 'repeat(2, 180px)' : '400px',
                                        gap: '12px'
                                    }}>
                                        {details?.images && details.images.length > 1 ? (
                                            <>
                                                <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
                                                    <img src={details.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                                </div>
                                                {details.images.slice(1, 4).map((img, i) => (
                                                    <div key={i} style={{ gridColumn: i === 2 ? 'span 2' : 'span 1' }}>
                                                        <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                                    </div>
                                                ))}
                                            </>
                                        ) : (
                                            <div style={{ gridColumn: 'span 4' }}>
                                                <img
                                                    src={details?.images?.[0] || hotel.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000'}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }}
                                                    alt={hotel.name}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Description & Specs */}
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                            <section>
                                                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>Description</h3>
                                                <p style={{ color: '#4b5563', lineHeight: '1.7', margin: 0 }}>
                                                    {details?.description || hotel.description}
                                                </p>
                                            </section>

                                            {details?.amenities && (
                                                <section>
                                                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>What this place offers</h3>
                                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                                                        {details.amenities.slice(0, 8).map((am, i) => (
                                                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#4b5563', fontSize: '14px' }}>
                                                                <Check size={16} color="#059669" /> {am}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </section>
                                            )}
                                        </div>

                                        <div style={{
                                            backgroundColor: '#f9fafb',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1px solid #f3f4f6',
                                            height: 'fit-content'
                                        }}>
                                            <div style={{ marginBottom: '20px' }}>
                                                <div style={{ fontSize: '14px', color: '#6b7280' }}>Price starting from</div>
                                                <div style={{ fontSize: '28px', fontWeight: '800', color: '#111827' }}>
                                                    {hotel.price ? format(hotel.price).replace('USD', '').trim() : 'N/A'}
                                                </div>
                                                <div style={{ fontSize: '12px', color: '#9ca3af' }}>per night (taxes included)</div>
                                            </div>

                                            <button
                                                onClick={() => setShowBooking(true)}
                                                style={{
                                                    width: '100%',
                                                    padding: '16px',
                                                    backgroundColor: '#10b981',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    fontWeight: '700',
                                                    cursor: 'pointer',
                                                    transition: 'transform 0.2s',
                                                    boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                Reserve Now
                                            </button>

                                            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#4b5563' }}>
                                                    <Calendar size={16} /> Instant Confirmation
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: '#4b5563' }}>
                                                    <AlertTriangle size={16} /> Best Price Guaranteed
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Truth Lens Integrated */}
                                    {details?.truthLens && (
                                        <div style={{
                                            background: 'linear-gradient(to bottom right, #f0fdf4, #eff6ff)',
                                            padding: '24px',
                                            borderRadius: '20px',
                                            border: '1px solid #d1fae5'
                                        }}>
                                            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#064e3b', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                🔍 Triprex Truth Lens™
                                            </h3>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#065f46', marginBottom: '8px' }}>Pros</div>
                                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '14px', color: '#065f46' }}>
                                                        {details.truthLens.pros.map((p, i) => <li key={i} style={{ marginBottom: '4px' }}>✓ {p}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#9a3412', marginBottom: '8px' }}>Watch Out For</div>
                                                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: '14px', color: '#9a3412' }}>
                                                        {details.truthLens.cons.map((c, i) => <li key={i} style={{ marginBottom: '4px' }}>⚠ {c}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes modalEntrance {
                        from { opacity: 0; transform: translateY(20px) scale(0.98); }
                        to { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @media (max-width: 768px) {
                        div[style*="gridTemplateColumns: 2fr 1fr"] {
                            grid-template-columns: 1fr !important;
                        }
                        div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
                            grid-template-columns: repeat(2, 1fr) !important;
                            grid-template-rows: repeat(3, 150px) !important;
                        }
                    }
                `}} />
            </div>
        </div>
    );

    try {
        return ReactDOM.createPortal(modalContent, document.body);
    } catch (e) {
        console.error('HotelDetailsModal: Portal rendering failed', e);
        return null;
    }
}
