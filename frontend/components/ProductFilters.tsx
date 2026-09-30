'use client';

import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';

interface CategoryOption {
  _id: string;
  name: string;
  slug: string;
}

interface ProductFiltersProps {
  categories: CategoryOption[];
  selectedCategory: string;
  searchQuery: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  onCategoryChange: (slug: string) => void;
  onSearchChange: (q: string) => void;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onSortChange: (sort: string) => void;
  onReset: () => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  searchQuery,
  minPrice,
  maxPrice,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Filter className="w-4 h-4 text-festive-600" />
          <span>Filters & Search</span>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-xs text-festive-700 hover:text-festive-800 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Search Products
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Type cracker name, company..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Category
        </label>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1">
          <button
            type="button"
            onClick={() => onCategoryChange('')}
            className={`text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedCategory === ''
                ? 'bg-festive-100 text-festive-900 font-bold'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              type="button"
              onClick={() => onCategoryChange(cat.slug)}
              className={`text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-festive-100 text-festive-900 font-bold'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Price Range (₹)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            min={0}
          />
          <span className="text-slate-400 text-xs">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 px-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            min={0}
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Sort By
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
        >
          <option value="newest">Featured & Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="name_asc">Name: A to Z</option>
          <option value="name_desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
}
