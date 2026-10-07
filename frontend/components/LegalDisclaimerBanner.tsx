'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const LEGAL_DISCLAIMER_TEXT =
  "As per No.R4(2)83/CC 405/2023 compliance of Directives of honourable Supreme Court of India in WP (C) 728 of 2015 - Reg, we don’t sell any sort of crackers or any related activities with relevant to purchases. The catalog is just to view the products and understand.";

interface LegalDisclaimerBannerProps {
  className?: string;
  variant?: 'banner' | 'card' | 'compact';
}

export default function LegalDisclaimerBanner({
  className = '',
  variant = 'card',
}: LegalDisclaimerBannerProps) {
  if (variant === 'banner') {
    return (
      <div
        className={`w-full bg-[#FFFBEB] border-y border-amber-300/80 px-4 py-3.5 sm:py-4 text-amber-950 ${className}`}
        role="note"
        aria-label="Compliance Disclaimer"
      >
        <div className="max-w-7xl mx-auto flex items-start gap-3 sm:gap-3.5">
          <div className="p-1.5 rounded-lg bg-amber-200/70 text-amber-900 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
                ⚠️ IMPORTANT DISCLAIMER
              </span>
              <span className="text-xs font-bold text-amber-900">
                • Catalogue Viewing Only
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
              &ldquo;{LEGAL_DISCLAIMER_TEXT}&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className={`bg-[#FFFBEB] border border-amber-300 rounded-xl p-3 sm:p-3.5 text-amber-950 ${className}`}
        role="note"
      >
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <span className="font-extrabold text-amber-900 block">
              ⚠️ IMPORTANT DISCLAIMER:
            </span>
            <p className="text-[11px] sm:text-xs text-amber-950 leading-relaxed font-medium">
              &ldquo;{LEGAL_DISCLAIMER_TEXT}&rdquo;
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Default: prominent card
  return (
    <div
      className={`bg-[#FFFBEB] border border-amber-300 rounded-2xl p-4 sm:p-5 text-amber-950 shadow-sm ${className}`}
      role="note"
      aria-label="Compliance Disclaimer"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="p-2 rounded-xl bg-amber-200/80 text-amber-900 shrink-0 mt-0.5">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-800" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-black uppercase tracking-wider text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-md">
              <span>⚠️</span>
              <span>IMPORTANT DISCLAIMER</span>
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-amber-800">
              This catalogue is provided only for viewing and understanding products.
            </span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
            &ldquo;{LEGAL_DISCLAIMER_TEXT}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
