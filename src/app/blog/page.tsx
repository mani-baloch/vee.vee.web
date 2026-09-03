import React from 'react';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { Post, Category } from '@/types/blog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthModals from '@/components/AuthModals';
import { HoneycombPattern } from '@/components/HoneycombPattern';
import { BlogFeed } from '@/components/blog/BlogFeed';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog & Clinical Insights | vee.vet',
  description:
    'Insights, strategies, and industry guides for relief veterinarians, licensed vet technicians, and modern veterinary hospital managers.',
  openGraph: {
    title: 'Blog & Clinical Insights | vee.vet',
    description:
      'Insights, strategies, and industry guides for relief veterinarians, vet techs, and hospital managers.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const supabase = await createClient();

  // 1. Fetch published posts (only where published_at <= NOW())
  const { data: postsData } = await supabase
    .from('posts')
    .select('*, category:categories(*), author:public_authors(*)')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  // 2. Fetch categories
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  const posts = (postsData || []) as Post[];
  const categories = (categoriesData || []) as Category[];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Peach Hero Container wrapping Floating Navbar and Blog Header */}
      <div className="relative bg-[#FDF4EC] overflow-hidden pb-16 sm:pb-20">
        {/* Decorative Brand Honeycomb Pattern */}
        <div className="absolute top-0 left-0 w-80 sm:w-[500px] md:w-[600px] pointer-events-none z-0">
          <HoneycombPattern variant="hero-blue" />
        </div>
        <div className="absolute top-0 right-0 w-80 sm:w-[500px] pointer-events-none opacity-40 z-0">
          <HoneycombPattern variant="hero-peach" />
        </div>

        {/* 1. Floating Pill Navbar */}
        <Navbar activeTab="Blog" />

        {/* 2. Blog Header Section */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-gray-200/80 text-[#0F4A3E] text-xs font-bold shadow-2xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#2D9B7C] animate-pulse" />
            <span>Veterinary Relief & Hospital Insights</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-950 font-heading tracking-tight leading-tight">
            The vee<span className="text-[#2D9B7C]">.</span>vet Blog
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Actionable strategies, locum guides, and practice management tips for relief veterinarians, technicians, and hospital teams.
          </p>
        </div>
      </div>

      {/* Main Blog Content Area */}
      <main className="flex-grow -mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 w-full">
        <BlogFeed initialPosts={posts} categories={categories} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
