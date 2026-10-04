'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    const text = encodeURIComponent(
      'Hello Sri Sai Traders, I would like to enquire about your wholesale and retail cracker catalogue.'
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <aside
      aria-label="WhatsApp Contact Options"
      className="fixed bottom-6 right-6 z-40 flex items-center group cursor-pointer"
      onClick={handleClick}
    >
      {/* Tooltip on Hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Quick WhatsApp Enquiry
      </span>

      {/* Floating Button */}
      <button
        type="button"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-xl shadow-emerald-950/30 transform hover:scale-110 active:scale-95 transition-all duration-200"
        aria-label="Chat on WhatsApp with Sri Sai Traders"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="sr-only">Chat on WhatsApp with Sri Sai Traders</span>
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10" />
      </button>
    </aside>
  );
}
