
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPosts } from '@/data/blogData';
import { BlogPost } from '@/types/blog';
import { BlogListAdapter } from '@/components/blog/BlogListAdapter';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const BlogCategoryPage = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (!categorySlug) return;

    const fetchCategoryPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await getBlogPosts();
        
        // Filter posts by the category
        const filteredPosts = allPosts.filter(post => 
          post.category.toString() === categorySlug || 
          (post.tags && post.tags.includes(categorySlug))
        );
        
        setPosts(filteredPosts);
        
        // Get formatted category name
        const formattedName = categorySlug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
          
        setCategoryName(formattedName);
        
        // Update document title
        document.title = `${formattedName} Articles | GlowGrid Media Blog`;
      } catch (error) {
        console.error('Error fetching category posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryPosts();
  }, [categorySlug]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-32">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="flex items-center gap-2 hover:bg-orange-500/10 hover:text-orange-400 -ml-2">
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        
        {/* Category header */}
        <div className="mb-12 border-b border-orange-500/20 pb-12">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 mb-4">
            Category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {categoryName}
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-3xl">
            Explore our latest articles and insights on {categoryName.toLowerCase()} for healthcare and wellness brands.
          </p>
        </div>
        
        {/* Articles grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Articles in this category</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-black/60 border border-orange-400/20 backdrop-blur-sm h-80 animate-pulse rounded-lg"></div>
              ))}
            </div>
          ) : (
            <>
              {posts.length > 0 ? (
                <BlogListAdapter posts={posts} />
              ) : (
                <div className="text-center py-12 border border-orange-500/20 rounded-lg bg-black/40">
                  <h3 className="text-xl font-medium mb-2">No articles found in this category</h3>
                  <p className="text-white/70 mb-6">We're working on adding content to this category soon.</p>
                  <Button variant="outline" asChild>
                    <Link to="/blog">
                      View All Posts
                    </Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        
        {/* CTA section */}
        <div className="my-16 bg-gradient-to-r from-orange-600/20 to-orange-400/10 rounded-xl p-8 border border-orange-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Need Help with Your {categoryName} Strategy?</h2>
              <p className="text-white/80">Get expert advice tailored to your healthcare or wellness business.</p>
            </div>
            <Button variant="gradient" size="lg" className="whitespace-nowrap" asChild>
              <Link to="/contact">
                Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCategoryPage;
