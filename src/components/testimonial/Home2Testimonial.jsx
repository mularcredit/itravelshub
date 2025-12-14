"use client";
import React, { useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
SwiperCore.use([Autoplay, EffectFade, Navigation, Pagination]);
const Home2Testimonial = () => {
  const settings = useMemo(() => {
    return {
      slidesPerView: "auto",
      speed: 2500,
      spaceBetween: 25,
      loop: true,
      navigation: {
        nextEl: ".testimonial-card-slider-next",
        prevEl: ".testimonial-card-slider-prev",
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
          slidesPerView: 1,
          spaceBetween: 15,
        },
        992: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        1200: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        1400: {
          slidesPerView: 1,
        },
      },
    };
  }, []);
  return (
    <>
      <div className="home2-testimonial-section mb-120 home2-gradient-bg">
        <div className="container-fluid">
          <div className="row g-lg-4 gy-5">
            <div className="col-lg-5">
              <div className="testimonial-content-wrapper">
                <div className="section-title2 mb-40">
                  <div className="eg-section-tag two">
                    <span>Testimonial</span>
                  </div>
                  <h2>Find The Compliments From Our Travelers</h2>
                  <p>
                    Discover what our travelers say about their unforgettable journeys.
                    From breathtaking destinations to seamless booking experiences,
                    read authentic reviews from adventurers who trusted us with their dream vacations.
                  </p>
                </div>
                <div className="review-wrap">
                  <h6>Review On</h6>
                  <ul className="rating-area">
                    <li className="single-rating">
                      <a href="https://www.trustpilot.com/">
                        <div className="icon">
                          <img
                            src="/assets/img/home2/icon/trustpilot-logo.svg"
                            alt=""
                          />
                        </div>
                        <div className="rating">
                          <div className="star">
                            <img
                              src="/assets/img/home2/icon/trustpilot-star.svg"
                              alt=""
                            />
                          </div>
                          <span>5.0 / 5.0</span>
                        </div>
                      </a>
                    </li>
                    <li className="single-rating">
                      <a href="https://www.tripadvisor.com/">
                        <div className="icon">
                          <img
                            src="/assets/img/home2/icon/tripadvisor-logo2.svg"
                            alt=""
                          />
                        </div>
                        <div className="rating">
                          <div className="star">
                            <img
                              src="/assets/img/home2/icon/tripadvisor-star2.svg"
                              alt=""
                            />
                          </div>
                          <span>4.5 / 5.0</span>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="testimonial-card-slider-area">
                <div className="row">
                  <div className="col-lg-12">
                    <Swiper
                      {...settings}
                      className="swiper home2-testimonial-card-slider mb-35"
                    >
                      <div className="swiper-wrapper">
                        <SwiperSlide className="swiper-slide">
                          <div className="tesimonial-card-wrapper style-2">
                            <div className="tesimonial-card">
                              <img
                                src="/assets/img/home2/vector/testi-quote.svg"
                                alt=""
                                className="quote"
                              />
                              <div className="testimonial-content">
                                <p>
                                  "Our family trip to Bali was absolutely perfect!
                                  iTravelsHub handled everything from flights to accommodations.
                                  The local guides were knowledgeable and the entire experience exceeded our expectations."
                                </p>
                              </div>
                              <div className="testimonial-bottom">
                                <div className="rating-area">
                                  <ul className="rating">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="author-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/home1/testi-author-img1.png"
                                  alt=""
                                />
                              </div>
                              <div className="author-content">
                                <h5>Sarah Johnson</h5>
                                <span>Family Traveler</span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                          <div className="tesimonial-card-wrapper style-2">
                            <div className="tesimonial-card">
                              <img
                                src="/assets/img/home2/vector/testi-quote.svg"
                                alt=""
                                className="quote"
                              />
                              <div className="testimonial-content">
                                <p>
                                  "Booking my European adventure was so easy!
                                  The customer support team was available 24/7 and helped me customize
                                  my itinerary perfectly. Best travel experience I've ever had!"
                                </p>
                              </div>
                              <div className="testimonial-bottom">
                                <div className="rating-area">
                                  <ul className="rating">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="author-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/home1/testi-author-img2.png"
                                  alt=""
                                />
                              </div>
                              <div className="author-content">
                                <h5>Michael Chen</h5>
                                <span>Solo Adventurer</span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                          <div className="tesimonial-card-wrapper style-2">
                            <div className="tesimonial-card">
                              <img
                                src="/assets/img/home2/vector/testi-quote.svg"
                                alt=""
                                className="quote"
                              />
                              <div className="testimonial-content">
                                <p>
                                  "The honeymoon package to the Maldives was a dream come true!
                                  Every detail was perfectly arranged. The resort, activities, and transfers
                                  were flawless. Thank you for making our special trip unforgettable!"
                                </p>
                              </div>
                              <div className="testimonial-bottom">
                                <div className="rating-area">
                                  <ul className="rating">
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                    <li>
                                      <i className="bi bi-star-fill" />
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <div className="author-area">
                              <div className="author-img">
                                <img
                                  src="/assets/img/home1/testi-author-img3.png"
                                  alt=""
                                />
                              </div>
                              <div className="author-content">
                                <h5>Emma & David Martinez</h5>
                                <span>Honeymooners</span>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      </div>
                    </Swiper>
                    <div className="slide-and-view-btn-grp style-3">
                      <div className="slider-btn-grp3">
                        <div className="slider-btn testimonial-card-slider-prev">
                          <i className="bi bi-arrow-left" />
                          <span>PREV</span>
                        </div>
                        <div className="slider-btn testimonial-card-slider-next">
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
        </div>
      </div>
    </>
  );
};

export default Home2Testimonial;
