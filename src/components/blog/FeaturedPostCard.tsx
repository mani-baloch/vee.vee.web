'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/utils/blog-utils';
import { Clock, Star, ArrowRight, Tag, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturedPostCardProps {
  post: Post;
}

export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-3xl border border-gray-200/90 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Cover Image Half */}
        <Link
          href={`/blog/${post.slug}`}
          className="block lg:col-span-6 relative aspect-video lg:aspect-auto overflow-hidden bg-gray-100 min-h-[260px] sm:min-h-[320px]"
        >
          {post.cover_image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EAF7F2] to-[#FDF4EC] text-[#0F4A3E]/40">
              <ImageIcon className="w-16 h-16" />
            </div>
          )}

          {/* Featured Pill */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0F4A3E] text-white shadow-md">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Featured Article</span>
            </span>
          </div>
        </Link>

        {/* Content Half */}
        <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Reading Meta */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-500">
              {post.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EAF7F2] text-[#0F4A3E]">
                  <Tag className="w-3 h-3 text-[#2D9B7C]" />
                  {post.category.name}
                </span>
              )}
              <span>{formatDate(post.published_at)}</span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                {post.reading_time_minutes || 3} min read
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-gray-950 font-heading group-hover:text-[#0F4A3E] transition-colors leading-tight">
              <Link href={`/blog/${post.slug}`}>
                {post.title}
              </Link>
            </h2>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Author & CTA */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0F4A3E] text-white flex items-center justify-center text-xs font-bold shrink-0">
                {post.author?.full_name ? post.author.full_name.charAt(0).toUpperCase() : 'V'}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">
                  {post.author?.full_name || 'vee.vet Editorial'}
                </div>
                <div className="text-[11px] text-gray-500">
                  Veterinary Relief Insights
                </div>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <Button
                variant="primary"
                size="md"
                className="w-full sm:w-auto font-bold text-xs gap-2 bg-[#0F4A3E] text-white hover:bg-[#0A352C] shadow-xs"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeaturedPostCard;
