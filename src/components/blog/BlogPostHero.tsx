
import React from 'react';

interface BlogPostHeroProps {
  image: string;
  title: string;
}

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({ image, title }) => {
  return (
    <div className="w-full aspect-[21/9] max-h-[500px] relative overflow-hidden mb-8">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    </div>
  );
};
