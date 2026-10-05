import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Zap,
  Tag,
  PartyPopper,
} from 'lucide-react';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Product Catalogue', href: '/products' },
    { label: 'Shop by Category', href: '/#categories' },
    { label: 'About Sri Sai Traders', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Safety Guidelines', href: '/safety' },
  ];

  const featuredCategories = [
    { name: 'Sparkles', slug: 'sparkles' },
    { name: 'Fancy', slug: 'fancy' },
    { name: 'Flower Pot', slug: 'flower-pot' },
    { name: 'Chakkar', slug: 'chakkar' },
    { name: 'Comet Shots', slug: 'comet' },
    { name: 'Crackers', slug: 'crackers' },
    { name: 'Rockets', slug: 'rocket' },
    { name: 'Gift Boxes', slug: 'gift-box' },
  ];

  return (
    <footer className="bg-[#070A12] text-white border-t border-amber-500/20 relative overflow-hidden">
      {/* Decorative fireworks gradient */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Brand & Address (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-200 p-0.5 shrink-0 flex items-center justify-center">
                <Image
                  src="/images/logo-icon.svg"
                  alt="Sri Sai Traders"
                  width={46}
                  height={46}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
                  {STORE_CONTACT.name}
                </h3>
                <p className="text-[11px] text-amber-300/80 font-medium">
                  {STORE_CONTACT.subtitle}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Authentic celebration fireworks directly from Sivakasi makers. Authorized wholesale and retail dealers with certified quality, competitive pricing, and dedicated customer support.
            </p>

            <div className="pt-2 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{STORE_CONTACT.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{STORE_CONTACT.phones[0]} / {STORE_CONTACT.phones[1]}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${STORE_CONTACT.email}`} className="hover:text-amber-300 transition-colors">
                  {STORE_CONTACT.email}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-300 border-b border-amber-500/20 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:text-amber-300 transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories (Col 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-300 border-b border-amber-500/20 pb-2">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {featuredCategories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/products?category=${c.slug}`} className="hover:text-amber-300 transition-colors block">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Codes: WhatsApp Business + Instagram (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-amber-300 border-b border-amber-500/20 pb-2">
              Connect With Us
            </h4>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* WhatsApp QR */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center backdrop-blur-xs">
                <div className="w-20 h-20 bg-white rounded-xl p-1 mb-2 shadow-sm">
                  <Image
                    src="/images/qr-whatsapp.svg"
                    alt="WhatsApp QR Code"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Business Account
                </span>
              </div>

              {/* Instagram QR */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex flex-col items-center text-center backdrop-blur-xs">
                <div className="w-20 h-20 bg-white rounded-xl p-1 mb-2 shadow-sm">
                  <Image
                    src="/images/qr-instagram.svg"
                    alt="Instagram QR Code"
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-[11px] font-bold text-pink-400">
                  @thesrisaitraders
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  Scan for Videos
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-snug">
              Follow our official social profiles for newly arrived Sivakasi cracker batches, live fireworks demo clips, and festive discount announcements.
            </p>
          </div>

        </div>
      </div>

      {/* Horizontal Trust Bar (Matching Reference Screenshot) */}
      <div className="bg-black/50 border-t border-b border-amber-500/20 py-3.5 px-4 text-xs font-bold text-amber-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-center">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Fast Enquiry via WhatsApp</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Genuine Products Top Brands</span>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <span>Wholesale & Retail Best Prices</span>
          </div>
          <div className="flex items-center gap-2">
            <PartyPopper className="w-4 h-4 text-amber-400" />
            <span>Support for Events & Functions</span>
          </div>
        </div>
      </div>

      {/* Copyright & Developer Credit Bar */}
      <div className="border-t border-slate-800/80 bg-[#060810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col items-center justify-center text-center text-xs text-slate-400 gap-1.5">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span>© 2026 Sri Sai Traders. All Rights Reserved.</span>
            <span className="text-slate-600">•</span>
            <Link href="/safety" className="hover:text-amber-300 transition-colors text-[11px]">
              Safety Precautions
            </Link>
          </div>
          <p className="text-[11px] text-slate-500">
            Developed by{' '}
            <a
              href="https://techbes.co.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-amber-400 font-medium transition-colors hover:underline underline-offset-2"
            >
              TechBes
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
