'use client';

import React from 'react';
import Link from 'next/link';
import { Post } from '@/types/blog';
import { formatDate } from '@/lib/utils/blog-utils';
import { Clock, Tag, ArrowRight, ImageIcon } from 'lucide-react';

interface BlogCardProps {
  post: Post;
  priority?: boolean;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="group bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-200/80 transition-all duration-300 flex flex-col h-full">
      {/* Cover Image Thumbnail */}
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-gray-100">
        {post.cover_image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EAF7F2] to-[#FDF4EC] text-[#0F4A3E]/40">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}

        {/* Category Badge Floating on Image */}
        {post.category && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-xs text-[#0F4A3E] shadow-2xs border border-gray-100">
              <Tag className="w-3 h-3 text-[#2D9B7C]" />
              {post.category.name}
            </span>
          </div>
        )}
      </Link>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Metadata Bar (Date & Reading Time) */}
          <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
            <span>{formatDate(post.published_at)}</span>
            <span className="text-gray-300">•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {post.reading_time_minutes || 3} min read
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base sm:text-lg font-bold text-gray-950 font-heading group-hover:text-[#0F4A3E] transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed font-normal">
              {post.excerpt}
            </p>
          )}
        </div>

        {/* Footer (Author & Read Link) */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#0F4A3E] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {post.author?.full_name ? post.author.full_name.charAt(0).toUpperCase() : 'V'}
            </div>
            <span className="text-xs font-semibold text-gray-700 truncate">
              {post.author?.full_name || 'vee.vet Team'}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#0F4A3E] group-hover:text-[#2D9B7C] group-hover:translate-x-0.5 transition-all shrink-0"
          >
            <span>Read</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
