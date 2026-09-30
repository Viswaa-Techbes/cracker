'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { useToast } from '@/lib/toastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been received! We will contact you shortly.', 'success');
  };

  return (
    <div className="py-14 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-festive-700 bg-festive-100 px-3 py-1 rounded-full border border-festive-200">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Contact Sparkle Crackers Sivakasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Need assistance with bulk family packs, offline payment verification, or transport drop points? Our Sivakasi counter team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Store Information */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-8">
            <h2 className="text-lg font-black text-slate-900">
              Counter & Logistics Details
            </h2>

            <div className="space-y-6 text-xs text-slate-600">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-festive-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Physical Store Address</h4>
                  <p className="mt-1 leading-relaxed">
                    Main Bazaar Road, Near Town Clock Tower,
                    <br />
                    Sivakasi, Tamil Nadu - 626123, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Helpline & Orders</h4>
                  <p className="mt-1 leading-relaxed font-semibold text-slate-800">
                    +91 98765 43210
                  </p>
                  <p className="text-[11px] text-slate-400">Available 9:00 AM - 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Official Email</h4>
                  <p className="mt-1 leading-relaxed">
                    orders@sparklecrackers.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Working Hours</h4>
                  <p className="mt-1 leading-relaxed">
                    Monday to Saturday: 8:30 AM - 9:30 PM
                    <br />
                    Sunday: 9:00 AM - 6:00 PM (Festive Season)
                  </p>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA */}
            <div className="pt-4 border-t border-slate-100">
              <a
                href="https://wa.me/919876543210?text=Hello%20Sparkle%20Crackers%2C%20I%20have%20an%20enquiry%20regarding%20the%20catalogue."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat with Sivakasi Team on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right 7 Cols: Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm">
            <h2 className="text-lg font-black text-slate-900 mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out this form and our sales coordinator will respond regarding orders or transport inquiries.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-base font-bold text-emerald-900">Inquiry Received!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. Our Sivakasi counter representative will call or message your mobile number shortly.
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
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Message or Product Inquiry *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us what products you are interested in or questions about delivery"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-bold text-xs shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
