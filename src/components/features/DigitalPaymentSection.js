"use client";
import React from "react";
import Image from "next/image";
import { CreditCard, TrendingUp, CheckCircle2, ShieldCheck, Wallet } from "lucide-react";

const DigitalPaymentSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="text-white space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium tracking-wide text-emerald-100">100% Secure Transaction</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-rubik">
              Book Your Dream <br />
              Vacation in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 relative">
                Seconds
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-500/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              Experience lightning-fast booking with our streamlined process.
              We accept all major payment methods including Visa, Mastercard, and digital wallets.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                <div key={method} className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 cursor-default">
                  <span className="text-gray-300 font-medium">{method}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>No hidden fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant confirmation</span>
              </div>
            </div>
          </div>

          {/* Right Image Composition */}
          <div className="relative mt-12 lg:mt-0">
            {/* Main Image Container */}
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-900/20 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
              <img
                src="/assets/img/home2/portrait-cheerful-african-girl-pink-casual-clothes-holding-credit-bank-card-isolated-blue-turquoise-wall-background-studio-people-sincere-emotions-lifestyle-concept-mock-up-copy-space.png"
                alt="Secure Payment Experience"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Floating Payment Success Card */}
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-500/20 p-2.5 rounded-full">
                        <Wallet className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-xs text-emerald-200">Total Balance</div>
                        <div className="text-lg font-bold text-white">$24,890.00</div>
                      </div>
                    </div>
                    <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                      +2.4%
                    </div>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-3/4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute -top-10 -right-10 z-0 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl rotate-6 animate-float hidden md:block">
              <CreditCard className="w-8 h-8 text-cyan-400 mb-2" />
              <div className="h-2 w-12 bg-white/20 rounded-full mb-1"></div>
              <div className="h-2 w-8 bg-white/20 rounded-full"></div>
            </div>

            <div className="absolute top-1/2 -left-12 z-20 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl -rotate-6 animate-float-delayed hidden md:block">
              <TrendingUp className="w-8 h-8 text-emerald-400 mb-2" />
              <div className="h-2 w-12 bg-white/20 rounded-full mb-1"></div>
              <div className="h-2 w-8 bg-white/20 rounded-full"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalPaymentSection;
