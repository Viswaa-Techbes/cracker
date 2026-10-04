'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItemsCount, openCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Categories', href: '/#categories' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="w-full z-50 sticky top-0 shadow-lg">
      {/* 1. TOP HEADER: Deep Midnight Navy with Sri Sai Traders Branding & Contacts */}
      <div className="bg-[#090D1A] text-white border-b border-amber-500/20 relative overflow-hidden">
        {/* Subtle decorative fireworks ambient glows */}
        <div className="absolute top-0 right-1/4 w-96 h-full bg-gradient-to-r from-red-600/10 via-amber-500/10 to-transparent pointer-events-none blur-2xl" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Official Sri Sai Traders Brand & Emblem */}
            <Link href="/" className="flex items-center gap-3 sm:gap-4 group shrink-0">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform flex items-center justify-center">
                <Image
                  src="/images/logo-icon.svg"
                  alt="Sri Sai Traders Logo"
                  width={52}
                  height={52}
                  className="w-full h-full object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl md:text-3xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 font-serif drop-shadow-sm">
                  SRI SAI TRADERS
                </span>
                <span className="text-[10px] sm:text-xs text-amber-300/90 font-medium tracking-normal sm:tracking-wide">
                  {STORE_CONTACT.subtitle}
                </span>
              </div>
            </Link>

            {/* Right: Phone Numbers & WhatsApp (Desktop) */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Phone Contacts */}
              <div className="flex items-center gap-3 text-right">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-xs font-semibold text-slate-200">
                  <a href={`tel:${STORE_CONTACT.phones[0]}`} className="hover:text-amber-300 transition-colors">
                    {STORE_CONTACT.phones[0]}
                  </a>
                  <a href={`tel:${STORE_CONTACT.phones[1]}`} className="hover:text-amber-300 transition-colors text-slate-300">
                    {STORE_CONTACT.phones[1]}
                  </a>
                </div>
              </div>

              {/* WhatsApp Contact */}
              <div className="flex items-center gap-3 text-right border-l border-slate-700/60 pl-6">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-sm">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-xs font-semibold text-slate-200">
                  <a
                    href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=Hello%20Sri%20Sai%20Traders%2C%20I%20have%20an%20enquiry%20regarding%20crackers%20catalogue.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors text-emerald-300 font-bold"
                  >
                    +91 {STORE_CONTACT.whatsappNumber.slice(2)}
                  </a>
                  <span className="text-[10px] text-slate-400">WhatsApp Enquiry</span>
                </div>
              </div>
            </div>

            {/* Mobile Actions: WhatsApp + Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/50 transition-colors"
                aria-label="WhatsApp Enquiry"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-amber-300 hover:bg-slate-700 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 2. RED NAVIGATION BAR: Solid Festive Crimson with Links, Search, and Cart */}
      <nav className="bg-[#B71C1C] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            
            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-md text-sm font-bold tracking-wide transition-colors ${
                      isActive
                        ? 'bg-[#880E4F] text-yellow-300 shadow-inner'
                        : 'text-white/95 hover:bg-black/15 hover:text-yellow-200'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop / Tablet Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-1 max-w-md lg:max-w-sm xl:max-w-md relative"
            >
              <input
                type="text"
                placeholder="Search for crackers, e.g. sparkles, rockets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-slate-900 placeholder:text-slate-500 rounded-l-md py-1.5 pl-3 pr-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all font-medium"
              />
              <button
                type="submit"
                className="bg-[#D32F2F] hover:bg-[#C62828] text-white px-3.5 py-1.5 rounded-r-md border-l border-red-700/40 flex items-center justify-center transition-colors"
                aria-label="Search Catalogue"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>

            {/* Enquiry Cart Button */}
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className="flex items-center gap-2 bg-[#880E4F] hover:bg-[#700B41] text-white px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-bold shadow-sm transition-all transform active:scale-95 border border-red-400/30"
              >
                <ShoppingBag className="w-4 h-4 text-yellow-300" />
                <span className="hidden sm:inline">Enquiry Cart</span>
                <span className="bg-yellow-400 text-slate-950 text-xs font-black px-2 py-0.5 rounded-full shadow-inner">
                  {totalItemsCount}
                </span>
              </Link>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#880E4F] border-t border-red-900/60 px-4 pt-3 pb-5 space-y-2 text-sm shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md font-bold text-white hover:bg-black/20 hover:text-yellow-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-red-900/40 flex flex-col gap-2 text-xs text-yellow-100">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-300" />
                <span>Call Us: {STORE_CONTACT.phones[0]}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: +91 {STORE_CONTACT.whatsappNumber.slice(2)}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
