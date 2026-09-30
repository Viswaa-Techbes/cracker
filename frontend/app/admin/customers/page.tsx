'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Users, Search, PhoneCall, MapPin, ShoppingBag } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    params.set('page', page.toString());
    params.set('limit', '20');

    try {
      const res = await fetchApi(`/customers?${params.toString()}`);
      if (res.success && res.data) {
        setCustomers(res.data);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (e) {
      console.error('Failed to load customers', e);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  return (
    <div>
      <AdminHeader title="Customer Directory" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Registered Customers ({totalCount})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Customer profiles captured automatically from offline checkout submissions.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by name, mobile, city..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-10 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Mobile & WhatsApp</th>
                  <th className="py-3 px-4">City / Area</th>
                  <th className="py-3 px-4">Address</th>
                  <th className="py-3 px-4">Total Orders</th>
                  <th className="py-3 px-4">Total Spent</th>
                  <th className="py-3 px-4">First Ordered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {c.name}
                      {c.email && (
                        <div className="text-[10px] text-slate-400 font-normal">{c.email}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <a
                        href={`tel:${c.mobile}`}
                        className="text-festive-700 font-bold hover:underline block"
                      >
                        {c.mobile}
                      </a>
                      {c.whatsapp && c.whatsapp !== c.mobile && (
                        <span className="text-[10px] text-slate-400">WA: {c.whatsapp}</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {c.city}, {c.state}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={c.address}>
                      {c.address} ({c.pincode})
                    </td>

                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {c.totalOrders}
                    </td>

                    <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">
                      {formatCurrency(c.totalSpent)}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {formatDate(c.createdAt)}
                    </td>
                  </tr>
                ))}

                {customers.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No customer records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 font-bold disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 font-bold disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
