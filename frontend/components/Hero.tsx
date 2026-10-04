'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, MessageCircle, ShieldCheck, Flame, Sparkles, Building2 } from 'lucide-react';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function Hero() {
  return (
    <section className="relative bg-[#070A12] text-white overflow-hidden border-b border-amber-500/20">
      {/* Background Graphic: Fireworks, Lights & Crackers */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-fireworks.svg"
          alt="Diwali Fireworks Background"
          fill
          className="object-cover object-center opacity-85"
          priority
        />
        {/* Deep gradient overlay on left for readable contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070A12] via-[#070A12]/80 to-transparent w-full md:w-3/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28 flex flex-col justify-center min-h-[460px] sm:min-h-[520px]">
        <div className="max-w-2xl space-y-5">
          
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wider uppercase backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Sri Sai Traders • Sivakasi Fireworks</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-1">
            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-100 tracking-wide">
              Light Up Your Celebrations
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-500 drop-shadow-md">
              This Diwali
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200 font-medium max-w-xl leading-relaxed">
            Wide Range of Crackers for Every Celebration. Direct wholesale & retail catalogue from the heart of Sivakasi pyrotechnics.
          </p>

          {/* Small Trust/Value Points */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1 text-xs font-bold text-amber-200">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Wholesale & Retail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>All Top Brands</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Events & Functions</span>
            </div>
          </div>

          {/* High Contrast CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* Browse Catalogue (Red) */}
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-sm font-bold shadow-lg shadow-red-900/40 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Browse Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* WhatsApp Enquiry (Green) */}
            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=Hello%20Sri%20Sai%20Traders%2C%20I%20would%20like%20to%20enquire%20about%20your%20cracker%20catalogue.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
