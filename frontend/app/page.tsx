'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building2,
  PhoneCall,
  Clock,
  MessageCircle,
  Truck,
  Flame,
} from 'lucide-react';
import Hero from '@/components/Hero';
import BrandTrustStrip from '@/components/BrandTrustStrip';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';
import { fetchApi } from '@/lib/api';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchApi('/products?featured=true&limit=9');
        if (res.success && res.data) {
          setFeaturedProducts(res.data);
        }
      } catch (e) {
        console.error('Failed to load featured products', e);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <div className="bg-[#F8FAFC]">
      {/* 1. Hero Section: Diwali Fireworks & Sri Sai Traders Headline */}
      <Hero />

      {/* 2. Brand & Trust Strip: Standard, Sony, Ajanta, Vadivel, 365 Days */}
      <BrandTrustStrip />

      {/* 3. Shop by Category: All 15 Categories from Catalogue */}
      <CategoryGrid />

      {/* 4. Featured Catalogue Products */}
      <section className="py-16 sm:py-20 bg-white border-t border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#D32F2F] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Popular Selections</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Crackers & Fireworks
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Best-selling sparklers, giant flower pots, multi-shot comets, and family gift boxes from our catalogue.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#D32F2F] text-white text-xs font-extrabold transition-colors shadow-sm self-start md:self-auto"
            >
              <span>View Full Catalogue (140 Items)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
          
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-extrabold text-sm shadow-md transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Explore All 15 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* 5. Why Choose Sri Sai Traders */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-[#D32F2F] text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-4 h-4" />
              <span>Sivakasi Direct Advantage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Why Choose Sri Sai Traders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
              Trusted pyrotechnic catalogue supply for families, retailers, festival committees, and wedding events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D32F2F] flex items-center justify-center mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Wholesale & Retail</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Enjoy wholesale direct pricing whether you are ordering small family packages or massive bulk consignments.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">100% Genuine Brands</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Certified authentic products from Standard, Sony, Thrisul, Yes Bro, and leading Sivakasi pyrotechnic manufacturers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Quick WhatsApp Enquiry</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Select your items, tap send enquiry, and receive immediate availability and bill confirmation on WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900">Events & Functions</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Specialized assortment recommendations for temple festivals, wedding receptions, sports events, and New Year bashes.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. WhatsApp Call-to-Action Strip */}
      <section className="py-12 bg-gradient-to-r from-[#090D1A] via-[#121B30] to-[#090D1A] text-white border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Have Custom Requirements or Bulk Orders?
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Connect Directly with Sri Sai Traders on WhatsApp
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Share your order list or function requirements. Our team in Kagganur will respond with current stock, packaging details, and pricing.
            </p>
          </div>

          <a
            href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=Hello%20Sri%20Sai%20Traders%2C%20I%20have%20an%20enquiry%20for%20bulk%20crackers%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm shadow-lg shadow-emerald-950/40 transition-all transform hover:scale-105 active:scale-95"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Chat on WhatsApp (+91 {STORE_CONTACT.whatsappNumber.slice(2)})</span>
          </a>
        </div>
      </section>
    </div>
  );
}
