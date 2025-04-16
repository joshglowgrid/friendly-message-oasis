
/**
 * Utility functions for handling SEO meta tags
 */
import { BlogPost } from '@/types/blog';

/**
 * Updates meta tags in document head based on blog post data
 */
export const updateMetaTags = (post: BlogPost) => {
  // Remove any existing meta tags first to prevent duplicates
  removeMetaTags();
  
  // Set meta description
  if (post.metaDescription) {
    setMetaTag('description', post.metaDescription);
  }
  
  // Set robots meta if available
  if (post.robots) {
    setMetaTag('robots', post.robots);
  }
  
  // Set canonical URL
  if (post.canonicalUrl) {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      (existingCanonical as HTMLLinkElement).href = post.canonicalUrl;
    } else {
      const canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = post.canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
  }
  
  // Set Twitter Card data
  if (post.twitter) {
    const twitterProps = post.twitter;
    Object.entries(twitterProps).forEach(([key, value]) => {
      if (value) {
        setMetaTag(`twitter:${key}`, value);
      }
    });
  }
  
  // Set Facebook/Open Graph data
  if (post.facebook) {
    const ogProps = post.facebook;
    Object.entries(ogProps).forEach(([key, value]) => {
      if (value) {
        setOpenGraphTag(`og:${key}`, value);
      }
    });
  }
  
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
  
  // We don't remove all custom meta tags to avoid removing essential ones
  // that might be required by the site globally
};
