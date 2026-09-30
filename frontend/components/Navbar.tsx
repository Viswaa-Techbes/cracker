'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ShoppingBag,
  Search,
  Menu,
  X,
  PhoneCall,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';

export default function Navbar() {
  const router = useRouter();
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

  return (
    <>
      {/* Top Festive Announcement Bar */}
      <div className="bg-gradient-to-r from-festive-900 via-festive-700 to-festive-900 text-white text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Flame className="w-3.5 h-3.5 text-festive-300 animate-pulse shrink-0" />
        <span>Diwali 2026 Genuine Sivakasi Crackers Catalogue • Offline Payment Only (Cash / UPI)</span>
        <Flame className="w-3.5 h-3.5 text-festive-300 animate-pulse shrink-0" />
      </div>

      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-festive-700 to-festive-500 flex items-center justify-center shadow-md shadow-festive-600/30 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                  SPARKLE<span className="text-festive-700 font-black">CRACKERS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-600 -mt-1">
                  Sivakasi Direct Catalogue
                </span>
              </div>
            </Link>

            {/* Desktop Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex flex-1 max-w-md relative"
            >
              <input
                type="text"
                placeholder="Search sparkles, chakkars, comets, gift boxes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-11 pr-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 focus:border-transparent transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            </form>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
              <Link href="/" className="hover:text-festive-700 transition-colors">
                Home
              </Link>
              <Link href="/products" className="hover:text-festive-700 transition-colors">
                Products
              </Link>
              <Link href="/#categories" className="hover:text-festive-700 transition-colors">
                Categories
              </Link>
              <Link
                href="/safety"
                className="hover:text-festive-700 transition-colors flex items-center gap-1 text-slate-600"
              >
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                Safety & Legal
              </Link>
              <Link href="/contact" className="hover:text-festive-700 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions: Cart & WhatsApp */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Enquiry Button */}
              <a
                href="https://wa.me/919876543210?text=Hello%20Sparkle%20Crackers%2C%20I%20have%20an%20enquiry%20regarding%20the%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 text-xs font-bold transition-colors"
                title="Chat on WhatsApp"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={openCart}
                className="relative flex items-center gap-2 bg-gradient-to-r from-festive-700 to-festive-600 text-white px-4 py-2.5 rounded-full font-bold text-sm shadow-md hover:from-festive-800 hover:to-festive-700 transition-all transform active:scale-95"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-white text-festive-700 text-xs font-black px-2 py-0.5 rounded-full shadow-inner">
                  {totalItemsCount}
                </span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-festive-700 focus:outline-none"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar Row */}
          <div className="md:hidden pb-3">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search crackers, gift boxes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
            </form>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-festive-700"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-festive-700"
            >
              All Products
            </Link>
            <Link
              href="/#categories"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-festive-700"
            >
              Categories
            </Link>
            <Link
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-amber-700 hover:text-festive-700"
            >
              Safety Guidelines & Legal Notice
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-slate-800 hover:text-festive-700"
            >
              Contact Us
            </Link>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <Link href="/admin/login" className="hover:text-slate-900 underline">
                Admin Login
              </Link>
              <span>Diwali 2026 Edition</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
