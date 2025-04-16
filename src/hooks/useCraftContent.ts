
import { useState, useEffect } from 'react';
import { fetchBlogPosts, fetchBlogCategories, fetchBlogPostBySlug } from '@/lib/craftAdapter';
import { BlogPost, BlogCategoryModel } from '@/types/blog';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await fetchBlogPosts();
        setPosts(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const data = await fetchBlogPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(`Failed to fetch blog post: ${slug}`));
        console.error(`Error fetching blog post ${slug}:`, err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPost();
    }
  }, [slug]);

  return { post, loading, error };
}

export function useBlogCategories() {
  const [categories, setCategories] = useState<BlogCategoryModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true);
        const data = await fetchBlogCategories();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch blog categories'));
        console.error('Error fetching blog categories:', err);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return { categories, loading, error };
}
