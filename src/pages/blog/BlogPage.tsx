
import React, { useEffect, useState } from 'react';
import { BlogList } from '@/components/blog/BlogList';
import { getBlogPosts } from '@/data/blogData';
import { BlogPost } from '@/components/blog/BlogList';

const BlogPage = () => {
  // State for blog posts
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-black/60 border border-orange-400/20 backdrop-blur-sm h-80 animate-pulse rounded-lg"></div>
            ))}
          </div>
        ) : (
          <BlogList posts={posts} />
        )}
      </div>
    </div>
  );
};

export default BlogPage;
