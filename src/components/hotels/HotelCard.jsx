'use client';

import { Leaf, Wine, Briefcase, Heart, Home, Gem } from 'lucide-react';
import { useCurrency } from './CurrencyContext';

const vibeIcons = {
    'Relaxation': Leaf,
    'Social': Wine,
    'Work': Briefcase,
    'Romantic': Heart,
    'Family': Home,
    'Hidden Gem': Gem
};

export default function HotelCard({ hotel, onSelect }) {
    const { format } = useCurrency();

    return (
        <div
            onClick={() => onSelect(hotel)}
            className="card h-100 border-0 shadow-sm"
            style={{ cursor: 'pointer', transition: 'transform 0.3s, box-shadow 0.3s' }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
            }}
        >
            <div className="position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                {hotel.image ? (
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="card-img-top"
                        style={{ height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 bg-light text-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                <div className="position-absolute top-0 end-0 m-2">
                    {hotel.rating === 'N/A' ? (
                        <span className="badge bg-white text-secondary fw-bold border" style={{ fontSize: '0.75rem' }}>
                            No reviews
                        </span>
                    ) : (
                        <span className="badge bg-white text-success fw-bold border border-success" style={{ fontSize: '0.75rem' }}>
                            {hotel.rating} ★
                        </span>
                    )}
                </div>
            </div>

            <div className="card-body">
                <h5 className="card-title fw-bold mb-2" style={{ minHeight: '3rem', lineHeight: '1.5rem' }}>
                    {hotel.name}
                </h5>

                {/* Vibe Tags */}
                <div className="d-flex flex-wrap gap-1 mb-3" style={{ minHeight: '1.5rem' }}>
                    {hotel.vibes?.slice(0, 2).map((vibe, i) => {
                        const Icon = vibeIcons[vibe] || Gem;
                        return (
                            <span key={i} className="badge bg-success bg-opacity-10 text-success border border-success d-inline-flex align-items-center gap-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                                <Icon style={{ width: '12px', height: '12px' }} strokeWidth={2} />
                                {vibe}
                            </span>
                        );
                    })}
                </div>

                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <div>
                        <small className="text-muted text-uppercase d-block" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>Price per night</small>
                        {/\d/.test(hotel.price) ? (
                            <span className="fs-4 fw-bold text-success">
                                {format(hotel.price)}
                            </span>
                        ) : (
                            <span className="small text-muted fst-italic">{hotel.price}</span>
                        )}
                    </div>

                    <a
                        href={`https://duckduckgo.com/?q=!ducky+${encodeURIComponent(hotel.name + " official website")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="btn btn-success btn-sm"
                    >
                        View Deal
                    </a>
                </div>
            </div>
        </div>
    );
}
