export const runtime = 'edge';

import PostClientView from '@/components/PostClientView';

export default async function PostViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PostClientView postId={id} />;
}
