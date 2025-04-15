
import React from 'react';
import { EnhancedContactSection } from '@/components/sections/EnhancedContactSection';
import { FloatingCTA } from '@/components/navigation/FloatingCTA';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ResourcesPlaceholderProps {
  title?: string;
}

const ResourcesPlaceholder: React.FC<ResourcesPlaceholderProps> = ({ 
  title = "Resources & Guides"
}) => {
  return (
    <div className="pt-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl orange-gradient-text font-blink mb-8">
          {title}
        </h1>
        
        <div className="glass-panel p-8 mb-12">
          <p className="text-white/80 text-lg mb-6">
            GlowGrid Media provides actionable resources for healthcare and wellness brands seeking to elevate their digital presence.
            Our guides, templates, and case studies are designed to deliver immediate value.
          </p>
          
          <p className="text-white/80 mb-8">
            Our resource library is currently in development. Soon, you'll find comprehensive guides, templates, and case studies
            specifically crafted for healthcare marketing professionals and practice owners.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button asChild variant="gradient">
              <Link to="/blog">
                Visit Our Blog
              </Link>
            </Button>
            
            <Button asChild variant="outline">
              <a href="#contact" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                Request Custom Resources
              </a>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Coming Soon</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Social Media Strategy Templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Content Calendar Frameworks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Email Automation Sequences
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Analytics Dashboard Templates
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Resource Categories</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Marketing Guides
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Template Library
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Case Studies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                  Growth Metrics Tools
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <EnhancedContactSection />
      <FloatingCTA />
    </div>
  );
};

export default ResourcesPlaceholder;
