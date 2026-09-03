'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, Category } from '@/types/blog';
import { getAdminPosts, getCategories, deletePost, togglePostFeatured, togglePostStatus } from '@/lib/actions/blog';
import { formatDate } from '@/lib/utils/blog-utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import {
  FileText,
  Plus,
  Search,
  Filter,
  Layers,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Star,
  Loader2,
  AlertCircle,
  Tag,
  Eye,
  ImageIcon,
} from 'lucide-react';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Action / Modal States
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchPostsAndCategories = async () => {
    setLoading(true);
    const [postsRes, catsRes] = await Promise.all([
      getAdminPosts(),
      getCategories(),
    ]);

    if (postsRes.error) {
      setFeedback({ type: 'error', message: postsRes.error });
    } else {
      setPosts(postsRes.posts);
    }

    if (!catsRes.error) {
      setCategories(catsRes.categories);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPostsAndCategories();
  }, []);

  const handleToggleFeatured = async (post: Post) => {
    const newFeatured = !post.featured;
    // Optimistic update
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, featured: newFeatured } : p))
    );

    const result = await togglePostFeatured(post.id, newFeatured);
    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
      fetchPostsAndCategories();
    } else {
      setFeedback({
        type: 'success',
        message: `Post "${post.title}" ${newFeatured ? 'marked as Featured' : 'unmarked from Featured'}.`,
      });
    }
  };

  const handleToggleStatus = async (post: Post) => {
    const nextStatus = post.status === 'published' ? 'draft' : 'published';
    const result = await togglePostStatus(post.id, nextStatus);

    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
    } else {
      setFeedback({
        type: 'success',
        message: `Post "${post.title}" status changed to ${nextStatus.toUpperCase()}.`,
      });
      fetchPostsAndCategories();
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingPost) return;
    setActionLoading(true);

    const result = await deletePost(deletingPost.id);

    if (result.error) {
      setFeedback({ type: 'error', message: result.error });
      setActionLoading(false);
      setDeletingPost(null);
      return;
    }

    setActionLoading(false);
    setDeletingPost(null);
    setFeedback({
      type: 'success',
      message: `Post "${deletingPost.title}" deleted successfully.`,
    });
    fetchPostsAndCategories();
  };

  // Filter logic
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ? true : post.status === statusFilter;

    const matchesCategory =
      categoryFilter === 'all' ? true : post.category_id === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header & New Post Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-950 font-heading tracking-tight">
            Blog Posts Management
          </h1>
          <p className="text-xs text-gray-500 mt-1 font-medium">
            Create, edit, publish, and organize veterinary articles
          </p>
        </div>

        <Link href="/admin/posts/new">
          <Button
            variant="primary"
            size="md"
            className="text-xs font-bold gap-2 bg-[#0F4A3E] text-white hover:bg-[#0A352C] shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Post</span>
          </Button>
        </Link>
      </div>

      {/* Global Feedback Alert */}
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

      {/* Search & Filter Bar */}
      <Card className="p-4 bg-white flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 bg-white text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-3 w-full md:w-auto flex-wrap sm:flex-nowrap">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full sm:w-auto rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 focus:border-[#0F4A3E] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Layers className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full sm:w-auto rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 focus:border-[#0F4A3E] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-gray-500 font-semibold shrink-0">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'Post' : 'Posts'}
          </div>
        </div>
      </Card>

      {/* Posts Table */}
      <Card className="bg-white overflow-hidden shadow-xs border-gray-200">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#0F4A3E] animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-500">Loading articles...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EAF7F2] text-[#0F4A3E] flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-[#2D9B7C]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900 font-heading">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'No matching articles found'
                  : 'No blog posts created yet'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                {searchQuery || statusFilter !== 'all' || categoryFilter !== 'all'
                  ? 'Try clearing your filters or changing search keywords.'
                  : 'Get started by creating your first veterinary article.'}
              </p>
            </div>
            {!(searchQuery || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <Link href="/admin/posts/new">
                <Button variant="primary" size="sm" className="text-xs font-bold gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create First Post</span>
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50/80 border-b border-gray-100 text-gray-500 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Article</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Featured</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Publish Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50/60 transition-colors">
                    {/* Article Thumbnail + Title & Slug */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200 flex items-center justify-center">
                          {post.cover_image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.cover_image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0 max-w-sm">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="font-bold text-gray-950 hover:text-[#0F4A3E] transition-colors truncate block text-xs sm:text-sm"
                          >
                            {post.title}
                          </Link>
                          <div className="text-[11px] font-mono text-gray-400 truncate">
                            /blog/{post.slug}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      {post.category ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#EAF7F2] text-[#0F4A3E]">
                          <Tag className="w-3 h-3 text-[#2D9B7C]" />
                          {post.category.name}
                        </span>
                      ) : (
                        <span className="text-[11px] text-gray-400 italic">Uncategorized</span>
                      )}
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4">
                      {post.status === 'published' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Draft
                        </span>
                      )}
                    </td>

                    {/* Featured Star Toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(post)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        title={post.featured ? 'Unmark featured' : 'Mark as featured'}
                      >
                        <Star
                          className={`w-4 h-4 ${
                            post.featured
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-gray-300 hover:text-gray-500'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Publish Date */}
                    <td className="py-3.5 px-4 hidden md:table-cell text-gray-500">
                      {formatDate(post.published_at)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 sm:px-6 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <Link href={`/admin/posts/${post.id}/edit`}>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-gray-600 hover:text-[#0F4A3E] hover:bg-teal-50 transition-colors cursor-pointer"
                            title="Edit article"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleToggleStatus(post)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                          title={post.status === 'published' ? 'Move to draft' : 'Publish post'}
                        >
                          {post.status === 'published' ? (
                            <Clock className="w-4 h-4 text-amber-600" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingPost(post)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete article"
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

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={!!deletingPost}
        onClose={() => setDeletingPost(null)}
        title="Confirm Post Deletion"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-2">
            <p className="leading-relaxed">
              Are you sure you want to permanently delete article <strong>&quot;{deletingPost?.title}&quot;</strong>?
            </p>
            <p className="text-[11px] text-red-700">
              This action cannot be undone. The post and any associated uploaded cover media will be removed.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeletingPost(null)}
              disabled={actionLoading}
              className="w-1/2 text-xs font-semibold py-2.5"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleDeleteConfirm}
              disabled={actionLoading}
              className="w-1/2 text-xs font-bold py-2.5 text-white bg-red-600 hover:bg-red-700 border-red-600"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete Article'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
