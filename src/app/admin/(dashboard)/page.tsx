import React from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { getAdminProfile } from '@/lib/actions/auth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileText,
  CheckCircle2,
  Clock,
  FolderTree,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const { profile } = await getAdminProfile();
  const supabase = await createClient();

  // 1. Total Posts Count
  const { count: totalPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });

  // 2. Published Posts Count
  const { count: publishedPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // 3. Draft Posts Count
  const { count: draftPosts } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');

  // 4. Total Categories Count
  const { count: totalCategories } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  const stats = [
    {
      title: 'Total Articles',
      value: totalPosts ?? 0,
      description: 'All posts in database',
      icon: <FileText className="w-5 h-5 text-[#0F4A3E]" />,
      badgeBg: 'bg-[#EAF7F2]',
      borderHover: 'hover:border-[#2D9B7C]/40',
    },
    {
      title: 'Published Posts',
      value: publishedPosts ?? 0,
      description: 'Live on public blog',
      icon: <CheckCircle2 className="w-5 h-5 text-[#2D9B7C]" />,
      badgeBg: 'bg-teal-50',
      borderHover: 'hover:border-teal-300',
    },
    {
      title: 'Draft Posts',
      value: draftPosts ?? 0,
      description: 'Unpublished drafts',
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      badgeBg: 'bg-[#FFF5ED]',
      borderHover: 'hover:border-amber-200',
    },
    {
      title: 'Categories',
      value: totalCategories ?? 0,
      description: 'Active blog categories',
      icon: <FolderTree className="w-5 h-5 text-[#0F4A3E]" />,
      badgeBg: 'bg-[#EAF7F2]',
      borderHover: 'hover:border-[#2D9B7C]/40',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0F4A3E] to-[#166B59] text-white shadow-md">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FED7AA] bg-white/10 px-3 py-1 rounded-full backdrop-blur-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F59E0B]" />
            Administrator Portal
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
            Welcome back, {profile?.full_name || 'Admin'}!
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl">
            Here is the high-level summary of your vee.vet blog publication metrics, content taxonomies, and storage status.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button
              variant="cream"
              size="md"
              className="font-bold text-xs shadow-xs"
            >
              <span>Manage Posts</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-gray-900 font-heading">
            Publication Overview
          </h2>
          <span className="text-xs text-gray-500 font-medium">Real-time counts</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              className={`p-5 transition-all duration-200 bg-white shadow-xs ${stat.borderHover}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-xl ${stat.badgeBg}`}>
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4">
                <div className="text-3xl font-black text-gray-950 font-heading">
                  {stat.value}
                </div>
                <p className="text-xs text-gray-500 mt-1 font-medium">
                  {stat.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Posts Card */}
        <Card className="p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#EAF7F2] text-[#0F4A3E] flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950 font-heading">
              Blog Posts Management
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              View your published articles, inspect upcoming scheduled publications, or draft new veterinary content.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/admin/posts"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F4A3E] hover:text-[#2D9B7C] transition-colors"
            >
              <span>Go to Posts Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* Categories Card */}
        <Card className="p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#FFF5ED] text-amber-700 flex items-center justify-center mb-4">
              <FolderTree className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950 font-heading">
              Categories & Taxonomies
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Organize topics such as Clinical Care, Practice Management, Industry News, and Relief Careers.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 transition-colors"
            >
              <span>Go to Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* Public Website Preview Card */}
        <Card className="p-6 bg-white hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#2D9B7C] flex items-center justify-center mb-4">
              <ExternalLink className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-950 font-heading">
              Live Public Website
            </h3>
            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
              Open the main vee.vet platform to verify hero sections, shift search workflows, and responsive layouts.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <Link
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D9B7C] hover:text-[#1C6952] transition-colors"
            >
              <span>Open Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Phase 2 Foundation Note */}
      <div className="p-4 rounded-xl bg-[#FFF5ED] border border-[#FDBA74]/50 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-amber-950 font-bold">Admin Security & Dashboard Ready: </strong>
          Authentication and protected route middleware are active. The full post editor, image uploader, and public blog reader will be connected in subsequent phases.
        </div>
      </div>
    </div>
  );
}
