
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blogData';  // Changed from getRelatedPosts to getRelatedBlogPosts
import { BlogPost } from '@/components/blog/BlogList';
import { BlogPostLoading } from '@/components/blog/BlogPostLoading';
import { BlogPostNotFound } from '@/components/blog/BlogPostNotFound';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { RelatedPosts } from '@/components/blog/RelatedPosts';

const BlogPostPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostBySlug(postId);
        setPost(fetchedPost);
        
        // Fetch related posts
        if (fetchedPost) {
          const related = await getRelatedBlogPosts(fetchedPost.category, postId);  // Changed from getRelatedPosts
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    
    // Scroll to top when post ID changes
    window.scrollTo(0, 0);
    
    // Handle scroll for sticky header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [postId]);
  
  if (loading) {
    return <BlogPostLoading />;
  }
  
  if (!post) {
    return <BlogPostNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <FloatingCTA />
      <Header scrolled={scrolled} />
      
      <main className="flex-grow pt-28">
        <BlogPostHeader />
        <BlogPostHero image={post.image} title={post.title} />
        <BlogPostContent post={post} />
        <RelatedPosts posts={relatedPosts} />
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
