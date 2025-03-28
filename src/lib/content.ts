
import { BlogPost } from '@/components/blog/BlogList';
import { blogPosts } from '../content/blogPosts';

// Get all blog posts
export async function getBlogContent(): Promise<BlogPost[]> {
  return blogPosts;
}
