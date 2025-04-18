
import React, { useEffect, useState } from 'react';
import { getBlogPosts } from '@/data/blogData';
import { generateBlogSitemap } from '@/utils/sitemapGenerator';
import { BlogPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { FileDown } from 'lucide-react';

const BlogSitemap = () => {
  const [sitemap, setSitemap] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const posts = await getBlogPosts();
        const xml = generateBlogSitemap(posts);
        setSitemap(xml);
        setError(null);
      } catch (err) {
        console.error('Error generating sitemap:', err);
        setError('Failed to generate sitemap');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleDownload = () => {
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
  };
  
  return (
    <div className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Blog Sitemap</h1>
        
        {loading ? (
          <div className="p-8 bg-black/50 border border-orange-500/20 rounded-lg">
            <p>Generating sitemap...</p>
          </div>
        ) : error ? (
          <div className="p-8 bg-black/50 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                className="flex items-center gap-2" 
                onClick={handleDownload}
              >
                <FileDown size={16} />
                Download XML Sitemap
              </Button>
            </div>
            
            <div className="p-6 bg-black/50 border border-orange-500/20 rounded-lg overflow-x-auto">
              <pre className="text-xs text-white/80 whitespace-pre-wrap">{sitemap}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogSitemap;
