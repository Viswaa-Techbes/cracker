'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, ArrowRight, ShieldAlert } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { formatCurrency } from '@/lib/utils';
import CartItem from './CartItem';

export default function CartDrawer() {
  const router = useRouter();
  const { items, subtotal, isCartOpen, closeCart, totalItemsCount } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-festive-700" />
              <h2 className="text-base font-extrabold text-slate-900">Your Cart</h2>
              <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="p-5 flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Browse our Sivakasi fireworks catalogue and add your favourite crackers to begin your offline order.
                </p>
                <button
                  type="button"
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-full bg-festive-700 text-white font-bold text-xs hover:bg-festive-800 transition-colors"
                >
                  Browse Catalogue
                </button>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-4">
              
              {/* Offline Payment Disclaimer */}
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] leading-tight">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Offline Payment Only:</strong> No online payment gateway. You pay offline upon confirmation or delivery.
                </span>
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-600">Subtotal:</span>
                <span className="font-black text-xl text-slate-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white text-sm font-extrabold shadow-md hover:shadow-sparkle transition-all transform active:scale-95"
                >
                  <span>Proceed to Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs font-semibold text-slate-600 hover:text-festive-700 underline"
                  >
                    View Full Cart Page
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
