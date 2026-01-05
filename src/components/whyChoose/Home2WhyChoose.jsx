"use client";
import React from "react";
import { Globe, DollarSign, Clock, Users, ShieldCheck, Heart } from "lucide-react";

const Home2WhyChoose = () => {
  return (
    <section className="amazing-why-choose-section pt-120 mb-120">
      <div className="why-choose-animated-bg"></div>

      <div className="container relative-z">
        <div className="row mb-70">
          <div className="col-lg-12">
            <div className="section-title-premium text-center">
              <span className="premium-tag-small">Our Philosophy</span>
              <h2 className="premium-main-title">
                The <span className="serif-italic">iTravelsHub</span> Standard
              </h2>
              <p className="premium-desc mx-auto">
                We don't just book travel; we engineer flawless global experiences.
                Our commitments are anchored in absolute precision and elite standards.
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-40">
          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap emerald">
                <Globe size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Worldwide Coverage</h5>
                <p>Access the most exclusive corners of all seven continents with our unmatched global network.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap sky">
                <DollarSign size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Elite Pricing</h5>
                <p>Secure the finest value through our direct institutional relationships and price-match guarantee.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap violet">
                <Clock size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Instant Confirmation</h5>
                <p>Our real-time registry ensures your booking is finalized at the moment of touch. No waiting.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap sky">
                <Users size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Expert Curation</h5>
                <p>Every itinerary is vetted by local specialists who live and breathe your chosen destination.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap emerald">
                <ShieldCheck size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Secure Settlement</h5>
                <p>Transactions protected by bank-level encryption and high-tier fiscal security standards.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="elite-feature-card">
              <div className="elite-icon-wrap gold">
                <Heart size={32} strokeWidth={1.2} />
              </div>
              <div className="elite-content">
                <h5>Legacy Support</h5>
                <p>24/7 dedicated concierge service that travels with you, ensuring every need is anticipated.</p>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .amazing-why-choose-section {
          background-color: #05070a;
          position: relative;
          overflow: hidden;
          color: white;
          padding-bottom: 120px;
        }

        .why-choose-animated-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.02) 0%, transparent 60%),
                      radial-gradient(circle at 10% 90%, rgba(14, 165, 233, 0.02) 0%, transparent 40%);
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
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 25px;
          letter-spacing: -0.02em;
        }

        .serif-italic { font-family: serif; font-style: italic; font-weight: 400; }

        .premium-desc {
          font-size: 17px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.4);
          max-width: 600px;
          margin-bottom: 10px;
        }

        .elite-feature-card {
            background: rgba(255, 255, 255, 0.015);
            border: 1px solid rgba(255, 255, 255, 0.04);
            padding: 40px;
            border-radius: 28px;
            height: 100%;
            position: relative;
            overflow: hidden;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 25px;
        }

        .elite-feature-card:hover {
            background: rgba(255, 255, 255, 0.03);
            border-color: rgba(16, 185, 129, 0.2);
            transform: translateY(-8px);
        }

        .elite-icon-wrap {
            width: 64px;
            height: 64px;
            border-radius: 18px;
            background: rgba(255, 255, 255, 0.02);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s;
            position: relative;
            z-index: 2;
        }

        .elite-icon-wrap.emerald { color: #10b981; }
        .elite-icon-wrap.sky { color: #0ea5e9; }
        .elite-icon-wrap.violet { color: #8b5cf6; }
        .elite-icon-wrap.gold { color: #f59e0b; }

        .elite-feature-card:hover .elite-icon-wrap {
            background: #10b981;
            color: white !important;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        }

        .elite-content { position: relative; z-index: 2; }
        .elite-content h5 { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
        .elite-content p { font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.45); margin: 0; }

        .card-glow {
            position: absolute;
            bottom: -50px;
            right: -50px;
            width: 150px;
            height: 150px;
            background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transition: all 0.5s;
        }

        .elite-feature-card:hover .card-glow {
            transform: scale(2);
            background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
        }

        @media (max-width: 992px) {
            .amazing-why-choose-section { padding: 80px 0; }
            .premium-main-title { font-size: 38px; }
            .elite-feature-card { padding: 30px; }
        }
      `}</style>
    </section>
  );
};

export default Home2WhyChoose;
