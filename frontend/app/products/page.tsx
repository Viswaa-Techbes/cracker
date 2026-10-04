'use client';

import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import { ProductItem } from '@/components/ProductCard';
import { fetchApi } from '@/lib/api';
import { CATALOGUE_CATEGORIES, ALL_140_PRODUCTS } from '@/lib/catalogueData';

function ProductsCatalogueContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL Query Parameters
  const initialCategory = searchParams.get('category') || '';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'default';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Pre-calculate count per category
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    ALL_140_PRODUCTS.forEach((p) => {
      map[p.categorySlug] = (map[p.categorySlug] || 0) + 1;
    });
    return map;
  }, []);

  // Synchronize state with URL parameters when user navigates
  useEffect(() => {
    const cat = searchParams.get('category') || '';
    const q = searchParams.get('q') || '';
    const s = searchParams.get('sort') || 'default';
    const p = parseInt(searchParams.get('page') || '1', 10);

    setSelectedCategory(cat);
    setSearchQuery(q);
    setSortBy(s);
    setCurrentPage(p);
  }, [searchParams]);

  // Load products based on current active filters
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy && sortBy !== 'default') params.set('sort', sortBy);
    params.set('page', currentPage.toString());
    params.set('limit', '12'); // 12 items per page matching 3x4 grid & reference pagination

    const res = await fetchApi(`/products?${params.toString()}`);
    if (res.success && res.data) {
      setProducts(res.data);
      setTotalPages(res.totalPages || 1);
      setTotalCount(res.total || 0);
    }
    setLoading(false);
  }, [searchQuery, selectedCategory, sortBy, currentPage]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Update URL helper
  const updateUrl = (newCat: string, newQ: string, newSort: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newCat) params.set('category', newCat);
    if (newQ.trim()) params.set('q', newQ.trim());
    if (newSort && newSort !== 'default') params.set('sort', newSort);
    if (newPage > 1) params.set('page', newPage.toString());

    const queryStr = params.toString();
    router.push(`/products${queryStr ? `?${queryStr}` : ''}`, { scroll: false });
  };

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
    updateUrl(slug, searchQuery, sortBy, 1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortVal = e.target.value;
    setSortBy(sortVal);
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, sortVal, 1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    updateUrl(selectedCategory, searchQuery, sortBy, 1);
  };

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('default');
    setCurrentPage(1);
    router.push('/products');
  };

  // Helper for pagination page numbers
  const renderPaginationButtons = () => {
    const pages: (number | string)[] = [];
    const maxButtons = 5;

    if (totalPages <= maxButtons + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="py-8 sm:py-10 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb matching reference: Home > Products */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-4">
          <Link href="/" className="hover:text-[#D32F2F] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Products</span>
          {selectedCategory && (
            <>
              <span>&gt;</span>
              <span className="text-[#D32F2F] font-bold capitalize">
                {CATALOGUE_CATEGORIES.find((c) => c.slug === selectedCategory)?.name || selectedCategory}
              </span>
            </>
          )}
        </nav>

        {/* Page Heading & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Product Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Explore our complete range of crackers. Add items to enquiry and send via WhatsApp.
            </p>
          </div>

          {/* Sort By Dropdown (matches reference design) */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-white border border-slate-300 text-slate-800 text-xs font-bold py-2 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-xs cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Mobile Filter Toggle & Quick Horizontal Scroll */}
        <div className="lg:hidden mb-6 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D32F2F]" />
              <span>{mobileFilterOpen ? 'Hide Categories' : 'Filter by Category'}</span>
            </button>

            {(selectedCategory || searchQuery || sortBy !== 'default') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Horizontal scrollable category pill bar on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategorySelect('')}
              className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                !selectedCategory
                  ? 'bg-[#D32F2F] text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              All ({ALL_140_PRODUCTS.length})
            </button>
            {CATALOGUE_CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => handleCategorySelect(c.slug)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  selectedCategory === c.slug
                    ? 'bg-[#D32F2F] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                {c.name} ({categoryCounts[c.slug] || 0})
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Catalogue Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* LEFT SIDEBAR: Categories Menu matching reference screenshot */}
          <aside
            aria-label="Category Filters"
            className={`lg:col-span-1 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-sm sticky top-28 ${
              mobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h2 className="text-sm font-black uppercase tracking-wider text-slate-900">
                Categories
              </h2>
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-bold text-red-600 hover:text-red-700"
                >
                  Clear All
                </button>
              )}
            </div>

            <nav aria-label="Categories List" className="space-y-1">
              {/* All Products button */}
              <button
                type="button"
                onClick={() => handleCategorySelect('')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                  !selectedCategory
                    ? 'bg-[#D32F2F] text-white shadow-sm font-black'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>All Products</span>
                <span
                  className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    !selectedCategory ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {ALL_140_PRODUCTS.length}
                </span>
              </button>

              {/* All 15 Categories from Catalogue */}
              {CATALOGUE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.slug;
                const count = categoryCounts[cat.slug] || 0;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all text-left ${
                      isSelected
                        ? 'bg-[#D32F2F] text-white shadow-sm font-black'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span
                      className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Wholesale & Retail Info note */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 leading-snug">
              <p className="font-bold text-slate-800">Direct From Sivakasi</p>
              <p>Prices listed are standard wholesale & retail catalogue rates. Final billing and stock verified on WhatsApp.</p>
            </div>
          </aside>

          {/* MAIN CONTENT: Products Grid & Pagination Controls */}
          <main className="lg:col-span-3 space-y-8">
            
            {/* Active search indicator bar */}
            {searchQuery && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-amber-900 font-semibold">
                <span>
                  Search results for: <strong>&ldquo;{searchQuery}&rdquo;</strong> ({totalCount} items found)
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    updateUrl(selectedCategory, '', sortBy, 1);
                  }}
                  className="text-red-700 font-bold hover:underline"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Products Grid (3 columns on desktop matching reference) */}
            <ProductGrid products={products} loading={loading} />

            {/* PAGINATION: Exactly matching reference screenshot `< 1 2 3 4 5 ... >` */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-6 pb-12 border-t border-slate-200">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() => {
                    const prev = Math.max(1, currentPage - 1);
                    setCurrentPage(prev);
                    updateUrl(selectedCategory, searchQuery, sortBy, prev);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  disabled={currentPage <= 1}
                  className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page Number Buttons */}
                {renderPaginationButtons().map((p, idx) => {
                  if (p === '...') {
                    return (
                      <span key={`dots-${idx}`} className="px-2 text-xs font-bold text-slate-400">
                        ...
                      </span>
                    );
                  }
                  const pageNum = Number(p);
                  const isCurrent = currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setCurrentPage(pageNum);
                        updateUrl(selectedCategory, searchQuery, sortBy, pageNum);
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                      }}
                      className={`w-9 h-9 rounded-lg text-xs font-black transition-all ${
                        isCurrent
                          ? 'bg-[#D32F2F] text-white shadow-sm'
                          : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.min(totalPages, currentPage + 1);
                    setCurrentPage(next);
                    updateUrl(selectedCategory, searchQuery, sortBy, next);
                    window.scrollTo({ top: 120, behavior: 'smooth' });
                  }}
                  disabled={currentPage >= totalPages}
                  className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold transition-colors shadow-xs"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-16 text-center text-slate-500 font-bold">Loading product catalogue...</div>}>
      <ProductsCatalogueContent />
    </Suspense>
  );
}
