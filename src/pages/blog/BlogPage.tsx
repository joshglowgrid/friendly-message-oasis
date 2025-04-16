
import React, { useEffect, useState } from 'react';
import { BlogListAdapter } from '@/components/blog/BlogListAdapter';
import { getBlogPosts } from '@/data/blogData';
import { BlogPost, BlogCategoryType } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { searchBlogPosts } from '@/utils/blogUtils';

// Define blog category interface for the local component use
interface BlogCategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const blogCategories: BlogCategoryItem[] = [
  { id: '1', name: 'All Posts', slug: 'all', description: 'View all our blog posts' },
  { id: '2', name: 'Aesthetic Marketing Trends', slug: 'aesthetic-marketing', description: 'Latest trends in aesthetic marketing' },
  { id: '3', name: 'Client Success Stories', slug: 'client-success', description: 'See how our clients have succeeded' },
  { id: '4', name: 'SEO for Wellness Brands', slug: 'wellness-brands', description: 'Optimizing SEO for wellness businesses' },
  { id: '5', name: 'Content Marketing', slug: 'content-marketing', description: 'Strategic content marketing tips' },
  { id: '6', name: 'Social Media', slug: 'social-media', description: 'Social media strategies and tips' },
  { id: '7', name: 'Email Marketing', slug: 'email-marketing', description: 'Email marketing and automation' }
];

const BlogPage = () => {
  // State for blog posts - explicitly using BlogPost
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get category from URL if present
  const categoryParam = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(categoryParam);

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const blogPosts = await getBlogPosts();
        setPosts(blogPosts);
        applyFilters(blogPosts, activeCategory, searchTerm);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    document.title = 'GlowGrid Media Blog: Healthcare & Wellness Marketing Insights';
  }, [activeCategory, searchTerm]);

  // Filter posts when category or search changes
  const applyFilters = (allPosts: BlogPost[], category: string, search: string) => {
    // First filter by category
    let result = allPosts;
    
    if (category !== 'all') {
      result = result.filter(post => 
        post.category.toString().includes(category) || 
        (post.tags && post.tags.includes(category))
      );
    }
    
    // Then apply search filter
    if (search) {
      result = searchBlogPosts(result, search);
    }
    
    setFilteredPosts(result);
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams(category === 'all' ? {} : { category });
    applyFilters(posts, category, searchTerm);
  };

  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    applyFilters(posts, activeCategory, term);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-28 md:pt-32">
        {/* Hero section */}
        <div className="mb-12 border-b border-orange-500/20 pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-bold mb-4">
            Insights for Health & Wellness Brands
          </h1>
          <p className="text-lg text-white/80 mb-8 max-w-3xl">
            Strategic marketing insights for healthcare, aesthetic, and wellness brands looking to elevate their digital presence and drive measurable growth.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button variant="gradient" className="group" asChild>
              <Link to="/contact">
                Get a Custom Marketing Strategy
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-orange-500/30 hover:bg-orange-500/10 text-orange-400" 
              asChild
            >
              <a href="#categories">
                Browse by Category
              </a>
            </Button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Search Articles</h2>
          <BlogSearch onSearch={handleSearch} />
        </div>
        
        {/* Categories tabs */}
        <div id="categories" className="mb-8">
          <Tabs defaultValue={activeCategory} className="w-full" onValueChange={handleCategoryChange}>
            <div className="border-b border-orange-500/20 mb-6">
              <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
              <TabsList className="overflow-x-auto flex pb-2 mb-0 bg-transparent">
                {blogCategories.map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.slug}
                    className={cn(
                      "data-[state=active]:text-orange-400 data-[state=active]:border-orange-400 border-b-2 border-transparent rounded-none px-4 py-2 whitespace-nowrap text-sm font-medium",
                      "bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    )}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            {blogCategories.map(category => (
              <TabsContent key={category.id} value={category.slug} className="mt-0">
                {category.slug !== 'all' && (
                  <div className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
                    <p className="text-white/70 mb-4">{category.description}</p>
                  </div>
                )}
                
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-black/60 border border-orange-400/20 backdrop-blur-sm h-80 animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <>
                    {filteredPosts.length > 0 ? (
                      <BlogListAdapter posts={filteredPosts} />
                    ) : (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-medium mb-2">No posts found</h3>
                        <p className="text-white/70 mb-6">
                          {searchTerm ? 'No posts match your search criteria' : 'We\'re working on adding content to this category soon'}
                        </p>
                        <Button variant="outline" onClick={() => {
                          setSearchTerm('');
                          handleCategoryChange('all');
                        }}>
                          View All Posts
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* CTA section */}
        <div className="mt-16 mb-16 bg-gradient-to-r from-orange-600/20 to-orange-400/10 rounded-xl p-8 border border-orange-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Need Help with Your Marketing Strategy?</h2>
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

export default BlogPage;
