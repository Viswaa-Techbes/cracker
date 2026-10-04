'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/lib/toastContext';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to Sri Sai Traders! We will reply on WhatsApp.', 'success');
    
    // Also construct WhatsApp enquiry option
    const text = encodeURIComponent(
      `Hello Sri Sai Traders,\n*Name:* ${name}\n*Phone:* ${phone}\n*Inquiry:* ${message}`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 sm:py-14 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-[#D32F2F] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-wider text-[#D32F2F] bg-red-50 px-3 py-1 rounded-full border border-red-200">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact Sri Sai Traders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Wholesale & Retail enquiries, bulk festival supply, or questions about our cracker catalogue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Store Details & QR Codes */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base sm:text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
              Store & Logistics Depot
            </h2>

            <div className="space-y-5 text-xs text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#D32F2F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Physical Address</h4>
                  <p className="mt-1 leading-relaxed text-slate-700">
                    {STORE_CONTACT.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Phone Contacts</h4>
                  <p className="mt-1 leading-relaxed font-semibold text-slate-800">
                    {STORE_CONTACT.phones.join(' • ')}
                  </p>
                  <p className="text-[11px] text-slate-400">Available 8:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="mt-1 leading-relaxed font-semibold text-slate-800">
                    {STORE_CONTACT.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                  <p className="mt-1 leading-relaxed">
                    Monday to Sunday: 8:00 AM - 10:00 PM (Festive Season)
                  </p>
                </div>
              </div>
            </div>

            {/* QR Codes Strip */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Image
                  src="/images/qr-whatsapp.svg"
                  alt="WhatsApp QR"
                  width={75}
                  height={75}
                  className="mx-auto rounded-lg mb-1"
                />
                <span className="text-[10px] font-bold text-slate-700 block">WhatsApp QR</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <Image
                  src="/images/qr-instagram.svg"
                  alt="Instagram QR"
                  width={75}
                  height={75}
                  className="mx-auto rounded-lg mb-1"
                />
                <span className="text-[10px] font-bold text-slate-700 block">Instagram QR</span>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=Hello%20Sri%20Sai%20Traders%2C%20I%20have%20an%20enquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right 7 Cols: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <h2 className="text-base sm:text-lg font-black text-slate-900 mb-1">
              Send an Instant Enquiry
            </h2>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Submit your enquiry below and connect directly with our sales coordinator in Kagganur.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Enquiry Dispatched!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. We have opened WhatsApp for you, and our counter representative will also get in touch.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setName('');
                    setPhone('');
                    setMessage('');
                    setSubmitted(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Message or Product Enquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us which crackers you need or questions about bulk delivery..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white font-medium resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
