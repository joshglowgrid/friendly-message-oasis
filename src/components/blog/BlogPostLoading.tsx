
import React from 'react';

export const BlogPostLoading: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <div className="w-10 h-10 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-white/60">Loading post...</p>
    </div>
  );
};
