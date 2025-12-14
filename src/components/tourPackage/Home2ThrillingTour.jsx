"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import Link from "next/link";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);

const Home2ThrillingTour = () => {
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  // Fetch hotels based on user location
  useEffect(() => {
    const fetchHotelsNearUser = async () => {
      try {
        // Get user's location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ latitude, longitude });

              // Fetch hotels near user's location
              const checkIn = new Date();
              checkIn.setDate(checkIn.getDate() + 7); // 7 days from now
              const checkOut = new Date(checkIn);
              checkOut.setDate(checkOut.getDate() + 3); // 3-day stay

              const response = await fetch('/api/hotels/search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  location: `${latitude},${longitude}`,
                  checkIn: checkIn.toISOString().split('T')[0],
                  checkOut: checkOut.toISOString().split('T')[0],
                  guests: {
                    adults: 2,
                    children: 0,
                    rooms: 1
                  },
                  offset: 0
                })
              });

              if (response.ok) {
                const data = await response.json();
                setHotels(data.slice(0, 6)); // Show first 6 hotels
              }
              setIsLoading(false);
            },
            (error) => {
              console.error('Geolocation error:', error);
              // Fallback to default location (Nairobi)
              fetchDefaultHotels();
            }
          );
        } else {
          // Geolocation not supported, use default
          fetchDefaultHotels();
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setIsLoading(false);
      }
    };

    const fetchDefaultHotels = async () => {
      try {
        const checkIn = new Date();
        checkIn.setDate(checkIn.getDate() + 7);
        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + 3);

        const response = await fetch('/api/hotels/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location: 'Nairobi, Kenya',
            checkIn: checkIn.toISOString().split('T')[0],
            checkOut: checkOut.toISOString().split('T')[0],
            guests: {
              adults: 2,
              children: 0,
              rooms: 1
            },
            offset: 0
          })
        });

        if (response.ok) {
          const data = await response.json();
          setHotels(data.slice(0, 6));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching default hotels:', error);
        setIsLoading(false);
      }
    };

    fetchHotelsNearUser();
  }, []);

  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 2000,
      spaceBetween: 25,
      navigation: {
        nextEl: ".package-card-slider-next",
        prevEl: ".package-card-slider-prev",
      },

      breakpoints: {
        280: {
          slidesPerView: 1,
        },
        386: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 3,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="tour-pack-section home2-gradient-bg">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="section-title2 text-center">
                <div className="eg-section-tag two">
                  <span>Tour Package</span>
                </div>
                <h2 className="text-white">Thrilling Tour Plans</h2>
              </div>
            </div>
          </div>
          <div className="package-card-slider-wrap">
            <div className="row">
              <div className="col-lg-12">
                <Swiper
                  {...settings}
                  className="swiper package-card-slider mb-60"
                >
                  <div className="swiper-wrapper">
                    {isLoading ? (
                      // Loading state
                      Array.from({ length: 3 }).map((_, index) => (
                        <SwiperSlide key={`loading-${index}`} className="swiper-slide">
                          <div className="package-card3">
                            <div className="package-card-img" style={{ background: '#f0f0f0', height: '250px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#999' }}>
                                Loading...
                              </div>
                            </div>
                            <div className="package-card-content">
                              <div className="card-content-top">
                                <div style={{ background: '#f0f0f0', height: '20px', marginBottom: '10px' }}></div>
                                <div style={{ background: '#f0f0f0', height: '40px', marginBottom: '10px' }}></div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : hotels.length > 0 ? (
                      // Display fetched hotels
                      hotels.map((hotel, index) => (
                        <SwiperSlide key={hotel.id || index} className="swiper-slide">
                          <div className="package-card3">
                            <a
                              href={hotel.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="package-card-img"
                            >
                              <img
                                src={hotel.photoMainUrl || "/assets/img/home2/package-card3-img1.png"}
                                alt={hotel.name}
                                onError={(e) => {
                                  e.target.src = "/assets/img/home2/package-card3-img1.png";
                                }}
                              />
                              {index === 0 && (
                                <div className="batch">
                                  <span>Popular</span>
                                </div>
                              )}
                              {index === 1 && (
                                <div className="batch two">
                                  <span>Trending</span>
                                </div>
                              )}
                            </a>
                            <div className="package-card-content">
                              <div className="card-content-top">
                                <div className="rating-area">
                                  <ul className="rating">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <li key={i}>
                                        <i className={`bi bi-star${i < Math.floor(hotel.reviewScore / 2) ? '-fill' : ''}`} />
                                      </li>
                                    ))}
                                  </ul>
                                  <span>({hotel.reviewCount || 0} Reviews)</span>
                                </div>
                                <h5>
                                  <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                                    {hotel.name}
                                  </a>
                                </h5>
                                <ul className="feature-list">
                                  <li>
                                    <svg
                                      className="with-stroke"
                                      xmlns="http://www.w3.org/2000/svg"
                                      width={14}
                                      height={14}
                                      viewBox="0 0 14 14"
                                    >
                                      <g clipPath="url(#clip0_1225_49)">
                                        <path
                                          d="M6.99999 13.5898C5.35937 11.1289 2.48828 7.79299 2.48828 4.9219C2.48828 2.43415 4.51223 0.410197 6.99999 0.410197C9.48774 0.410197 11.5117 2.43415 11.5117 4.9219C11.5117 7.79299 8.64061 11.1289 6.99999 13.5898Z"
                                          strokeMiterlimit={10}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M6.99999 6.97266C5.86925 6.97266 4.94922 6.05262 4.94922 4.92188C4.94922 3.79114 5.86925 2.87111 6.99999 2.87111C8.13074 2.87111 9.05077 3.79114 9.05077 4.92188C9.05077 6.05262 8.13074 6.97266 6.99999 6.97266Z"
                                          strokeMiterlimit={10}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </g>
                                    </svg>
                                    {hotel.city || 'Location'}
                                  </li>
                                </ul>
                              </div>
                              <div className="card-content-bottom">
                                <div className="price-area">
                                  <span className="title">Starting From:</span>
                                  <h6>
                                    <sub>{hotel.currency || '$'}</sub>
                                    {hotel.priceBreakdown?.grossPrice?.value || hotel.price || 'N/A'}
                                  </h6>
                                  <span>Per Night</span>
                                </div>
                                <a
                                  href={hotel.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="primary-btn2"
                                >
                                  Book Now
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={18}
                                    height={18}
                                    viewBox="0 0 18 18"
                                    fill="none"
                                  >
                                    <path d="M8.15624 10.2261L7.70276 12.3534L5.60722 18L6.85097 17.7928L12.6612 10.1948C13.4812 10.1662 14.2764 10.1222 14.9674 10.054C18.1643 9.73783 17.9985 8.99997 17.9985 8.99997C17.9985 8.99997 18.1643 8.26211 14.9674 7.94594C14.2764 7.87745 13.4811 7.8335 12.6611 7.80518L6.851 0.206972L5.60722 -5.41705e-07L7.70276 5.64663L8.15624 7.77386C7.0917 7.78979 6.37132 7.81403 6.37132 7.81403C6.37132 7.81403 4.90278 7.84793 2.63059 8.35988L0.778036 5.79016L0.000253424 5.79016L0.554115 8.91458C0.454429 8.94514 0.454429 9.05483 0.554115 9.08539L0.000253144 12.2098L0.778036 12.2098L2.63059 9.64035C4.90278 10.1523 6.37132 10.1857 6.37132 10.1857C6.37132 10.1857 7.0917 10.2102 8.15624 10.2261Z" />
                                    <path d="M12.0703 11.9318L12.0703 12.7706L8.97041 12.7706L8.97041 11.9318L12.0703 11.9318ZM12.0703 5.23292L12.0703 6.0714L8.97059 6.0714L8.97059 5.23292L12.0703 5.23292ZM9.97892 14.7465L9.97892 15.585L7.11389 15.585L7.11389 14.7465L9.97892 14.7465ZM9.97892 2.41846L9.97892 3.2572L7.11389 3.2572L7.11389 2.41846L9.97892 2.41846Z" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))
                    ) : (
                      // No hotels found
                      <SwiperSlide className="swiper-slide">
                        <div className="package-card3">
                          <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>
                            <p>No hotels found nearby. Please try again later.</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    )}
                  </div>
                </Swiper>
                <div className="slide-and-view-btn-grp style-2">
                  <div className="slider-btn-grp3">
                    <div className="slider-btn package-card-slider-prev">
                      <i className="bi bi-arrow-left" />
                      <span>PREV</span>
                    </div>
                    <Link href="/package" className="secondary-btn2">
                      View All Package
                    </Link>
                    <div className="slider-btn package-card-slider-next">
                      <span>NEXT</span>
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home2ThrillingTour;
