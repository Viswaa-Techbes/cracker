'use client';

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  Eye,
  Calendar,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import PaymentStatusBadge from '@/components/PaymentStatusBadge';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderType, setOrderType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search.trim()) params.set('search', search.trim());
    if (orderStatus) params.set('orderStatus', orderStatus);
    if (paymentStatus) params.set('paymentStatus', paymentStatus);
    if (orderType) params.set('orderType', orderType);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    params.set('page', page.toString());
    params.set('limit', '15');

    try {
      const res = await fetchApi(`/admin/orders?${params.toString()}`);
      if (res.success && res.data) {
        setOrders(res.data);
        setTotalPages(res.totalPages || 1);
        setTotalCount(res.total || 0);
      }
    } catch (e) {
      console.error('Failed to load admin orders', e);
    } finally {
      setLoading(false);
    }
  }, [search, orderStatus, paymentStatus, orderType, startDate, endDate, page]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const handleReset = () => {
    setSearch('');
    setOrderStatus('');
    setPaymentStatus('');
    setOrderType('');
    setStartDate('');
    setEndDate('');
    setPage(1);
  };

  return (
    <div>
      <AdminHeader title="Order Management" />

      <div className="p-8 space-y-6 max-w-7xl">
        
        {/* Filters Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Filter className="w-4 h-4 text-festive-600" />
              <span>Search & Filter Orders</span>
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-semibold text-festive-700 hover:text-festive-800 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Search Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Search (Order ID, Name, Mobile)
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. ORD-2026 or 98765"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Order Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Order Status
              </label>
              <select
                value={orderStatus}
                onChange={(e) => {
                  setOrderStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 font-medium"
              >
                <option value="">All Order Statuses</option>
                <option value="PENDING">PENDING</option>
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="PACKED">PACKED</option>
                <option value="READY_FOR_PICKUP">READY FOR PICKUP</option>
                <option value="OUT_FOR_DELIVERY">OUT FOR DELIVERY</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            {/* Payment Status */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Payment Status
              </label>
              <select
                value={paymentStatus}
                onChange={(e) => {
                  setPaymentStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 font-medium"
              >
                <option value="">All Payment Statuses</option>
                <option value="PENDING">Offline - Pending</option>
                <option value="RECEIVED">Payment Received</option>
                <option value="REFUNDED">Refunded</option>
              </select>
            </div>

            {/* Date Range Start */}
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                Date Range
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    setPage(1);
                  }}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-2 text-[11px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                    setPage(1);
                  }}
                  className="w-1/2 bg-slate-50 border border-slate-200 rounded-xl py-1.5 px-2 text-[11px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">
              Found {totalCount} total orders
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Order Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">
                        {order.customerSnapshot?.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {order.customerSnapshot?.mobile}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {order.orderType}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="py-3.5 px-4">
                      <OrderStatusBadge status={order.orderStatus} />
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-festive-600 hover:text-white text-slate-700 font-bold text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Manage</span>
                      </Link>
                    </td>
                  </tr>
                ))}

                {orders.length === 0 && !loading && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      No matching orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold disabled:opacity-40"
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
