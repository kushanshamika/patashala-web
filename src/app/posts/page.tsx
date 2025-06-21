import { Suspense } from 'react';
import PostsList from '@/components/PostsList';

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">All Posts</h1>
      <Suspense fallback={<p className="text-gray-500">Loading posts...</p>}>
        <PostsList />
      </Suspense>
    </main>
  );
}
