
import { BlogPost } from '@/components/blog/BlogList';
import { getBlogContent, getBlogPostBySlug, getRelatedBlogPosts, getFeaturedBlogPosts } from '@/lib/content';

// Export the functions directly from content.ts
export const getBlogPosts = getBlogContent;
export const getBlogPostById = getBlogPostBySlug;
export const getRelatedPosts = getRelatedBlogPosts;
export const getFeaturedPosts = getFeaturedBlogPosts;
