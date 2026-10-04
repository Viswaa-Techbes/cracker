'use client';

import React, { useState } from 'react';
import ProductCard, { ProductItem } from './ProductCard';
import ProductModal from './ProductModal';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: ProductItem[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading = false }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-4 animate-pulse shadow-sm"
          >
            <div className="w-full aspect-square bg-slate-100 rounded-xl" />
            <div className="h-4 bg-slate-100 rounded w-3/4" />
            <div className="h-3 bg-slate-100 rounded w-1/2" />
            <div className="h-3 bg-slate-100 rounded w-1/3" />
            <div className="h-8 bg-slate-100 rounded-xl w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto shadow-sm my-8">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-black text-slate-900">No Products Found</h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          We could not find any cracker items matching your search or category filter. Try clearing filters or searching another term like &quot;Sparkles&quot;, &quot;Comet&quot;, or &quot;Bomb&quot;.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3.5 sm:gap-5">
        {products.map((product) => (
          <ProductCard
            key={product._id || `p-${product.id}-${product.name}`}
            product={product}
            onSelect={(p) => setSelectedProduct(p)}
          />
        ))}
      </div>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
