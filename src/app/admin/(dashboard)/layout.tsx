import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminProfile } from '@/lib/actions/auth';
import { AdminLayoutShell } from '@/components/admin/AdminLayoutShell';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await getAdminProfile();

  if (!profile || profile.role !== 'admin') {
    redirect('/admin/login?error=unauthorized');
  }

  return (
    <AdminLayoutShell adminProfile={profile}>
      {children}
    </AdminLayoutShell>
  );
}
