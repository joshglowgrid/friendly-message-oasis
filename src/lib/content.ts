
import { BlogPost } from '@/components/blog/BlogList';
import { blogPosts } from '../content/blogPosts';
import { getTinaBlogPosts } from './tina';

// Get all blog posts
export async function getBlogContent(): Promise<BlogPost[]> {
  try {
    // Try to fetch from TinaCMS first
    const tinaPosts = await getTinaBlogPosts();
    if (tinaPosts && tinaPosts.length > 0) {
      return tinaPosts;
    }
    
    // Fall back to static content if TinaCMS fails
    console.log("Falling back to static blog posts");
    return blogPosts;
  } catch (error) {
    console.error("Error fetching blog content:", error);
    return blogPosts;
  }
}
