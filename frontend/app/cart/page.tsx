'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
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
  Truck,
  CheckCircle2,
  Edit2,
  Calendar,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { getImageUrl, fetchApi } from '@/lib/api';
import { openWhatsAppEnquiry } from '@/lib/whatsapp';
import { useToast } from '@/lib/toastContext';
import { STORE_CONTACT } from '@/lib/catalogueData';
import LegalDisclaimerBanner from '@/components/LegalDisclaimerBanner';

type BookingStep = 'cart' | 'details' | 'overview';

export default function CartPage() {
  const {
    items,
    subtotal,
    totalItemsCount,
    transportationCharge,
    setTransportationCharge,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();
  const { showToast } = useToast();

  const [currentStep, setCurrentStep] = useState<BookingStep>('cart');

  // Customer & Booking Details form state
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Bangalore / Hosur / Sivakasi');
  const [pincode, setPincode] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Transportation charge input state (local string for smooth editing)
  const [transportInput, setTransportInput] = useState<string>(transportationCharge.toString());
  const [transportError, setTransportError] = useState<string>('');

  // Synchronize local transport input when context charge changes externally
  useEffect(() => {
    setTransportInput(transportationCharge.toString());
  }, [transportationCharge]);

  // Load saved customer details from localStorage on mount
  useEffect(() => {
    try {
      const savedName = localStorage.getItem('cracker_cust_name');
      const savedMobile = localStorage.getItem('cracker_cust_mobile');
      const savedAddress = localStorage.getItem('cracker_cust_address');
      const savedCity = localStorage.getItem('cracker_cust_city');
      const savedPincode = localStorage.getItem('cracker_cust_pincode');
      const savedDate = localStorage.getItem('cracker_cust_date');
      const savedMsg = localStorage.getItem('cracker_cust_msg');

      if (savedName) setFullName(savedName);
      if (savedMobile) setMobileNumber(savedMobile);
      if (savedAddress) setAddress(savedAddress);
      if (savedCity) setCity(savedCity);
      if (savedPincode) setPincode(savedPincode);
      if (savedDate) setPreferredDate(savedDate);
      if (savedMsg) setMessage(savedMsg);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save customer details to localStorage when updated
  const saveCustomerDetails = (
    nameVal: string,
    mobileVal: string,
    addressVal: string,
    cityVal: string,
    pincodeVal: string,
    dateVal: string,
    msgVal: string
  ) => {
    try {
      localStorage.setItem('cracker_cust_name', nameVal);
      localStorage.setItem('cracker_cust_mobile', mobileVal);
      localStorage.setItem('cracker_cust_address', addressVal);
      localStorage.setItem('cracker_cust_city', cityVal);
      localStorage.setItem('cracker_cust_pincode', pincodeVal);
      localStorage.setItem('cracker_cust_date', dateVal);
      localStorage.setItem('cracker_cust_msg', msgVal);
    } catch {
      // Ignore localStorage errors
    }
  };

  // Real-time handle Transportation Input Change
  const handleTransportInputChange = (val: string) => {
    setTransportInput(val);
    const trimmed = val.trim();

    if (trimmed === '') {
      setTransportError('');
      setTransportationCharge(0);
      return;
    }

    const num = Number(trimmed);
    if (isNaN(num)) {
      setTransportError('Please enter a valid numeric charge');
      return;
    }

    if (num < 0) {
      setTransportError('Transportation charge cannot be negative');
      return;
    }

    setTransportError('');
    setTransportationCharge(num);
  };

  // Explicit Apply button handler
  const handleApplyTransport = () => {
    const trimmed = transportInput.trim();
    if (trimmed === '') {
      setTransportationCharge(0);
      setTransportError('');
      showToast('Transportation amount set to ₹0', 'info');
      return;
    }

    const num = Number(trimmed);
    if (isNaN(num) || num < 0) {
      setTransportError('Please enter a valid positive number or zero');
      showToast('Invalid transportation amount', 'error');
      return;
    }

    setTransportError('');
    setTransportationCharge(num);
    showToast(`Applied ₹${num.toLocaleString('en-IN')} transportation amount`, 'success');
  };

  // Step 1 Validation -> Proceed to Step 2
  const handleProceedToDetails = () => {
    if (items.length === 0) {
      showToast('Your cart is empty. Please add products first.', 'error');
      return;
    }
    setCurrentStep('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 Validation -> Proceed to Step 3 (BOOKING OVERVIEW)
  const handleProceedToOverview = (e: React.FormEvent) => {
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
      showToast('Please enter your delivery / contact address', 'error');
      return;
    }

    saveCustomerDetails(fullName, mobileNumber, address, city, pincode, preferredDate, message);
    setCurrentStep('overview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 3: Final Submit / Confirm Booking Flow
  const handleConfirmAndSubmitBooking = async () => {
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    if (!fullName.trim() || !mobileNumber.trim() || !address.trim()) {
      showToast('Please fill out your contact details first', 'error');
      setCurrentStep('details');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Submit order payload to backend if API is available
      const orderPayload = {
        customerName: fullName.trim(),
        mobile: mobileNumber.trim(),
        whatsapp: mobileNumber.trim(),
        address: address.trim(),
        city: city.trim() || 'Tamil Nadu',
        pincode: pincode.trim() || '635103',
        orderType: 'DELIVERY',
        preferredDate: preferredDate.trim(),
        customerNotes: message.trim(),
        subtotal: subtotal,
        transportationCharge: transportationCharge,
        deliveryFee: transportationCharge,
        totalAmount: grandTotal,
        items: items.map((i) => ({
          productId: i.productId.replace(/^prod-/, ''),
          quantity: i.quantity,
        })),
      };

      try {
        await fetchApi('/orders', {
          method: 'POST',
          body: JSON.stringify(orderPayload),
        });
      } catch (err) {
        console.warn('Backend order submission fallback:', err);
      }

      // 2. Open WhatsApp with formatted booking message
      openWhatsAppEnquiry(
        items,
        {
          name: fullName,
          mobile: mobileNumber,
          address: address,
          city: city,
          pincode: pincode,
          preferredDate: preferredDate,
          message: message,
        },
        subtotal,
        transportationCharge
      );

      showToast('Booking submitted! Opening WhatsApp enquiry...', 'success');
    } catch (err) {
      console.error('Failed to submit booking', err);
      showToast('Could not complete booking. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Empty cart view
  if (items.length === 0) {
    return (
      <div className="py-10 sm:py-14 bg-[#F8FAFC] min-h-[70vh]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Prominent Legal Disclaimer Banner */}
          <LegalDisclaimerBanner variant="card" />

          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center mx-auto mb-5 shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Your Enquiry Cart is Empty
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">
              You haven&apos;t added any crackers to your enquiry list yet. Browse our full 140-item catalogue to view sparklers, pots, chakkars, and multi-shots!
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
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#D32F2F] transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <Link href="/products" className="hover:text-[#D32F2F] transition-colors">
              Products
            </Link>
            <span>&gt;</span>
            <span className="text-slate-900 font-bold">
              {currentStep === 'cart' && 'Enquiry Cart'}
              {currentStep === 'details' && 'Contact Details'}
              {currentStep === 'overview' && 'Enquiry Overview'}
            </span>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#D32F2F] transition-colors border border-slate-300 rounded-lg px-3 py-1.5 bg-white shadow-2xs"
          >
            <span>+ Continue Browsing Catalogue</span>
          </Link>
        </div>

        {/* ========================================================= */}
        {/* PROMINENT COMPLIANCE DISCLAIMER (BEFORE PRODUCTS/DETAILS) */}
        {/* ========================================================= */}
        <div className="mb-6">
          <LegalDisclaimerBanner variant="card" />
        </div>

        {/* Stepped Enquiry Progress Header */}
        <div className="mb-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            {/* Step 1 */}
            <button
              type="button"
              onClick={() => setCurrentStep('cart')}
              className="flex flex-col items-center gap-1.5 z-10 group cursor-pointer"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all ${
                  currentStep === 'cart'
                    ? 'bg-[#D32F2F] text-white shadow-md shadow-red-500/30 scale-105'
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {currentStep !== 'cart' ? <CheckCircle2 className="w-5 h-5" /> : '1'}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold ${
                  currentStep === 'cart' ? 'text-[#D32F2F]' : 'text-slate-700'
                }`}
              >
                1. Selected Products
              </span>
            </button>

            {/* Connecting Line 1-2 */}
            <div
              className={`flex-1 h-0.5 mx-2 -mt-4 transition-colors ${
                currentStep === 'details' || currentStep === 'overview'
                  ? 'bg-emerald-500'
                  : 'bg-slate-200'
              }`}
            />

            {/* Step 2 */}
            <button
              type="button"
              onClick={() => {
                if (items.length > 0) setCurrentStep('details');
              }}
              className="flex flex-col items-center gap-1.5 z-10 group cursor-pointer"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all ${
                  currentStep === 'details'
                    ? 'bg-[#D32F2F] text-white shadow-md shadow-red-500/30 scale-105'
                    : currentStep === 'overview'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {currentStep === 'overview' ? <CheckCircle2 className="w-5 h-5" /> : '2'}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold ${
                  currentStep === 'details'
                    ? 'text-[#D32F2F]'
                    : currentStep === 'overview'
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                2. Contact Details
              </span>
            </button>

            {/* Connecting Line 2-3 */}
            <div
              className={`flex-1 h-0.5 mx-2 -mt-4 transition-colors ${
                currentStep === 'overview' ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />

            {/* Step 3 */}
            <button
              type="button"
              onClick={() => {
                if (fullName.trim() && mobileNumber.trim() && address.trim()) {
                  setCurrentStep('overview');
                }
              }}
              className="flex flex-col items-center gap-1.5 z-10 group cursor-pointer"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-black text-xs sm:text-sm transition-all ${
                  currentStep === 'overview'
                    ? 'bg-[#D32F2F] text-white shadow-md shadow-red-500/30 scale-105 ring-4 ring-red-100'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {currentStep === 'overview' ? <CheckCircle2 className="w-5 h-5" /> : '3'}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-bold ${
                  currentStep === 'overview' ? 'text-[#D32F2F]' : 'text-slate-400'
                }`}
              >
                3. Enquiry Overview
              </span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* STEP 1: PRODUCT SELECTION & CART TABLE                    */}
        {/* ========================================================= */}
        {currentStep === 'cart' && (
          <div className="space-y-6">
            <div className="mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Selected Products for Enquiry
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Review your items, modify quantities, and proceed to provide your contact details for WhatsApp enquiry.
              </p>
            </div>

            {/* Products Table Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
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
                    {/* Thumbnail + Name */}
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

                    {/* Unit Price */}
                    <div className="sm:col-span-2 text-left sm:text-center text-xs font-extrabold text-slate-800 w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between">
                      <span className="sm:hidden text-slate-400 font-medium">Price:</span>
                      <span>Rs.{item.price}/-</span>
                    </div>

                    {/* Quantity Controls */}
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

                    {/* Line Total */}
                    <div className="sm:col-span-2 text-right w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between border-t sm:border-0 pt-2 sm:pt-0">
                      <span className="sm:hidden text-xs text-slate-500 font-bold">Total:</span>
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        Rs.{item.price * item.quantity}/-
                      </span>
                    </div>

                    {/* Remove Action */}
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

              {/* Summary Bar */}
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-500 font-semibold text-center sm:text-left">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in your selection list.
                </span>

                <div className="flex items-baseline gap-3 text-right">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">Subtotal:</span>
                  <span className="text-xl sm:text-2xl font-black text-[#D32F2F]">
                    Rs.{subtotal.toLocaleString('en-IN')}/-
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button to Step 2 */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={handleProceedToDetails}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-black text-sm sm:text-base shadow-lg shadow-red-950/15 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Proceed to Contact Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: CONTACT & LOCATION DETAILS FORM                   */}
        {/* ========================================================= */}
        {currentStep === 'details' && (
          <form onSubmit={handleProceedToOverview} className="space-y-6">
            <div className="mb-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Contact & Location Details
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Enter your contact info so Sri Sai Traders can process your catalogue enquiry.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <User className="w-5 h-5 text-[#D32F2F]" />
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  Contact Information
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
                    placeholder="Enter 10-digit mobile number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Contact / Delivery Address <span className="text-red-600">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Door number, street name, locality, landmark"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* City / District */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    City / Town / District
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, Hosur, Sivakasi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                {/* Pincode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Pincode
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 560001, 635103"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              {/* Preferred Delivery Date & Special Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Preferred Delivery / Function Date (Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Special Notes / Requests (Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Morning delivery, festival function order"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('cart')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Enquiry Cart</span>
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-black text-sm sm:text-base shadow-lg shadow-red-950/15 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>Proceed to Enquiry Overview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ========================================================= */}
        {/* STEP 3: ENQUIRY OVERVIEW WITH TRANSPORTATION CHARGES      */}
        {/* ========================================================= */}
        {currentStep === 'overview' && (
          <div className="space-y-6">
            <div className="mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#D32F2F] bg-red-50 border border-red-200 px-3 py-1 rounded-full">
                Enquiry Review
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                ENQUIRY OVERVIEW
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Review your selected items, contact details, and estimated transportation before submitting your enquiry.
              </p>
            </div>

            {/* A. Selected Products Summary */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#D32F2F]" />
                  <h3 className="text-sm font-black text-slate-900">
                    Selected Catalogue Products ({items.length})
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('cart')}
                  className="text-xs font-bold text-[#D32F2F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Modify Items</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="px-6 py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center">
                        <Image
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {item.packQuantity} • Qty: <span className="font-bold text-slate-800">{item.quantity}</span> x Rs.{item.price}/-
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-black text-slate-900">
                        Rs.{(item.price * item.quantity).toLocaleString('en-IN')}/-
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B. Customer & Delivery Details Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#D32F2F]" />
                  <h3 className="text-sm font-black text-slate-900">Contact Details</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  className="text-xs font-bold text-[#D32F2F] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit Details</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Full Name:</span>
                  <span className="text-slate-900 font-bold text-sm">{fullName || '—'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Phone / Mobile:</span>
                  <span className="text-slate-900 font-bold text-sm">{mobileNumber || '—'}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400 font-semibold block">Contact / Delivery Address:</span>
                  <span className="text-slate-900 font-medium leading-relaxed">
                    {address}
                    {city ? `, ${city}` : ''}
                    {pincode ? ` - ${pincode}` : ''}
                  </span>
                </div>
                {preferredDate && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Preferred Date:</span>
                    <span className="text-slate-800 font-semibold">{preferredDate}</span>
                  </div>
                )}
                {message && (
                  <div>
                    <span className="text-slate-400 font-semibold block">Special Instructions:</span>
                    <span className="text-slate-800 font-semibold">{message}</span>
                  </div>
                )}
              </div>
            </div>

            {/* C. TRANSPORTATION SECTION (SIMPLIFIED) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7">
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Transportation Estimate
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                  An additional transportation charge may apply based on the delivery location.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Transportation Additional Amount (₹)
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1 max-w-xs">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-sm">
                      ₹
                    </span>
                    <input
                      type="number"
                      min={0}
                      step={50}
                      placeholder="0"
                      value={transportInput}
                      onChange={(e) => handleTransportInputChange(e.target.value)}
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border bg-white text-slate-900 font-bold text-base focus:outline-none focus:ring-2 transition-all ${
                        transportError
                          ? 'border-red-500 focus:ring-red-400'
                          : 'border-slate-300 focus:border-red-500 focus:ring-red-500/20'
                      }`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyTransport}
                    className="px-6 py-2.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>

                {/* Validation Error Message */}
                {transportError && (
                  <p className="text-xs font-bold text-red-600 mt-2 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{transportError}</span>
                  </p>
                )}
              </div>
            </div>

            {/* D. PRICE SUMMARY SECTION */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-7 space-y-3">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  ESTIMATED PRICE SUMMARY
                </h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">Subtotal</span>
                  <span className="font-bold text-slate-900">
                    Rs.{subtotal.toLocaleString('en-IN')}/-
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-semibold">Transportation</span>
                  <span className="font-bold text-slate-900">
                    Rs.{transportationCharge.toLocaleString('en-IN')}/-
                  </span>
                </div>

                <div className="border-t border-dashed border-slate-200 pt-3 mt-2 flex items-baseline justify-between">
                  <div>
                    <span className="text-base sm:text-lg font-black text-slate-900 block leading-tight">
                      Grand Total (Estimated)
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Indicative amount for catalogue enquiry
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-[#D32F2F]">
                      Rs.{grandTotal.toLocaleString('en-IN')}/-
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* E. Action Buttons: Submit / Confirm Booking */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={() => setCurrentStep('details')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Contact Details</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmAndSubmitBooking}
                disabled={submitting}
                className="w-full sm:flex-1 py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/20 transition-all transform hover:-translate-y-0.5 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Submit Product Enquiry (via WhatsApp)</span>
              </button>
            </div>
          </div>
        )}

        {/* Trust Badges Bar */}
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-bold text-center">
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Quick Product Enquiry</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-amber-400" />
              <span>Transparent Pricing & Information</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Genuine 140 Sivakasi Crackers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span>Wholesale & Retail Enquiries</span>
            </div>
          </div>
        </div>

        {/* Safety & Legal Notice Box */}
        <div className="mt-6 p-4 rounded-2xl bg-[#FFFBEB] border border-amber-300 text-amber-950 text-xs flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-extrabold text-amber-900 uppercase tracking-wide">
              Compliance Notice & Guidelines:
            </p>
            <p className="font-medium leading-relaxed text-amber-950">
              As per No.R4(2)83/CC 405/2023 compliance of Directives of honourable Supreme Court of India in WP (C) 728 of 2015 - Reg, we don’t sell any sort of crackers or any related activities with relevant to purchases. The catalog is just to view the products and understand. All pyrotechnic specifications are subject to PESO norms and regional safety guidelines.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
