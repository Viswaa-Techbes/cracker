'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { fetchApi, getImageUrl } from '@/lib/api';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';
import { CATALOGUE_CATEGORIES } from '@/lib/catalogueData';

export default function CategoryPage() {
  const params = useParams();
  const slug = (params.slug as string) || '';

  const matchedCat = CATALOGUE_CATEGORIES.find(
    (c) => c.slug.toLowerCase() === slug.toLowerCase()
  );

  const [category, setCategory] = useState<{ name: string; description: string; image?: string } | null>(
    matchedCat
      ? {
          name: matchedCat.name,
          description: matchedCat.description,
          image: `/images/categories/${matchedCat.slug}.svg`,
        }
      : null
  );
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategoryData() {
      setLoading(true);
      try {
        const prodRes = await fetchApi(`/products?category=${slug}&limit=50`);
        if (prodRes.success && prodRes.data) {
          setProducts(prodRes.data);
        }
        if (!category) {
          const catRes = await fetchApi(`/categories/${slug}`);
          if (catRes.success && catRes.data) {
            setCategory(catRes.data);
          }
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
  }, [slug, category]);

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
          <span className="text-slate-900 font-bold capitalize">
            {category ? category.name : slug}
          </span>
        </nav>

        {/* Category Header Banner */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 mb-10 shadow-sm flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 relative bg-slate-50 rounded-2xl p-4 shrink-0 border border-slate-100 flex items-center justify-center">
            <Image
              src={getImageUrl(category?.image || `/images/categories/${slug}.svg`)}
              alt={category?.name || slug}
              width={90}
              height={90}
              className="object-contain"
              unoptimized
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#D32F2F] text-xs font-bold uppercase tracking-wider mb-2 border border-red-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Category Catalogue</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {category ? category.name : slug.replace(/-/g, ' ')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed font-medium">
              {category?.description ||
                'Explore authentic fireworks items from our Sri Sai Traders Sivakasi catalogue.'}
            </p>
            <div className="mt-3 flex items-center justify-center md:justify-start gap-4">
              <span className="text-xs font-bold text-slate-400">
                Showing {products.length} {products.length === 1 ? 'item' : 'items'}
              </span>
              <Link
                href="/products"
                className="text-xs font-bold text-[#D32F2F] hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View All 15 Categories</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} loading={loading} />

      </div>
    </div>
  );
}
