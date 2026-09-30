'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ProductFilters from '@/components/ProductFilters';
import { ProductItem } from '@/components/ProductCard';
import { fetchApi } from '@/lib/api';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string; slug: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';
  const initialMinPrice = searchParams.get('minPrice') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialSort = searchParams.get('sort') || 'newest';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Load categories list for filter sidebar
  useEffect(() => {
    async function loadCategories() {
      const res = await fetchApi('/categories');
      if (res.success && res.data) {
        setCategories(res.data);
      }
    }
    loadCategories();
  }, []);

  // Fetch products matching filters
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (sortBy) params.set('sort', sortBy);
    params.set('page', currentPage.toString());
    params.set('limit', '24');

    const res = await fetchApi(`/products?${params.toString()}`);
    if (res.success && res.data) {
      setProducts(res.data);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.total || 0);
    }
    setLoading(false);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('newest');
    setCurrentPage(1);
    router.push('/products');
  };

  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-festive-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Official 2026 Catalogue</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              All Fireworks & Crackers
            </h1>
            <span className="text-xs text-slate-500 font-semibold">
              Showing {products.length} of {totalCount} items
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Column: Filters */}
          <div className="lg:col-span-1 sticky top-24">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              searchQuery={searchQuery}
              minPrice={minPrice}
              maxPrice={maxPrice}
              sortBy={sortBy}
              onCategoryChange={(slug) => {
                setSelectedCategory(slug);
                setCurrentPage(1);
              }}
              onSearchChange={(q) => {
                setSearchQuery(q);
                setCurrentPage(1);
              }}
              onMinPriceChange={(val) => {
                setMinPrice(val);
                setCurrentPage(1);
              }}
              onMaxPriceChange={(val) => {
                setMaxPrice(val);
                setCurrentPage(1);
              }}
              onSortChange={(sort) => {
                setSortBy(sort);
                setCurrentPage(1);
              }}
              onReset={handleResetFilters}
            />
          </div>

          {/* Right Column: Products */}
          <div className="lg:col-span-3 space-y-8">
            <ProductGrid products={products} loading={loading} />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage <= 1}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-black transition-colors ${
                          currentPage === pageNum
                            ? 'bg-festive-700 text-white shadow-sm'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
