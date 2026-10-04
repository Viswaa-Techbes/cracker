import React from 'react';
import Image from 'next/image';

export default function BrandTrustStrip() {
  const brands = [
    { name: 'Standard Fireworks', src: '/images/brands/standard.svg', width: 130, height: 45 },
    { name: 'Sony Fireworks', src: '/images/brands/sony.svg', width: 120, height: 45 },
    { name: 'Ajanta Sparklers', src: '/images/brands/ajanta.svg', width: 130, height: 45 },
    { name: 'Vadivel Pyrotech', src: '/images/brands/vadivel.svg', width: 120, height: 45 },
    { name: '365 Days Crackers', src: '/images/brands/days365.svg', width: 120, height: 45 },
  ];

  return (
    <section className="bg-white border-b border-slate-200/80 py-5 sm:py-6 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Section title badge */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full">
              Trusted Brands
            </span>
          </div>

          {/* Horizontal Brand Strip */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 opacity-90">
            {brands.map((b) => (
              <div
                key={b.name}
                className="grayscale hover:grayscale-0 transition-all hover:scale-105 duration-200 flex items-center justify-center p-1"
                title={b.name}
              >
                <Image
                  src={b.src}
                  alt={b.name}
                  width={b.width}
                  height={b.height}
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
