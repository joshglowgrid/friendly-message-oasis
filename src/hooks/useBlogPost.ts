
import { useState, useEffect } from 'react';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blogData';
import { BlogPost } from '@/types/blog';
import { updateMetaTags, removeMetaTags } from '@/utils/seoUtils';

export const useBlogPost = (postId: string | undefined) => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostBySlug(postId);
        // Cast to BlogPost to match our state type
        setPost(fetchedPost as unknown as BlogPost);
        
        // Set page metadata
        if (fetchedPost) {
          // Use SEO title if available, otherwise fallback to post title
         document.title = fetchedPost.metaTitle ?? `${fetchedPost.title} | GlowGrid Media Blog`;
          
          // Update meta tags
          updateMetaTags(fetchedPost as unknown as BlogPost);
          
          // Fetch related posts
          const related = await getRelatedBlogPosts(fetchedPost.category, postId);
          setRelatedPosts(related as unknown as BlogPost[]);
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
    
    // Clean up meta tags when unmounting
    return () => {
      removeMetaTags();
    };
  }, [postId]);

  return { post, relatedPosts, loading };
};

useEffect(() => {
  const controller = new AbortController();

  const fetchPost = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const fetchedPost = await getBlogPostBySlug(postId);
      if (!controller.signal.aborted && fetchedPost) {
        setPost(fetchedPost);
        updateMetaTags(fetchedPost);
        document.title = fetchedPost.metaTitle ?? `${fetchedPost.title} | GlowGrid Media Blog`;

        const related = await getRelatedBlogPosts(fetchedPost.category, postId);
        if (!controller.signal.aborted) {
          setRelatedPosts(related);
        }
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        console.error('Error fetching post:', error);
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  };

  fetchPost();
  window.scrollTo(0, 0);

  return () => {
    controller.abort();
    removeMetaTags();
  };
}, [postId]);
