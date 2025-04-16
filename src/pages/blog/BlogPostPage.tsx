
import React from 'react';
import { useParams } from 'react-router-dom';
import { BlogPost as TypesBlogPost } from '@/types/blog';
import { BlogPostLoading } from '@/components/blog/BlogPostLoading';
import { BlogPostNotFound } from '@/components/blog/BlogPostNotFound';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { ShareButton } from '@/components/blog/ShareButton';
import { BlogPostCTA } from '@/components/blog/BlogPostCTA';
import { RelatedPostsSection } from '@/components/blog/RelatedPostsSection';
import { useBlogPost } from '@/hooks/useBlogPost';
import { CalendarDays, Clock } from 'lucide-react';

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, relatedPosts, loading } = useBlogPost(postId);
  
  if (loading) {
    return <BlogPostLoading />;
  }
  
  if (!post) {
    return <BlogPostNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow pt-28">
        <BlogPostHeader />
        <BlogPostHero image={post.image} title={post.title} />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto -mt-16 relative z-10 bg-black/90 border border-orange-500/20 rounded-lg p-6 sm:p-8">
            {/* Category badge */}
            <a 
              href={`/blog?category=${post.category}`}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 mb-4 hover:bg-orange-500/20 transition-colors"
            >
              {post.category.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </a>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-white/60 gap-4 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <ShareButton 
                title={post.title} 
                excerpt={post.excerpt}
              />
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto my-8">
            <BlogPostContent post={post} />
            
            {/* CTA Section */}
            <BlogPostCTA category={post.category} />
          </div>
        </div>
        
        {/* Related Posts Section */}
        <RelatedPostsSection posts={relatedPosts} />
      </main>
    </div>
  );
};

export default BlogPostPage;
