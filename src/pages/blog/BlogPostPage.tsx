
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
import { CalendarDays, Clock, FileText } from 'lucide-react';
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
        <BlogPostHeader />
        <BlogPostHero image={post.image} title={post.title} />
        
        <div className="container mx-auto px-4 mt-4">
          <div className="max-w-4xl mx-auto bg-black/90 border border-orange-500/20 rounded-lg p-6 sm:p-8 mb-8">
            {/* Category badge */}
            <a 
              href={`/blog/category/${post.category}`}
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
                <span>{readingStats.readingTime}</span>
              </div>
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-1" />
                <span>{readingStats.wordCount.toLocaleString()} words</span>
              </div>
            </div>
            
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
        </div>
        
        {/* Related Posts Section */}
        <RelatedPostsSection posts={relatedPosts} />
      </main>
    </div>
  );
};

export default BlogPostPage;
