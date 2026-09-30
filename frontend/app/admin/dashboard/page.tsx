'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Users,
  IndianRupee,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import PaymentStatusBadge from '@/components/PaymentStatusBadge';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetchApi('/admin/dashboard');
        if (res.success && res.data) {
          setData(res.data);
        }
      } catch (e) {
        console.error('Failed to load dashboard stats', e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const metrics = data?.metrics || {};

  return (
    <div>
      <AdminHeader title="Operations Dashboard" />

      <div className="p-8 space-y-8 max-w-7xl">
        
        {/* Metric Cards Row 1: Key Order Counters */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Orders</span>
              <ShoppingBag className="w-4 h-4 text-slate-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">
              {loading ? '...' : metrics.totalOrders ?? 0}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-amber-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Pending Orders</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-900 mt-2">
              {loading ? '...' : metrics.pendingOrders ?? 0}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-sky-200/80 bg-sky-50/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-sky-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Confirmed</span>
              <CheckCircle2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl font-black text-sky-900 mt-2">
              {loading ? '...' : metrics.confirmedOrders ?? 0}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-orange-200/80 bg-orange-50/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-orange-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Payment Pending</span>
              <AlertCircle className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-2xl font-black text-orange-900 mt-2">
              {loading ? '...' : metrics.paymentPending ?? 0}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Payment Received</span>
              <IndianRupee className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-emerald-900 mt-2">
              {loading ? '...' : metrics.paymentReceived ?? 0}
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-indigo-200/80 bg-indigo-50/20 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-indigo-700">
              <span className="text-[11px] font-bold uppercase tracking-wider">Completed</span>
              <Truck className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-indigo-900 mt-2">
              {loading ? '...' : metrics.completedOrders ?? 0}
            </div>
          </div>

        </div>

        {/* Financial Reporting Notice & Realized Sales Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Confirmed Realized Revenue */}
          <div className="bg-gradient-to-br from-emerald-950 to-slate-950 rounded-3xl p-6 text-white border border-emerald-900/40 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Confirmed Sales Revenue
                </span>
              </div>
              <span className="text-[11px] bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-md font-mono">
                Status: RECEIVED
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-white">
              {loading ? '...' : formatCurrency(metrics.totalReceivedRevenue || 0)}
            </div>

            <p className="text-xs text-emerald-200/70 leading-relaxed">
              * Authoritative financial sales revenue strictly calculated from orders with confirmed offline payments (Cash / UPI received).
            </p>
          </div>

          {/* Pending Pipeline (Unpaid) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Awaiting Offline Collection (Pipeline)
                </span>
              </div>
              <span className="text-[11px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-bold">
                Payment Pending
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-black text-slate-800">
              {loading ? '...' : formatCurrency(metrics.totalPendingAmount || 0)}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              * Unpaid orders currently awaiting phone confirmation or counter cash settlement. Not counted as realized sales.
            </p>
          </div>

        </div>

        {/* 2-Column: Recent Orders + Recent Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Recent Orders (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-xs font-bold text-festive-700 hover:text-festive-800 flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 pr-3">Order ID</th>
                    <th className="py-2.5 px-3">Customer</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Payment</th>
                    <th className="py-2.5 px-3">Order Status</th>
                    <th className="py-2.5 pl-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data?.recentOrders?.map((ord: any) => (
                    <tr key={ord._id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 pr-3 font-mono font-bold text-slate-900">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{ord.customerSnapshot?.name}</div>
                        <div className="text-[10px] text-slate-400">{ord.customerSnapshot?.mobile}</div>
                      </td>
                      <td className="py-3 px-3 font-black text-slate-900">
                        {formatCurrency(ord.totalAmount)}
                      </td>
                      <td className="py-3 px-3">
                        <PaymentStatusBadge status={ord.paymentStatus} />
                      </td>
                      <td className="py-3 px-3">
                        <OrderStatusBadge status={ord.orderStatus} />
                      </td>
                      <td className="py-3 pl-3 text-right">
                        <Link
                          href={`/admin/orders/${ord._id}`}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition-colors"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {(!data?.recentOrders || data.recentOrders.length === 0) && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No orders recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Customers (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-festive-600" />
                <span>Recent Customers</span>
              </h2>
              <Link
                href="/admin/customers"
                className="text-xs font-bold text-festive-700 hover:text-festive-800"
              >
                All
              </Link>
            </div>

            <div className="space-y-3">
              {data?.recentCustomers?.map((c: any) => (
                <div
                  key={c._id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <h4 className="font-bold text-slate-900">{c.name}</h4>
                    <p className="text-[11px] text-slate-500">
                      {c.city} • {c.mobile}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-slate-900 block">
                      {formatCurrency(c.totalSpent)}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {c.totalOrders} {c.totalOrders === 1 ? 'order' : 'orders'}
                    </span>
                  </div>
                </div>
              ))}
              {(!data?.recentCustomers || data.recentCustomers.length === 0) && (
                <p className="py-6 text-center text-xs text-slate-400">
                  No customers in database.
                </p>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
