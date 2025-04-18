
import { useState, useEffect } from 'react';
import { BlogPost } from '@/types/blog';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blogData';
import { updateMetaTags, removeMetaTags } from '@/utils/seoUtils';
import { generateArticleJsonLd } from '@/utils/blogUtils';

/**
 * Custom hook to fetch and handle a single blog post
 * @param postId - The ID or slug of the blog post to fetch
 */
export const useBlogPost = (postId: string | undefined) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch the post with correct type inference
        const fetchedPost = await getBlogPostBySlug(postId);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Update meta tags for SEO
          updateMetaTags(fetchedPost);
          
          // Add JSON-LD structured data
          const jsonLd = generateArticleJsonLd(fetchedPost);
          const scriptTag = document.querySelector('script[type="application/ld+json"]');
          if (scriptTag) {
            scriptTag.textContent = jsonLd;
          } else {
            const newScript = document.createElement('script');
            newScript.setAttribute('type', 'application/ld+json');
            newScript.textContent = jsonLd;
            document.head.appendChild(newScript);
          }
          
          // Fetch related posts based on category
          const related = await getRelatedBlogPosts(fetchedPost.category, postId);
          setRelatedPosts(related);
        } else {
          setPost(null);
          setError(new Error(`Blog post with ID ${postId} not found`));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setPost(null);
        setError(error instanceof Error ? error : new Error('Unknown error fetching post'));
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
      // Remove JSON-LD when unmounting
      document.querySelectorAll('script[type="application/ld+json"]').forEach(tag => tag.remove());
    };
  }, [postId]);

  return { post, relatedPosts, loading, error };
};
