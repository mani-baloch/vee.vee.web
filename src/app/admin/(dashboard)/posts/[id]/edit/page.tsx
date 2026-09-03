import React from 'react';
import Link from 'next/link';
import { getPostById, getCategories } from '@/lib/actions/blog';
import { PostEditor } from '@/components/admin/PostEditor';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;

  const [postRes, catsRes] = await Promise.all([
    getPostById(id),
    getCategories(),
  ]);

  if (postRes.error || !postRes.post) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center space-y-4">
        <Card className="p-8 bg-white space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 font-heading">
            Article Not Found
          </h2>
          <p className="text-xs text-gray-500">
            The requested article (ID: {id}) could not be located in the database or was previously deleted.
          </p>
          <Link href="/admin/posts">
            <Button variant="outline" size="sm" className="text-xs font-bold gap-1.5 mt-2">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Posts Directory</span>
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-4">
      <PostEditor
        initialPost={postRes.post}
        categories={catsRes.categories}
        isEditing={true}
      />
    </div>
  );
}
