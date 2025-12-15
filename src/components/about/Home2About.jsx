"use client";
import React from "react";
import CountUp from "react-countup";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Clock, CreditCard, Users, Map, Star, Smile } from "lucide-react";

const Home2About = () => {
  return (
    <section className="py-20 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-emerald-50 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-100 rounded-full blur-[100px] opacity-40" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left Content Column */}
          <div className="space-y-8 animate-fade-in-left">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold tracking-widest uppercase">
                About Us
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold font-rubik text-slate-900 leading-tight">
                Seamless Booking, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
                  Unforgettable Journeys
                </span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Your one-stop platform for booking hotels, flights, tours, and car rentals worldwide.
                We simplify travel planning with instant confirmations, competitive prices, and 24/7
                customer support to ensure your journey is smooth from start to finish.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: Clock, title: "Instant Confirmation", desc: "No waiting, get booked instantly." },
                { icon: ShieldCheck, title: "Best Price Guarantee", desc: "We match any competitor's price." },
                { icon: Users, title: "24/7 Support", desc: "Always here for you, day or night." },
                { icon: CreditCard, title: "Secure Payment", desc: "100% secure encrypted transactions." },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="bg-emerald-50 p-2.5 rounded-lg text-emerald-600">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h6 className="font-bold text-slate-900 mb-1">{feature.title}</h6>
                    <p className="text-sm text-slate-500 leading-snug">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-medium rounded-full hover:bg-emerald-600 transition-colors duration-300 shadow-lg shadow-emerald-900/10">
                Start Booking
              </Link>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="relative animate-fade-in-right">
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/assets/img/home2/custom/about_tour_facilities.jpg"
                alt="Travel Experience"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Experience Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur shadow-xl p-6 rounded-2xl border border-slate-100 max-w-[200px]">
                <div className="text-5xl font-black text-emerald-600 mb-1 font-rubik">05</div>
                <div className="text-slate-600 font-medium leading-tight">Years of<br />Experience</div>
              </div>
            </div>

            {/* Decorative Vector */}
            <div className="absolute -top-12 -right-12 z-0 opacity-20 rotate-12">
              <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
                <path d="M10 100 Q 50 10 90 100 T 190 100" stroke="#059669" strokeWidth="2" strokeDasharray="10 10" fill="none" />
                <path d="M10 120 Q 50 30 90 120 T 190 120" stroke="#059669" strokeWidth="2" strokeDasharray="10 10" fill="none" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Counter Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-slate-200">
          {[
            { icon: Smile, label: "Happy Travelers", value: 60, suffix: "K+" },
            { icon: Map, label: "Tours Success", value: 95, suffix: "%" },
            { icon: Star, label: "Positive Reviews", value: 4.9, suffix: "", isDecimal: true },
            { icon: Users, label: "Travel Guides", value: 120, suffix: "+" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-bold text-slate-900 mb-2 font-rubik">
                <CountUp end={stat.value} duration={2.5} decimals={stat.isDecimal ? 1 : 0} />
                {stat.suffix}
              </h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* TripAdvisor Review Snippet */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-full shadow-md border border-slate-100">
            <span className="font-bold text-slate-900">Excellent!</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-4 h-4 rounded-full bg-emerald-500"></div>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              <strong>5.0</strong> Rating based on <strong>245k+</strong> reviews
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Home2About;