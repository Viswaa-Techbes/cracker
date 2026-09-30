'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fetchApi, getImageUrl } from '@/lib/api';

interface CategoryItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  productCount?: number;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetchApi('/categories');
        if (res.success && res.data) {
          setCategories(res.data);
        }
      } catch (e) {
        console.error('Failed to load categories', e);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <section id="categories" className="py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-festive-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Explore By Category</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Catalogue Categories
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select a category to browse individual pack quantities and direct prices.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-festive-700 hover:text-festive-800 transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-100 animate-pulse rounded-2xl h-44 flex flex-col p-4 justify-between"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat._id}
                href={`/category/${cat.slug}`}
                className="group relative bg-slate-50 hover:bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-amber-300 shadow-sm hover:shadow-gold transition-all flex flex-col items-center text-center transform hover:-translate-y-1"
              >
                <div className="w-20 h-20 relative mb-3 rounded-xl overflow-hidden bg-white p-2 shadow-inner group-hover:scale-105 transition-transform">
                  <Image
                    src={getImageUrl(cat.image)}
                    alt={cat.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-festive-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-500 mt-1 font-medium">
                  {cat.productCount ?? 0} {cat.productCount === 1 ? 'Product' : 'Products'}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
