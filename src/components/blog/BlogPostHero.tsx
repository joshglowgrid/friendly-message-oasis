
import React from 'react';
import { CalendarDays, Clock, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostHeroProps {
  image: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  wordCount: number;
}

export const BlogPostHero: React.FC<BlogPostHeroProps> = ({ 
  image, 
  title,
  category,
  date,
  readTime,
  wordCount
}) => {
  return (
    <div className="relative mb-16">
      {/* Hero Image with Gradient Overlay */}
      <div className="w-full aspect-[21/9] max-h-[500px] relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>
      
      {/* Header Content - Centered on Image */}
      <div className="container mx-auto px-4 absolute bottom-0 left-0 right-0 transform translate-y-1/2">
        <div className="max-w-4xl mx-auto bg-black border border-orange-400/20 rounded-lg p-6 md:p-10 backdrop-blur-sm">
          {/* Category Badge */}
          <Badge 
            variant="outline" 
            className="bg-orange-500 hover:bg-orange-600 text-white border-none mb-4"
          >
            {category}
          </Badge>
          
          {/* Post Title */}
          <h1 className="text-2xl md:text-4xl font-bold mb-4">{title}</h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-white/60">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{date}</span>
            </div>
            {readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>{wordCount.toLocaleString()} words</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
