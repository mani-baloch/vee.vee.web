'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Profile } from '@/types/blog';

/**
 * Server action to sign out the current admin user and redirect to login
 */
export async function adminSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/admin/login');
}

/**
 * Server helper to retrieve the authenticated admin profile
 */
export async function getAdminProfile(): Promise<{ profile: Profile | null; user: any | null }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { profile: null, user: null };
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile || profile.role !== 'admin') {
      return { profile: null, user };
    }

    return { profile: profile as Profile, user };
  } catch {
    return { profile: null, user: null };
  }
}
