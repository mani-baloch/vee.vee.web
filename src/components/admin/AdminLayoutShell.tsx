'use client';

import React, { useState } from 'react';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { Profile } from '@/types/blog';

interface AdminLayoutShellProps {
  children: React.ReactNode;
  adminProfile: Profile | null;
}

export const AdminLayoutShell: React.FC<AdminLayoutShellProps> = ({
  children,
  adminProfile,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col font-sans antialiased text-gray-900">
      {/* Sidebar (Desktop sticky & Mobile drawer) */}
      <AdminSidebar
        adminProfile={adminProfile}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayoutShell;
