'use client';

import { useState, useEffect } from 'react';
import { X, Check, AlertTriangle, MapPin, Calendar, Users } from 'lucide-react';
import { useCurrency } from './CurrencyContext';

export default function HotelDetailsModal({ hotel, isOpen, onClose }) {
    const { format } = useCurrency();
    const [details, setDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && hotel?.link) {
            setIsLoading(true);
            fetch('/api/hotels/details', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: hotel.link })
            })
                .then(res => res.json())
                .then(data => {
                    setDetails(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error('Error fetching details:', err);
                    setIsLoading(false);
                });
        }
    }, [isOpen, hotel]);

    if (!isOpen || !hotel) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>
                            {hotel.name}
                        </h2>
                        {hotel.rating !== 'N/A' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold text-emerald-600 bg-emerald-50">
                                {hotel.rating} ★ Rating
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6 text-gray-500" strokeWidth={2} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                        </div>
                    ) : details ? (
                        <>
                            {/* Images */}
                            {details.images && details.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-2">
                                    {details.images.slice(0, 4).map((img, idx) => (
                                        <img key={idx} src={img} alt={`Image ${idx + 1}`} className="w-full h-48 object-cover rounded-lg" />
                                    ))}
                                </div>
                            )}

                            {/* Description */}
                            {details.description && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>Description</h3>
                                    <p className="text-gray-700 leading-relaxed">{details.description}</p>
                                </div>
                            )}

                            {/* Truth Lens */}
                            {details.truthLens && (
                                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-6 border border-emerald-200">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>
                                        <span className="text-emerald-600">🔍</span> Truth Lens™
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="font-semibold text-emerald-700 mb-2 flex items-center gap-1">
                                                <Check className="h-4 w-4" /> Pros
                                            </h4>
                                            <ul className="space-y-1">
                                                {details.truthLens.pros.map((pro, idx) => (
                                                    <li key={idx} className="text-sm text-gray-700">✓ {pro}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-orange-700 mb-2 flex items-center gap-1">
                                                <AlertTriangle className="h-4 w-4" /> Cons
                                            </h4>
                                            <ul className="space-y-1">
                                                {details.truthLens.cons.map((con, idx) => (
                                                    <li key={idx} className="text-sm text-gray-700">⚠ {con}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Amenities */}
                            {details.amenities && details.amenities.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>Amenities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        {details.amenities.map((amenity, idx) => (
                                            <span key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                                                <Check className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Rooms */}
                            {details.rooms && details.rooms.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>Room Types</h3>
                                    <div className="space-y-2">
                                        {details.rooms.map((room, idx) => (
                                            <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                                <span className="text-sm font-medium text-gray-900">{room}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* House Rules */}
                            {details.houseRules && (details.houseRules.checkIn || details.houseRules.checkOut) && (
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}>House Rules</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {details.houseRules.checkIn && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="text-xs text-gray-500">Check-in</div>
                                                    <div className="text-sm font-medium text-gray-900">{details.houseRules.checkIn}</div>
                                                </div>
                                            </div>
                                        )}
                                        {details.houseRules.checkOut && (
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="text-xs text-gray-500">Check-out</div>
                                                    <div className="text-sm font-medium text-gray-900">{details.houseRules.checkOut}</div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Unable to load hotel details</p>
                        </div>
                    )}

                    {/* Booking Link */}
                    <div className="pt-4 border-t border-gray-200">
                        <a
                            href={hotel.link ? `https://booking.com${hotel.link}` : `https://duckduckgo.com/?q=!ducky+${encodeURIComponent(hotel.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center px-6 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg transition-colors"
                            style={{ fontFamily: 'var(--font-plus-jakarta-sans), sans-serif' }}
                        >
                            Book Now on Booking.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
