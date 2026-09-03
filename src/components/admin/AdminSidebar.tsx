'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { BeeLogo } from '@/components/BeeLogo';
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  LogOut,
  ExternalLink,
  Shield,
  Loader2,
  X,
} from 'lucide-react';
import { Profile } from '@/types/blog';

interface AdminSidebarProps {
  adminProfile?: Profile | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  adminProfile,
  isOpen = false,
  onClose,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const supabase = createClient();

  const handleSignOut = async () => {
    try {
      setLoggingOut(true);
      await supabase.auth.signOut();
      router.push('/admin/login');
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  };

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: <LayoutDashboard className="w-4 h-4" />,
      exact: true,
    },
    {
      label: 'Blog Posts',
      href: '/admin/posts',
      icon: <FileText className="w-4 h-4" />,
      exact: false,
    },
    {
      label: 'Categories',
      href: '/admin/categories',
      icon: <FolderTree className="w-4 h-4" />,
      exact: false,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-gray-200/90 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Area */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="cursor-pointer">
              <BeeLogo size="sm" />
            </Link>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EAF7F2] text-[#0F4A3E] border border-[#2D9B7C]/20">
              CMS
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3.5 py-5 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Content Management
          </div>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-[#EAF7F2] text-[#0F4A3E] font-bold shadow-xs'
                    : 'text-gray-600 hover:text-gray-950 hover:bg-gray-50'
                }`}
              >
                <span className={isActive ? 'text-[#0F4A3E]' : 'text-gray-400'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Actions Footer */}
        <div className="p-4 border-t border-gray-100 space-y-3 bg-gray-50/50">
          {/* Admin Profile Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-gray-150 shadow-2xs">
            <div className="w-8 h-8 rounded-full bg-[#0F4A3E] text-white flex items-center justify-center font-bold text-xs shrink-0">
              {adminProfile?.full_name ? adminProfile.full_name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-gray-900 truncate">
                {adminProfile?.full_name || 'Admin User'}
              </div>
              <div className="text-[10px] text-gray-500 truncate flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-[#2D9B7C]" />
                <span className="capitalize">{adminProfile?.role || 'Administrator'}</span>
              </div>
            </div>
          </div>

          {/* External website link */}
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:text-[#0F4A3E] hover:bg-white border border-transparent hover:border-gray-200 transition-all"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer disabled:opacity-50"
          >
            {loggingOut ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Signing Out...</span>
              </>
            ) : (
              <>
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
