'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/lib/cartContext';
import { getImageUrl } from '@/lib/api';

export interface ProductItem {
  _id?: string;
  id?: number;
  name: string;
  slug: string;
  category: string;
  categorySlug?: string;
  company?: string;
  packQuantity: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: ProductItem;
  onSelect?: (product: ProductItem) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const { items, addToCart } = useCart();

  const cartItem = items.find(
    (item) => item.productId === (product._id || `prod-${product.id}`)
  );
  const isInCart = !!cartItem;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
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
      1
    );
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-red-400/50 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer p-4 sm:p-5"
    >
      {/* Top: Product Image */}
      <div>
        <div className="relative w-full aspect-square rounded-xl bg-slate-50 flex items-center justify-center p-3 mb-4 overflow-hidden group-hover:bg-red-50/20 transition-colors">
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            width={180}
            height={180}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />

          {product.company && (
            <span className="absolute top-2 left-2 bg-amber-100/90 text-amber-900 border border-amber-300/80 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
              {product.company}
            </span>
          )}

          {isInCart && (
            <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Check className="w-3 h-3" />
              <span>{cartItem.quantity} in enquiry</span>
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-1 text-left">
          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#D32F2F] transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 font-medium">
            Category: <span className="text-slate-700 font-semibold">{product.category}</span>
          </p>

          <p className="text-xs text-slate-700 font-medium">
            {product.packQuantity}
          </p>
        </div>
      </div>

      {/* Bottom: Price and CTA Button */}
      <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-base sm:text-lg font-black text-[#D32F2F] tracking-tight">
            Rs.{product.price}/-
          </span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            Catalogue Specification
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 ${
            isInCart
              ? 'bg-[#B71C1C] hover:bg-[#880E4F] text-white shadow-red-900/20'
              : 'bg-[#D32F2F] hover:bg-[#B71C1C] text-white hover:shadow-md'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{isInCart ? `Add More (${cartItem.quantity})` : 'Add to Enquiry List'}</span>
        </button>
      </div>
    </div>
  );
}
