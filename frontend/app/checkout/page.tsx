'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowRight,
  ShoppingBag,
  Truck,
  Store,
  Calendar,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatCurrency } from '@/lib/utils';
import { fetchApi, getImageUrl } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Tamil Nadu');
  const [pincode, setPincode] = useState('');
  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [preferredDate, setPreferredDate] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');

  // Store Settings (for delivery fee and free threshold)
  const [settings, setSettings] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadSettings() {
      const res = await fetchApi('/admin/settings/public');
      if (res.success && res.data) {
        setSettings(res.data);
      }
    }
    loadSettings();
  }, []);

  // Autofill WhatsApp when mobile changes if empty
  const handleMobileChange = (val: string) => {
    setMobile(val);
    if (!whatsapp) {
      setWhatsapp(val);
    }
  };

  const deliveryFee =
    orderType === 'DELIVERY'
      ? subtotal >= (settings?.freeDeliveryThreshold ?? 3000)
        ? 0
        : settings?.deliveryFee ?? 150
      : 0;

  const estimatedTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (items.length === 0) {
      setErrorMsg('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!customerName.trim() || !mobile.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      setErrorMsg('Please fill in all required fields marked with *');
      return;
    }

    if (pincode.trim().length !== 6 || !/^\d{6}$/.test(pincode.trim())) {
      setErrorMsg('Please enter a valid 6-digit postal pincode');
      return;
    }

    if (mobile.trim().length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    setSubmitting(true);

    try {
      // NOTE: We only send productId and quantity.
      // The backend NEVER trusts frontend totals and strictly fetches real DB prices!
      const orderPayload = {
        customerName: customerName.trim(),
        mobile: mobile.trim(),
        whatsapp: whatsapp.trim() || mobile.trim(),
        email: email.trim() || undefined,
        address: address.trim(),
        city: city.trim(),
        state: state.trim() || 'Tamil Nadu',
        pincode: pincode.trim(),
        orderType,
        preferredDate: preferredDate || undefined,
        customerNotes: customerNotes.trim() || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
      };

      const res = await fetchApi('/orders', {
        method: 'POST',
        body: JSON.stringify(orderPayload),
      });

      if (res.success && res.data) {
        const orderNumber = res.data.orderNumber;
        clearCart();
        router.push(`/order-success/${orderNumber}`);
      } else {
        setErrorMsg(res.message || 'Failed to place order. Please review your details.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-20 bg-slate-50 min-h-[60vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center max-w-md mx-auto">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
          <p className="text-xs text-slate-500 mt-2">
            Add crackers to your cart before proceeding to checkout.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex px-6 py-2.5 rounded-full bg-festive-700 text-white font-bold text-xs"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festive-100 text-festive-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-festive-700" />
            <span>Direct Offline Ordering</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Checkout & Order Details
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete your contact and delivery information. Payment is processed offline upon confirmation.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Customer Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Order Type Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Order Fulfillment Type *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType('DELIVERY')}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                      orderType === 'DELIVERY'
                        ? 'border-festive-600 bg-festive-50/50 text-festive-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        orderType === 'DELIVERY' ? 'bg-festive-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">Delivery to Address</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Via authorized carrier</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('PICKUP')}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${
                      orderType === 'PICKUP'
                        ? 'border-festive-600 bg-festive-50/50 text-festive-900 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        orderType === 'PICKUP' ? 'bg-festive-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Store className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">Store Pickup</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Sivakasi Main Counter</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Contact Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Customer Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
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
                      maxLength={15}
                      placeholder="e.g. 9876543210"
                      value={mobile}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      maxLength={15}
                      placeholder="For order updates"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {orderType === 'DELIVERY' ? 'Delivery Address' : 'Billing / Contact Address'}
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / House No. *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Door number, street name, landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sivakasi / Chennai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Postal Pincode *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="6-digit PIN"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Preference & Notes */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Preferred Delivery / Pickup Date</span>
                    </label>
                    <input
                      type="date"
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Special Customer Instructions
                    </label>
                    <input
                      type="text"
                      placeholder="Any specific delivery instructions"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Order Summary & Offline Payment Notice */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-5">
                <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
                  Items Snapshot ({items.length})
                </h2>

                {/* Condensed Items List */}
                <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-1">
                  {items.map((item) => (
                    <div key={item.productId} className="py-2.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-lg bg-slate-50 p-1 shrink-0 border border-slate-100 flex items-center justify-center">
                          <Image
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-slate-900 truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-500">
                            {item.quantity} x {formatCurrency(item.price)}
                          </p>
                        </div>
                      </div>
                      <span className="font-black text-slate-900 pl-2">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation Breakdown */}
                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600">
                    <span>Delivery Fee ({orderType === 'DELIVERY' ? 'Carrier' : 'Store Pickup'})</span>
                    <span className="font-bold text-slate-900">
                      {deliveryFee === 0 ? (
                        <span className="text-emerald-700 font-bold">FREE</span>
                      ) : (
                        formatCurrency(deliveryFee)
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total Amount</span>
                    <span className="text-xl text-festive-700">{formatCurrency(estimatedTotal)}</span>
                  </div>
                </div>

                {/* Offline Payment Box */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Payment: Offline Payment</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    Payment will be collected/confirmed offline. Our team will contact you to confirm the order and payment.
                  </p>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-extrabold text-sm shadow-md hover:shadow-sparkle transition-all transform active:scale-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <>
                      <span>PLACE ORDER</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </div>

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
