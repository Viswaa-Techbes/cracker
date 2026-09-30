'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Package } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface CategoryOption {
  _id: string;
  name: string;
}

interface ProductModalProps {
  isOpen: boolean;
  product?: any;
  categories: CategoryOption[];
  onClose: () => void;
  onSave: () => void;
}

export default function ProductModal({
  isOpen,
  product,
  categories,
  onClose,
  onSave,
}: ProductModalProps) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [packQuantity, setPackQuantity] = useState('');
  const [price, setPrice] = useState<number | string>('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [stockStatus, setStockStatus] = useState<'IN_STOCK' | 'OUT_OF_STOCK'>('IN_STOCK');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategoryId(
        typeof product.categoryId === 'object' && product.categoryId !== null
          ? product.categoryId._id
          : product.categoryId || ''
      );
      setPackQuantity(product.packQuantity || '');
      setPrice(product.price ?? '');
      setImage(product.image || '/uploads/categories/sparkles.svg');
      setDescription(product.description || '');
      setStockStatus(product.stockStatus || 'IN_STOCK');
      setIsActive(product.isActive !== undefined ? product.isActive : true);
      setIsFeatured(product.isFeatured || false);
    } else {
      setName('');
      setCategoryId(categories[0]?._id || '');
      setPackQuantity('1 Box – 10 pcs');
      setPrice('');
      setImage('/uploads/categories/sparkles.svg');
      setDescription('');
      setStockStatus('IN_STOCK');
      setIsActive(true);
      setIsFeatured(false);
    }
  }, [product, categories]);

  if (!isOpen) return null;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cracker_admin_token') || ''}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setImage(data.url);
      } else {
        setError(data.message || 'Image upload failed');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload image file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    const payload = {
      name: name.trim(),
      categoryId,
      packQuantity: packQuantity.trim(),
      price: Number(price),
      image: image.trim(),
      description: description.trim(),
      stockStatus,
      isActive,
      isFeatured,
    };

    try {
      const endpoint = product ? `/products/${product._id}` : '/products';
      const method = product ? 'PUT' : 'POST';

      const res = await fetchApi(endpoint, {
        method,
        body: JSON.stringify(payload),
      });

      if (res.success) {
        onSave();
        onClose();
      } else {
        setError(res.message || 'Failed to save product');
      }
    } catch (err: any) {
      setError(err.message || 'Error saving product');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl z-10 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-festive-50 text-festive-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h3>
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
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Product Name * (include company if specific)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 30 CM Gold Sparkles (Standard Company)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pack Quantity *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1 Box – 10 pcs"
                value={packQuantity}
                onChange={(e) => setPackQuantity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="e.g. 250"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Stock Status *
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              >
                <option value="IN_STOCK">In Stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
            </div>
          </div>

          {/* Product Image & Upload */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Product Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
              />
              <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl cursor-pointer text-xs font-bold flex items-center gap-1.5 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-festive-500"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-4 h-4 rounded text-festive-600 focus:ring-festive-500"
              />
              <span>Active in Catalogue (Soft-delete toggle)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-festive-600 focus:ring-festive-500"
              />
              <span>Featured on Homepage</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2.5 rounded-xl bg-festive-700 hover:bg-festive-800 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
