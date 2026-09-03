-- ============================================================================
-- VEE.VET BLOG CMS - HARDENED DATABASE SCHEMA & STORAGE RLS POLICIES
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. CATEGORIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for category slug lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);

-- ============================================================================
-- 2. PROFILES TABLE (Linked to auth.users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  role VARCHAR(50) DEFAULT 'admin' NOT NULL CHECK (role IN ('admin', 'editor', 'author')),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================================================
-- 3. POSTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT false NOT NULL,
  reading_time_minutes INT DEFAULT 3 NOT NULL,
  published_at TIMESTAMPTZ,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON public.posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status_published_at ON public.posts(status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category_id ON public.posts(category_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON public.posts(featured) WHERE featured = true;

-- ============================================================================
-- 4. AUTO-UPDATE UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to posts
DROP TRIGGER IF EXISTS set_posts_updated_at ON public.posts;
CREATE TRIGGER set_posts_updated_at
BEFORE UPDATE ON public.posts
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Apply updated_at trigger to profiles
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- ============================================================================
-- 5. AUTOMATIC PROFILE CREATION ON USER SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    'admin'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- ============================================================================
-- 6. SECURITY HELPER FUNCTIONS
-- ============================================================================

-- Helper function: Returns true if the authenticated user has role = 'admin'
-- Defined with SECURITY DEFINER and search_path = public to bypass RLS and avoid recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public STABLE;

-- ============================================================================
-- 7. SECURE PUBLIC AUTHOR VIEW (Hides private fields like email)
-- ============================================================================

-- This view allows the public blog to display the author's public name, avatar, and role
-- without ever exposing sensitive private user account data (e.g. email)
CREATE OR REPLACE VIEW public.public_authors AS
SELECT
  id,
  full_name,
  avatar_url,
  role
FROM public.profiles;

-- Grant read access on the public view to all users
GRANT SELECT ON public.public_authors TO anon, authenticated;

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all base tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- PROFILES RLS POLICIES (Privacy Hardened)
-- ----------------------------------------------------------------------------
-- Drop existing policies if any to ensure clean apply
DROP POLICY IF EXISTS "Public can view profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- 1. Authenticated users can view ONLY their own full profile
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- 2. Authenticated admins can view all full profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (public.is_admin());

-- 3. Authenticated users can update ONLY their own profile
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- CATEGORIES RLS POLICIES (Admin-Only Management)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can update categories" ON public.categories;
DROP POLICY IF EXISTS "Authenticated users can delete categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

-- 1. Public & authenticated: Anyone can read categories
CREATE POLICY "Public can view categories"
ON public.categories
FOR SELECT
USING (true);

-- 2. Admin-only: Create new category
CREATE POLICY "Admins can insert categories"
ON public.categories
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- 3. Admin-only: Update existing category
CREATE POLICY "Admins can update categories"
ON public.categories
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 4. Admin-only: Delete category
CREATE POLICY "Admins can delete categories"
ON public.categories
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ----------------------------------------------------------------------------
-- POSTS RLS POLICIES (Admin-Only Management & Safe Public Read)
-- ----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public can view published posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can update posts" ON public.posts;
DROP POLICY IF EXISTS "Authenticated users can delete posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can insert posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can update posts" ON public.posts;
DROP POLICY IF EXISTS "Admins can delete posts" ON public.posts;

-- 1. Public & Non-Admin: Can only read published posts whose release date has arrived
CREATE POLICY "Public can view published posts"
ON public.posts
FOR SELECT
USING (
  status = 'published'
  AND published_at IS NOT NULL
  AND published_at <= NOW()
);

-- 2. Admin: Can view all posts (including drafts, unpublished, and future scheduled posts)
CREATE POLICY "Admins can view all posts"
ON public.posts
FOR SELECT
TO authenticated
USING (public.is_admin());

-- 3. Admin-only: Create new post
CREATE POLICY "Admins can insert posts"
ON public.posts
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- 4. Admin-only: Update post
CREATE POLICY "Admins can update posts"
ON public.posts
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- 5. Admin-only: Delete post
CREATE POLICY "Admins can delete posts"
ON public.posts
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================================
-- 9. SUPABASE STORAGE SETUP & HARDENED RLS (blog-assets)
-- ============================================================================

-- Create public storage bucket for blog assets if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-assets',
  'blog-assets',
  true,
  10485760, -- 10MB limit per file
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- Clean up any prior storage policies
DROP POLICY IF EXISTS "Public Access - Read blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update blog assets" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete blog assets" ON storage.objects;

-- 1. Storage RLS: Public read access to all blog assets (covers/, content/, avatars/)
CREATE POLICY "Public Access - Read blog assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'blog-assets');

-- 2. Storage RLS: Admin-only upload
CREATE POLICY "Admins can upload blog assets"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-assets'
  AND public.is_admin()
);

-- 3. Storage RLS: Admin-only update
CREATE POLICY "Admins can update blog assets"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-assets'
  AND public.is_admin()
)
WITH CHECK (
  bucket_id = 'blog-assets'
  AND public.is_admin()
);

-- 4. Storage RLS: Admin-only delete
CREATE POLICY "Admins can delete blog assets"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-assets'
  AND public.is_admin()
);
