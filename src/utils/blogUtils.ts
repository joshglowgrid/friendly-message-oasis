
import { BlogPost } from '@/types/blog';

/**
 * Generate JSON-LD structured data for a blog post
 */
export function generateArticleJsonLd(post: BlogPost): string {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": typeof post.author === 'string' ? post.author : post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "GlowGrid Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.glowgridmedia.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonicalUrl || `https://www.glowgridmedia.com/blog/${post.slug}`
    }
  };

  return JSON.stringify(articleData);
}

/**
 * Calculate estimated reading time from text content
 * @param content - The text content
 * @param wordsPerMinute - Words per minute reading speed (default: 200)
 * @returns Object containing the reading time and word count
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200) {
  // Strip HTML tags
  const textOnly = content.replace(/<\/?[^>]+(>|$)/g, '');
  
  // Count words using reasonable word boundaries
  const wordCount = textOnly.split(/\s+/).filter(Boolean).length;
  
  // Calculate reading time
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Format reading time
  const readingTime = minutes <= 1 ? '1 min read' : `${minutes} min read`;
  
  return { readingTime, wordCount };
}

/**
 * Sort blog posts by publish date or fallback to slug
 */
export function sortBlogPosts(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    // Try to sort by date
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    // If dates are valid and different, sort by date
    if (!isNaN(dateA) && !isNaN(dateB) && dateA !== dateB) {
      return dateB - dateA; // Newest first
    }
    
    // Fallback to sorting by slug
    return a.slug.localeCompare(b.slug);
  });
}

/**
 * Find previous and next posts in chronological order
 */
export function findPrevNextPosts(posts: BlogPost[], currentSlug: string): { previous: BlogPost | null; next: BlogPost | null } {
  // Sort posts by date/slug
  const sortedPosts = sortBlogPosts(posts);
  
  // Find the index of the current post
  const currentIndex = sortedPosts.findIndex(post => post.slug === currentSlug);
  
  // If post not found, return null for both
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  // Find previous post (newer post - lower index)
  const previous = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  
  // Find next post (older post - higher index)
  const next = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  
  return { previous, next };
}

/**
 * Search blog posts by keyword in title or excerpt
 * @param posts - Array of blog posts
 * @param searchTerm - Search term to find in posts
 * @returns Filtered array of posts
 */
export function searchBlogPosts(posts: BlogPost[], searchTerm: string): BlogPost[] {
  if (!searchTerm.trim()) {
    return posts;
  }
  
  const normalizedSearch = searchTerm.trim().toLowerCase();
  
  return posts.filter(post => {
    // Search in title
    if (post.title.toLowerCase().includes(normalizedSearch)) {
      return true;
    }
    
    // Search in excerpt
    if (post.excerpt.toLowerCase().includes(normalizedSearch)) {
      return true;
    }
    
    // Search in content if available
    if (post.content && post.content.toLowerCase().includes(normalizedSearch)) {
      return true;
    }
    
    // Search in tags if available
    if (post.tags && post.tags.some(tag => tag.toLowerCase().includes(normalizedSearch))) {
      return true;
    }
    
    return false;
  });
}
