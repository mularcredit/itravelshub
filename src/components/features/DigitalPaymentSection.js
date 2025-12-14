"use client";
import React from "react";
import Image from "next/image";

const DigitalPaymentSection = () => {
  return (
    <section className="digital-payment-section">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className="payment-content">
              <span className="section-tag">Seamless Travel Experience</span>
              <h1 className="section-title">
                Book Your Dream
                <br />
                Vacation in <span className="underlined">Seconds</span>
              </h1>
              <p className="section-description">
                Experience lightning fast booking with our streamlined process.
                We accept all major payment methods including Visa, Mastercard, PayPal,
                Apple Pay, and Google Pay. Every transaction is secured with
                bank-level encryption for your complete peace of mind.
              </p>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6">
            <div className="payment-image-wrapper">
              {/* Decorative Elements */}
              <div className="deco-square pink"></div>
              <div className="deco-square yellow"></div>
              <div className="deco-arrow">
                <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
                  <path
                    d="M10 40C30 20, 60 20, 80 40"
                    stroke="#FFA500"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M75 35L80 40L75 45"
                    stroke="#FFA500"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Main Illustration */}
              <div className="main-image">
                <div className="image-placeholder">
                  <img
                    src="/assets/img/home2/portrait-cheerful-african-girl-pink-casual-clothes-holding-credit-bank-card-isolated-blue-turquoise-wall-background-studio-people-sincere-emotions-lifestyle-concept-mock-up-copy-space.png"
                    alt="Happy customer with credit card - Fast and secure booking"
                    className="hero-image"
                  />
                </div>
              </div>

              {/* Floating Card */}
              <div className="floating-card">
                <div className="card-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      <svg viewBox="0 0 45 45" fill="none">
                        <circle cx="22.5" cy="22.5" r="22.5" fill="#4A90E2" />
                        <text x="22.5" y="28" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold">TB</text>
                      </svg>
                    </div>
                    <div className="user-details">
                      <h6>Travel Bookings</h6>
                      <span>This Month</span>
                    </div>
                  </div>
                  <div className="status">
                    <span className="status-label">Revenue</span>
                    <span className="status-value">$24,890</span>
                  </div>
                </div>
                <div className="card-chart">
                  <svg width="100%" height="60" viewBox="0 0 200 60">
                    <path
                      d="M0 40 L40 35 L80 25 L120 30 L160 20 L200 15"
                      stroke="#4A90E2"
                      strokeWidth="3"
                      fill="none"
                    />
                    <circle cx="200" cy="15" r="4" fill="#4A90E2" />
                  </svg>
                  <div className="chart-label">↑ 156 Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .digital-payment-section {
          background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }

        .payment-content {
          color: #fff;
        }

        .section-tag {
          display: inline-block;
          color: #ffa500;
          font-size: 15px;
          font-weight: 600;
          margin-bottom: 25px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .section-title {
          font-size: 62px;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 35px;
          color: #fff;
          letter-spacing: -0.5px;
          font-family: var(--font-rubik);
        }

        .section-title .underlined {
          position: relative;
          display: inline-block;
        }

        .section-title .underlined::after {
          content: '';
          position: absolute;
          bottom: 8px;
          left: 0;
          width: 100%;
          height: 12px;
          background: #4a90e2;
          z-index: -1;
          border-radius: 3px;
        }

        .section-description {
          font-size: 18px;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.85);
          max-width: 550px;
          margin-bottom: 0;
          font-weight: 400;
        }

        .payment-image-wrapper {
          position: relative;
          min-height: 600px;
        }

        .main-image {
          position: relative;
          z-index: 2;
        }

        .image-placeholder {
          min-height: 600px;
          min-width: 500px;
          background: transparent;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .image-placeholder img,
        .hero-image {
          width: 150%;
          height: auto;
          max-height: 800px;
          object-fit: contain;
          border-radius: 20px;
          transform: scale(1.1);
        }

        .main-image img {
          max-width: 100%;
          height: auto;
        }

        /* Decorative Elements */
        .deco-square {
          position: absolute;
          width: 30px;
          height: 30px;
          border-radius: 4px;
          z-index: 1;
        }

        .deco-square.pink {
          background: #ff1493;
          top: 50px;
          right: 150px;
          transform: rotate(15deg);
        }

        .deco-square.yellow {
          background: #ffd700;
          top: 80px;
          right: 50px;
          transform: rotate(-10deg);
        }

        .deco-arrow {
          position: absolute;
          top: 120px;
          left: 50px;
          z-index: 1;
        }

        /* Floating Card */
        .floating-card {
          position: absolute;
          bottom: 80px;
          left: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          z-index: 3;
          min-width: 300px;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          overflow: hidden;
          background: #e0e0e0;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-details h6 {
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          color: #333;
        }

        .user-details span {
          font-size: 12px;
          color: #666;
        }

        .status {
          text-align: right;
        }

        .status-label {
          display: block;
          font-size: 11px;
          color: #999;
          margin-bottom: 3px;
        }

        .status-value {
          display: block;
          font-size: 14px;
          font-weight: 700;
          color: #4a90e2;
        }

        .card-chart {
          position: relative;
          margin-top: 15px;
        }

        .chart-label {
          position: absolute;
          bottom: 5px;
          left: 10px;
          background: #333;
          color: #fff;
          padding: 4px 10px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
        }

        @media (max-width: 991px) {
          .digital-payment-section {
            padding: 80px 0;
          }

          .section-title {
            font-size: 48px;
          }

          .section-description {
            font-size: 16px;
          }

          .payment-image-wrapper {
            margin-top: 50px;
            min-height: 500px;
          }

          .image-placeholder {
            min-height: 500px;
            min-width: 100%;
          }

          .image-placeholder img,
          .hero-image {
            width: 100%;
            max-height: 550px;
          }

          .floating-card {
            position: relative;
            bottom: auto;
            left: auto;
            margin-top: 30px;
          }
        }

        @media (max-width: 767px) {
          .section-title {
            font-size: 38px;
            line-height: 1.2;
          }

          .section-tag {
            font-size: 13px;
            margin-bottom: 20px;
          }

          .section-description {
            font-size: 15px;
            line-height: 1.7;
          }

          .image-placeholder {
            min-height: 400px;
          }

          .image-placeholder img,
          .hero-image {
            max-height: 450px;
          }

          .deco-square,
          .deco-arrow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default DigitalPaymentSection;
