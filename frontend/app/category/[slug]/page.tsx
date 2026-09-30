'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { fetchApi, getImageUrl } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<any>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const [catRes, prodRes] = await Promise.all([
          fetchApi(`/categories/${slug}`),
          fetchApi(`/products?category=${slug}&limit=50`),
        ]);

        if (catRes.success && catRes.data) {
          setCategory(catRes.data);
        }
        if (prodRes.success && prodRes.data) {
          setProducts(prodRes.data);
        }
      } catch (e) {
        console.error('Failed to load category', e);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCategoryData();
    }
  }, [slug]);

  if (!loading && !category) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-black text-slate-800">Category Not Found</h2>
        <p className="text-sm text-slate-500 mt-2">
          The requested category does not exist in our catalogue.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-festive-700 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse All Products</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-8">
          {category && (
            <div className="w-24 h-24 sm:w-32 sm:h-32 relative bg-amber-50 rounded-2xl p-4 shrink-0 shadow-inner flex items-center justify-center">
              <Image
                src={getImageUrl(category.image)}
                alt={category.name}
                width={100}
                height={100}
                className="object-contain"
                unoptimized
              />
            </div>
          )}

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-festive-100 text-festive-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-festive-700" />
              <span>Category Catalogue</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {category ? category.name : 'Loading...'}
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {category?.description ||
                'Explore authentic fireworks items from our 2026 Sivakasi catalogue.'}
            </p>
            <div className="mt-3 text-xs font-semibold text-slate-400">
              Showing {products.length} {products.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />

      </div>
    </div>
  );
}
