
/**
 * Utility functions for handling SEO meta tags
 */
import { BlogPost } from '@/types/blog';

/**
 * Updates meta tags in document head based on blog post data
 */
export const updateMetaTags = (post: BlogPost) => {
  // Remove any existing meta tags first
  removeMetaTags();
  
  // Set meta description
  if (post.metaDescription) {
    const metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    metaDesc.content = post.metaDescription;
    document.head.appendChild(metaDesc);
  }
  
  // Set canonical URL
  if (post.canonicalUrl) {
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = post.canonicalUrl;
    document.head.appendChild(canonicalLink);
  }
  
  // Set Twitter Card data
  if (post.twitter) {
    const twitterProps = post.twitter;
    Object.entries(twitterProps).forEach(([key, value]) => {
      if (value) {
        const twitterMeta = document.createElement('meta');
        twitterMeta.name = `twitter:${key}`;
        twitterMeta.content = value;
        document.head.appendChild(twitterMeta);
      }
    });
  }
  
  // Set Facebook/Open Graph data
  if (post.facebook) {
    const ogProps = post.facebook;
    Object.entries(ogProps).forEach(([key, value]) => {
      if (value) {
        const ogMeta = document.createElement('meta');
        // Use setAttribute instead of property assignment for Open Graph meta tags
        ogMeta.setAttribute('property', `og:${key}`);
        ogMeta.content = value;
        document.head.appendChild(ogMeta);
      }
    });
  }
  
  // If raw SEO tags are provided from Craft, insert them
  if (post.metaTags) {
    try {
      // Create a temporary container
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = post.metaTags;
      
      // Extract and append each meta tag
      Array.from(tempContainer.children).forEach(node => {
        document.head.appendChild(node);
      });
    } catch (error) {
      console.error('Error parsing SEO meta tags:', error);
    }
  }
};

/**
 * Remove meta tags when unmounting
 */
export const removeMetaTags = () => {
  // Remove meta description
  document.querySelectorAll('meta[name="description"]').forEach(tag => tag.remove());
  
  // Remove canonical link
  document.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove());
  
  // Remove Twitter Card meta tags
  document.querySelectorAll('meta[name^="twitter:"]').forEach(tag => tag.remove());
  
  // Remove Open Graph meta tags
  document.querySelectorAll('meta[property^="og:"]').forEach(tag => tag.remove());
};
