import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-slate-50 to-white py-16 md:py-24 border-b border-amber-100">
      {/* Decorative Sparkle Highlights */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-festive-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-festive-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-100 border border-festive-300 text-festive-800 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-festive-700" />
            <span>Diwali 2026 Direct Catalogue</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Celebrate <span className="bg-gradient-to-r from-festive-700 via-festive-600 to-amber-600 bg-clip-text text-transparent">Brighter</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed">
            Explore our complete collection of crackers and festive products.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-bold text-sm shadow-sparkle hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Shop Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/#categories"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-sm transition-all"
            >
              <span>Browse Categories</span>
            </Link>
          </div>

          {/* Factual Value Props */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-festive-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Catalogue Variety</h4>
                <p className="text-[11px] text-slate-500">14 Festive Categories</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Zero Online Fees</h4>
                <p className="text-[11px] text-slate-500">Offline Cash / UPI</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Verified Quality</h4>
                <p className="text-[11px] text-slate-500">Authentic Sivakasi</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Fast Confirmation</h4>
                <p className="text-[11px] text-slate-500">WhatsApp / Call</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
