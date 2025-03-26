
import { BlogPost } from '@/components/blog/BlogList';

// Sample blog post data
const blogPosts: BlogPost[] = [
  {
    id: "healthcare-social-media-trends-2025",
    title: "Top 5 Healthcare Social Media Trends for 2025",
    excerpt: "Discover the latest social media strategies that are transforming how healthcare brands connect with patients and build trust online.",
    author: "Jessica Chen",
    date: "March 15, 2025",
    readTime: "6 min read",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
    featured: true
  },
  {
    id: "dental-practice-marketing-guide",
    title: "The Ultimate Guide to Dental Practice Marketing",
    excerpt: "Learn how to attract and retain patients with effective digital marketing strategies tailored specifically for dental practices.",
    author: "Michael Roberts",
    date: "March 10, 2025",
    readTime: "8 min read",
    category: "Dental",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "tiktok-for-wellness-brands",
    title: "How Wellness Brands Can Leverage TikTok in 2025",
    excerpt: "TikTok continues to dominate short-form video content. Here's how wellness brands can create authentic engagement on the platform.",
    author: "Sarah Johnson",
    date: "March 5, 2025",
    readTime: "5 min read",
    category: "Video",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "email-automation-healthcare",
    title: "Email Automation Strategies for Healthcare Providers",
    excerpt: "Discover how to create personalized patient journeys using email automation without compromising compliance or privacy.",
    author: "David Miller",
    date: "February 28, 2025",
    readTime: "7 min read",
    category: "Email",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "medspa-instagram-growth",
    title: "Instagram Growth Tactics for MedSpas: Building a Premium Following",
    excerpt: "Learn how to showcase your medspa's aesthetic and expertise on Instagram to attract high-value clients.",
    author: "Amanda Lee",
    date: "February 22, 2025",
    readTime: "6 min read",
    category: "Social Media",
    image: "https://images.unsplash.com/photo-1596360415008-8d76d2acea8b?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "healthcare-website-conversion",
    title: "Healthcare Website Conversion Optimization: Beyond First Impressions",
    excerpt: "Optimize your healthcare website to convert visitors into patients with these proven UX design and content strategies.",
    author: "James Wilson",
    date: "February 15, 2025",
    readTime: "9 min read",
    category: "Website",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  }
];

// Get all blog posts
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(blogPosts);
    }, 500);
  });
};

// Get blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = blogPosts.find(post => post.id === id) || null;
      resolve(post);
    }, 500);
  });
};

// Get related posts (same category, excluding current post)
export const getRelatedPosts = async (category: string, currentPostId: string): Promise<BlogPost[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const related = blogPosts
        .filter(post => post.category === category && post.id !== currentPostId)
        .slice(0, 3);
      resolve(related);
    }, 500);
  });
};

// Get featured posts
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  // In a real app, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const featured = blogPosts.filter(post => post.featured);
      resolve(featured);
    }, 500);
  });
};
