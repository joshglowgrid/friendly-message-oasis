
import { BlogPost } from '@/components/blog/BlogList';
import { promises as fs } from 'fs';
import path from 'path';

// Path to our content directory
const CONTENT_DIR = path.join(process.cwd(), 'content');
const POSTS_DIR = path.join(CONTENT_DIR, 'posts');

// Helper function to read content directory
async function readContentDirectory(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath);
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return [];
  }
}

// Helper function to read and parse a markdown file
async function readMarkdownFile(filePath: string): Promise<any> {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    // Simple parsing for front matter
    const frontMatterMatch = content.match(/---\r?\n([\s\S]*?)\r?\n---/);
    if (!frontMatterMatch) {
      return { content: content };
    }
    
    const frontMatter = frontMatterMatch[1];
    const mainContent = content.replace(frontMatterMatch[0], '').trim();
    
    // Parse front matter
    const metadata: Record<string, any> = {};
    frontMatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        const value = valueParts.join(':').trim();
        metadata[key.trim()] = value.replace(/^['"]|['"]$/g, ''); // Remove quotes if present
      }
    });
    
    return {
      ...metadata,
      content: mainContent
    };
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return null;
  }
}

// Get all blog posts
export async function getBlogContent(): Promise<BlogPost[]> {
  try {
    // Get list of markdown files in posts directory
    const files = await readContentDirectory(POSTS_DIR);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Read each file and parse its contents
    const blogPosts = await Promise.all(
      markdownFiles.map(async file => {
        const filePath = path.join(POSTS_DIR, file);
        const data = await readMarkdownFile(filePath);
        
        if (!data) return null;
        
        // Convert file name to slug
        const slug = file.replace(/\.md$/, '');
        
        return {
          id: slug,
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          author: data.author || 'GlowGrid Media',
          date: data.date || new Date().toLocaleDateString(),
          readTime: data.readTime || '5 min read',
          category: data.category || 'Uncategorized',
          image: data.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
          featured: data.featured === 'true' || false,
          content: data.content || ''
        };
      })
    );
    
    // Filter out nulls and return
    return blogPosts.filter(Boolean) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog content:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(POSTS_DIR, `${slug}.md`);
    
    const data = await readMarkdownFile(filePath);
    if (!data) return null;
    
    return {
      id: slug,
      title: data.title || 'Untitled',
      excerpt: data.excerpt || '',
      author: data.author || 'GlowGrid Media',
      date: data.date || new Date().toLocaleDateString(),
      readTime: data.readTime || '5 min read',
      category: data.category || 'Uncategorized',
      image: data.image || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      featured: data.featured === 'true' || false,
      content: data.content || ''
    };
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

// Get related blog posts
export async function getRelatedBlogPosts(category: string, currentPostId: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogContent();
    
    return allPosts
      .filter(post => post.category === category && post.id !== currentPostId)
      .slice(0, 3);
  } catch (error) {
    console.error('Error fetching related blog posts:', error);
    return [];
  }
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogContent();
    
    return allPosts.filter(post => post.featured);
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}
