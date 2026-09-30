'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle,
  ShieldAlert,
  Flame,
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import { useCart } from '@/lib/cartContext';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<any>(null);
  const [related, setRelated] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetchApi(`/products/${slug}`);
        if (res.success && res.data) {
          setProduct(res.data);
          if (res.data.relatedProducts) {
            setRelated(res.data.relatedProducts);
          }
        }
      } catch (e) {
        console.error('Failed to load product details', e);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadProduct();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-slate-200 rounded-3xl h-96 w-full" />
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-10 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-24 bg-slate-200 rounded w-full" />
            <div className="h-12 bg-slate-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-800">Product Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested product may have been moved or is currently unavailable.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-festive-700 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const categoryName = product.categoryId?.name || 'Sparkles';
  const categorySlug = product.categoryId?.slug || 'sparkles';
  const isOutOfStock = product.stockStatus === 'OUT_OF_STOCK';

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
  };

  return (
    <div className="py-12 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
          <Link href="/" className="hover:text-festive-700">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-festive-700">
            Products
          </Link>
          <span>/</span>
          <Link href={`/category/${categorySlug}`} className="hover:text-festive-700">
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-slate-900 truncate max-w-xs">{product.name}</span>
        </div>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left: Large Product Image */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 flex items-center justify-center border border-slate-100 relative group overflow-hidden">
              <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
                <Image
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  fill
                  className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                  priority
                />
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col justify-center space-y-6">
              
              <div>
                <Link
                  href={`/category/${categorySlug}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 hover:bg-amber-200 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>{categoryName}</span>
                </Link>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Pack Quantity */}
              <div className="flex items-center gap-3 py-2 px-3 bg-slate-50 rounded-xl border border-slate-200/70 w-fit">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pack Quantity:
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {product.packQuantity}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Per Pack (Taxes Included)
                </span>
              </div>

              {/* Quantity Selector & Add to Cart */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-slate-200 rounded-2xl p-1 bg-white sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="text-sm font-black text-slate-900 px-3">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    disabled={isOutOfStock}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex-1 flex items-center justify-center gap-2.5 py-4 px-8 rounded-2xl bg-gradient-to-r from-festive-700 to-festive-600 hover:from-festive-800 hover:to-festive-700 text-white font-extrabold text-sm shadow-md hover:shadow-sparkle transition-all transform active:scale-95 disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Cart (₹{product.price * quantity})</span>
                </button>
              </div>

              {/* Product Information */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Flame className="w-4 h-4 text-festive-600" />
                  <span>Product Information</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description ||
                    `Genuine ${product.name} from trusted Sivakasi manufacturers. Packaged as ${product.packQuantity}. Suitable for celebrations and festival occasions.`}
                </p>
              </div>

              {/* Safety notice highlight */}
              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <p className="leading-tight">
                  For outdoor open-ground use only. Keep a bucket of water nearby. Adult supervision required.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                Related in {categoryName}
              </h2>
              <Link
                href={`/category/${categorySlug}`}
                className="text-xs font-bold text-festive-700 hover:underline"
              >
                View all {categoryName}
              </Link>
            </div>
            <ProductGrid products={related} />
          </div>
        )}

      </div>
    </div>
  );
}
