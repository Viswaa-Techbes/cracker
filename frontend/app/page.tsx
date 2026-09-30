'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, CheckCircle2, PhoneCall, Truck, HelpCircle } from 'lucide-react';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';
import { fetchApi } from '@/lib/api';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await fetchApi('/products?featured=true&limit=8');
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
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Dynamic Categories Section */}
      <CategoryGrid />

      {/* 3. Featured Products Section */}
      <section className="py-16 bg-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-festive-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Handpicked Selection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Featured Festive Products
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Popular sparklers, giant flower pots, multi-shot comets, and family gift boxes.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-festive-700 hover:text-festive-800 transition-colors"
            >
              <span>Explore All Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} loading={loading} />
        </div>
      </section>

      {/* 4. Why Shop With Us (Factual service features only) */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Our Catalogue
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Reliable pyrotechnic catalogue ordering designed for customer convenience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-festive-700 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Wide Selection</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Full 27-page catalogue spanning sparklers, comets, chakkars, and family packs.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Easy Ordering</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Intuitive cart and checkout process without mandatory registration.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Offline Payment</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                No credit cards or online gateways required. Pay via cash or offline UPI.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Customer Support</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Direct phone and WhatsApp assistance for order verification and inquiries.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Order Tracking</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Instant unique order ID generation with live status updates.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Safety Callout Banner */}
      <section className="py-12 bg-amber-500/10 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Fireworks Safety & Delivery Guidelines
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                Safety first! Please review our recommended handling instructions and regional transport
                regulations prior to placing orders.
              </p>
            </div>
          </div>
          <Link
            href="/safety"
            className="shrink-0 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
          >
            View Safety Page
          </Link>
        </div>
      </section>
    </div>
  );
}
