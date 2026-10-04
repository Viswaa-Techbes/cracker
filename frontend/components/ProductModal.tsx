'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, ShoppingBag, Plus, Minus, MessageCircle, ShieldCheck, Check, ExternalLink } from 'lucide-react';
import { ProductItem } from './ProductCard';
import { useCart } from '@/lib/cartContext';
import { getImageUrl } from '@/lib/api';
import { STORE_CONTACT } from '@/lib/catalogueData';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { items, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const cartItem = items.find(
    (item) => item.productId === (product._id || `prod-${product.id}`)
  );

  const handleAdd = () => {
    addToCart(
      {
        _id: product._id || `prod-${product.id}`,
        name: product.name,
        slug: product.slug,
        image: product.image,
        packQuantity: product.packQuantity,
        category: product.category,
        price: product.price,
      },
      quantity
    );
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sri Sai Traders,\nI would like to enquire about:\n*${product.name}*\nCategory: ${product.category}\nPack: ${product.packQuantity}\nQuantity: ${quantity}\nPrice: Rs.${product.price * quantity}/-`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left: Product Image */}
          <div className="relative w-full aspect-square rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-6">
            <Image
              src={getImageUrl(product.image)}
              alt={product.name}
              width={260}
              height={260}
              className="w-full h-full object-contain"
              unoptimized
            />
            {product.company && (
              <span className="absolute top-3 left-3 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-2.5 py-1 rounded-md">
                {product.company}
              </span>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2 leading-tight">
                {product.name}
              </h2>
              <p className="text-xs text-slate-500 font-semibold mt-1">
                Pack Specification: <span className="text-slate-700">{product.packQuantity}</span>
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#D32F2F]">
                Rs.{product.price}/-
              </span>
              <span className="text-xs text-slate-400 font-medium">(Wholesale & Retail Rate)</span>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description ||
                `Authentic Sivakasi cracker by Sri Sai Traders. Guaranteed quality festive pyrotechnics tested for safe operation and vibrant illumination.`}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1.5 text-xs font-black text-slate-900 bg-white min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs font-bold text-slate-500">
                Total: <strong className="text-slate-900">Rs.{product.price * quantity}/-</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="w-full py-3 px-5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {cartItem
                    ? `Add ${quantity} More (Already ${cartItem.quantity} in Cart)`
                    : `Add ${quantity} to Enquiry Cart`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsApp}
                className="w-full py-2.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Quick WhatsApp Enquiry for This Item</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Sivakasi Stock</span>
              </div>
              <Link
                href={`/products/${product.slug}`}
                onClick={onClose}
                className="text-[#D32F2F] hover:underline font-bold flex items-center gap-1"
              >
                <span>View Product Page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
