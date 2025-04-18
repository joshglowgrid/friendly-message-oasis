
/**
 * Utility functions for handling SEO meta tags
 */
import { BlogPost } from '@/types/blog';
import { generateArticleJsonLd } from './blogUtils';

/**
 * Updates meta tags in document head based on blog post data
 */
export const updateMetaTags = (post: BlogPost) => {
  // Remove any existing meta tags first to prevent duplicates
  removeMetaTags();
  
  // Set page title
  document.title = post.metaTitle || `${post.title} | GlowGrid Media Blog`;
  
  // Set meta description
  if (post.metaDescription || post.excerpt) {
    setMetaTag('description', post.metaDescription || post.excerpt);
  }
  
  // Set robots meta if available
  if (post.robots) {
    setMetaTag('robots', post.robots);
  } else {
    // Default robots meta
    setMetaTag('robots', 'index, follow');
  }
  
  // Set canonical URL
  if (post.canonicalUrl) {
    setCanonicalLink(post.canonicalUrl);
  } else {
    // Create a default canonical URL
    const siteUrl = window.location.origin;
    setCanonicalLink(`${siteUrl}/blog/${post.slug}`);
  }
  
  // Set Twitter Card data
  if (post.twitter) {
    const twitterProps = post.twitter;
    Object.entries(twitterProps).forEach(([key, value]) => {
      if (value) {
        setMetaTag(`twitter:${key}`, value);
      }
    });
  } else {
    // Set default Twitter card data
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', post.title);
    setMetaTag('twitter:description', post.excerpt);
    if (post.image) {
      setMetaTag('twitter:image', post.image.startsWith('http') ? post.image : window.location.origin + post.image);
    }
  }
  
  // Set Facebook/Open Graph data
  if (post.facebook) {
    const ogProps = post.facebook;
    Object.entries(ogProps).forEach(([key, value]) => {
      if (value) {
        setOpenGraphTag(`og:${key}`, value);
      }
    });
  } else {
    // Set default Open Graph data
    setOpenGraphTag('og:type', 'article');
    setOpenGraphTag('og:title', post.title);
    setOpenGraphTag('og:description', post.excerpt);
    setOpenGraphTag('og:url', window.location.href);
    if (post.image) {
      setOpenGraphTag('og:image', post.image.startsWith('http') ? post.image : window.location.origin + post.image);
    }
    setOpenGraphTag('og:site_name', 'GlowGrid Media');
  }
  
  // Add JSON-LD structured data
  const jsonLd = generateArticleJsonLd(post);
  addJsonLd(jsonLd);
  
  // If raw SEO tags are provided from Craft, insert them
  if (post.metaTags) {
    try {
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = post.metaTags;
      
      // Extract and append each meta tag, avoiding duplicates
      Array.from(tempContainer.children).forEach(node => {
        if (node.nodeName === 'META') {
          const metaNode = node as HTMLMetaElement;
          const name = metaNode.getAttribute('name');
          const property = metaNode.getAttribute('property');
          
          // Check for duplicates before adding
          if (name && document.querySelector(`meta[name="${name}"]`)) {
            document.querySelector(`meta[name="${name}"]`)!.remove();
          } else if (property && document.querySelector(`meta[property="${property}"]`)) {
            document.querySelector(`meta[property="${property}"]`)!.remove();
          }
        }
        
        document.head.appendChild(node);
      });
    } catch (error) {
      console.error('Error parsing SEO meta tags:', error);
    }
  }
};

/**
 * Helper function to set or update a meta tag
 */
const setMetaTag = (name: string, content: string) => {
  // Check if meta tag already exists
  let metaTag = document.querySelector(`meta[name="${name}"]`);
  
  if (metaTag) {
    // Update existing tag
    metaTag.setAttribute('content', content);
  } else {
    // Create new tag
    metaTag = document.createElement('meta');
    metaTag.setAttribute('name', name);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};

/**
 * Helper function to set or update an Open Graph meta tag
 */
const setOpenGraphTag = (property: string, content: string) => {
  // Check if meta tag already exists
  let metaTag = document.querySelector(`meta[property="${property}"]`);
  
  if (metaTag) {
    // Update existing tag
    metaTag.setAttribute('content', content);
  } else {
    // Create new tag
    metaTag = document.createElement('meta');
    metaTag.setAttribute('property', property);
    metaTag.setAttribute('content', content);
    document.head.appendChild(metaTag);
  }
};

/**
 * Helper function to set canonical link
 */
const setCanonicalLink = (url: string) => {
  // Check if canonical link already exists
  const existingCanonical = document.querySelector('link[rel="canonical"]');
  
  if (existingCanonical) {
    // Update existing link
    (existingCanonical as HTMLLinkElement).href = url;
  } else {
    // Create new link
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = url;
    document.head.appendChild(canonicalLink);
  }
};

/**
 * Add JSON-LD structured data to the document
 */
const addJsonLd = (jsonLdString: string) => {
  // Remove any existing JSON-LD
  document.querySelectorAll('script[type="application/ld+json"]').forEach(tag => tag.remove());
  
  // Create new script tag
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('type', 'application/ld+json');
  scriptTag.textContent = jsonLdString;
  document.head.appendChild(scriptTag);
};

/**
 * Remove meta tags when unmounting
 */
export const removeMetaTags = () => {
  // Remove meta description
  document.querySelectorAll('meta[name="description"]').forEach(tag => tag.remove());
  
  // Remove robots meta
  document.querySelectorAll('meta[name="robots"]').forEach(tag => tag.remove());
  
  // Remove canonical link
  document.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove());
  
  // Remove Twitter Card meta tags
  document.querySelectorAll('meta[name^="twitter:"]').forEach(tag => tag.remove());
  
  // Remove Open Graph meta tags
  document.querySelectorAll('meta[property^="og:"]').forEach(tag => tag.remove());
  
  // Remove JSON-LD structured data
  document.querySelectorAll('script[type="application/ld+json"]').forEach(tag => tag.remove());
  
  // We don't remove all custom meta tags to avoid removing essential ones
  // that might be required by the site globally
};

/**
 * Generate dynamic sitemap data for blog posts
 * @param posts Array of blog posts
 * @returns XML sitemap string
 */
export const generateBlogSitemap = (posts: BlogPost[]): string => {
  const baseUrl = window.location.origin;
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add blog index page
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
  
  // Add individual blog posts
  posts.forEach(post => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
    sitemap += `    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.6</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
};
