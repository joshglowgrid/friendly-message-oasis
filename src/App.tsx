
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SocialMediaPage from "./pages/services/SocialMediaPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import { useState, useEffect } from "react";
import { FloatingCTA } from "./components/navigation/FloatingCTA";
import ServicesPlaceholder from "./pages/services/ServicesPlaceholder";
import WorkPlaceholder from "./pages/work/WorkPlaceholder";
import ResourcesPlaceholder from "./pages/resources/ResourcesPlaceholder";

const queryClient = new QueryClient();

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    // Enable tap-to-top behavior on mobile
    const handleTapTop = (event: MouseEvent) => {
      if (window.scrollY > window.innerHeight && event.clientY < 20) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    document.addEventListener('click', handleTapTop);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleTapTop);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Header scrolled={scrolled} />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              
              {/* Services routes */}
              <Route path="/services/social-media" element={<SocialMediaPage />} />
              <Route path="/services/content-creation" element={<ServicesPlaceholder title="Content Creation" />} />
              <Route path="/services/email-marketing" element={<ServicesPlaceholder title="Email Marketing" />} />
              <Route path="/services/website-development" element={<ServicesPlaceholder title="Website Development" />} />
              <Route path="/services/seo" element={<ServicesPlaceholder title="SEO Strategy" />} />
              <Route path="/services/analytics" element={<ServicesPlaceholder title="Analytics & Reporting" />} />
              <Route path="/services" element={<ServicesPlaceholder title="Our Services" />} />
              
              {/* Blog routes */}
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:postId" element={<BlogPostPage />} />
              
              {/* Work routes */}
              <Route path="/work" element={<WorkPlaceholder />} />
              <Route path="/work/:projectId" element={<WorkPlaceholder />} />
              
              {/* Resources routes */}
              <Route path="/resources" element={<ResourcesPlaceholder />} />
              <Route path="/resources/guides" element={<ResourcesPlaceholder title="Marketing Guides" />} />
              <Route path="/resources/templates" element={<ResourcesPlaceholder title="Template Library" />} />
              <Route path="/resources/case-studies" element={<ResourcesPlaceholder title="Case Studies" />} />
              <Route path="/resources/:resourceId" element={<ResourcesPlaceholder />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <FloatingCTA />
          <Footer />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
