import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, MapPin, Phone, Mail, AlertTriangle, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Safety & Offline Ordering Notice Banner */}
        <div className="bg-amber-950/40 border border-amber-600/30 rounded-2xl p-6 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-white font-bold text-sm tracking-wide">
                Offline Payment & Legal Pyrotechnic Compliance Notice
              </h4>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed max-w-3xl">
                We strictly adhere to PESO (Petroleum and Explosives Safety Organization) regulations.
                No online payment gateways are integrated. All orders are submitted for manual offline
                verification. Minimum purchase age is 18 years. Delivery is subject to regional transport policies.
              </p>
            </div>
          </div>
          <Link
            href="/safety"
            className="shrink-0 px-4 py-2 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-semibold transition-colors"
          >
            Read Safety Rules
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-festive-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                SPARKLE<span className="text-festive-500">CRACKERS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Authentic festive fireworks direct from Sivakasi manufacturing hubs. Transparent prices,
              genuine pack quantities, and verified offline confirmation.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified Green Pyrotechnics</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-amber-400 transition-colors">
                  Full 2026 Catalogue
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-amber-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-amber-400 transition-colors">
                  Submit Offline Order
                </Link>
              </li>
              <li>
                <Link href="/safety" className="hover:text-amber-400 transition-colors">
                  Safety & Transport Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Catalogue Categories
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/category/sparkles" className="hover:text-amber-400 transition-colors">
                  Sparkles & Electric Showers
                </Link>
              </li>
              <li>
                <Link href="/category/flower-pot" className="hover:text-amber-400 transition-colors">
                  Flower Pots & Fountains
                </Link>
              </li>
              <li>
                <Link href="/category/chakkar" className="hover:text-amber-400 transition-colors">
                  Ground Chakkars & Spinners
                </Link>
              </li>
              <li>
                <Link href="/category/comet" className="hover:text-amber-400 transition-colors">
                  Comet Multi-Shots & Aerials
                </Link>
              </li>
              <li>
                <Link href="/category/gift-box" className="hover:text-amber-400 transition-colors">
                  Family Gift Assortment Boxes
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-festive-500 shrink-0 mt-0.5" />
                <span>Main Bazaar Road, Near Town Clock Tower, Sivakasi, Tamil Nadu - 626123</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-festive-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-festive-500 shrink-0" />
                <span>orders@sparklecrackers.com</span>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors border border-slate-800 rounded-md px-2.5 py-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Store Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Sparkle Crackers Sivakasi. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link href="/safety" className="hover:text-slate-400">
              Safety Regulations
            </Link>
            <Link href="/contact" className="hover:text-slate-400">
              Support & Inquiry
            </Link>
            <Link href="/admin/login" className="hover:text-slate-400">
              Staff Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
