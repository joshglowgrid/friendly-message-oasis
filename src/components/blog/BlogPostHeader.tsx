
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const BlogPostHeader: React.FC = () => {
  return (
    <div className="container mx-auto px-4 mb-6">
      <Button variant="ghost" className="text-white/70 hover:text-white" asChild>
        <Link to="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
    </div>
  );
};
