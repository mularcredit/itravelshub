'use client';

import React from 'react';
import {
  ShieldCheck, Zap, Globe, CreditCard, ArrowUpRight,
  Wallet, TrendingUp, DollarSign, Gem, Star
} from 'lucide-react';

const DigitalPaymentSection = () => {
  return (
    <section className="concierge-payment-section">
      <div className="payment-animated-bg"></div>

      <div className="payment-container">
        <div className="row align-items-center">
          {/* Left: Premium Content */}
          <div className="col-lg-6">
            <div className="payment-content-stack">
              <span className="premium-tag">Concierge Payments</span>
              <h2 className="payment-title">
                Secure Your <span className="serif-italic">Legacy</span>
                <br />With One <span className="underline-emerald">Touch</span>
              </h2>
              <p className="payment-desc">
                Experience a world of frictionless travel finance. From automated
                multi-currency settling to bank-level encrypted vaulting,
                we ensure your journey is as secure as it is seamless.
              </p>

              <div className="benefit-grid">
                <div className="benefit-item">
                  <div className="benefit-icon emerald"><ShieldCheck size={18} /></div>
                  <div className="benefit-text">
                    <h6>Elite Security</h6>
                    <span>Bio-encrypted transactions.</span>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon sky"><Zap size={18} /></div>
                  <div className="benefit-text">
                    <h6>Instant Settlement</h6>
                    <span>Real-time global bookings.</span>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon violet"><Globe size={18} /></div>
                  <div className="benefit-text">
                    <h6>Global Multi-Currency</h6>
                    <span>Pay in any local currency.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Concierge Wallet Dashboard */}
          <div className="col-lg-6">
            <div className="wallet-dashboard-wrapper">
              {/* Main Titanium Card */}
              <div className="titanium-card">
                <div className="card-top">
                  <div className="card-logo">
                    <Gem size={20} className="gem-icon" />
                    <span>ITRAVELS<span className="serif-italic">HUB</span></span>
                  </div>
                  <div className="card-chip"></div>
                </div>
                <div className="card-number">•••• •••• •••• 8888</div>
                <div className="card-bottom">
                  <div className="card-holder">
                    <span className="label">PREMIUM HOLDER</span>
                    <span className="val">VALUED CLIENT</span>
                  </div>
                  <div className="card-exp">
                    <span className="label">EXPIRES</span>
                    <span className="val">12/30</span>
                  </div>
                </div>
              </div>

              {/* Floating Balance Stats */}
              <div className="stat-card balance-stat floating-1">
                <div className="stat-icon emerald"><Wallet size={16} /></div>
                <div className="stat-info">
                  <span className="stat-label">Total Balance</span>
                  <span className="stat-val">$142,500.00</span>
                </div>
                <TrendingUp size={14} className="trend-arrow" />
              </div>

              {/* Recent Transactions List */}
              <div className="stat-card trans-stat floating-2">
                <h6 className="trans-header">Registry Activity</h6>
                <div className="trans-list">
                  <div className="trans-item">
                    <div className="trans-icon"><Star size={12} /></div>
                    <div className="trans-details">
                      <span>Presidential Stay</span>
                      <small>Settled via Vault</small>
                    </div>
                    <span className="trans-price">-$12,400</span>
                  </div>
                  <div className="trans-item">
                    <div className="trans-icon"><ArrowUpRight size={12} /></div>
                    <div className="trans-details">
                      <span>Private Charter</span>
                      <small>Verified Elite</small>
                    </div>
                    <span className="trans-price">-$45,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
                .concierge-payment-section {
                    background-color: #05070a;
                    padding: 120px 0;
                    position: relative;
                    overflow: hidden;
                    color: white;
                }

                .payment-animated-bg {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.04) 0%, transparent 40%),
                                radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.04) 0%, transparent 40%);
                    z-index: 1;
                }

                .payment-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                    position: relative;
                    z-index: 10;
                }

                .premium-tag {
                    display: inline-block;
                    text-transform: uppercase;
                    letter-spacing: 0.4em;
                    font-size: 10px;
                    font-weight: 900;
                    color: #10b981;
                    margin-bottom: 20px;
                }

                .payment-title {
                    font-size: 52px;
                    font-weight: 800;
                    line-height: 1.1;
                    margin-bottom: 30px;
                    letter-spacing: -0.02em;
                    color: white;
                }

                .serif-italic {
                    font-family: serif;
                    font-style: italic;
                    font-weight: 400;
                }

                .underline-emerald {
                    position: relative;
                    display: inline-block;
                }

                .underline-emerald::after {
                    content: '';
                    position: absolute;
                    bottom: 8px;
                    left: 0;
                    width: 100%;
                    height: 8px;
                    background: rgba(16, 185, 129, 0.2);
                    z-index: -1;
                }

                .payment-desc {
                    font-size: 17px;
                    line-height: 1.8;
                    color: rgba(255, 255, 255, 0.5);
                    max-width: 500px;
                    margin-bottom: 40px;
                }

                .benefit-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }

                .benefit-item {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                }

                .benefit-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }

                .benefit-icon.emerald { color: #10b981; }
                .benefit-icon.sky { color: #0ea5e9; }
                .benefit-icon.violet { color: #8b5cf6; }

                .benefit-text h6 { font-size: 14px; font-weight: 700; margin: 0 0 2px 0; }
                .benefit-text span { font-size: 12px; color: rgba(255, 255, 255, 0.4); }

                /* Wallet Dashboard Styles */
                .wallet-dashboard-wrapper {
                    position: relative;
                    height: 500px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .titanium-card {
                    width: 380px;
                    height: 230px;
                    background: linear-gradient(135deg, #111 0%, #222 100%);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
                    position: relative;
                    z-index: 5;
                    overflow: hidden;
                }

                .titanium-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.05) 50%, transparent 60%);
                    animation: cardGlow 6s infinite;
                }

                @keyframes cardGlow {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .card-top { display: flex; justify-content: space-between; align-items: center; }
                .card-logo { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 12px; letter-spacing: 1px; color: rgba(255, 255, 255, 0.8); }
                .gem-icon { color: #10b981; }
                .card-chip { width: 40px; height: 30px; background: rgba(255, 255, 255, 0.1); border-radius: 6px; }

                .card-number { font-size: 20px; letter-spacing: 4px; font-weight: 500; font-family: monospace; color: white; margin-top: 40px; }

                .card-bottom { display: flex; justify-content: space-between; align-items: flex-end; }
                .card-holder, .card-exp { display: flex; flex-direction: column; }
                .label { font-size: 8px; color: rgba(255, 255, 255, 0.3); letter-spacing: 1px; margin-bottom: 2px; }
                .val { font-size: 12px; font-weight: 700; color: white; }

                /* Floating Stats */
                .stat-card {
                    position: absolute;
                    background: rgba(15, 23, 42, 0.8);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 16px;
                    padding: 16px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    z-index: 10;
                }

                .balance-stat {
                    top: 60px;
                    right: 40px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    min-width: 180px;
                    animation: float 5s ease-in-out infinite;
                }

                .trans-stat {
                    bottom: 40px;
                    left: 20px;
                    min-width: 240px;
                    animation: float 7s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .stat-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255, 255, 255, 0.04);
                }

                .emerald { color: #10b981; }
                .stat-info { display: flex; flex-direction: column; }
                .stat-label { font-size: 10px; color: rgba(255, 255, 255, 0.4); }
                .stat-val { font-size: 16px; font-weight: 800; }
                .trend-arrow { color: #10b981; margin-left: auto; }

                .trans-header { font-size: 12px; font-weight: 700; margin: 0 0 12px 0; color: rgba(255, 255, 255, 0.6); }
                .trans-list { display: flex; flex-direction: column; gap: 12px; }
                .trans-item { display: flex; align-items: center; gap: 12px; }
                .trans-icon { width: 24px; height: 24px; border-radius: 6px; background: rgba(255, 255, 255, 0.04); display: flex; align-items: center; justify-content: center; color: rgba(255, 255, 255, 0.4); }
                .trans-details { display: flex; flex-direction: column; flex: 1; }
                .trans-details span { font-size: 11px; font-weight: 700; }
                .trans-details small { font-size: 9px; color: rgba(255, 255, 255, 0.3); }
                .trans-price { font-size: 11px; font-weight: 700; color: #10b981; }

                @media (max-width: 992px) {
                    .payment-title { font-size: 38px; text-align: center; }
                    .payment-desc { text-align: center; margin-inline: auto; }
                    .benefit-grid { justify-content: center; }
                    .wallet-dashboard-wrapper { height: auto; margin-top: 60px; }
                    .titanium-card { width: 100%; max-width: 380px; }
                    .stat-card { position: relative; top: auto; right: auto; left: auto; bottom: auto; margin-top: 20px; animation: none; width: 100%; max-width: 380px; }
                }

                @media (max-width: 600px) {
                    .payment-title { font-size: 32px; }
                    .benefit-grid { grid-template-columns: 1fr; }
                }
            `}</style>
    </section>
  );
};

export default DigitalPaymentSection;
