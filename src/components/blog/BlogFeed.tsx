'use client';

import React, { useState, useMemo } from 'react';
import { Post, Category } from '@/types/blog';
import { BlogCard } from './BlogCard';
import { FeaturedPostCard } from './FeaturedPostCard';
import { Search, X, FolderTree, FileText, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogFeedProps {
  initialPosts: Post[];
  categories: Category[];
}

const POSTS_PER_PAGE = 6;

export const BlogFeed: React.FC<BlogFeedProps> = ({ initialPosts, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(POSTS_PER_PAGE);

  // Identify top featured article
  const featuredPost = useMemo(() => {
    return initialPosts.find((p) => p.featured) || null;
  }, [initialPosts]);

  // Filtered articles
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' ? true : post.category_id === selectedCategory;

      // Search filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Determine if featured banner should show (only when no search and on 'all' categories)
  const showFeaturedBanner = featuredPost && selectedCategory === 'all' && !searchQuery.trim();

  // Grid posts (excludes featured post if banner is visible)
  const gridPosts = useMemo(() => {
    if (showFeaturedBanner && featuredPost) {
      return filteredPosts.filter((p) => p.id !== featuredPost.id);
    }
    return filteredPosts;
  }, [filteredPosts, showFeaturedBanner, featuredPost]);

  // Visible sliced posts for pagination
  const visiblePosts = useMemo(() => {
    return gridPosts.slice(0, visibleCount);
  }, [gridPosts, visibleCount]);

  const hasMore = visibleCount < gridPosts.length;

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVisibleCount(POSTS_PER_PAGE);
  };

  return (
    <div className="space-y-12">
      {/* SEARCH & CATEGORY FILTER BAR */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 absolute left-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              aria-label="Search articles"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(POSTS_PER_PAGE);
              }}
              placeholder="Search articles by title, topic, or clinical keyword..."
              className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 bg-white text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:border-[#0F4A3E] focus:outline-none focus:ring-2 focus:ring-[#0F4A3E]/15 shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 p-1 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 px-2 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setVisibleCount(POSTS_PER_PAGE);
            }}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#0F4A3E] text-white shadow-xs'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/90'
            }`}
          >
            All Articles ({initialPosts.length})
          </button>

          {categories.map((cat) => {
            const count = initialPosts.filter((p) => p.category_id === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F4A3E] text-white shadow-xs'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200/90'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* FEATURED POST BANNER (If available & applicable) */}
      {showFeaturedBanner && featuredPost && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#2D9B7C]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-600">
              Spotlight Story
            </h2>
          </div>
          <FeaturedPostCard post={featuredPost} />
        </div>
      )}

      {/* ARTICLES GRID OR EMPTY STATE */}
      {filteredPosts.length === 0 ? (
        /* Empty State */
        <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200 p-8 max-w-md mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF7F2] text-[#0F4A3E] flex items-center justify-center mx-auto">
            {searchQuery ? (
              <Search className="w-7 h-7 text-[#2D9B7C]" />
            ) : (
              <FileText className="w-7 h-7 text-[#2D9B7C]" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-950 font-heading">
              {searchQuery
                ? `No articles found for "${searchQuery}"`
                : selectedCategory !== 'all'
                ? 'No articles in this category'
                : 'No blog posts published yet'}
            </h3>
            <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
              {searchQuery
                ? 'Try searching with different clinical keywords or clear your search query.'
                : 'Check back soon for insights on relief veterinary staffing and clinical updates.'}
            </p>
          </div>

          {(searchQuery || selectedCategory !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="text-xs font-semibold"
            >
              Reset All Filters
            </Button>
          )}
        </div>
      ) : (
        /* Articles Grid */
        <div className="space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-black text-gray-950 font-heading tracking-tight">
              {selectedCategory === 'all' && !searchQuery
                ? 'Latest Publications'
                : `Articles (${filteredPosts.length})`}
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Showing {Math.min(visibleCount, gridPosts.length)} of {gridPosts.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visiblePosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setVisibleCount((prev) => prev + POSTS_PER_PAGE)}
                className="px-8 py-3 text-xs font-bold gap-2 rounded-full border-gray-300 hover:border-[#0F4A3E] hover:text-[#0F4A3E] transition-all shadow-xs"
              >
                <span>Load More Articles</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogFeed;
