'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Post, Category, PostFormData, PostStatus } from '@/types/blog';
import { createPost, updatePost } from '@/lib/actions/blog';
import { slugify, calculateReadingTime, generateExcerpt } from '@/lib/utils/blog-utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import {
  Save,
  Send,
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Sparkles,
  Calendar,
  Clock,
  Star,
  Search,
  Globe,
  Tag,
} from 'lucide-react';

interface PostEditorProps {
  initialPost?: Post | null;
  categories: Category[];
  isEditing?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialPost,
  categories,
  isEditing = false,
}) => {
  const router = useRouter();

  // Form States
  const [title, setTitle] = useState(initialPost?.title || '');
  const [slug, setSlug] = useState(initialPost?.slug || '');
  const [isSlugManual, setIsSlugManual] = useState(isEditing ? true : false);
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [coverImage, setCoverImage] = useState<string | null | undefined>(initialPost?.cover_image);
  const [categoryId, setCategoryId] = useState<string>(initialPost?.category_id || '');
  const [status, setStatus] = useState<PostStatus>(initialPost?.status || 'draft');
  const [featured, setFeatured] = useState<boolean>(initialPost?.featured || false);
  const [readingTime, setReadingTime] = useState<number>(initialPost?.reading_time_minutes || 3);
  const [publishedAt, setPublishedAt] = useState<string>(
    initialPost?.published_at ? new Date(initialPost.published_at).toISOString().slice(0, 16) : ''
  );
  const [metaTitle, setMetaTitle] = useState(initialPost?.meta_title || '');
  const [metaDescription, setMetaDescription] = useState(initialPost?.meta_description || '');

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Auto-generate slug from title if not manually locked
  useEffect(() => {
    if (!isSlugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, isSlugManual]);

  // Auto-calculate reading time when content updates
  useEffect(() => {
    if (content) {
      const calculated = calculateReadingTime(content);
      setReadingTime(calculated);
    }
  }, [content]);

  const handleAutoExcerpt = () => {
    if (content) {
      const generated = generateExcerpt(content, 180);
      setExcerpt(generated);
    }
  };

  const handleSave = async (targetStatus?: PostStatus) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const finalStatus = targetStatus || status;

    // Client Validation
    if (!title.trim() || title.trim().length < 3) {
      setErrorMessage('Article title must be at least 3 characters.');
      return;
    }

    if (!slug.trim()) {
      setErrorMessage('Article slug is required.');
      return;
    }

    if (finalStatus === 'published' && (!content.trim() || content === '<p></p>')) {
      setErrorMessage('Article content cannot be empty for published posts.');
      return;
    }

    setLoading(true);

    try {
      const payload: PostFormData = {
        title: title.trim(),
        slug: slugify(slug),
        excerpt: excerpt.trim(),
        content: content.trim(),
        cover_image: coverImage || null,
        category_id: categoryId ? categoryId : null,
        status: finalStatus,
        featured,
        reading_time_minutes: readingTime > 0 ? readingTime : 3,
        published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
        meta_title: metaTitle.trim() || null,
        meta_description: metaDescription.trim() || null,
      };

      if (isEditing && initialPost?.id) {
        const result = await updatePost(initialPost.id, payload);
        if (result.error) {
          setErrorMessage(result.error);
          setLoading(false);
          return;
        }

        setSuccessMessage('Article updated successfully!');
        setLoading(false);
        setTimeout(() => {
          router.push('/admin/posts');
          router.refresh();
        }, 1200);
      } else {
        const result = await createPost(payload);
        if (result.error) {
          setErrorMessage(result.error);
          setLoading(false);
          return;
        }

        setSuccessMessage('Article created successfully!');
        setLoading(false);
        setTimeout(() => {
          router.push('/admin/posts');
          router.refresh();
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred while saving.');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts"
            className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-950 hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-950 font-heading tracking-tight">
              {isEditing ? 'Edit Blog Article' : 'Create New Blog Article'}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">
              {isEditing ? `Editing: ${initialPost?.title}` : 'Fill in the details to publish or save as draft'}
            </p>
          </div>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => handleSave('draft')}
            disabled={loading}
            className="text-xs font-bold gap-1.5 shadow-2xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Draft</span>
          </Button>

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleSave('published')}
            disabled={loading}
            className="text-xs font-bold gap-1.5 bg-[#0F4A3E] text-white hover:bg-[#0A352C] shadow-xs"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Save & Publish' : 'Publish Article'}</span>
          </Button>
        </div>
      </div>

      {/* Error & Success Alert Banners */}
      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-semibold">{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-semibold">{successMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Main Content & Basic Info (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Article Details Card */}
          <Card className="p-6 bg-white space-y-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-gray-800 uppercase tracking-wider mb-1.5">
                Article Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 5 Strategies for Veterinary Relief Shift Management"
                className="text-base font-bold py-3 text-gray-900 placeholder:font-normal placeholder:text-gray-400"
              />
            </div>

            {/* Slug */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#2D9B7C]" />
                  <span>URL Slug</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsSlugManual(!isSlugManual)}
                  className="text-[11px] font-semibold text-gray-500 hover:text-[#0F4A3E] flex items-center gap-1 cursor-pointer"
                >
                  {isSlugManual ? (
                    <>
                      <Lock className="w-3 h-3 text-[#0F4A3E]" />
                      <span>Custom Slug (Click to unlock auto-sync)</span>
                    </>
                  ) : (
                    <>
                      <Unlock className="w-3 h-3 text-gray-400" />
                      <span>Auto-sync with title</span>
                    </>
                  )}
                </button>
              </div>
              <div className="flex items-center rounded-lg border border-gray-200 bg-gray-50/70 overflow-hidden focus-within:border-[#0F4A3E] focus-within:ring-1 focus-within:ring-[#0F4A3E]">
                <span className="px-3 text-xs text-gray-400 font-mono select-none">
                  /blog/
                </span>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => {
                    setIsSlugManual(true);
                    setSlug(slugify(e.target.value));
                  }}
                  placeholder="5-strategies-for-relief-shifts"
                  className="w-full bg-transparent px-2 py-2 text-xs font-mono text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                  Summary / Excerpt
                </label>
                <button
                  type="button"
                  onClick={handleAutoExcerpt}
                  className="text-[11px] font-semibold text-[#2D9B7C] hover:text-[#0F4A3E] flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Extract from content</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A short, compelling summary of the article displayed on blog cards and search engines..."
                className="w-full rounded-xl border border-gray-200 bg-white p-3 text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E] leading-relaxed"
              />
              <div className="flex justify-end mt-1 text-[10px] text-gray-400">
                {excerpt.length} / 250 characters
              </div>
            </div>
          </Card>

          {/* Cover Image Upload Card */}
          <Card className="p-6 bg-white space-y-3">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Featured Cover Image
            </h2>
            <ImageUploader value={coverImage} onChange={setCoverImage} folder="covers" />
          </Card>

          {/* Rich Content Editor Card */}
          <Card className="p-6 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                Article Body Content <span className="text-red-500">*</span>
              </h2>
              <span className="text-[11px] text-gray-400 font-medium">
                ~{readingTime} min read
              </span>
            </div>
            <RichTextEditor content={content} onChange={setContent} />
          </Card>

          {/* SEO Metadata Card */}
          <Card className="p-6 bg-white space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
              <Search className="w-4 h-4 text-[#2D9B7C]" />
              <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                Search Engine Optimization (SEO)
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Meta Title
              </label>
              <Input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Custom SEO Title Tag'}
                className="text-xs py-2"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Recommended: 50-60 characters ({metaTitle.length} chars)
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Meta Description
              </label>
              <textarea
                rows={2}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder={excerpt || 'Concise description for search engine preview snippets...'}
                className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Recommended: 150-160 characters ({metaDescription.length} chars)
              </p>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Settings & Publishing Controls (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Publication Card */}
          <Card className="p-6 bg-white space-y-5 sticky top-20">
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
              Publication Settings
            </h2>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    status === 'draft'
                      ? 'border-amber-400 bg-amber-50 text-amber-900 ring-1 ring-amber-400'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Draft
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    status === 'published'
                      ? 'border-[#0F4A3E] bg-[#EAF7F2] text-[#0F4A3E] ring-1 ring-[#0F4A3E]'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D9B7C]" />
                    Published
                  </span>
                </button>
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <Tag className="w-3 h-3 text-[#2D9B7C]" />
                  <span>Category</span>
                </label>
                <Link
                  href="/admin/categories"
                  className="text-[11px] font-semibold text-[#0F4A3E] hover:underline"
                >
                  + Add New
                </Link>
              </div>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E] cursor-pointer"
              >
                <option value="">Uncategorized</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Published Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-gray-500" />
                <span>Publish Date & Time</span>
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs text-gray-800 focus:border-[#0F4A3E] focus:outline-none focus:ring-1 focus:ring-[#0F4A3E]"
              />
              <p className="text-[10px] text-gray-400 mt-1">
                Leave blank to auto-set to current time when published.
              </p>
            </div>

            {/* Reading Time */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-500" />
                <span>Reading Time (minutes)</span>
              </label>
              <Input
                type="number"
                min={1}
                max={120}
                value={readingTime}
                onChange={(e) => setReadingTime(parseInt(e.target.value) || 1)}
                className="text-xs py-2"
              />
            </div>

            {/* Featured Post Toggle */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-[#0F4A3E] focus:ring-[#0F4A3E] cursor-pointer"
                />
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                    <Star className={`w-3.5 h-3.5 ${featured ? 'text-amber-500 fill-amber-500' : 'text-gray-400'}`} />
                    <span>Featured Article</span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    Highlight at the top of the public blog header.
                  </p>
                </div>
              </label>
            </div>

            {/* Bottom Action Buttons */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => handleSave(status)}
                disabled={loading}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#0F4A3E] hover:bg-[#0A352C] text-white shadow-xs"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                ) : isEditing ? (
                  'Save Changes'
                ) : status === 'published' ? (
                  'Publish Article'
                ) : (
                  'Save as Draft'
                )}
              </Button>

              <Link href="/admin/posts" className="block w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  disabled={loading}
                  className="w-full text-xs font-semibold py-2"
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
