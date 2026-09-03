import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/utils/blog-utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HoneycombPattern } from '@/components/HoneycombPattern';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogContentRenderer } from '@/components/blog/BlogContentRenderer';
import { ShareButtons } from '@/components/blog/ShareButtons';
import CtaBanner from '@/components/CtaBanner';
import {
  Clock,
  Tag,
  ArrowLeft,
  Calendar,
  User,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ============================================================================
// DYNAMIC SEO METADATA GENERATOR
// ============================================================================
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from('posts')
    .select('*, author:public_authors(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .single();

  if (!post) {
    return {
      title: 'Article Not Found | vee.vet',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vee.vet';
  const pageTitle = post.meta_title || `${post.title} | vee.vet Blog`;
  const pageDescription = post.meta_description || post.excerpt;

  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'vee.vet',
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.author?.full_name ? [post.author.full_name] : ['vee.vet Team'],
      images: post.cover_image
        ? [
            {
              url: post.cover_image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: pageDescription,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  };
}

// ============================================================================
// MAIN BLOG DETAIL PAGE COMPONENT
// ============================================================================
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch current article (only if published and release date has passed)
  const { data: postData, error } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:public_authors(*)')
    .eq('slug', slug)
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .single();

  if (error || !postData) {
    notFound();
  }

  const post = postData as Post;

  // 2. Fetch related articles (Priority: same category, fallback to recent)
  let relatedPosts: Post[] = [];

  if (post.category_id) {
    const { data: sameCategoryPosts } = await supabase
      .from('posts')
      .select('*, category:categories(*), author:public_authors(*)')
      .eq('status', 'published')
      .eq('category_id', post.category_id)
      .neq('id', post.id)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(3);

    relatedPosts = (sameCategoryPosts || []) as Post[];
  }

  // If fewer than 3 related articles in same category, fetch other recent articles
  if (relatedPosts.length < 3) {
    const existingIds = [post.id, ...relatedPosts.map((p) => p.id)];
    const needed = 3 - relatedPosts.length;

    const { data: recentPosts } = await supabase
      .from('posts')
      .select('*, category:categories(*), author:public_authors(*)')
      .eq('status', 'published')
      .not('id', 'in', `(${existingIds.join(',')})`)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(needed);

    if (recentPosts) {
      relatedPosts = [...relatedPosts, ...(recentPosts as Post[])];
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Peach Container wrapping Floating Navbar & Article Header */}
      <div className="relative bg-[#FDF4EC] overflow-hidden pb-12 sm:pb-16">
        {/* Decorative Brand Honeycomb Pattern */}
        <div className="absolute top-0 left-0 w-80 sm:w-[500px] md:w-[600px] pointer-events-none z-0">
          <HoneycombPattern variant="hero-blue" />
        </div>
        <div className="absolute top-0 right-0 w-80 sm:w-[500px] pointer-events-none opacity-40 z-0">
          <HoneycombPattern variant="hero-peach" />
        </div>

        {/* 1. Floating Pill Navbar */}
        <Navbar activeTab="Blog" />

        {/* 2. Breadcrumb & Article Header */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 space-y-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-[#0F4A3E] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link href="/blog" className="hover:text-[#0F4A3E] transition-colors">
              Blog
            </Link>
            {post.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-700 font-bold">{post.category.name}</span>
              </>
            )}
          </nav>

          {/* Category Pill */}
          {post.category && (
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF7F2] text-[#0F4A3E] border border-[#2D9B7C]/20">
                <Tag className="w-3.5 h-3.5 text-[#2D9B7C]" />
                {post.category.name}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-950 font-heading tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Excerpt Subtitle */}
          {post.excerpt && (
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}

          {/* Author, Date & Reading Time Metadata Bar */}
          <div className="pt-4 border-t border-gray-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0F4A3E] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                {post.author?.full_name ? post.author.full_name.charAt(0).toUpperCase() : 'V'}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-900">
                  {post.author?.full_name || 'vee.vet Editorial'}
                </div>
                <div className="text-[11px] text-gray-500 flex items-center gap-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    {formatDate(post.published_at)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    {post.reading_time_minutes || 3} min read
                  </span>
                </div>
              </div>
            </div>

            {/* Social Share Buttons Header */}
            <ShareButtons title={post.title} />
          </div>
        </div>
      </div>

      {/* Main Article Body Section */}
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full space-y-12">
        {/* Featured Cover Image */}
        {post.cover_image && (
          <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-150 bg-gray-100 aspect-[16/9] relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Rich Text Body Content */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-150 shadow-xs">
          <BlogContentRenderer contentHtml={post.content} />

          {/* Bottom Social Sharing & Return link */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4A3E] hover:text-[#2D9B7C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>

            <ShareButtons title={post.title} />
          </div>
        </article>

        {/* RELATED ARTICLES SECTION */}
        {relatedPosts.length > 0 && (
          <div className="space-y-6 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-wider text-[#2D9B7C] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Recommended Reading</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-950 font-heading">
                  Related Articles
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-xs font-bold text-[#0F4A3E] hover:underline hidden sm:block"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.id} post={related} />
              ))}
            </div>
          </div>
        )}

        {/* In-article CTA Banner */}
        <CtaBanner />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
