'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import CartItem from './CartItem';

export default function CartDrawer() {
  const router = useRouter();
  const { items, subtotal, isCartOpen, closeCart, totalItemsCount } = useCart();

  if (!isCartOpen) return null;

  const handleProceedToEnquiry = () => {
    closeCart();
    router.push('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D32F2F]" />
              <h2 className="text-base font-black text-slate-900">Your Enquiry Cart</h2>
              <span className="text-xs bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">
                {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Close cart drawer"
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
                <h3 className="text-base font-black text-slate-800">Your Enquiry Cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">
                  Browse our Sri Sai Traders catalogue and add your favourite crackers to send your WhatsApp enquiry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push('/products');
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-[#D32F2F] text-white font-extrabold text-xs hover:bg-[#B71C1C] transition-colors"
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
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
              
              {/* Subtotal */}
              <div className="flex items-center justify-between text-sm">
                <span className="font-bold text-slate-600">Estimated Total:</span>
                <span className="font-black text-xl text-[#D32F2F]">
                  Rs.{subtotal.toLocaleString('en-IN')}/-
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={handleProceedToEnquiry}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-black shadow-md transition-all active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Enquiry on WhatsApp</span>
                </button>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="text-xs font-bold text-slate-700 hover:text-[#D32F2F] underline"
                  >
                    View Full Cart Page
                  </Link>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="text-xs font-bold text-slate-500 hover:text-slate-700"
                  >
                    + Add More Items
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
