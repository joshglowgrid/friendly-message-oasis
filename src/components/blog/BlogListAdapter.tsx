
import React from 'react';
import { BlogList } from './BlogList';
import { BlogPost as TypesBlogPost } from '@/types/blog';

// This adapter converts our internal BlogPost type to the one expected by BlogList component
export const BlogListAdapter: React.FC<{ posts: TypesBlogPost[] }> = ({ posts }) => {
  // Convert posts to the format expected by BlogList
  const adaptedPosts = posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    author: typeof post.author === 'string' ? post.author : post.author.name,
    date: post.date,
    readTime: post.readTime,
    category: post.category.toString(),
    image: post.image,
    featured: post.featured,
    content: post.content
  }));

  return <BlogList posts={adaptedPosts} />;
};
