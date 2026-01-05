"use client";
import React from "react";
import CountUp from "react-countup";
import Link from "next/link";
import { Zap, Gem, Headset, ShieldCheck, Star } from "lucide-react";

const Home2About = () => {
  return (
    <>
      <div className="amazing-about-section pt-120 mb-120">
        <div className="about-animated-bg"></div>

        <div className="container relative-z">
          <div className="row mb-90 align-items-center">
            <div className="col-lg-6">
              <div className="about-content">
                <div className="section-title-premium mb-30">
                  <div className="premium-tag-small">
                    <span>Our Story</span>
                  </div>
                  <h2 className="premium-main-title">
                    Seamless Booking, <br />
                    <span className="serif-italic">Unforgettable</span> Journeys
                  </h2>
                  <p className="premium-desc">
                    Your one-stop destination for curated global travel. We redefine the standard
                    of excellence with instant confirmations, elite pricing, and dedicated concierge
                    support that follows you across the globe.
                  </p>
                </div>

                <div className="row g-4 mb-50">
                  <div className="col-12 col-md-6">
                    <div className="premium-facility-card">
                      <div className="f-icon emerald"><Zap size={20} /></div>
                      <div className="f-content">
                        <h6>Instant Confirmation</h6>
                        <span>Guaranteed registry.</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="premium-facility-card">
                      <div className="f-icon sky"><Gem size={20} /></div>
                      <div className="f-content">
                        <h6>Elite Pricing</h6>
                        <span>Unmatched value.</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="premium-facility-card">
                      <div className="f-icon violet"><Headset size={20} /></div>
                      <div className="f-content">
                        <h6>24/7 Concierge</h6>
                        <span>At your service.</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <div className="premium-facility-card">
                      <div className="f-icon gold"><ShieldCheck size={20} /></div>
                      <div className="f-content">
                        <h6>Secure Settlement</h6>
                        <span>Bank-level safety.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="content-bottom-area">
                  <Link href="/about" className="premium-action-btn">
                    Start Your Journey
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="about-visual-wrap">
                <div className="main-visual-img">
                  <img
                    src="/assets/img/home2/custom/about_tour_facilities.jpg"
                    alt="Premium Travel Experience"
                    className="img-fluid rounded-24"
                  />
                  <div className="experience-seal">
                    <div className="seal-inner">
                      <h3 className="seal-num"><CountUp end={5} /></h3>
                      <p className="seal-text">YEARS OF MASTERING THE ART OF TRAVEL</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 d-flex justify-content-center">
              <div className="premium-trust-badge">
                <div className="trust-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#10b981" color="#10b981" />
                  ))}
                </div>
                <p className="trust-text">
                  <span className="bold">Excellent!</span> 5.0 Rating based on <span className="underline">245,354 Verified Reviews</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .amazing-about-section {
            background-color: #05070a;
            padding: 120px 0;
            position: relative;
            overflow: hidden;
            color: white;
          }

          .about-animated-bg {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at 10% 20%, rgba(16, 185, 129, 0.03) 0%, transparent 40%),
                        radial-gradient(circle at 90% 80%, rgba(14, 165, 233, 0.03) 0%, transparent 40%);
            z-index: 1;
          }

          .relative-z { position: relative; z-index: 10; }

          .premium-tag-small {
            text-transform: uppercase;
            letter-spacing: 0.4em;
            font-size: 10px;
            font-weight: 900;
            color: #10b981;
            margin-bottom: 15px;
            display: block;
          }

          .premium-main-title {
            font-size: 48px;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 25px;
            letter-spacing: -0.02em;
          }

          .serif-italic {
            font-family: serif;
            font-style: italic;
            font-weight: 400;
            opacity: 0.95;
          }

          .premium-desc {
            font-size: 17px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.5);
            max-width: 520px;
            margin-bottom: 0;
          }

          .premium-facility-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 24px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            transition: all 0.4s ease;
          }

          .premium-facility-card:hover {
            background: rgba(255, 255, 255, 0.04);
            border-color: rgba(255, 255, 255, 0.1);
            transform: translateY(-5px);
          }

          .f-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.03);
          }

          .f-icon.emerald { color: #10b981; }
          .f-icon.sky { color: #0ea5e9; }
          .f-icon.violet { color: #8b5cf6; }
          .f-icon.gold { color: #f59e0b; }

          .f-content h6 { font-size: 14px; font-weight: 700; margin: 0 0 2px 0; }
          .f-content span { font-size: 12px; color: rgba(255, 255, 255, 0.35); }

          .premium-action-btn {
            display: inline-block;
            padding: 16px 36px;
            background: white;
            color: black;
            border-radius: 100px;
            font-weight: 800;
            font-size: 14px;
            transition: all 0.4s;
          }

          .premium-action-btn:hover {
            background: #10b981;
            color: white;
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
            transform: translateY(-2px);
          }

          .about-visual-wrap { position: relative; width: 100%; max-width: 500px; }
          .main-visual-img { position: relative; border-radius: 24px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.5); }
          .rounded-24 { border-radius: 24px; }

          .experience-seal {
            position: absolute;
            bottom: -30px;
            right: -30px;
            width: 160px;
            height: 160px;
            background: #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            box-shadow: 0 20px 40px rgba(16, 185, 129, 0.4);
            border: 8px solid #05070a;
            animation: pulse-glow 3s infinite;
          }

          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.2); }
            50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
          }

          .seal-inner { padding: 15px; }
          .seal-num { font-size: 42px; font-weight: 900; line-height: 1; margin: 0; color: white; }
          .seal-text { font-size: 9px; font-weight: 800; margin: 5px 0 0 0; line-height: 1.3; letter-spacing: 0.1em; color: rgba(255,255,255,0.8); }

          .premium-trust-badge {
            background: rgba(255, 255, 255, 0.02);
            padding: 12px 30px;
            border-radius: 100px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            display: flex;
            align-items: center;
            gap: 20px;
            margin-top: 40px;
          }

          .trust-stars { display: flex; gap: 4px; }
          .trust-text { font-size: 13px; color: rgba(255, 255, 255, 0.5); margin: 0; }
          .trust-text .bold { color: white; font-weight: 700; margin-right: 5px; }
          .trust-text .underline { text-decoration: underline; color: #10b981; font-weight: 600; cursor: pointer; }

          @media (max-width: 992px) {
            .amazing-about-section { padding: 80px 0; }
            .premium-main-title { font-size: 36px; text-align: center; }
            .premium-desc { text-align: center; margin-inline: auto; }
            .about-content {  text-align: center; margin-bottom: 60px; }
            .premium-facility-card { text-align: left; }
            .experience-seal { width: 120px; height: 120px; bottom: -20px; right: -20px; }
            .seal-num { font-size: 32px; }
            .premium-trust-badge { flex-direction: column; text-align: center; border-radius: 20px; padding: 20px; }
          }
        `}</style>
      </div>
    </>
  );
};

export default Home2About;