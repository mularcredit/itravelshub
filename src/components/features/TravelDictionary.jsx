'use client';

import React, { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import {
  Building2, Plane, Sparkles, Star, Gem, Crown, MapPin, Zap,
  HeartPulse, Waves, Landmark, Home, Compass, Info,
  Briefcase, ShieldCheck, Globe, Clock, ConciergeBell, ShoppingBag, CreditCard,
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const TravelDictionary = () => {
  const [activeTab, setActiveTab] = useState('stays');

  const stayTiers = [
    { title: 'Deluxe Room', label: 'Elegance', desc: 'Enhanced space with premium furnishings and balcony views.', icon: <Star size={16} /> },
    { title: 'Junior Suite', label: 'Space', desc: 'Separate sitting area with designer touches and luxury bath.', icon: <Gem size={16} /> },
    { title: 'Executive', label: 'VIP', desc: 'High-floor access with dedicated business lounge privileges.', icon: <Building2 size={16} /> },
    { title: 'Presidential', label: 'Mastery', desc: 'Total privacy with expansive, curated living and dining spaces.', icon: <Crown size={16} /> },
    { title: 'Wellness', label: 'Renewal', desc: 'Stays focused on holistic health, spa, and mental clarity.', icon: <HeartPulse size={16} /> },
    { title: 'Overwater', label: 'Iconic', desc: 'Villas situated directly over crystal waters with floor glass.', icon: <Waves size={16} /> },
    { title: 'Heritage', label: 'Historic', desc: 'Palaces restored to modern luxury standards and character.', icon: <Landmark size={16} /> },
    { title: 'Private Villa', label: 'Estate', desc: 'Multi-bedroom homes with dedicated staff and private pool.', icon: <Home size={16} /> },
  ];

  const aeroTiers = [
    { title: 'Premium Eco', label: 'Comfort', desc: 'Upgraded seating with extra legroom and priority boarding.', icon: <MapPin size={16} /> },
    { title: 'Business', label: 'Elite', desc: 'Lie-flat comfort, gourmet dining suites, and lounge access.', icon: <Zap size={16} /> },
    { title: 'First Class', label: 'Sovereign', desc: 'Individual cabins with unparalleled privacy and chef service.', icon: <Sparkles size={16} /> },
    { title: 'Private Jet', label: 'Bespoke', desc: 'Confidential, on-demand travel tailored to your schedule.', icon: <Plane size={16} /> },
    { title: 'Empty Leg', label: 'Smart', desc: 'Private jet repositioning flights at a fraction of the cost.', icon: <Compass size={16} /> },
    { title: 'Multi-City', label: 'Global', desc: 'Complex itineraries covering multiple global destinations.', icon: <Globe size={16} /> },
    { title: 'Sky-Couch', label: 'Shared', desc: 'Economy rows that convert into a shared flat-bed space.', icon: <Waves size={16} /> },
    { title: 'Stopover', label: 'Bonus', desc: 'Complimentary luxury hotel stays during long layovers.', icon: <Clock size={16} /> },
  ];

  const conceptTiers = [
    { title: 'Lounge Access', label: 'Sanctuary', desc: 'Exclusive airport zones with premium dining and relaxation.', icon: <Briefcase size={16} /> },
    { title: 'VIP Fast-Track', label: 'Speed', desc: 'Accelerated security and immigration clearance globally.', icon: <Zap size={16} /> },
    { title: 'Luggage Hub', label: 'Ease', desc: 'Door-to-destination handling and secure delivery.', icon: <Briefcase size={16} /> },
    { title: 'Visa Support', label: 'Expert', desc: 'Assistance with global entry and documentation requirements.', icon: <ShieldCheck size={16} /> },
    { title: 'Jet Lag Sync', label: 'Recover', desc: 'Specialized amenities to align your internal body clock.', icon: <HeartPulse size={16} /> },
    { title: 'Butler Service', label: 'Service', desc: '24/7 assistant for all on-property and local travel needs.', icon: <ConciergeBell size={16} /> },
    { title: 'Retail Elite', label: 'Luxury', desc: 'Pre-ordered luxury goods delivered directly directly to your gate.', icon: <ShoppingBag size={16} /> },
    { title: 'Secure Cover', label: 'Secure', desc: 'Comprehensive protection for any travel contingency.', icon: <CreditCard size={16} /> },
  ];

  const swiperSettings = useMemo(() => ({
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.lex-next',
      prevEl: '.lex-prev',
    },
    pagination: {
      clickable: true,
      el: '.lex-pagination',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      992: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    }
  }), []);

  const renderSwiper = (items, colorClass) => (
    <div className="swiper-container-relative">
      <Swiper {...swiperSettings} className="lex-swiper">
        {items.map((tier, idx) => (
          <SwiperSlide key={idx}>
            <div className={`classy-lex-card ${colorClass}`}>
              <div className="card-top">
                <div className="card-icon">{tier.icon}</div>
                <span className="card-tag">{tier.label}</span>
              </div>
              <h4 className="card-title">{tier.title}</h4>
              <p className="card-desc">{tier.desc}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="nav-controls">
        <button className="lex-btn lex-prev"><ChevronLeft size={18} /></button>
        <div className="lex-pagination"></div>
        <button className="lex-btn lex-next"><ChevronRight size={18} /></button>
      </div>
    </div>
  );

  return (
    <section className="amazing-lexicon-section">
      <div className="animated-bg"></div>

      <div className="lexicon-container">
        <div className="lexicon-header">
          <div className="header-text">
            <span className="subtitle">Global Registry</span>
            <h2 className="main-title">Smart <span className="serif-italic">Lexicon</span></h2>
          </div>

          <div className="lex-tab-switcher">
            <button
              className={`lex-tab ${activeTab === 'stays' ? 'active emerald' : ''}`}
              onClick={() => setActiveTab('stays')}
            >
              <Building2 size={14} /> Stays
            </button>
            <button
              className={`lex-tab ${activeTab === 'aero' ? 'active sky' : ''}`}
              onClick={() => setActiveTab('aero')}
            >
              <Plane size={14} /> Aviation
            </button>
            <button
              className={`lex-tab ${activeTab === 'concepts' ? 'active violet' : ''}`}
              onClick={() => setActiveTab('concepts')}
            >
              <Info size={14} /> Concepts
            </button>
          </div>
        </div>

        <div className="tabs-viewport">
          <div className={`tab-content ${activeTab === 'stays' ? 'active' : ''}`}>
            {activeTab === 'stays' && renderSwiper(stayTiers, 'emerald')}
          </div>
          <div className={`tab-content ${activeTab === 'aero' ? 'active' : ''}`}>
            {activeTab === 'aero' && renderSwiper(aeroTiers, 'sky')}
          </div>
          <div className={`tab-content ${activeTab === 'concepts' ? 'active' : ''}`}>
            {activeTab === 'concepts' && renderSwiper(conceptTiers, 'violet')}
          </div>
        </div>
      </div>

      <style jsx global>{`
                .amazing-lexicon-section {
                    background-color: #05070a;
                    padding: 80px 0;
                    position: relative;
                    overflow: hidden;
                    color: white;
                }

                .animated-bg {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 50% 50%, #0c1220 0%, #05070a 100%);
                    z-index: 1;
                }

                .animated-bg::after {
                    content: '';
                    position: absolute;
                    width: 200%;
                    height: 200%;
                    top: -50%;
                    left: -50%;
                    background-image: 
                        radial-gradient(circle at 10% 10%, rgba(16, 185, 129, 0.05) 0%, transparent 20%),
                        radial-gradient(circle at 90% 90%, rgba(139, 92, 246, 0.05) 0%, transparent 20%);
                    animation: drift 40s linear infinite;
                    opacity: 0.8;
                }

                @keyframes drift {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .lexicon-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    position: relative;
                    z-index: 10;
                }

                .lexicon-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    margin-bottom: 50px;
                    gap: 30px;
                }

                .subtitle {
                    display: block;
                    text-transform: uppercase;
                    letter-spacing: 0.5em;
                    font-size: 10px;
                    font-weight: 950;
                    color: rgba(255, 255, 255, 0.3);
                    margin-bottom: 8px;
                }

                .main-title {
                    font-size: 42px;
                    font-weight: 800;
                    letter-spacing: -0.02em;
                    margin: 0;
                }

                .serif-italic {
                    font-family: serif;
                    font-style: italic;
                    font-weight: 400;
                    opacity: 0.9;
                }

                .lex-tab-switcher {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 6px;
                    border-radius: 16px;
                    display: flex;
                    gap: 6px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                }

                .lex-tab {
                    padding: 10px 20px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 700;
                    color: rgba(255, 255, 255, 0.4);
                    transition: all 0.4s ease;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                }

                .lex-tab:hover { color: white; background: rgba(255, 255, 255, 0.05); }
                .lex-tab.active { color: white; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4); }
                .lex-tab.active.emerald { background: #10b981; }
                .lex-tab.active.sky { background: #0ea5e9; }
                .lex-tab.active.violet { background: #8b5cf6; }

                .tabs-viewport { position: relative; min-height: 280px; }
                .amazing-lexicon-section .tab-content { display: none; }
                .amazing-lexicon-section .tab-content.active { display: block; animation: fadeInScale 0.6s ease-out; }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.98) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                .classy-lex-card {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 32px;
                    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .classy-lex-card:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                }

                .card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
                .card-icon { 
                    width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; 
                    background: rgba(255, 255, 255, 0.04); border-radius: 12px; 
                }
                .emerald .card-icon { color: #10b981; }
                .sky .card-icon { color: #0ea5e9; }
                .violet .card-icon { color: #a78bfa; }

                .card-tag {
                    font-size: 8px; text-transform: uppercase; letter-spacing: 0.15em; font-weight: 800;
                    color: rgba(255, 255, 255, 0.3); padding: 4px 10px; background: rgba(255, 255, 255, 0.05); border-radius: 6px;
                }

                .card-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; color: white; }
                .card-desc { font-size: 13px; color: rgba(255, 255, 255, 0.4); line-height: 1.6; }

                .nav-controls {
                    display: flex; align-items: center; justify-content: center; gap: 24px; margin-top: 40px;
                }

                .lex-btn {
                    width: 44px; height: 44px; border-radius: 50%; background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05); color: white; display: flex; align-items: center;
                    justify-content: center; cursor: pointer; transition: all 0.3s;
                }
                .lex-btn:hover { background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.12); }
                
                .lex-pagination { display: flex; gap: 8px; }
                .swiper-pagination-bullet { background: rgba(255, 255, 255, 0.1) !important; width: 6px; height: 6px; }
                .swiper-pagination-bullet-active { background: white !important; width: 24px; border-radius: 3px; }

                @media (max-width: 992px) {
                    .lexicon-header { flex-direction: column; align-items: center; text-align: center; }
                    .main-title { font-size: 32px; }
                }
            `}</style>
    </section>
  );
};

export default TravelDictionary;
