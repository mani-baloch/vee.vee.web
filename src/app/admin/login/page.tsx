'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { BeeLogo } from '@/components/BeeLogo';
import { HoneycombPattern } from '@/components/HoneycombPattern';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/admin';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (errorParam === 'unauthorized') {
      setErrorMessage('Access denied. Administrator privileges are required to access the CMS portal.');
    }
  }, [errorParam]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      // 1. Sign in with Supabase Auth
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setErrorMessage(signInError.message || 'Invalid email or password. Please try again.');
        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrorMessage('Failed to retrieve user session.');
        setLoading(false);
        return;
      }

      // 2. Verify admin role in profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role, full_name')
        .eq('id', data.user.id)
        .single();

      if (profileError || !profile || profile.role !== 'admin') {
        // Sign out non-admin user immediately
        await supabase.auth.signOut();
        setErrorMessage(
          'Access denied. Your account is authenticated, but does not have administrator privileges.'
        );
        setLoading(false);
        return;
      }

      // 3. Admin verified -> Redirect to admin dashboard
      router.push(redirectPath);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred during login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card className="p-8 sm:p-10 shadow-xl border-gray-100 bg-white/95 backdrop-blur-md relative z-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EAF7F2] text-[#0F4A3E] mb-4 shadow-xs">
          <ShieldCheck className="w-6 h-6 text-[#2D9B7C]" />
        </div>
        <h1 className="text-2xl font-black text-gray-950 font-heading tracking-tight">
          Admin Portal Login
        </h1>
        <p className="text-xs text-gray-500 mt-1.5 font-medium">
          Sign in to manage blog articles, categories, and media assets
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-200/80 flex items-start gap-2.5 text-xs text-red-700 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed font-medium">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Admin Email
          </label>
          <Input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@vee.vet"
            icon={<Mail className="w-4 h-4" />}
            disabled={loading}
            className="text-sm py-2.5"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Password
          </label>
          <Input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            icon={<Lock className="w-4 h-4" />}
            disabled={loading}
            className="text-sm py-2.5"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          className="w-full py-3 mt-4 rounded-xl text-sm font-bold bg-[#0F4A3E] hover:bg-[#0A352C] text-white shadow-md hover:shadow-lg transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Verifying Credentials...
            </span>
          ) : (
            'Sign In to Dashboard →'
          )}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#0F4A3E] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Return to vee.vet website
        </Link>
      </div>
    </Card>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FDF4EC] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Brand Honeycomb Pattern */}
      <div className="absolute top-0 right-0 w-80 sm:w-[500px] pointer-events-none opacity-40 z-0">
        <HoneycombPattern variant="hero-blue" />
      </div>
      <div className="absolute bottom-0 left-0 w-80 sm:w-[500px] pointer-events-none opacity-30 z-0">
        <HoneycombPattern variant="hero-peach" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center">
          <Link href="/" className="inline-block transition-transform hover:scale-105">
            <BeeLogo size="lg" />
          </Link>
        </div>

        {/* Suspense wrapper for useSearchParams hook */}
        <Suspense
          fallback={
            <Card className="p-10 text-center text-sm text-gray-500 bg-white">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#0F4A3E] mb-2" />
              Loading login portal...
            </Card>
          }
        >
          <LoginForm />
        </Suspense>

        {/* Footer Note */}
        <p className="text-center text-[11px] text-gray-400 font-medium">
          Protected Administrator Area • vee.vet Content Management System
        </p>
      </div>
    </div>
  );
}
