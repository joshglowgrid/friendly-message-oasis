
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BlogPostLoading } from '@/components/blog/BlogPostLoading';
import { BlogPostNotFound } from '@/components/blog/BlogPostNotFound';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostCTA } from '@/components/blog/BlogPostCTA';
import { RelatedPostsSection } from '@/components/blog/RelatedPostsSection';
import { PostNavigation } from '@/components/blog/PostNavigation';
import { useBlogPost } from '@/hooks/useBlogPost';
import { getBlogPosts } from '@/data/blogData';
import { findPrevNextPosts, calculateReadingTime } from '@/utils/blogUtils';
import { BlogPost } from '@/types/blog';

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, relatedPosts, loading } = useBlogPost(postId);
  const [readingStats, setReadingStats] = useState({ readingTime: '', wordCount: 0 });
  const [navPosts, setNavPosts] = useState<{ previous: BlogPost | null; next: BlogPost | null }>({
    previous: null,
    next: null
  });
  
  // Calculate reading time when post content loads
  useEffect(() => {
    if (post?.content) {
      const stats = calculateReadingTime(post.content);
      setReadingStats(stats);
    }
  }, [post?.content]);
  
  // Set up previous/next navigation
  useEffect(() => {
    const fetchAllPosts = async () => {
      if (!post) return;
      
      try {
        const allPosts = await getBlogPosts();
        const { previous, next } = findPrevNextPosts(allPosts, post.slug);
        setNavPosts({ previous, next });
      } catch (error) {
        console.error("Error fetching posts for navigation:", error);
      }
    };
    
    fetchAllPosts();
  }, [post]);
  
  if (loading) {
    return <BlogPostLoading />;
  }
  
  if (!post) {
    return <BlogPostNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow pt-24">
        <BlogPostHero 
          image={post.image} 
          title={post.title}
          category={post.category}
          date={post.date}
          readTime={readingStats.readingTime}
          wordCount={readingStats.wordCount}
        />
        
        <div className="container mx-auto px-4 -mt-10 relative z-10">
          <BlogPostContent post={post} />
          
          {/* Post Navigation */}
          <div className="mt-12">
            <PostNavigation previous={navPosts.previous} next={navPosts.next} />
          </div>
          
          {/* CTA Section */}
          <div className="mt-12">
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
