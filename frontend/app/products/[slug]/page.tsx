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
  ShieldCheck,
  Flame,
  MessageCircle,
} from 'lucide-react';
import { fetchApi, getImageUrl } from '@/lib/api';
import { useCart } from '@/lib/cartContext';
import { ProductItem } from '@/components/ProductCard';
import ProductGrid from '@/components/ProductGrid';
import { STORE_CONTACT } from '@/lib/catalogueData';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<ProductItem | null>(null);
  const [related, setRelated] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCart();

  useEffect(() => {
    async function loadProduct() {
      setLoading(true);
      try {
        const res = await fetchApi(`/products/${slug}`);
        if (res.success && res.data) {
          setProduct(res.data);
          // Fetch related in same category
          const cat = res.data.categorySlug || res.data.category;
          const relRes = await fetchApi(`/products?category=${encodeURIComponent(cat)}&limit=4`);
          if (relRes.success && relRes.data) {
            setRelated(relRes.data.filter((p: ProductItem) => p.slug !== slug).slice(0, 3));
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
        <p className="text-sm text-slate-500 mt-2 font-medium">
          The requested product may have been moved or is currently unavailable.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D32F2F] text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalogue</span>
        </Link>
      </div>
    );
  }

  const cartItem = items.find(
    (item) => item.productId === (product._id || `prod-${product.id}`)
  );

  const handleAddToCart = () => {
    addToCart(
      {
        _id: product._id || `prod-${product.id}`,
        name: product.name,
        slug: product.slug,
        image: product.image,
        packQuantity: product.packQuantity,
        price: product.price,
      },
      quantity
    );
  };

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello Sri Sai Traders,\nI would like to enquire about:\n*${product.name}*\nCategory: ${product.category}\nPack: ${product.packQuantity}\nQuantity: ${quantity}\nPrice: Rs.${product.price * quantity}/-`
    );
    window.open(`https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="py-10 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#D32F2F] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link href="/products" className="hover:text-[#D32F2F] transition-colors">
            Products
          </Link>
          <span>&gt;</span>
          <Link href={`/products?category=${product.categorySlug || product.category.toLowerCase()}`} className="hover:text-[#D32F2F] transition-colors">
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
            
            {/* Left: Product Image */}
            <div className="bg-slate-50 rounded-2xl p-8 sm:p-12 flex items-center justify-center border border-slate-100 relative group overflow-hidden">
              <div className="w-64 h-64 sm:w-80 sm:h-80 relative flex items-center justify-center">
                <Image
                  src={getImageUrl(product.image)}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                  priority
                />
              </div>
              {product.company && (
                <span className="absolute top-4 left-4 bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-md shadow-xs">
                  {product.company}
                </span>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="flex flex-col justify-center space-y-5">
              
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider mb-2 border border-red-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{product.category}</span>
                </span>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Pack Quantity */}
              <div className="flex items-center gap-3 py-2 px-3.5 bg-slate-50 rounded-xl border border-slate-200/80 w-fit">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Pack Quantity:
                </span>
                <span className="text-xs font-extrabold text-slate-900">
                  {product.packQuantity}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#D32F2F]">
                  Rs.{product.price}/-
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Wholesale & Retail Rate
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {product.description ||
                  `Authentic ${product.name} (${product.packQuantity}) by Sri Sai Traders Sivakasi. Tested quality celebration fireworks for Diwali and all grand occasions.`}
              </p>

              {/* Quantity Selector & Add to Enquiry */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity */}
                <div className="flex items-center justify-between border-2 border-slate-200 rounded-2xl p-1 bg-white sm:w-36">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center font-bold transition-colors"
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
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-extrabold text-sm shadow-md transition-all transform active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {cartItem
                      ? `Add ${quantity} More (In Cart: ${cartItem.quantity})`
                      : `Add to Enquiry (Rs.${product.price * quantity}/-)`}
                  </span>
                </button>
              </div>

              {/* Direct WhatsApp CTA */}
              <button
                type="button"
                onClick={handleWhatsAppEnquiry}
                className="w-full py-3 px-6 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send WhatsApp Enquiry for this Product</span>
              </button>

              {/* Trust point */}
              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Genuine Sivakasi stock • Direct Wholesale & Retail catalogue</span>
              </div>

            </div>

          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900">
                Related in {product.category}
              </h2>
              <Link
                href={`/products?category=${product.categorySlug || product.category.toLowerCase()}`}
                className="text-xs font-bold text-[#D32F2F] hover:underline"
              >
                View all {product.category} &rarr;
              </Link>
            </div>
            <ProductGrid products={related} />
          </div>
        )}

      </div>
    </div>
  );
}
