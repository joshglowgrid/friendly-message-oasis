
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Share2, User } from 'lucide-react';
import { getBlogPostById, getRelatedPosts } from '@/data/blogData';
import { BlogList, BlogPost } from '@/components/blog/BlogList';
import { Separator } from '@/components/ui/separator';

const BlogPostPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        const fetchedPost = await getBlogPostById(postId);
        setPost(fetchedPost);
        
        // Fetch related posts
        if (fetchedPost) {
          const related = await getRelatedPosts(fetchedPost.category, postId);
          setRelatedPosts(related);
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
  }, [postId]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-white/60">Loading post...</p>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl mb-4">Post not found</h1>
        <Button asChild>
          <Link to="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <FloatingCTA />
      <Header scrolled={scrolled} />
      
      <main className="flex-grow pt-28">
        {/* Back to blog */}
        <div className="container mx-auto px-4 mb-6">
          <Button variant="ghost" className="text-white/70 hover:text-white" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        
        {/* Hero Image */}
        <div className="w-full aspect-[21/9] max-h-[500px] relative overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        {/* Post Content */}
        <div className="container mx-auto px-4 -mt-20 relative">
          <div className="bg-black/90 border border-orange-400/20 rounded-lg p-6 md:p-10 max-w-4xl mx-auto backdrop-blur-sm">
            <span className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-4">
              {post.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/60 mb-6">
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              {/* This would be the actual blog content from CMS */}
              <p className="text-white/80 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis augue nec nisi bibendum, vel hendrerit lorem semper. Nullam consectetur urna vel nulla sagittis, at ultricies magna consequat.
              </p>
              <p className="text-white/80 mb-4">
                Maecenas feugiat libero non libero tincidunt, vel tincidunt est ultrices. Cras eleifend, ipsum in hendrerit facilisis, lacus nisi porta nisl, at faucibus nisi ligula vel ex. Nullam consectetur urna vel nulla sagittis, at ultricies magna consequat.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Key insights for healthcare brands</h2>
              <p className="text-white/80 mb-4">
                Maecenas feugiat libero non libero tincidunt, vel tincidunt est ultrices. Cras eleifend, ipsum in hendrerit facilisis, lacus nisi porta nisl, at faucibus nisi ligula vel ex.
              </p>
              <ul className="list-disc pl-6 mb-6 text-white/80">
                <li className="mb-2">Understand your target audience's healthcare concerns</li>
                <li className="mb-2">Create content that addresses specific pain points</li>
                <li className="mb-2">Establish trust through consistent, valuable information</li>
                <li className="mb-2">Leverage social proof from satisfied patients</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Implementing effective strategies</h2>
              <p className="text-white/80 mb-4">
                Maecenas feugiat libero non libero tincidunt, vel tincidunt est ultrices. Cras eleifend, ipsum in hendrerit facilisis, lacus nisi porta nisl, at faucibus nisi ligula vel ex.
              </p>
              <p className="text-white/80 mb-8">
                Nullam consectetur urna vel nulla sagittis, at ultricies magna consequat. Donec convallis augue nec nisi bibendum, vel hendrerit lorem semper.
              </p>
            </div>
            
            {/* Share buttons */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Share this article:</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full w-8 h-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-10">Related Articles</h2>
              <BlogList posts={relatedPosts} />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPostPage;
