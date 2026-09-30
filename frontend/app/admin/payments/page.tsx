'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { CreditCard, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import PaymentStatusBadge from '@/components/PaymentStatusBadge';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadPayments = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (paymentMode) params.set('paymentMode', paymentMode);
    params.set('page', page.toString());
    params.set('limit', '20');

    try {
      const res = await fetchApi(`/admin/payments?${params.toString()}`);
      if (res.success && res.data) {
        setPayments(res.data);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (e) {
      console.error('Failed to load payments', e);
    } finally {
      setLoading(false);
    }
  }, [search, paymentMode, page]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  return (
    <div>
      <AdminHeader title="Offline Payment Audit Ledger" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Confirmed Offline Payments ({totalCount})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Strict audit trail of all manual cash, UPI, and bank transfer settlements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={paymentMode}
              onChange={(e) => {
                setPaymentMode(e.target.value);
                setPage(1);
              }}
              className="bg-white border border-slate-200 rounded-2xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 shadow-xs font-medium"
            >
              <option value="">All Payment Modes</option>
              <option value="UPI_OFFLINE">UPI Offline</option>
              <option value="CASH">Cash</option>
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="OTHER">Other</option>
            </select>

            <div className="relative">
              <input
                type="text"
                placeholder="Search reference, order #..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="bg-white border border-slate-200 rounded-2xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 shadow-xs w-56"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Order Number</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment Mode</th>
                  <th className="py-3 px-4">Reference / UTR</th>
                  <th className="py-3 px-4">Confirmed By</th>
                  <th className="py-3 px-4">Confirmed At</th>
                  <th className="py-3 px-4">Notes</th>
                  <th className="py-3 px-4 text-right">View Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {p.orderNumber}
                    </td>

                    <td className="py-3.5 px-4 font-black text-emerald-700 text-sm">
                      {formatCurrency(p.amount)}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {p.paymentMode}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-600">
                      {p.referenceNumber || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {p.confirmedBy}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {formatDate(p.confirmedAt)}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate" title={p.notes}>
                      {p.notes || '—'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${p.orderId?._id || p.orderId}`}
                        className="inline-flex items-center gap-1 text-festive-700 font-bold hover:underline"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {payments.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No payment confirmation records found.
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
