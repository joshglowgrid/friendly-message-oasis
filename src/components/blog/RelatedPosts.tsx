
import React from 'react';
import { BlogList, BlogPost } from '@/components/blog/BlogList';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (posts.length === 0) return null;
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Related Articles</h2>
        <BlogList posts={posts} />
      </div>
    </section>
  );
};
