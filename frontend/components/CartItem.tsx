'use client';

import React from 'react';
import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { CartItemType, useCart } from '@/lib/cartContext';
import { getImageUrl } from '@/lib/api';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
      
      {/* Thumbnail */}
      <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 p-1 shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src={getImageUrl(item.image)}
          alt={item.name}
          width={56}
          height={56}
          className="w-full h-full object-contain"
          unoptimized
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-slate-900 truncate" title={item.name}>
          {item.name}
        </h4>
        <p className="text-[11px] text-slate-500 font-medium">
          {item.packQuantity} • <span className="text-[#D32F2F] font-bold">Rs.{item.price}/-</span>
        </p>

        {/* Quantity Modifier */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-2xs">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold text-slate-800 px-2.5">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="p-1 text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeFromCart(item.productId)}
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            title="Remove item"
            aria-label="Remove item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Line Total */}
      <div className="text-right shrink-0">
        <span className="text-xs font-black text-slate-900">
          Rs.{item.price * item.quantity}/-
        </span>
      </div>
    </div>
  );
}
