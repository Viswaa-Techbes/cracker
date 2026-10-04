'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  MessageCircle,
  User,
  Phone,
  MapPin,
  FileText,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Tag,
  PartyPopper,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { getImageUrl } from '@/lib/api';
import { openWhatsAppEnquiry } from '@/lib/whatsapp';
import { useToast } from '@/lib/toastContext';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function CartPage() {
  const { items, subtotal, totalItemsCount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form submission: Validate and launch WhatsApp Enquiry
  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.trim().length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    if (!address.trim()) {
      showToast('Please enter your complete delivery/contact address', 'error');
      return;
    }

    setSubmitting(true);

    try {
      openWhatsAppEnquiry(
        items,
        {
          name: fullName,
          mobile: mobileNumber,
          address: address,
          message: message,
        },
        subtotal
      );

      showToast('Opening WhatsApp with your order enquiry...', 'success');
    } catch (err) {
      console.error('Failed to open WhatsApp', err);
      showToast('Could not open WhatsApp. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-[#F8FAFC] min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center mx-auto mb-5 shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Your Enquiry Cart is Empty
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
            You haven&apos;t added any crackers to your enquiry list yet. Browse our full 140-item catalogue to select sparklers, pots, chakkars, and multi-shots!
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-extrabold text-sm shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore 2026 Catalogue</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb matching reference: Home > Enquiry Cart + Continue Shopping */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#D32F2F] transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-slate-900 font-bold">Enquiry Cart</span>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#D32F2F] transition-colors border border-slate-300 rounded-lg px-3 py-1.5 bg-white shadow-2xs"
          >
            <span>+ Continue Shopping</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Your Enquiry Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Review your selected products and send enquiry via WhatsApp.
          </p>
        </div>

        {/* Main Cart Card Container */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden mb-8">
          
          {/* Table Header (Desktop) */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {/* Cart Item Rows */}
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div
                key={item.productId}
                className="p-4 sm:px-6 sm:py-4 sm:grid sm:grid-cols-12 gap-4 items-center flex flex-col sm:flex-row justify-between"
              >
                {/* Product Col (Thumbnail + Title + Category + Pack) */}
                <div className="sm:col-span-5 flex items-center gap-3.5 w-full">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-50 border border-slate-100 p-1.5 shrink-0 flex items-center justify-center">
                    <Image
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-amber-700/80 font-bold uppercase tracking-wider">
                      {item.category || 'Crackers'}
                    </p>
                    <p className="text-[11px] text-slate-600 font-semibold">
                      {item.packQuantity}
                    </p>
                  </div>
                </div>

                {/* Price Col */}
                <div className="sm:col-span-2 text-left sm:text-center text-xs font-extrabold text-slate-800 w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between">
                  <span className="sm:hidden text-slate-400 font-medium">Price:</span>
                  <span>Rs.{item.price}/-</span>
                </div>

                {/* Quantity Controls Col */}
                <div className="sm:col-span-2 flex items-center justify-start sm:justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white shadow-2xs">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-slate-900 px-3 min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-100 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Total Col */}
                <div className="sm:col-span-2 text-right w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between border-t sm:border-0 pt-2 sm:pt-0">
                  <span className="sm:hidden text-xs text-slate-500 font-bold">Total:</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900">
                    Rs.{item.price * item.quantity}/-
                  </span>
                </div>

                {/* Action Trash Col */}
                <div className="sm:col-span-1 text-center w-full sm:w-auto mt-2 sm:mt-0 flex justify-end sm:justify-center">
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId)}
                    className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove item"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary Bar matching reference screenshot */}
          <div className="bg-slate-50 border-t border-slate-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs text-slate-500 font-semibold block">
                Final price and availability will be confirmed by Sri Sai Traders.
              </span>
            </div>

            <div className="flex items-baseline gap-3 text-right">
              <span className="text-xs sm:text-sm font-bold text-slate-700">
                Estimated Total (For Enquiry):
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#D32F2F]">
                Rs.{subtotal.toLocaleString('en-IN')}/-
              </span>
            </div>
          </div>

        </div>

        {/* Customer Details Form matching reference screenshot */}
        <form onSubmit={handleSendEnquiry} className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-[#D32F2F]" />
            <h2 className="text-base sm:text-lg font-black text-slate-900">
              Your Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="Enter your 10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Address <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              rows={3}
              placeholder="Enter your complete delivery address, city, and pincode"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium resize-none"
            />
          </div>

          {/* Message / Special Request */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">
              Message (Optional)
            </label>
            <input
              type="text"
              placeholder="Any special request or additional products?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Large Green WhatsApp Button matching reference */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Send Order Enquiry on WhatsApp</span>
            </button>
          </div>
        </form>

        {/* Trust Badges Bar matching reference */}
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-center">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Quick Enquiry via WhatsApp</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Best Prices Wholesale & Retail</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Wide Range All Top Brands</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span>Support Events & Functions</span>
            </div>
          </div>
        </div>

        {/* Safety & PESO Legal Notice Box matching reference screenshot */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-300 text-amber-950 text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="font-semibold leading-relaxed">
            Products subject to local regulations. Enquiry and availability confirmation required. Use fireworks safely and follow all safety guidelines.
          </p>
        </div>

      </div>
    </div>
  );
}
