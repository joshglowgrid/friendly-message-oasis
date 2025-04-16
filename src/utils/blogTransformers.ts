
import { BlogPost } from '@/types/blog';

// Transform raw blog data into consistent BlogPost format
export function transformBlogPost(post: any): BlogPost {
  return {
    id: post.id || '',
    slug: post.slug || post.id || '',
    title: post.title || '',
    excerpt: post.excerpt || '',
    author: post.author || "GlowGrid Media",
    date: post.date || new Date().toLocaleDateString(),
    readTime: post.readTime || "5 min read",
    category: post.category || "general",
    image: post.image || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    featured: post.featured || false,
    content: post.content || '',
    
    // SEO fields
    metaTitle: post.metaTitle || '',
    metaDescription: post.metaDescription || '',
    metaLinks: post.metaLinks || '',
    metaJsonLd: post.metaJsonLd || '',
    metaSiteVars: post.metaSiteVars || '',
    metaTags: post.metaTags || '',
    canonicalUrl: post.canonicalUrl || '',
    robots: post.robots || '',
    twitter: post.twitter || {},
    facebook: post.facebook || {}
  };
}
