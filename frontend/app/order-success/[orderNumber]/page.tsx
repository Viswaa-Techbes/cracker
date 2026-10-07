'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  PhoneCall,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
} from 'lucide-react';
import { fetchApi } from '@/lib/api';
import { formatCurrency, formatDate } from '@/lib/utils';
import OrderStatusBadge from '@/components/OrderStatusBadge';
import PaymentStatusBadge from '@/components/PaymentStatusBadge';
import LegalDisclaimerBanner from '@/components/LegalDisclaimerBanner';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = params.orderNumber as string;

  const [order, setOrder] = useState<any>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const res = await fetchApi(`/orders/${orderNumber}`);
        if (res.success && res.data) {
          setOrder(res.data);
          if (res.data.whatsappUrl) {
            setWhatsappUrl(res.data.whatsappUrl);
          }
        }
      } catch (e) {
        console.error('Failed to load order', e);
      } finally {
        setLoading(false);
      }
    }
    if (orderNumber) {
      loadOrder();
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="w-12 h-12 rounded-full border-4 border-festive-600 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold">Loading your order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center max-w-md mx-auto px-4">
        <h2 className="text-xl font-bold text-slate-900">Order Not Found</h2>
        <p className="text-xs text-slate-500 mt-2">
          We could not locate an order matching {orderNumber}.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex px-6 py-2.5 rounded-full bg-festive-700 text-white font-bold text-xs"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Prominent Legal Compliance Disclaimer Banner */}
        <LegalDisclaimerBanner variant="card" />

        {/* Main Success Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-8 sm:p-10 text-center space-y-6">
          
          {/* Success Animated Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Enquiry Submitted
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Enquiry Received Successfully
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
              Our team will review your enquiry list and contact you regarding product availability and details.
            </p>
          </div>

          {/* Key Order Credentials Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 text-left">
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Enquiry Reference
              </span>
              <span className="text-sm font-black text-slate-900 font-mono">
                {order.orderNumber}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Estimated Total
              </span>
              <span className="text-base font-black text-festive-700">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Payment Status
              </span>
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
          </div>

          {/* WhatsApp Direct Action Button */}
          {whatsappUrl && (
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Contact on WhatsApp</span>
              </a>
              <p className="text-[11px] text-slate-400 mt-2">
                Click above to instantly send your order details to our Sivakasi desk for fast confirmation.
              </p>
            </div>
          )}

          {/* Itemized Order Breakdown */}
          <div className="pt-6 border-t border-slate-100 text-left space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-festive-700" />
              <span>Ordered Items ({order.items.length})</span>
            </h3>

            <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden bg-slate-50/50">
              {order.items.map((item: any, idx: number) => (
                <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.productName}</span>
                    <span className="text-[11px] text-slate-500">
                      {item.packQuantity} • {item.quantity} x {formatCurrency(item.unitPrice)}
                    </span>
                  </div>
                  <span className="font-black text-slate-900">
                    {formatCurrency(item.lineTotal)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs pt-2">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatCurrency(order.subtotal)}</span>
              </div>
              {order.deliveryFee > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(order.deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                <span>Total Amount Due</span>
                <span className="text-festive-700">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="pt-4 border-t border-slate-100 text-left space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{order.orderType === 'DELIVERY' ? 'Delivery Address' : 'Store Pickup Address'}</span>
            </h4>
            <p>
              {order.customerSnapshot?.name} ({order.customerSnapshot?.mobile})
            </p>
            <p>
              {order.deliveryAddress?.address}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
            </p>
          </div>

          {/* Continue Shopping CTA */}
          <div className="pt-6 border-t border-slate-100 flex justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-festive-700 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Browsing Catalogue</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
