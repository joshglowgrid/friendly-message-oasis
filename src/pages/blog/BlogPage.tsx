
import React, { useEffect } from 'react';
import BlogList from '@/components/blog/BlogList';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';

const BlogPage = () => {
  // Use a useEffect hook to update the document title
  useEffect(() => {
    document.title = 'GlowGrid Media Blog';
  }, []);

  return (
    <div className="min-h-screen">
      {/* Added padding-top to ensure the header doesn't overlap content */}
      <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-32">
        <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-4">
          GlowGrid Media Blog
        </h1>
        <p className="text-lg text-white/80 mb-12 max-w-3xl">
          Strategic insights for healthcare, aesthetic, and wellness brands looking to elevate their digital presence and drive measurable growth.
        </p>
        
        <BlogList />
      </div>
      
      <FloatingCTA />
    </div>
  );
};

export default BlogPage;
