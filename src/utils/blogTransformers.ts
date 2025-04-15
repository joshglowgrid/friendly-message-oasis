
import { BlogPost } from '@/components/blog/BlogList';

// Transform raw blog data into consistent BlogPost format
export function transformBlogPost(post: any): BlogPost {
  return {
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author || "GlowGrid Media",
    date: post.date,
    readTime: post.readTime || "5 min read",
    category: post.category,
    image: post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    featured: post.featured || false,
    content: post.content
  };
}
