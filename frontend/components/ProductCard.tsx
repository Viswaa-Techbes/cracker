'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Minus, ShoppingBag, Eye } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { getImageUrl } from '@/lib/api';
import { useCart } from '@/lib/cartContext';

export interface ProductItem {
  _id: string;
  name: string;
  slug: string;
  categoryId?: {
    _id: string;
    name: string;
    slug: string;
  } | string;
  categoryName?: string;
  image: string;
  packQuantity: string;
  price: number;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK';
  isFeatured?: boolean;
}

export default function ProductCard({ product }: { product: ProductItem }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const categoryTitle =
    typeof product.categoryId === 'object' && product.categoryId !== null
      ? product.categoryId.name
      : product.categoryName || 'Crackers';

  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(
      {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        image: product.image,
        packQuantity: product.packQuantity,
        price: product.price,
      },
      quantity
    );
    setQuantity(1); // Reset back to 1 after adding
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-sparkle transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Image & Badges */}
      <div className="relative bg-slate-50 p-6 flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-amber-100/90 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-200 z-10">
          {categoryTitle}
        </span>

        {/* Featured Tag */}
        {product.isFeatured && (
          <span className="absolute top-3 right-3 bg-festive-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm z-10">
            Top Pick
          </span>
        )}

        <Link
          href={`/products/${product.slug}`}
          className="relative w-36 h-36 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300"
        >
          <Image
            src={getImageUrl(product.image)}
            alt={product.name}
            width={150}
            height={150}
            className="w-full h-full object-contain filter drop-shadow-sm"
            unoptimized
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <Link
            href={`/products/${product.slug}`}
            className="block text-sm font-bold text-slate-900 group-hover:text-festive-700 transition-colors line-clamp-2 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Pack Quantity */}
          <p className="text-xs font-semibold text-slate-500 mt-1.5 flex items-center gap-1">
            <span className="text-slate-400 font-normal">Pack:</span>
            <span>{product.packQuantity}</span>
          </p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-[11px] text-slate-400">/ pack</span>
          </div>
        </div>

        {/* Bottom Actions: Quantity Selector & Add to Cart */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
          
          {isOutOfStock ? (
            <div className="w-full py-2 bg-slate-100 text-slate-400 text-center rounded-xl text-xs font-bold">
              Out of Stock
            </div>
          ) : (
            <>
              {/* Quantity Selector: [ - ] 1 [ + ] */}
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl p-1">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-black text-slate-800 px-2 select-none">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center hover:bg-slate-100 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white text-xs font-extrabold shadow-sm hover:shadow-sparkle transition-all transform active:scale-95"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Cart</span>
              </button>
            </>
          )}

          <Link
            href={`/products/${product.slug}`}
            className="text-center text-[11px] font-semibold text-slate-400 hover:text-festive-700 transition-colors py-1 flex items-center justify-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span>View Details</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
