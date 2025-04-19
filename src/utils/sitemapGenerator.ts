
import { BlogPost } from '@/types/blog';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface MarkdownFile {
  content: string;
  data: {
    title: string;
    date: string;
    slug: string;
    published?: boolean;
  };
}

/**
 * Generate XML sitemap for blog posts and pages
 * @param baseUrl Base URL of the website
 * @returns XML sitemap string
 */
export function generateSitemap(baseUrl: string = 'https://www.glowgridmedia.com'): string {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add blog index page
  sitemap += '  <url>\n';
  sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
  sitemap += '    <changefreq>daily</changefreq>\n';
  sitemap += '    <priority>0.8</priority>\n';
  sitemap += '  </url>\n';
  
  // Add blog posts from markdown files
  const blogDir = path.join(process.cwd(), 'content/blog');
  const pageDir = path.join(process.cwd(), 'content/pages');
  
  // Function to read markdown files from a directory
  const readMarkdownFiles = (dir: string, urlPrefix: string) => {
    if (!fs.existsSync(dir)) return [];
    
    return fs.readdirSync(dir)
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(path.join(dir, file), 'utf-8');
        const parsedMatter = matter(content);
        
        // Type cast to ensure proper structure
        const data = parsedMatter.data as MarkdownFile['data'];
        
        if (data.published === false && urlPrefix === '/blog/') return null;
        
        sitemap += '  <url>\n';
        sitemap += `    <loc>${baseUrl}${urlPrefix}${data.slug}</loc>\n`;
        if (data.date) {
          sitemap += `    <lastmod>${new Date(data.date).toISOString().split('T')[0]}</lastmod>\n`;
        }
        sitemap += '    <changefreq>monthly</changefreq>\n';
        sitemap += '    <priority>0.6</priority>\n';
        sitemap += '  </url>\n';
        
        return data;
      })
      .filter(Boolean);
  };
  
  // Add blog posts and pages to sitemap
  readMarkdownFiles(blogDir, '/blog/');
  readMarkdownFiles(pageDir, '/');
  
  sitemap += '</urlset>';
  return sitemap;
}

/**
 * Generate XML sitemap from blog posts fetched from API
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
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
    sitemap += `    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>\n`;
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.6</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  return sitemap;
}

/**
 * Generate and download sitemap
 */
export function downloadSitemap(): void {
  const sitemap = generateSitemap();
  
  // Create blob and download link
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
