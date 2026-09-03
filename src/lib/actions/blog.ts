'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { getAdminProfile } from '@/lib/actions/auth';
import { Category, Post, PostFormData } from '@/types/blog';
import { slugify, calculateReadingTime } from '@/lib/utils/blog-utils';

// ============================================================================
// CATEGORY SERVER ACTIONS
// ============================================================================

/**
 * Fetch all categories ordered by name
 */
export async function getCategories(): Promise<{ categories: Category[]; error: string | null }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return { categories: [], error: error.message };
    }

    return { categories: data as Category[], error: null };
  } catch (err: any) {
    return { categories: [], error: err?.message || 'Failed to fetch categories' };
  }
}

/**
 * Create a new category (Admin Only)
 */
export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
}): Promise<{ category: Category | null; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { category: null, error: 'Unauthorized: Admin privileges required.' };
  }

  const name = data.name.trim();
  if (!name || name.length < 2) {
    return { category: null, error: 'Category name must be at least 2 characters.' };
  }

  const slug = data.slug ? slugify(data.slug) : slugify(name);
  if (!slug) {
    return { category: null, error: 'Invalid category slug.' };
  }

  try {
    const supabase = await createClient();

    // Check duplicate slug
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      return { category: null, error: `A category with slug "${slug}" already exists.` };
    }

    const { data: newCategory, error } = await supabase
      .from('categories')
      .insert({
        name,
        slug,
        description: data.description?.trim() || null,
      })
      .select()
      .single();

    if (error) {
      return { category: null, error: error.message };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { category: newCategory as Category, error: null };
  } catch (err: any) {
    return { category: null, error: err?.message || 'Failed to create category.' };
  }
}

/**
 * Update an existing category (Admin Only)
 */
export async function updateCategory(
  id: string,
  data: {
    name: string;
    slug?: string;
    description?: string;
  }
): Promise<{ category: Category | null; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { category: null, error: 'Unauthorized: Admin privileges required.' };
  }

  const name = data.name.trim();
  if (!name || name.length < 2) {
    return { category: null, error: 'Category name must be at least 2 characters.' };
  }

  const slug = data.slug ? slugify(data.slug) : slugify(name);

  try {
    const supabase = await createClient();

    // Check duplicate slug on other categories
    const { data: existing } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .maybeSingle();

    if (existing) {
      return { category: null, error: `Another category with slug "${slug}" already exists.` };
    }

    const { data: updatedCategory, error } = await supabase
      .from('categories')
      .update({
        name,
        slug,
        description: data.description?.trim() || null,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { category: null, error: error.message };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { category: updatedCategory as Category, error: null };
  } catch (err: any) {
    return { category: null, error: err?.message || 'Failed to update category.' };
  }
}

/**
 * Delete a category (Admin Only)
 */
export async function deleteCategory(id: string): Promise<{ success: boolean; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized: Admin privileges required.' };
  }

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/categories');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete category.' };
  }
}

// ============================================================================
// POST SERVER ACTIONS
// ============================================================================

/**
 * Fetch all posts for admin view with category and author relations
 */
export async function getAdminPosts(filters?: {
  status?: string;
  categoryId?: string;
  search?: string;
}): Promise<{ posts: Post[]; error: string | null }> {
  try {
    const supabase = await createClient();

    let query = supabase
      .from('posts')
      .select('*, category:categories(*), author:profiles(id, full_name, avatar_url, role)')
      .order('created_at', { ascending: false });

    if (filters?.status && filters.status !== 'all') {
      query = query.eq('status', filters.status);
    }

    if (filters?.categoryId && filters.categoryId !== 'all') {
      query = query.eq('category_id', filters.categoryId);
    }

    if (filters?.search && filters.search.trim()) {
      query = query.ilike('title', `%${filters.search.trim()}%`);
    }

    const { data, error } = await query;

    if (error) {
      return { posts: [], error: error.message };
    }

    return { posts: data as Post[], error: null };
  } catch (err: any) {
    return { posts: [], error: err?.message || 'Failed to fetch posts.' };
  }
}

/**
 * Fetch a single post by ID (Admin View)
 */
export async function getPostById(id: string): Promise<{ post: Post | null; error: string | null }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('posts')
      .select('*, category:categories(*), author:profiles(id, full_name, avatar_url, role)')
      .eq('id', id)
      .single();

    if (error) {
      return { post: null, error: error.message };
    }

    return { post: data as Post, error: null };
  } catch (err: any) {
    return { post: null, error: err?.message || 'Failed to fetch post.' };
  }
}

/**
 * Create a new Blog Post (Admin Only)
 */
export async function createPost(formData: PostFormData): Promise<{ post: Post | null; error: string | null }> {
  const { profile, user } = await getAdminProfile();
  if (!profile || profile.role !== 'admin' || !user) {
    return { post: null, error: 'Unauthorized: Admin privileges required.' };
  }

  // Basic Validation
  const title = formData.title?.trim();
  if (!title || title.length < 3) {
    return { post: null, error: 'Title is required (at least 3 characters).' };
  }

  const slug = formData.slug ? slugify(formData.slug) : slugify(title);
  if (!slug) {
    return { post: null, error: 'Invalid URL slug.' };
  }

  const excerpt = formData.excerpt?.trim() || '';
  const content = formData.content?.trim() || '';

  if (formData.status === 'published' && (!content || content === '<p></p>')) {
    return { post: null, error: 'Article content cannot be empty for published posts.' };
  }

  // Handle published date
  let publishedAt = formData.published_at || null;
  if (formData.status === 'published' && !publishedAt) {
    publishedAt = new Date().toISOString();
  }

  const readingTime = formData.reading_time_minutes || calculateReadingTime(content);

  try {
    const supabase = await createClient();

    // Check slug uniqueness
    const { data: existingSlug } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existingSlug) {
      return { post: null, error: `A post with the slug "${slug}" already exists. Please customize the slug.` };
    }

    const { data: newPost, error } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        excerpt,
        content,
        cover_image: formData.cover_image || null,
        category_id: formData.category_id || null,
        author_id: user.id,
        status: formData.status || 'draft',
        featured: Boolean(formData.featured),
        reading_time_minutes: readingTime,
        published_at: publishedAt,
        meta_title: formData.meta_title?.trim() || null,
        meta_description: formData.meta_description?.trim() || null,
      })
      .select('*, category:categories(*)')
      .single();

    if (error) {
      return { post: null, error: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { post: newPost as Post, error: null };
  } catch (err: any) {
    return { post: null, error: err?.message || 'Failed to create post.' };
  }
}

