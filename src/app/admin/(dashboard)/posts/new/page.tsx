import React from 'react';
import { getCategories } from '@/lib/actions/blog';
import { PostEditor } from '@/components/admin/PostEditor';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const { categories } = await getCategories();

  return (
    <div className="py-4">
      <PostEditor categories={categories} isEditing={false} />
    </div>
  );
}
