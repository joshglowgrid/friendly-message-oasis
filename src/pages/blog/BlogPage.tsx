
import React, { useState, useEffect } from 'react';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { BlogList, BlogPost } from '@/components/blog/BlogList';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { getBlogPosts } from '@/data/blogData';

const BlogPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  // Categories derived from posts
  const categories = ['all', ...Array.from(new Set(posts.map(post => post.category.toLowerCase())))];
  
  useEffect(() => {
    // Fetch blog posts
    const fetchPosts = async () => {
      const allPosts = await getBlogPosts();
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    };
    
    fetchPosts();
    
    // Handle scroll for sticky header
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Filter posts based on search query and active category
  useEffect(() => {
    let result = posts;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(post => 
        post.category.toLowerCase() === activeCategory
      );
    }
    
    setFilteredPosts(result);
  }, [searchQuery, activeCategory, posts]);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <FloatingCTA />
      <Header scrolled={scrolled} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-black py-20 px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="orange-gradient-text text-3xl md:text-5xl font-bold mb-4">GlowGrid Media Blog</h1>
            <p className="text-lg text-white/70 mb-8 max-w-3xl mx-auto">
              Insights, strategies, and inspiration for healthcare and wellness brands looking to elevate their digital presence.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10 py-6 bg-black/50 border-orange-400/30 focus:border-orange-400 text-white"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </section>
        
        {/* Blog Content */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category Tabs */}
            <Tabs defaultValue="all" className="mb-10">
              <TabsList className="mb-8 w-full max-w-md mx-auto flex justify-center bg-black/60 border border-orange-400/20">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    onClick={() => handleCategoryChange(category)}
                    className="capitalize"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              <TabsContent value="all" className="mt-0">
                {filteredPosts.length > 0 ? (
                  <BlogList posts={filteredPosts} />
                ) : (
                  <div className="text-center py-10">
                    <p className="text-lg text-white/60">No posts found. Try a different search term.</p>
                  </div>
                )}
              </TabsContent>
              
              {categories.slice(1).map((category) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <BlogList 
                    posts={filteredPosts.filter(post => post.category.toLowerCase() === category)} 
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPage;
