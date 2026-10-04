import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles,
  ShieldCheck,
  Building2,
  Award,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { STORE_CONTACT } from '@/lib/catalogueData';

export const metadata = {
  title: 'About Sri Sai Traders | Wholesale & Retail Sivakasi Fireworks',
  description:
    'Learn about Sri Sai Traders, your trusted Sivakasi fireworks partner in Kagganur, Tamil Nadu. Premium crackers for Diwali, weddings, and celebrations.',
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#D32F2F] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">About Us</span>
        </nav>

        {/* Hero Banner Card */}
        <div className="bg-[#090D1A] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-amber-500/20 shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>About Sri Sai Traders</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-tight">
              Brighter Moments Together
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              We are authorized dealers in all types of Sivakasi crackers for both wholesale and retail markets. Based in Kagganur, Tamil Nadu, we bring joy, color, and grandeur to celebrations across South India.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-amber-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Genuine Sivakasi Crackers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Wholesale Direct Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Prompt WhatsApp Response
              </span>
            </div>
          </div>
        </div>

        {/* Story & Commitment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-[#D32F2F] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Wholesale & Retail</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Whether you need single family gift boxes or hundreds of carton consignments for local retail shops, Sri Sai Traders provides transparent tiered pricing and genuine Sivakasi stock.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Top Trusted Brands</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We partner directly with Sivakasi&apos;s most reputed pyrotechnic factories including Standard Fireworks, Sony, Vadivel, and Ajanta to ensure safety, quality, and brilliant visual effects.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Safety & Compliance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We operate strictly under statutory guidelines. All fireworks are dispatched via certified authorized parcel transport, and we emphasize safe celebratory handling for all families.
            </p>
          </div>
        </div>

        {/* Contact & Location Strip */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h3 className="text-xl font-black text-slate-900">
              Visit or Contact Our Kagganur Depot
            </h3>
            <div className="text-xs text-slate-600 space-y-1 font-medium">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D32F2F]" />
                <span>{STORE_CONTACT.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D32F2F]" />
                <span>{STORE_CONTACT.phones.join(' • ')}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs shadow-md transition-all"
            >
              Browse 140 Items
            </Link>
            <a
              href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
