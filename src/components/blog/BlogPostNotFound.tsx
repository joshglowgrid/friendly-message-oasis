
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const BlogPostNotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Post not found</h1>
      <Button asChild>
        <Link to="/blog">Back to Blog</Link>
      </Button>
    </div>
  );
};
