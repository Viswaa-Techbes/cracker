import React from 'react';

export type OrderStatusType =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PACKED'
  | 'READY_FOR_PICKUP'
  | 'OUT_FOR_DELIVERY'
  | 'COMPLETED'
  | 'CANCELLED';

const STATUS_CONFIG: Record<
  OrderStatusType,
  { label: string; bg: string; text: string; border: string }
> = {
  PENDING: {
    label: 'Pending Review',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    border: 'border-amber-200',
  },
  CONFIRMED: {
    label: 'Confirmed',
    bg: 'bg-sky-50',
    text: 'text-sky-800',
    border: 'border-sky-200',
  },
  PACKED: {
    label: 'Packed & Boxed',
    bg: 'bg-indigo-50',
    text: 'text-indigo-800',
    border: 'border-indigo-200',
  },
  READY_FOR_PICKUP: {
    label: 'Ready for Pickup',
    bg: 'bg-purple-50',
    text: 'text-purple-800',
    border: 'border-purple-200',
  },
  OUT_FOR_DELIVERY: {
    label: 'Out for Delivery',
    bg: 'bg-orange-50',
    text: 'text-orange-800',
    border: 'border-orange-200',
  },
  COMPLETED: {
    label: 'Completed',
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    border: 'border-emerald-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    bg: 'bg-rose-50',
    text: 'text-rose-800',
    border: 'border-rose-200',
  },
};

export default function OrderStatusBadge({ status }: { status: string }) {
  const config =
    STATUS_CONFIG[status as OrderStatusType] || {
      label: status,
      bg: 'bg-slate-100',
      text: 'text-slate-800',
      border: 'border-slate-200',
    };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {config.label}
    </span>
  );
}
