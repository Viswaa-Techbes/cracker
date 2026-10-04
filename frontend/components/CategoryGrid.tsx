'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CATALOGUE_CATEGORIES, ALL_140_PRODUCTS } from '@/lib/catalogueData';

export default function CategoryGrid() {
  // Precompute product counts per category slug
  const countsBySlug = React.useMemo(() => {
    const map: Record<string, number> = {};
    ALL_140_PRODUCTS.forEach((p) => {
      map[p.categorySlug] = (map[p.categorySlug] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <section id="categories" className="py-14 sm:py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Explore our wide range of crackers for all your celebrations
          </p>
        </div>

        {/* 15 Category Cards Grid: 2 cols on mobile, 3 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-5">
          {CATALOGUE_CATEGORIES.map((category) => {
            const count = countsBySlug[category.slug] || 0;
            return (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-red-500/40 transition-all duration-200 flex flex-col items-center text-center transform hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center p-2 rounded-xl bg-slate-50/70 group-hover:bg-red-50/40 transition-colors">
                  <Image
                    src={`/images/categories/${category.slug}.svg`}
                    alt={category.name}
                    width={90}
                    height={90}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#D32F2F] transition-colors leading-tight">
                  {category.name}
                </h3>

                {/* Product Count */}
                <span className="text-[11px] text-slate-400 font-semibold mt-1">
                  {count} {count === 1 ? 'item' : 'items'}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
