
// Blog category string literal type
export type BlogCategoryType = 
  | 'aesthetic-marketing' 
  | 'seo-strategy' 
  | 'wellness-brands' 
  | 'content-marketing' 
  | 'social-media' 
  | 'email-marketing' 
  | 'client-success' 
  | 'web-development'
  | 'general';

// Blog category object interface
export interface BlogCategoryModel {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
  role?: string;
  hidden?: boolean; // Whether to hide the author on the public site
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string | Author;
  category: BlogCategoryType;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  publishDate?: string; // For scheduled posts
}
