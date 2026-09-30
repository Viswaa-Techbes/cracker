'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatCurrency } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';

export default function CartPage() {
  const router = useRouter();
  const { items, subtotal, totalItemsCount, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="py-20 bg-slate-50 min-h-[70vh] flex items-center justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-amber-50 text-festive-700 flex items-center justify-center mx-auto mb-5 shadow-inner">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Your Cart is Empty</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            Your shopping cart currently has no items. Browse our fireworks catalogue to select sparklers, pots, chakkars, and multi-shots for Diwali!
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-bold text-xs shadow-md transition-all"
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
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <span>Shopping Cart</span>
              <span className="text-xs bg-festive-100 text-festive-800 font-bold px-3 py-1 rounded-full border border-festive-200">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Review your selected cracker products and quantities before proceeding to offline checkout.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 transition-colors self-start sm:self-auto"
          >
            Clear Entire Cart
          </button>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left 2 Cols: Cart Items Table */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            
            {/* Table Header (Hidden on small mobile) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-5 bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Line Total</div>
            </div>

            {/* Cart Rows */}
            <div className="divide-y divide-slate-100 p-4 sm:p-0">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="sm:grid sm:grid-cols-12 gap-4 p-4 sm:p-5 items-center flex flex-col sm:flex-row justify-between"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center gap-4 w-full">
                    <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1.5 shrink-0 flex items-center justify-center">
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
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-xs sm:text-sm font-bold text-slate-900 hover:text-festive-700 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[11px] text-slate-500 font-semibold mt-0.5">
                        {item.packQuantity}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        className="sm:hidden mt-2 text-[11px] text-rose-600 font-semibold flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-left sm:text-center text-xs font-semibold text-slate-600 w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between">
                    <span className="sm:hidden text-slate-400">Price:</span>
                    <span>{formatCurrency(item.price)}</span>
                  </div>

                  {/* Quantity Modifier */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
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
                        className="p-1.5 text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.productId)}
                      className="hidden sm:inline-flex p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg"
                      title="Remove product"
                      aria-label="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-2 text-right w-full sm:w-auto mt-2 sm:mt-0 flex sm:block justify-between border-t sm:border-0 pt-2 sm:pt-0">
                    <span className="sm:hidden text-xs text-slate-500 font-bold">Total:</span>
                    <span className="text-xs sm:text-sm font-black text-slate-900">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-festive-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Sidebar */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h2>

            {/* Summary Lines */}
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Total Items</span>
                <span className="font-bold text-slate-900">{totalItemsCount}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-extrabold text-slate-900 text-sm">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Delivery / Pickup</span>
                <span className="text-emerald-700 font-bold">Calculated at Checkout</span>
              </div>
            </div>

            {/* Offline Notice Alert */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs leading-relaxed space-y-1">
              <div className="flex items-center gap-2 font-bold text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Offline Payment Notice</span>
              </div>
              <p className="text-[11px] text-amber-800/90">
                There is <strong>no online card/gateway payment</strong>. After submitting your order, our team will contact you to verify details and arrange payment via Cash or offline UPI.
              </p>
            </div>

            {/* Checkout CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-extrabold text-sm shadow-md hover:shadow-sparkle transition-all transform active:scale-95"
              >
                <span>Proceed to Order</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
