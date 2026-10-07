'use client';

import React, { useEffect, useState } from 'react';
import { Settings, Save, CheckCircle2, ShieldAlert } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import { fetchApi } from '@/lib/api';
import { useToast } from '@/lib/toastContext';

export default function AdminSettingsPage() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    storeName: 'Sparkle Crackers Sivakasi',
    phone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    email: 'orders@sparklecrackers.com',
    address: 'Main Bazaar Road, Near Town Clock Tower',
    city: 'Sivakasi',
    state: 'Tamil Nadu',
    pincode: '626123',
    pickupEnabled: true,
    deliveryEnabled: true,
    minimumOrderAmount: 500,
    freeDeliveryThreshold: 3000,
    deliveryFee: 150,
    allowedPincodes: '',
    bannerNotice: '',
    legalDisclaimer:
      'As per No.R4(2)83/CC 405/2023 compliance of Directives of honourable Supreme Court of India in WP (C) 728 of 2015 - Reg, we don’t sell any sort of crackers or any related activities with relevant to purchases. The catalog is just to view the products and understand.',
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetchApi('/admin/settings');
        if (res.success && res.data) {
          setForm({
            ...res.data,
            allowedPincodes: (res.data.allowedPincodes || []).join(', '),
          });
        }
      } catch (e) {
        console.error('Failed to load settings', e);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      minimumOrderAmount: Number(form.minimumOrderAmount),
      freeDeliveryThreshold: Number(form.freeDeliveryThreshold),
      deliveryFee: Number(form.deliveryFee),
      allowedPincodes: form.allowedPincodes
        ? form.allowedPincodes.split(',').map((p) => p.trim()).filter(Boolean)
        : [],
    };

    try {
      const res = await fetchApi('/admin/settings', {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      if (res.success) {
        showToast('Store settings updated successfully!', 'success');
      } else {
        showToast(res.message || 'Failed to update settings', 'error');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div>
        <AdminHeader title="Store Settings" />
        <div className="p-12 text-center text-slate-400">Loading settings...</div>
      </div>
    );
  }

  return (
    <div>
      <AdminHeader title="Store Operations Settings" />

      <div className="p-8 space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Business & Service Configuration
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure order thresholds, delivery logistics rules, and contact information.
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* General Business Information */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Store Identity & Contact
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Store Name</label>
                <input
                  type="text"
                  value={form.storeName}
                  onChange={(e) => handleChange('storeName', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Helpline Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  WhatsApp Number (with country code, digits only)
                </label>
                <input
                  type="text"
                  value={form.whatsappNumber}
                  onChange={(e) => handleChange('whatsappNumber', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Fulfillment & Delivery Logistics */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Fulfillment Policies & Pricing
            </h3>

            <div className="flex gap-6 pb-2 border-b border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={form.deliveryEnabled}
                  onChange={(e) => handleChange('deliveryEnabled', e.target.checked)}
                  className="w-4 h-4 rounded text-festive-600 focus:ring-festive-500"
                />
                <span>Delivery Enabled</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={form.pickupEnabled}
                  onChange={(e) => handleChange('pickupEnabled', e.target.checked)}
                  className="w-4 h-4 rounded text-festive-600 focus:ring-festive-500"
                />
                <span>Store Pickup Enabled</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Minimum Order Subtotal (₹)
                </label>
                <input
                  type="number"
                  value={form.minimumOrderAmount}
                  onChange={(e) => handleChange('minimumOrderAmount', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Standard Delivery Fee (₹)
                </label>
                <input
                  type="number"
                  value={form.deliveryFee}
                  onChange={(e) => handleChange('deliveryFee', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Free Delivery Threshold (₹)
                </label>
                <input
                  type="number"
                  value={form.freeDeliveryThreshold}
                  onChange={(e) => handleChange('freeDeliveryThreshold', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1 text-xs">
                Restricted Allowed Pincodes (Optional, comma-separated. Leave empty to allow all serviceable districts)
              </label>
              <input
                type="text"
                placeholder="e.g. 626123, 625001, 600001"
                value={form.allowedPincodes}
                onChange={(e) => handleChange('allowedPincodes', e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs focus:ring-2 focus:ring-festive-500 outline-none font-mono"
              />
            </div>
          </div>

          {/* Announcement & Legal Notice */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Banners & Statutory Text
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Top Announcement Banner</label>
                <input
                  type="text"
                  value={form.bannerNotice}
                  onChange={(e) => handleChange('bannerNotice', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Legal / PESO Disclaimer Notice
                </label>
                <textarea
                  rows={3}
                  value={form.legalDisclaimer}
                  onChange={(e) => handleChange('legalDisclaimer', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 focus:ring-2 focus:ring-festive-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-festive-700 hover:bg-festive-800 text-white font-black text-xs shadow-md transition-all disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
