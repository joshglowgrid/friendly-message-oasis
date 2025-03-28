
import { BlogPost } from '@/components/blog/BlogList';
import { strapiClient, buildStrapiQuery } from '@/lib/strapi';

// Sample blog post data (fallback if API fails)
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

// Get all blog posts from Strapi with fallback to sample data
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // Try to fetch from Strapi
    const query = buildStrapiQuery({
      populate: ['image'],
      sort: ['publishedAt:desc'],
    });
    
    const { data } = await strapiClient.get(`/blog-posts?${query}`);
    
    if (data.data.length === 0) {
      return blogPosts; // Fallback to sample data if no posts
    }
    
    // Transform Strapi data to match our BlogPost interface
    return data.data.map((post: any) => ({
      id: post.id.toString(),
      title: post.attributes.title,
      excerpt: post.attributes.excerpt,
      author: "GlowGrid Media", // Default author
      date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: post.attributes.readTime || "5 min read",
      category: post.attributes.category,
      image: post.attributes.image?.data?.attributes?.url
        ? `${post.attributes.image.data.attributes.url}`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      featured: post.attributes.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching blog posts from Strapi:', error);
    // Fallback to sample data
    return blogPosts;
  }
};

// Get blog post by ID from Strapi with fallback to sample data
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    // First try to get by ID
    const { data } = await strapiClient.get(`/blog-posts/${id}?populate=*`);
    
    if (!data.data) {
      // If not found by ID, try by slug
      const query = buildStrapiQuery({
        populate: ['image'],
        filters: {
          slug: {
            $eq: id, // id might be a slug here
          },
        },
      });
      
      const slugResponse = await strapiClient.get(`/blog-posts?${query}`);
      
      if (slugResponse.data.data.length === 0) {
        // If still not found, fall back to sample data
        return blogPosts.find(post => post.id === id) || null;
      }
      
      const post = slugResponse.data.data[0];
      return {
        id: post.id.toString(),
        title: post.attributes.title,
        excerpt: post.attributes.excerpt,
        author: "GlowGrid Media",
        date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        readTime: post.attributes.readTime || "5 min read",
        category: post.attributes.category,
        image: post.attributes.image?.data?.attributes?.url
          ? `${post.attributes.image.data.attributes.url}`
          : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
        featured: post.attributes.featured || false,
      };
    }
    
    const post = data.data;
    return {
      id: post.id.toString(),
      title: post.attributes.title,
      excerpt: post.attributes.excerpt,
      author: "GlowGrid Media",
      date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: post.attributes.readTime || "5 min read",
      category: post.attributes.category,
      image: post.attributes.image?.data?.attributes?.url
        ? `${post.attributes.image.data.attributes.url}`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      featured: post.attributes.featured || false,
    };
  } catch (error) {
    console.error('Error fetching blog post by ID from Strapi:', error);
    // Fallback to sample data
    return blogPosts.find(post => post.id === id) || null;
  }
};

// Get related posts from Strapi
export const getRelatedPosts = async (category: string, currentPostId: string): Promise<BlogPost[]> => {
  try {
    const query = buildStrapiQuery({
      populate: ['image'],
      filters: {
        category: {
          $eq: category,
        },
        id: {
          $ne: currentPostId,
        },
      },
      sort: ['publishedAt:desc'],
      pagination: {
        limit: 3,
      },
    });
    
    const { data } = await strapiClient.get(`/blog-posts?${query}`);
    
    if (data.data.length === 0) {
      // Fallback to sample data
      return blogPosts
        .filter(post => post.category === category && post.id !== currentPostId)
        .slice(0, 3);
    }
    
    // Transform Strapi data to match our BlogPost interface
    return data.data.map((post: any) => ({
      id: post.id.toString(),
      title: post.attributes.title,
      excerpt: post.attributes.excerpt,
      author: "GlowGrid Media",
      date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: post.attributes.readTime || "5 min read",
      category: post.attributes.category,
      image: post.attributes.image?.data?.attributes?.url
        ? `${post.attributes.image.data.attributes.url}`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      featured: post.attributes.featured || false,
    }));
  } catch (error) {
    console.error('Error fetching related posts from Strapi:', error);
    // Fallback to sample data
    return blogPosts
      .filter(post => post.category === category && post.id !== currentPostId)
      .slice(0, 3);
  }
};

// Get featured posts from Strapi
export const getFeaturedPosts = async (): Promise<BlogPost[]> => {
  try {
    const query = buildStrapiQuery({
      populate: ['image'],
      filters: {
        featured: {
          $eq: true,
        },
      },
      sort: ['publishedAt:desc'],
    });
    
    const { data } = await strapiClient.get(`/blog-posts?${query}`);
    
    if (data.data.length === 0) {
      // Fallback to sample data
      return blogPosts.filter(post => post.featured);
    }
    
    // Transform Strapi data to match our BlogPost interface
    return data.data.map((post: any) => ({
      id: post.id.toString(),
      title: post.attributes.title,
      excerpt: post.attributes.excerpt,
      author: "GlowGrid Media",
      date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      readTime: post.attributes.readTime || "5 min read",
      category: post.attributes.category,
      image: post.attributes.image?.data?.attributes?.url
        ? `${post.attributes.image.data.attributes.url}`
        : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
      featured: true,
    }));
  } catch (error) {
    console.error('Error fetching featured posts from Strapi:', error);
    // Fallback to sample data
    return blogPosts.filter(post => post.featured);
  }
};
