export type PostStatus = 'draft' | 'published';

export type UserRole = 'admin' | 'editor' | 'author';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// Public author model (safely exposed to public blog readers without private fields like email)
export interface PublicAuthor {
  id: string;
  full_name: string;
  avatar_url: string | null;
  role: UserRole;
}

// Author alias for Profile when referenced in blog/author contexts
export type Author = PublicAuthor;

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  category_id: string | null;
  author_id: string | null;
  status: PostStatus;
  featured: boolean;
  reading_time_minutes: number;
  published_at: string | null;
  meta_title: string | null;
  meta_description: string | null;
  created_at: string;
  updated_at: string;

  // Joined relational data from Supabase queries
  category?: Category | null;
  author?: PublicAuthor | Profile | null;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string | null;
  category_id?: string | null;
  author_id?: string | null;
  status: PostStatus;
  featured: boolean;
  reading_time_minutes: number;
  published_at?: string | null;
  meta_title?: string | null;
  meta_description?: string | null;
}

export interface BlogFilterState {
  categorySlug?: string | null;
  searchQuery?: string;
  page?: number;
}
