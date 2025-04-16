
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug, getRelatedBlogPosts } from '@/data/blogData';
import { BlogPost as TypesBlogPost } from '@/types/blog';
import { BlogPostLoading } from '@/components/blog/BlogPostLoading';
import { BlogPostNotFound } from '@/components/blog/BlogPostNotFound';
import { BlogPostHeader } from '@/components/blog/BlogPostHeader';
import { BlogPostHero } from '@/components/blog/BlogPostHero';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogListAdapter } from '@/components/blog/BlogListAdapter';
import { Button } from '@/components/ui/button';
import { CalendarDays, Clock, ArrowRight, Share2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const BlogPostPage = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<TypesBlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<TypesBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostBySlug(postId);
        // Cast to TypesBlogPost to match our state type
        setPost(fetchedPost as unknown as TypesBlogPost);
        
        // Set page metadata
        if (fetchedPost) {
          // Use SEO title if available, otherwise fallback to post title
          document.title = fetchedPost.metaTitle || `${fetchedPost.title} | GlowGrid Media Blog`;
          
          // Update meta tags
          updateMetaTags(fetchedPost);
          
          // Fetch related posts
          const related = await getRelatedBlogPosts(fetchedPost.category, postId);
          setRelatedPosts(related as unknown as TypesBlogPost[]);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
    
    // Scroll to top when post ID changes
    window.scrollTo(0, 0);
    
    // Clean up meta tags when unmounting
    return () => {
      removeMetaTags();
    };
  }, [postId]);
  
  // Helper function to update meta tags based on post data
  const updateMetaTags = (post: TypesBlogPost) => {
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
          ogMeta.property = `og:${key}`;
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
  
  // Helper function to remove meta tags when unmounting
  const removeMetaTags = () => {
    // Remove meta description
    document.querySelectorAll('meta[name="description"]').forEach(tag => tag.remove());
    
    // Remove canonical link
    document.querySelectorAll('link[rel="canonical"]').forEach(tag => tag.remove());
    
    // Remove Twitter Card meta tags
    document.querySelectorAll('meta[name^="twitter:"]').forEach(tag => tag.remove());
    
    // Remove Open Graph meta tags
    document.querySelectorAll('meta[property^="og:"]').forEach(tag => tag.remove());
  };
  
  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
        duration: 3000,
      });
    }
  };
  
  if (loading) {
    return <BlogPostLoading />;
  }
  
  if (!post) {
    return <BlogPostNotFound />;
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <main className="flex-grow pt-28">
        <BlogPostHeader />
        <BlogPostHero image={post.image} title={post.title} />
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto -mt-16 relative z-10 bg-black/90 border border-orange-500/20 rounded-lg p-6 sm:p-8">
            {/* Category badge */}
            <Link 
              to={`/blog?category=${post.category}`}
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 mb-4 hover:bg-orange-500/20 transition-colors"
            >
              {post.category.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Link>
            
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center text-sm text-white/60 gap-4 mb-6">
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{post.readTime}</span>
              </div>
              <button 
                onClick={handleShareClick}
                className="flex items-center hover:text-orange-400 transition-colors"
              >
                <Share2 className="w-4 h-4 mr-1" />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto my-8">
            <BlogPostContent post={post} />
            
            {/* CTA Section */}
            <div className="mt-12 mb-8 p-6 sm:p-8 border border-orange-500/20 rounded-lg bg-gradient-to-b from-black to-orange-950/20">
              <h3 className="text-2xl font-semibold mb-3">Ready to implement these strategies?</h3>
              <p className="text-white/80 mb-6">
                Our team specializes in creating customized marketing strategies for healthcare and wellness brands. Let's discuss how we can help your business grow.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="gradient" className="group" asChild>
                  <Link to="/contact">
                    Book a Strategy Call
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button variant="outline" className="border-orange-500/30 hover:bg-orange-500/10" asChild>
                  <Link to={`/services/${post.category.toString().includes('social') ? 'social-media' : post.category.toString().includes('web') ? 'website-development' : post.category.toString().includes('email') ? 'email-marketing' : 'seo'}`}>
                    Explore Our Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <div className="bg-black/80 border-t border-orange-500/10 py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
              <BlogListAdapter posts={relatedPosts} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPostPage;
