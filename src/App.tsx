
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
import ContactPage from "./pages/ContactPage";
import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import { useState, useEffect } from "react";
import { FloatingCTA } from "./components/navigation/FloatingCTA";
import ServicesPlaceholder from "./pages/services/ServicesPlaceholder";
import WorkPlaceholder from "./pages/work/WorkPlaceholder";
import ResourcesPlaceholder from "./pages/resources/ResourcesPlaceholder";
import EmailMarketingPage from "./pages/services/EmailMarketingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
      import ScrollToTop from "./components/navigation/ScrollToTop"; // adjust path as needed

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop /> {/* ← Add this right here */}
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Services routes */}
          <Route path="/services/social-media" element={<SocialMediaPage />} />
          <Route path="/services/*" element={<NotFound />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          
          {/* Other routes */}
          <Route path="/work" element={<NotFound />} />
          <Route path="/work/:projectId" element={<NotFound />} />
          <Route path="/resources" element={<NotFound />} />
          <Route path="/resources/:resourceId" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
