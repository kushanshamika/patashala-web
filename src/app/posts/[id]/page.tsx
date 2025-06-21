import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface Post {
  title: string;
  description: string;
  images: string[];
  videos: string[];
  pdfs: string[];
}

export default async function PostViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const docRef = doc(db, 'posts', id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return notFound();

  const post = docSnap.data() as Post;

  return (
    <main className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8 text-gray-900">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

      <p className="mb-6 text-gray-700 whitespace-pre-line">{post.description}</p>

      {post.images?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Images</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {post.images.map((url, i) => (
              <Image
                key={i}
                src={url}
                alt={`Post image ${i + 1}`}
                width={600}
                height={400}
                className="rounded-md object-cover w-full h-auto"
              />
            ))}
          </div>
        </div>
      )}

      {post.videos?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Videos</h2>
          <div className="space-y-4">
            {post.videos.map((url, i) => (
              <video key={i} controls className="w-full max-w-xl rounded-md">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        </div>
      )}

      {post.pdfs?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">PDFs</h2>
          <ul className="list-disc pl-5 space-y-2">
            {post.pdfs.map((url, i) => (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View PDF {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
