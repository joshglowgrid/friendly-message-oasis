
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blogData';
import { updateMetaTags, removeMetaTags } from '@/utils/seoUtils';

/**
 * Custom hook to fetch and handle a single blog post
 * @param postId - The ID or slug of the blog post to fetch
 */
export const useBlogPost = (postId: string | undefined) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        // Fetch the post with correct type inference
        const fetchedPost = await getBlogPostBySlug(postId);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Update meta tags for SEO
          updateMetaTags(fetchedPost);
          
          // Fetch related posts based on category
          const related = await getRelatedBlogPosts(fetchedPost.category, postId);
          setRelatedPosts(related);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    
    // Scroll to top when post ID changes
    window.scrollTo(0, 0);
    
    // Clean up meta tags when unmounting
    return () => {
      removeMetaTags();
    };
  }, [postId]);

  return { post, relatedPosts, loading };
};