/**
 * Update an existing Blog Post (Admin Only)
 */
export async function updatePost(
  id: string,
  formData: Partial<PostFormData>
): Promise<{ post: Post | null; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { post: null, error: 'Unauthorized: Admin privileges required.' };
  }

  try {
    const supabase = await createClient();

    // Fetch existing post to preserve unedited values
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !existingPost) {
      return { post: null, error: 'Post not found.' };
    }

    // Prepare updated fields
    const title = formData.title !== undefined ? formData.title.trim() : existingPost.title;
    if (!title || title.length < 3) {
      return { post: null, error: 'Title is required (at least 3 characters).' };
    }

    // Slug: Only update if explicitly passed, otherwise preserve existing
    const slug = formData.slug ? slugify(formData.slug) : existingPost.slug;

    // Check slug collision with other posts
    const { data: slugConflict } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .maybeSingle();

    if (slugConflict) {
      return { post: null, error: `Another post already uses the slug "${slug}".` };
    }

    const content = formData.content !== undefined ? formData.content : existingPost.content;
    const status = formData.status !== undefined ? formData.status : existingPost.status;

    if (status === 'published' && (!content || content === '<p></p>')) {
      return { post: null, error: 'Article content cannot be empty for published posts.' };
    }

    // Auto-set published_at if moving to published and no published_at is set
    let publishedAt = formData.published_at !== undefined ? formData.published_at : existingPost.published_at;
    if (status === 'published' && !publishedAt) {
      publishedAt = new Date().toISOString();
    }

    const readingTime =
      formData.reading_time_minutes || calculateReadingTime(content);

    const updatePayload: Record<string, any> = {
      title,
      slug,
      excerpt: formData.excerpt !== undefined ? formData.excerpt : existingPost.excerpt,
      content,
      cover_image: formData.cover_image !== undefined ? formData.cover_image : existingPost.cover_image,
      category_id: formData.category_id !== undefined ? formData.category_id : existingPost.category_id,
      status,
      featured: formData.featured !== undefined ? formData.featured : existingPost.featured,
      reading_time_minutes: readingTime,
      published_at: publishedAt,
      meta_title: formData.meta_title !== undefined ? formData.meta_title : existingPost.meta_title,
      meta_description:
        formData.meta_description !== undefined ? formData.meta_description : existingPost.meta_description,
    };

    const { data: updatedPost, error: updateError } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('id', id)
      .select('*, category:categories(*)')
      .single();

    if (updateError) {
      return { post: null, error: updateError.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath(`/admin/posts/${id}/edit`);
    revalidatePath('/admin');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { post: updatedPost as Post, error: null };
  } catch (err: any) {
    return { post: null, error: err?.message || 'Failed to update post.' };
  }
}

/**
 * Delete a Blog Post (Admin Only)
 */
export async function deletePost(id: string): Promise<{ success: boolean; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized: Admin privileges required.' };
  }

  try {
    const supabase = await createClient();

    // Fetch post to check for cover image storage cleanup
    const { data: post } = await supabase
      .from('posts')
      .select('cover_image')
      .eq('id', id)
      .single();

    // Delete post record from database
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // If cover image is in Supabase storage, attempt safe removal
    if (post?.cover_image && post.cover_image.includes('blog-assets')) {
      try {
        const urlParts = post.cover_image.split('blog-assets/');
        if (urlParts[1]) {
          const filePath = decodeURIComponent(urlParts[1]);
          await supabase.storage.from('blog-assets').remove([filePath]);
        }
      } catch {
        // Continue even if image deletion fails
      }
    }

    revalidatePath('/admin/posts');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete post.' };
  }
}

/**
 * Toggle Featured Status on Post (Admin Only)
 */
export async function togglePostFeatured(
  id: string,
  featured: boolean
): Promise<{ success: boolean; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized: Admin privileges required.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('posts')
      .update({ featured })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to toggle featured status.' };
  }
}

/**
 * Toggle Publish / Draft Status on Post (Admin Only)
 */
export async function togglePostStatus(
  id: string,
  newStatus: 'draft' | 'published'
): Promise<{ success: boolean; error: string | null }> {
  const { profile } = await getAdminProfile();
  if (!profile || profile.role !== 'admin') {
    return { success: false, error: 'Unauthorized: Admin privileges required.' };
  }

  try {
    const supabase = await createClient();

    const updatePayload: { status: 'draft' | 'published'; published_at?: string } = {
      status: newStatus,
    };

    if (newStatus === 'published') {
      const { data: current } = await supabase
        .from('posts')
        .select('published_at')
        .eq('id', id)
        .single();

      if (!current?.published_at) {
        updatePayload.published_at = new Date().toISOString();
      }
    }

    const { error } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/admin');
    revalidatePath('/blog');
    return { success: true, error: null };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to toggle post status.' };
  }
}
