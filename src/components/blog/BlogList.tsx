
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string; // keeping this in the type for backward compatibility
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

interface BlogListProps {
  posts: BlogPost[];
  className?: string;
}

export const BlogList: React.FC<BlogListProps> = ({ posts, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {posts.map((post) => (
        <Card key={post.id} className="bg-black/60 border border-orange-400/20 backdrop-blur-sm overflow-hidden hover:border-orange-400/50 transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              {post.category}
            </div>
          </div>
          
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-xl line-clamp-2">
              <Link to={`/blog/${post.id}`} className="hover:text-orange-400 transition-colors">
                {post.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex items-center gap-4 text-white/60 mt-2">
              <span className="flex items-center gap-1">
                <Clock size={14} />
                {post.readTime}
              </span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-4 pt-2">
            <p className="text-sm text-white/70 line-clamp-3">{post.excerpt}</p>
          </CardContent>
          
          <CardFooter className="p-4 pt-0">
            <Button variant="link" className="p-0 text-orange-400 hover:text-orange-300" asChild>
              <Link to={`/blog/${post.id}`}>
                Read more <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
