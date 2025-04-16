
import React from 'react';
import { BlogListAdapter } from '@/components/blog/BlogListAdapter';
import { BlogPost } from '@/types/blog';

interface RelatedPostsSectionProps {
  posts: BlogPost[];
}

export const RelatedPostsSection: React.FC<RelatedPostsSectionProps> = ({ posts }) => {
  if (posts.length === 0) return null;
  
  return (
    <div className="bg-black/80 border-t border-orange-500/10 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <BlogListAdapter posts={posts} />
      </div>
    </div>
  );
};
