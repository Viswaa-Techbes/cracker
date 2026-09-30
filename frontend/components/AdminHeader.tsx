'use client';

import React from 'react';
import { User, Bell } from 'lucide-react';
import { useAuth } from '@/lib/authContext';

export default function AdminHeader({ title }: { title: string }) {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200/70 rounded-full py-1.5 px-3">
          <div className="w-7 h-7 rounded-full bg-festive-600 text-white flex items-center justify-center text-xs font-black">
            {user?.name?.[0]?.toUpperCase() || 'A'}
          </div>
          <span className="text-xs font-bold text-slate-800 hidden sm:inline">
            {user?.name || 'Administrator'}
          </span>
          <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
            {user?.role || 'ADMIN'}
          </span>
        </div>
      </div>
    </header>
  );
}
