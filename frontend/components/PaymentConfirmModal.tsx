'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface PaymentConfirmModalProps {
  isOpen: boolean;
  orderNumber: string;
  totalAmount: number;
  onClose: () => void;
  onConfirm: (paymentMode: string, referenceNumber: string, notes: string) => Promise<void>;
}

export default function PaymentConfirmModal({
  isOpen,
  orderNumber,
  totalAmount,
  onClose,
  onConfirm,
}: PaymentConfirmModalProps) {
  const [paymentMode, setPaymentMode] = useState('UPI_OFFLINE');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onConfirm(paymentMode, referenceNumber.trim(), notes.trim());
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to record payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Confirm Offline Payment</h3>
              <p className="text-[11px] text-slate-500 font-mono">{orderNumber}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">Total Collected:</span>
            <span className="text-lg font-black text-slate-900">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Payment Mode *
            </label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500 font-medium"
            >
              <option value="UPI_OFFLINE">UPI Offline (GPay / PhonePe / QR)</option>
              <option value="CASH">Cash on Counter / Delivery</option>
              <option value="BANK_TRANSFER">Direct Bank Transfer / NEFT / IMPS</option>
              <option value="OTHER">Other Offline Settlement</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Transaction Reference / UTR Number
            </label>
            <input
              type="text"
              placeholder="e.g. UPI/2026/8947291 or Cash Receipt #"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Payment notes or counter cashier notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-colors disabled:opacity-50"
            >
              {loading ? 'Recording...' : 'Confirm Payment Received'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
