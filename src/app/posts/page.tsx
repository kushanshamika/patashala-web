'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  createdAt: Timestamp;
  category: string[];
}

export default function PostsPage() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsRef = collection(db, 'posts');
        const q = selectedCategory
          ? query(
              postsRef,
              where('category', 'array-contains', selectedCategory),
              orderBy('createdAt', 'desc')
            )
          : query(postsRef, orderBy('createdAt', 'desc'));

        const snapshot = await getDocs(q);

        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8 text-gray-900">
      <h1 className="text-2xl font-bold mb-6">
        {selectedCategory ? `Posts in "${selectedCategory}"` : 'All Posts'}
      </h1>

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li
              key={post.id}
              className="border-b border-gray-200 pb-2 text-base sm:text-lg font-medium"
            >
            <Link href={`/posts/${post.id}`}>
                {post.title}
            </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
