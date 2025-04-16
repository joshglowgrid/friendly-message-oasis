
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { BlogCategoryType } from '@/types/blog';

interface BlogPostCTAProps {
  category?: BlogCategoryType;
}

export const BlogPostCTA: React.FC<BlogPostCTAProps> = ({ category }) => {
  // Determine the most relevant service page based on post category
  const getServicePath = () => {
    if (category?.toString().includes('social')) return 'social-media';
    if (category?.toString().includes('web')) return 'website-development';
    if (category?.toString().includes('email')) return 'email-marketing';
    if (category?.toString().includes('seo')) return 'seo';
    return 'social-media'; // Default fallback
  };

  return (
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
          <Link to={`/services/${getServicePath()}`}>
            Explore Our Services
          </Link>
        </Button>
      </div>
    </div>
  );
};
