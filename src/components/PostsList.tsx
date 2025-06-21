'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';

interface Post {
  id: string;
  title: string;
  category: string[];
  createdAt: Timestamp;
}

export default function PostsList() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsRef = collection(db, 'posts');
        const q = category
          ? query(
              postsRef,
              where('category', 'array-contains', category),
              orderBy('createdAt', 'desc')
            )
          : query(postsRef, orderBy('createdAt', 'desc'));

        const snap = await getDocs(q);
        const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[];
        setPosts(data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (loading) return <p className="text-gray-500">Loading posts...</p>;

  if (posts.length === 0)
    return <p className="text-gray-500">No posts found.</p>;

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="border-b border-gray-200 pb-2 text-base sm:text-lg font-medium hover:text-blue-600 cursor-pointer"
          onClick={() => window.location.assign(`/posts/${post.id}`)}
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
}
