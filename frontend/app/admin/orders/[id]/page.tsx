'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  Truck,
  Package,
  Store,
  XCircle,
  IndianRupee,
  Clock,
  PhoneCall,
  User,
  MapPin,
  Calendar,
  CreditCard,
  MessageSquare,
} from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import PaymentStatusBadge from '@/components/PaymentStatusBadge';
import PaymentConfirmModal from '@/components/PaymentConfirmModal';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useToast } from '@/lib/toastContext';

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;
  const { showToast } = useToast();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const loadOrder = async () => {
    try {
      const res = await fetchApi(`/admin/orders/${orderId}`);
      if (res.success && res.data) {
        setOrder(res.data);
      }
    } catch (e) {
      console.error('Failed to load order', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const handleUpdateStatus = async (newStatus: string, note?: string) => {
    if (newStatus === 'CANCELLED') {
      if (!confirm('Are you sure you want to cancel this order?')) return;
    }

    setActionLoading(true);
    try {
      const res = await fetchApi(`/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
          orderStatus: newStatus,
          note: note || `Admin moved order to ${newStatus}`,
        }),
      });

      if (res.success) {
        showToast(`Order status updated to ${newStatus}`, 'success');
        loadOrder();
      } else {
        showToast(res.message || 'Status update failed', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error updating status', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmPayment = async (
    paymentMode: string,
    referenceNumber: string,
    notes: string
  ) => {
    const res = await fetchApi(`/admin/orders/${orderId}/payment`, {
      method: 'POST',
      body: JSON.stringify({
        paymentMode,
        referenceNumber,
        notes,
      }),
    });

    if (res.success) {
      showToast('Payment confirmed and recorded successfully!', 'success');
      loadOrder();
    } else {
      throw new Error(res.message || 'Failed to record payment');
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Order Details" />
        <div className="p-12 text-center text-slate-400">Loading order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div>
        <AdminHeader title="Order Not Found" />
        <div className="p-12 text-center text-slate-500">
          Order does not exist.
          <div className="mt-4">
            <Link href="/admin/orders" className="text-festive-700 underline text-xs font-bold">
              ← Return to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title={`Order ${order.orderNumber}`} />

      <div className="p-8 space-y-8 max-w-7xl">
        
        {/* Top Navigation & Status Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/admin/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Orders</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">Current Status:</span>
            <OrderStatusBadge status={order.orderStatus} />
            <PaymentStatusBadge status={order.paymentStatus} />
          </div>
        </div>

        {/* Workflow Action Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Order Lifecycle Actions
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            
            {/* Mark Payment Received */}
            {order.paymentStatus !== 'RECEIVED' && (
              <button
                type="button"
                onClick={() => setIsPaymentModalOpen(true)}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm transition-all"
              >
                <IndianRupee className="w-4 h-4" />
                <span>Mark Payment Received</span>
              </button>
            )}

            {/* Confirm Order */}
            {order.orderStatus === 'PENDING' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('CONFIRMED', 'Order confirmed by admin')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Confirm Order</span>
              </button>
            )}

            {/* Mark Packed */}
            {['PENDING', 'CONFIRMED'].includes(order.orderStatus) && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('PACKED', 'Crackers packed into secure cartons')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all"
              >
                <Package className="w-4 h-4" />
                <span>Mark Packed</span>
              </button>
            )}

            {/* Ready for Pickup */}
            {order.orderType === 'PICKUP' && ['CONFIRMED', 'PACKED'].includes(order.orderStatus) && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('READY_FOR_PICKUP', 'Ready at counter for customer pickup')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-all"
              >
                <Store className="w-4 h-4" />
                <span>Ready for Pickup</span>
              </button>
            )}

            {/* Out for Delivery */}
            {order.orderType === 'DELIVERY' && ['CONFIRMED', 'PACKED'].includes(order.orderStatus) && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('OUT_FOR_DELIVERY', 'Dispatched with authorized hazardous cargo carrier')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-all"
              >
                <Truck className="w-4 h-4" />
                <span>Out for Delivery</span>
              </button>
            )}

            {/* Complete Order */}
            {!['COMPLETED', 'CANCELLED'].includes(order.orderStatus) && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('COMPLETED', 'Order successfully fulfilled and delivered')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Complete Order</span>
              </button>
            )}

            {/* Cancel Order */}
            {order.orderStatus !== 'CANCELLED' && order.orderStatus !== 'COMPLETED' && (
              <button
                type="button"
                onClick={() => handleUpdateStatus('CANCELLED', 'Order cancelled by store operator')}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>Cancel Order</span>
              </button>
            )}

            {/* WhatsApp direct customer link */}
            {order.whatsappUrl && (
              <a
                href={order.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all ml-auto"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                <span>Message Customer on WhatsApp</span>
              </a>
            )}
          </div>
        </div>

        {/* 2-Column: Customer Details & Order Snapshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 5 Cols: Customer & Offline Payment Information */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Customer Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4 text-festive-600" />
                <span>Customer & Contact Details</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div>
                  <span className="text-slate-400 block text-[11px]">Full Name</span>
                  <span className="text-sm font-bold text-slate-900">{order.customerSnapshot?.name}</span>
                </div>

                <div className="flex gap-4">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Mobile</span>
                    <a
                      href={`tel:${order.customerSnapshot?.mobile}`}
                      className="text-festive-700 font-bold hover:underline"
                    >
                      {order.customerSnapshot?.mobile}
                    </a>
                  </div>

                  {order.customerSnapshot?.whatsapp && (
                    <div>
                      <span className="text-slate-400 block text-[11px]">WhatsApp</span>
                      <span className="font-semibold text-slate-800">
                        {order.customerSnapshot?.whatsapp}
                      </span>
                    </div>
                  )}
                </div>

                {order.customerSnapshot?.email && (
                  <div>
                    <span className="text-slate-400 block text-[11px]">Email</span>
                    <span className="font-semibold text-slate-800">{order.customerSnapshot?.email}</span>
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{order.orderType === 'DELIVERY' ? 'Delivery Address' : 'Store Pickup Address'}</span>
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {order.deliveryAddress?.address}
                  <br />
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state} -{' '}
                  <strong>{order.deliveryAddress?.pincode}</strong>
                </p>
              </div>

              {order.customerNotes && (
                <div className="pt-3 border-t border-slate-100 text-xs">
                  <span className="text-slate-400 block text-[11px] font-bold">Customer Notes:</span>
                  <p className="text-slate-800 mt-1 italic">"{order.customerNotes}"</p>
                </div>
              )}
            </div>

            {/* Offline Payment Audit Card */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                <span>Offline Payment Record</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Payment Status:</span>
                  <PaymentStatusBadge status={order.paymentStatus} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="font-bold text-slate-900">{order.paymentMode}</span>
                </div>

                {order.paymentDetails?.referenceNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Reference / UTR:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {order.paymentDetails.referenceNumber}
                    </span>
                  </div>
                )}

                {order.paymentDetails?.confirmedBy && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Confirmed By:</span>
                    <span className="font-bold text-slate-900">
                      {order.paymentDetails.confirmedBy}
                    </span>
                  </div>
                )}

                {order.paymentDetails?.confirmedAt && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Confirmed At:</span>
                    <span className="text-slate-700">
                      {formatDate(order.paymentDetails.confirmedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right 7 Cols: Items Snapshot & Totals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Order Items Snapshot ({order.items.length})
              </h3>

              <div className="divide-y divide-slate-100">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="py-3 flex items-center justify-between text-xs">
                    <div>
                      <h4 className="font-bold text-slate-900">{item.productName}</h4>
                      <p className="text-[11px] text-slate-500">
                        {item.packQuantity} • {item.quantity} x {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <span className="font-black text-slate-900 text-sm">
                      {formatCurrency(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-800">{formatCurrency(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-100">
                  <span>Total Due</span>
                  <span className="text-xl text-festive-700">{formatCurrency(order.totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Status History Timeline */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Status Audit Log</span>
              </h3>

              <div className="space-y-3">
                {order.statusHistory?.map((h: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs flex items-start justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900">{h.status}</span>
                      <p className="text-slate-600 mt-0.5">{h.note}</p>
                      <span className="text-[10px] text-slate-400">By {h.changedBy}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {formatDate(h.timestamp)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Payment Confirmation Modal */}
      <PaymentConfirmModal
        isOpen={isPaymentModalOpen}
        orderNumber={order.orderNumber}
        totalAmount={order.totalAmount}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleConfirmPayment}
      />
    </div>
  );
}
