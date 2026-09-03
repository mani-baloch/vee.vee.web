'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Globe, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title?: string;
  subtitle?: string;
  actionButton?: {
    label: string;
    href: string;
    disabled?: boolean;
  };
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleSidebar,
  title,
  subtitle,
  actionButton,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {/* Mobile Toggle Button */}
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-colors"
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Title and subtitle */}
        {title && (
          <div>
            <h1 className="text-base sm:text-lg font-black text-gray-950 font-heading">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[11px] text-gray-500 font-medium hidden sm:block">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {actionButton && (
          actionButton.disabled ? (
            <Button
              variant="primary"
              size="sm"
              disabled
              className="text-xs font-bold gap-1.5 opacity-60 cursor-not-allowed"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{actionButton.label}</span>
            </Button>
          ) : (
            <Link href={actionButton.href}>
              <Button
                variant="primary"
                size="sm"
                className="text-xs font-bold gap-1.5 bg-[#0F4A3E] text-white hover:bg-[#0A352C] shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{actionButton.label}</span>
              </Button>
            </Link>
          )
        )}

        <Link
          href="/"
          target="_blank"
          rel="noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 hover:text-[#0F4A3E] hover:border-[#0F4A3E] transition-colors"
        >
          <Globe className="w-3.5 h-3.5 text-[#2D9B7C]" />
          <span>Live Site</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
