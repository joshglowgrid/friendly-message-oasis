
import { BlogPost } from '@/types/blog';

/**
 * Generate XML sitemap for blog posts
 * @param posts Array of blog posts
 * @param baseUrl Base URL of the website
 * @returns XML sitemap string
 */
export function generateBlogSitemap(posts: BlogPost[], baseUrl: string = 'https://www.glowgridmedia.com'): string {
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
    if (post.published) {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      
      // Add lastmod if we have a date
      if (post.date) {
        try {
          // Try to parse the date and format it for sitemap
          const dateObj = new Date(post.date);
          if (!isNaN(dateObj.getTime())) {
            sitemap += `    <lastmod>${dateObj.toISOString().split('T')[0]}</lastmod>\n`;
          }
        } catch (e) {
          // If date parsing fails, don't add lastmod
        }
      }
      
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.6</priority>\n';
      sitemap += '  </url>\n';
    }
  });
  
  // Add category pages
  const categories = Array.from(new Set(posts.map(post => post.category)))
    .filter(category => category !== 'general');
  
  categories.forEach(category => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/blog/category/${category}</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
}

/**
 * Generate and download sitemap
 * @param posts Array of blog posts
 */
export function downloadSitemap(posts: BlogPost[]): void {
  const sitemap = generateBlogSitemap(posts);
  
  // Create blob and download link
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'blog-sitemap.xml';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
