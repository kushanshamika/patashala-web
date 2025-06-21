'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const categories = [
  { id: 'Achievements', label: 'Achievements' },
  { id: 'Learning', label: 'Learning' },
  { id: 'Curriculum', label: 'Curriculum' },
  { id: 'Activities', label: 'Activities' },
  { id: 'Welfare', label: 'Welfare' },
  { id: 'Leadership', label: 'Leadership' },
  { id: 'Resources', label: 'Resources' },
  { id: 'Community', label: 'Community' },
];

export default function HomePage() {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/posts?category=${id}`);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Patashala
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleClick(cat.id)}
            className="rounded-2xl border border-gray-300 shadow-sm hover:shadow-md transition-all bg-white hover:bg-blue-50 text-center text-base font-semibold text-gray-800 py-6 px-4"
          >
            {cat.label}
          </button>
        ))}
      </div>
    </main>
  );
}
