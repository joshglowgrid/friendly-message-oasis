
import { BlogPost } from '@/components/blog/BlogList';
import { blogPosts } from '../content/blogPosts';

// Get all blog posts
export async function getBlogContent(): Promise<BlogPost[]> {
  try {
    // Return static content
    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return blogPosts;
  }
}
