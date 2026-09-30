import React from 'react';
import ProductCard, { ProductItem } from './ProductCard';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
  products: ProductItem[];
  loading?: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200/80 p-4 h-96 flex flex-col justify-between animate-pulse"
          >
            <div className="bg-slate-100 rounded-xl h-44 w-full" />
            <div className="space-y-3 mt-4">
              <div className="h-4 bg-slate-100 rounded w-3/4" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
              <div className="h-6 bg-slate-100 rounded w-1/3" />
            </div>
            <div className="h-10 bg-slate-100 rounded-xl mt-4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-slate-800">No Products Found</h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          We couldn't find any products matching your selected search or filters. Try adjusting your category or price range.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
