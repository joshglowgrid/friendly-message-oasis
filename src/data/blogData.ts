
import { BlogPost } from '@/components/blog/BlogList';
import { transformBlogPost } from '@/utils/blogTransformers';
import { getBlogContent } from '@/lib/content';

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogContent();
  return posts.map(post => transformBlogPost(post));
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogContent();
  const post = posts.find(post => post.id === slug);
  return post ? transformBlogPost(post) : null;
}

// Get related blog posts
export async function getRelatedBlogPosts(category: string, currentPostId: string): Promise<BlogPost[]> {
  const posts = await getBlogContent();
  const relatedPosts = posts
    .filter(post => post.category === category && post.id !== currentPostId)
    .slice(0, 3);
  
  return relatedPosts.map(post => transformBlogPost(post));
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const posts = await getBlogContent();
  const featuredPosts = posts.filter(post => post.featured);
  return featuredPosts.map(post => transformBlogPost(post));
}

// Export the functions for backward compatibility
export { getBlogPostBySlug as getBlogPostById };
