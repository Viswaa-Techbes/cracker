'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Layers, Plus, Edit2, Power } from 'lucide-react';
import AdminHeader from '@/components/AdminHeader';
import CategoryModal from '@/components/CategoryModal';
import { fetchApi, getImageUrl } from '@/lib/api';
import { useToast } from '@/lib/toastContext';

export default function AdminCategoriesPage() {
  const { showToast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await fetchApi('/categories?all=true');
      if (res.success && res.data) {
        setCategories(res.data);
      }
    } catch (e) {
      console.error('Failed to load categories', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleToggleActive = async (category: any) => {
    const updatedStatus = !category.isActive;
    try {
      const res = await fetchApi(`/categories/${category._id}`, {
        method: 'PUT',
        body: JSON.stringify({ isActive: updatedStatus }),
      });

      if (res.success) {
        showToast(
          `Category "${category.name}" ${updatedStatus ? 'activated' : 'deactivated'}`,
          'success'
        );
        loadCategories();
      }
    } catch (e: any) {
      showToast(e.message || 'Failed to toggle category', 'error');
    }
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div>
      <AdminHeader title="Category Management" />

      <div className="p-8 space-y-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Catalogue Categories ({categories.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage category ordering, imagery, and product visibility.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-festive-700 hover:bg-festive-800 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4">Active Products</th>
                  <th className="py-3 px-4">Priority Order</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((cat) => (
                  <tr
                    key={cat._id}
                    className={`hover:bg-slate-50 transition-colors ${
                      !cat.isActive ? 'opacity-60 bg-slate-50/50' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-100 p-1 shrink-0 flex items-center justify-center">
                          <Image
                            src={getImageUrl(cat.image)}
                            alt={cat.name}
                            width={36}
                            height={36}
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{cat.name}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">
                            {cat.description || 'No description'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                      {cat.slug}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900">
                      {cat.productCount ?? 0}
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-slate-700">
                      {cat.displayOrder ?? 0}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          cat.isActive
                            ? 'bg-sky-50 text-sky-700 border border-sky-200'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {cat.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(cat)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="Edit category"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleToggleActive(cat)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            cat.isActive
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                          }`}
                          title={cat.isActive ? 'Deactivate' : 'Activate'}
                        >
                          <Power className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      <CategoryModal
        isOpen={isModalOpen}
        category={editingCategory}
        onClose={() => setIsModalOpen(false)}
        onSave={loadCategories}
      />
    </div>
  );
}
