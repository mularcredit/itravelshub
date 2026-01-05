"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
import { Wind, Mountain, Waves, Map, MountainSnow, ChevronRight } from "lucide-react";

const Home2Activities = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: 1,
      speed: 1500,
      spaceBetween: 0,
      effect: "fade",
      loop: true,
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".lex-pagination-dots",
        clickable: true,
      },
      modules: [Autoplay, EffectFade, Navigation, Pagination],
    };
  }, []);

  return (
    <section className="amazing-activities-section mb-120">
      <div className="activities-animated-bg"></div>

      <div className="container-fluid p-0 relative-z">
        <div className="row g-0 align-items-stretch">
          {/* Left: Visual Swiper Section */}
          <div className="col-lg-5">
            <div className="activities-visual-hub">
              <Swiper {...settings} className="activities-main-swiper">
                <SwiperSlide>
                  <div className="slide-box" style={{ backgroundImage: "url(assets/img/home2/custom/zip_lining.jpg)" }}>
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-box" style={{ backgroundImage: "url(assets/img/home2/custom/bungee_jumping.png)" }}>
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-box" style={{ backgroundImage: "url(assets/img/home2/custom/rafting.png)" }}>
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-box" style={{ backgroundImage: "url(assets/img/home2/custom/paragliding.png)" }}>
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="slide-box" style={{ backgroundImage: "url(assets/img/home2/custom/ski_touring.png)" }}>
                    <div className="slide-overlay"></div>
                  </div>
                </SwiperSlide>
              </Swiper>
              <div className="lex-pagination-dots"></div>
            </div>
          </div>

          {/* Right: Content & Experience Selector */}
          <div className="col-lg-7">
            <div className="activities-content-hub">
              <div className="section-title-premium mb-60">
                <span className="premium-tag-small">World Class</span>
                <h2 className="premium-main-title">
                  Signature <span className="serif-italic">Experiences</span>
                </h2>
              </div>

              <div className="experience-selector-grid">
                <div className="selector-sidebar">
                  <ul className="nav flex-column" id="experienceTab" role="tablist">
                    <li className="nav-item">
                      <button className="exp-link active" id="zip-tab" data-bs-toggle="pill" data-bs-target="#zip" type="button">
                        <div className="exp-icon emerald"><Wind size={18} /></div>
                        <span>Zip Lining</span>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="exp-link" id="bungee-tab" data-bs-toggle="pill" data-bs-target="#bungee" type="button">
                        <div className="exp-icon sky"><Mountain size={18} /></div>
                        <span>Bungee Jump</span>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="exp-link" id="rafting-tab" data-bs-toggle="pill" data-bs-target="#rafting" type="button">
                        <div className="exp-icon violet"><Waves size={18} /></div>
                        <span>Rafting</span>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="exp-link" id="gliding-tab" data-bs-toggle="pill" data-bs-target="#gliding" type="button">
                        <div className="exp-icon gold"><Map size={18} /></div>
                        <span>Paragliding</span>
                      </button>
                    </li>
                    <li className="nav-item">
                      <button className="exp-link" id="ski-tab" data-bs-toggle="pill" data-bs-target="#ski" type="button">
                        <div className="exp-icon sky"><MountainSnow size={18} /></div>
                        <span>Ski Touring</span>
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="tab-pills-content">
                  <div className="tab-content" id="experienceTabContent">
                    <div className="tab-pane fade show active" id="zip" role="tabpanel">
                      <div className="exp-info-card">
                        <h3>Thrill Above <span className="serif-italic">The Canopy</span></h3>
                        <p>Embark on an adrenaline-fueled journey through lush landscapes, feeling the wind rush past and experiencing nature from breathtaking heights.</p>
                        <div className="exp-features">
                          <div className="feat-item"><div className="dot"></div><span>Treetop Views</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Elite Safety</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Nature Immersion</span></div>
                        </div>
                        <Link href="/activities" className="exp-cta">Reserve Experience <ChevronRight size={14} /></Link>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="bungee" role="tabpanel">
                      <div className="exp-info-card">
                        <h3>The <span className="serif-italic">Pure Plunge</span></h3>
                        <p>Plunge into pure adrenaline. Free fall, then rebound, suspended mid-air. Experience the ultimate rush, a heart-pounding leap into the unknown.</p>
                        <div className="exp-features">
                          <div className="feat-item"><div className="dot"></div><span>Pro Guidance</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Scenic Drops</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Max Adrenaline</span></div>
                        </div>
                        <Link href="/activities" className="exp-cta">Reserve Experience <ChevronRight size={14} /></Link>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="rafting" role="tabpanel">
                      <div className="exp-info-card">
                        <h3>Whitewater <span className="serif-italic">Mastery</span></h3>
                        <p>Ride through rapids, paddle through currents, and enjoy thrilling adventures with expert guides amidst stunning natural landscapes.</p>
                        <div className="exp-features">
                          <div className="feat-item"><div className="dot"></div><span>Class V Rapids</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Team Dynamics</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Wild Rivers</span></div>
                        </div>
                        <Link href="/activities" className="exp-cta">Reserve Experience <ChevronRight size={14} /></Link>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="gliding" role="tabpanel">
                      <div className="exp-info-card">
                        <h3>Horizon <span className="serif-italic">Ballet</span></h3>
                        <p>Experience freedom in flight, soaring gracefully over landscapes, feeling the wind's embrace on an exhilarating paragliding escapade.</p>
                        <div className="exp-features">
                          <div className="feat-item"><div className="dot"></div><span>Aerial Views</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Silent Flight</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Sunrise Magic</span></div>
                        </div>
                        <Link href="/activities" className="exp-cta">Reserve Experience <ChevronRight size={14} /></Link>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="ski" role="tabpanel">
                      <div className="exp-info-card">
                        <h3>Powder <span className="serif-italic">Odyssey</span></h3>
                        <p>Ski tour through pristine snowscapes, ascend peaks, and savor thrilling descents, immersing in nature's beauty on an exhilarating adventure.</p>
                        <div className="exp-features">
                          <div className="feat-item"><div className="dot"></div><span>Remote Trails</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Peak Conquest</span></div>
                          <div className="feat-item"><div className="dot"></div><span>Epic Descents</span></div>
                        </div>
                        <Link href="/activities" className="exp-cta">Reserve Experience <ChevronRight size={14} /></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .amazing-activities-section {
          background-color: #05070a;
          position: relative;
          overflow: hidden;
          color: white;
          min-height: 700px;
        }

        .activities-animated-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
                      radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.03) 0%, transparent 50%);
          z-index: 1;
        }

        .relative-z { position: relative; z-index: 10; height: 100%; }

        .activities-visual-hub {
            height: 100%;
            min-height: 600px;
            position: relative;
        }

        .slide-box {
            width: 100%;
            height: 100%;
            min-height: 700px;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .slide-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, rgba(5, 7, 10, 0.8) 0%, transparent 50%, rgba(5, 7, 10, 0.2) 100%),
                        linear-gradient(to top, rgba(5, 7, 10, 0.4) 0%, transparent 30%);
        }

        .lex-pagination-dots {
            position: absolute;
            bottom: 30px;
            left: 30px;
            z-index: 20;
            display: flex;
            gap: 8px;
        }

        .lex-pagination-dots :global(.swiper-pagination-bullet) {
            width: 6px;
            height: 6px;
            background: rgba(255,255,255,0.2);
            opacity: 1;
            transition: all 0.4s;
        }

        .lex-pagination-dots :global(.swiper-pagination-bullet-active) {
            width: 24px;
            border-radius: 4px;
            background: #10b981;
        }

        .activities-content-hub {
            padding: 100px 60px;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

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
          letter-spacing: -0.02em;
        }

        .serif-italic { font-family: serif; font-style: italic; font-weight: 400; }

        .experience-selector-grid {
            display: grid;
            grid-template-columns: 240px 1fr;
            gap: 40px;
            align-items: start;
        }

        .exp-link {
            width: 100%;
            background: transparent;
            border: none;
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px;
            color: rgba(255,255,255,0.4);
            transition: all 0.4s;
            text-align: left;
            border-radius: 12px;
            margin-bottom: 8px;
        }

        .exp-link.active {
            background: rgba(255,255,255,0.03);
            color: white;
            box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
        }

        .exp-icon {
            width: 36px;
            height: 36px;
            border-radius: 10px;
            background: rgba(255,255,255,0.03);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s;
        }

        .exp-link.active .exp-icon {
            background: #10b981;
            color: white !important;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .exp-link span { font-size: 14px; font-weight: 700; letter-spacing: 0.02em; }

        .exp-info-card {
            background: rgba(255,255,255,0.02);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 40px;
            border-radius: 24px;
            backdrop-filter: blur(10px);
        }

        .exp-info-card h3 { font-size: 32px; font-weight: 800; margin-bottom: 20px; }
        .exp-info-card p { font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.5); margin-bottom: 30px; }

        .exp-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 35px; }
        .feat-item { display: flex; align-items: center; gap: 10px; }
        .dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }
        .feat-item span { font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.8); }

        .exp-cta {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            color: #10b981;
            font-weight: 800;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            transition: all 0.3s;
        }

        .exp-cta:hover { gap: 15px; color: white; }

        @media (max-width: 1200px) {
            .experience-selector-grid { grid-template-columns: 1fr; }
            .selector-sidebar { order: 2; }
            .selector-sidebar ul { flex-direction: row !important; overflow-x: auto; padding-bottom: 10px; }
            .exp-link { white-space: nowrap; }
            .tab-pills-content { order: 1; }
        }

        @media (max-width: 992px) {
            .activities-content-hub { padding: 60px 20px; }
            .premium-main-title { font-size: 38px; }
            .slide-box { min-height: 400px; }
        }
      `}</style>
    </section>
  );
};

export default Home2Activities;
