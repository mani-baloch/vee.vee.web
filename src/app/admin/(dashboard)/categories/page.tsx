'use client';

import React, { useState, useEffect } from 'react';
import { Category } from '@/types/blog';
import { getCategories, createCategory, updateCategory, deleteCategory } from '@/lib/actions/blog';
import { slugify, formatDate } from '@/lib/utils/blog-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import {
  FolderTree,
  Plus,
  Edit2,
  Trash2,
  Search,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Tag,
  Globe,
  HelpCircle,
} from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  // Form States
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  // Alert Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchCategoriesList = async () => {
    setLoading(true);
    const result = await getCategories();
    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    } else {
      setCategories(result.categories);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategoriesList();
  }, []);

  const openCreateModal = () => {
    setFormName('');
    setFormSlug('');
    setFormDescription('');
    setModalError(null);
    setIsCreateOpen(true);
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setFormName(cat.name);
    setFormSlug(cat.slug);
    setFormDescription(cat.description || '');
    setModalError(null);
  };

  const handleNameChange = (val: string) => {
    setFormName(val);
    if (!editingCategory) {
      setFormSlug(slugify(val));
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    setFormLoading(true);

    const result = await createCategory({
      name: formName,
      slug: formSlug,
      description: formDescription,
    });

    if (result.error) {
      setModalError(result.error);
      setFormLoading(false);
      return;
    }

    setFormLoading(false);
    setIsCreateOpen(false);
    setFeedback({ type: 'success', message: `Category "${formName}" created successfully!` });
    fetchCategoriesList();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;
    setModalError(null);
    setFormLoading(true);

    const result = await updateCategory(editingCategory.id, {
      name: formName,
      slug: formSlug,
      description: formDescription,
    });

    if (result.error) {
      setModalError(result.error);
      setFormLoading(false);
      return;
    }

    setFormLoading(false);
    setEditingCategory(null);
    setFeedback({ type: 'success', message: `Category "${formName}" updated successfully!` });
    fetchCategoriesList();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingCategory) return;
    setFormLoading(true);

    const result = await deleteCategory(deletingCategory.id);

    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
      setFormLoading(false);
      setDeletingCategory(null);
      return;
    }

    setFormLoading(false);
    setDeletingCategory(null);
    setFeedback({
      type: 'success',
      message: `Category "${deletingCategory.name}" removed. Linked posts are safely set to Uncategorized.`,
    });
    fetchCategoriesList();
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.description && cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-950 font-heading tracking-tight">
            Blog Categories Management
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Organize veterinary topics, taxonomies, and navigation tags
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={openCreateModal}
          className="text-xs font-bold gap-2 bg-[#0F4A3E] text-white hover:bg-[#0A352C] shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      {/* Global Feedback Alerts */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-start justify-between gap-3 text-xs font-semibold animate-in fade-in ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <Card className="p-4 bg-white flex items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
          />
        </div>
        <div className="text-xs text-gray-500 font-semibold">
          {filteredCategories.length} {filteredCategories.length === 1 ? 'Category' : 'Categories'}
        </div>
      </Card>

      {/* Categories Table / Card Grid */}
      <Card className="bg-white overflow-hidden shadow-xs border-gray-200">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#0F4A3E] animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-500">Loading categories...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7F2] text-[#0F4A3E] flex items-center justify-center mx-auto">
              <FolderTree className="w-6 h-6 text-[#2D9B7C]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                {searchQuery ? 'No matching categories found' : 'No categories created yet'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? 'Try searching for another keyword.'
                  : 'Get started by creating your first blog category such as "Clinical Care" or "Relief Shifts".'}
              </p>
            </div>
            {!searchQuery && (
              <Button
                variant="primary"
                size="sm"
                onClick={openCreateModal}
                className="text-xs font-bold gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Category</span>
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4 sm:px-6">Category Name</th>
                  <th className="py-3 px-4">Slug</th>
                  <th className="py-3 px-4 hidden md:table-cell">Description</th>
                  <th className="py-3 px-4 hidden sm:table-cell">Created Date</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {filteredCategories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-gray-950">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#2D9B7C]" />
                        <span>{cat.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-gray-500">
                      /blog?category={cat.slug}
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 max-w-xs truncate hidden md:table-cell">
                      {cat.description || <span className="text-gray-400 italic">No description</span>}
                    </td>
                    <td className="py-3.5 px-4 text-gray-500 hidden sm:table-cell">
                      {formatDate(cat.created_at)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-lg text-gray-600 hover:text-[#0F4A3E] hover:bg-teal-50 transition-colors cursor-pointer"
                          title="Edit category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingCategory(cat)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* 1. CREATE CATEGORY MODAL */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Category"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          {modalError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{modalError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formName}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Clinical Practice"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#2D9B7C]" />
              <span>Slug</span>
            </label>
            <Input
              required
              value={formSlug}
              onChange={(e) => setFormSlug(slugify(e.target.value))}
              placeholder="clinical-practice"
              className="font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Articles and insights focused on clinical procedures and standards..."
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              disabled={formLoading}
              className="w-1/2 text-xs font-semibold py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formLoading}
              className="w-1/2 text-xs font-bold py-2.5 bg-[#0F4A3E] text-white hover:bg-[#0A352C]"
            >
              {formLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Create Category'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 2. EDIT CATEGORY MODAL */}
      <Modal
        isOpen={!!editingCategory}
        onClose={() => setEditingCategory(null)}
        title="Edit Category"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          {modalError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{modalError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Category Name <span className="text-red-500">*</span>
            </label>
            <Input
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Clinical Practice"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Globe className="w-3 h-3 text-[#2D9B7C]" />
              <span>Slug</span>
            </label>
            <Input
              required
              value={formSlug}
              onChange={(e) => setFormSlug(slugify(e.target.value))}
              placeholder="clinical-practice"
              className="font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={3}
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Articles and insights focused on clinical procedures..."
              className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingCategory(null)}
              disabled={formLoading}
              className="w-1/2 text-xs font-semibold py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formLoading}
              className="w-1/2 text-xs font-bold py-2.5 bg-[#0F4A3E] text-white hover:bg-[#0A352C]"
            >
              {formLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* 3. DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deletingCategory}
        onClose={() => setDeletingCategory(null)}
        title="Confirm Category Deletion"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Safe Foreign Key Deletion</span>
            </div>
            <p className="leading-relaxed">
              Are you sure you want to delete category <strong>&quot;{deletingCategory?.name}&quot;</strong>?
            </p>
            <p className="text-[11px] text-amber-800">
              Any blog articles assigned to this category will automatically be set to <em>Uncategorized</em>. No posts will be deleted.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingCategory(null)}
              disabled={formLoading}
              className="w-1/2 text-xs font-semibold py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDeleteConfirm}
              disabled={formLoading}
              className="w-1/2 text-xs font-bold py-2.5 text-white bg-red-600 hover:bg-red-700 border-red-600"
            >
              {formLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete Category'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
