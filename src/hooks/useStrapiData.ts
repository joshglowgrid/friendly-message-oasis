
import { useQuery } from '@tanstack/react-query';
import { strapiClient, buildStrapiQuery, handleStrapiError } from '@/lib/strapi';

// Blog Post Type Definition
export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    category: string;
    publishedAt: string;
    readTime: string;
    featured: boolean;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    };
  };
}

// Formatted Blog Post Type for UI
export interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
}

// Mapping function to transform Strapi data format to our app format
const mapStrapiBlogPostToUI = (post: StrapiBlogPost): BlogPostData => {
  return {
    id: post.id.toString(),
    title: post.attributes.title,
    slug: post.attributes.slug,
    excerpt: post.attributes.excerpt,
    content: post.attributes.content,
    category: post.attributes.category,
    date: new Date(post.attributes.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: post.attributes.readTime,
    featured: post.attributes.featured,
    image: post.attributes.image?.data?.attributes?.url 
      ? `${post.attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
  };
};

// Hook to fetch all blog posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<BlogPostData[]> => {
      try {
        const query = buildStrapiQuery({
          populate: ['image'],
          sort: ['publishedAt:desc'],
        });
        
        const { data } = await strapiClient.get(`/blog-posts?${query}`);
        
        return data.data.map(mapStrapiBlogPostToUI);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
  });
};

// Hook to fetch a single blog post by slug
export const useBlogPostBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async (): Promise<BlogPostData | null> => {
      if (!slug) return null;
      
      try {
        const query = buildStrapiQuery({
          populate: ['image'],
          filters: {
            slug: {
              $eq: slug,
            },
          },
        });
        
        const { data } = await strapiClient.get(`/blog-posts?${query}`);
        
        if (data.data.length === 0) return null;
        
        return mapStrapiBlogPostToUI(data.data[0]);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!slug,
  });
};

// Hook to fetch blog posts by category
export const useBlogPostsByCategory = (category: string | undefined) => {
  return useQuery({
    queryKey: ['blog-posts', 'category', category],
    queryFn: async (): Promise<BlogPostData[]> => {
      if (!category) return [];
      
      try {
        const query = buildStrapiQuery({
          populate: ['image'],
          filters: {
            category: {
              $eq: category,
            },
          },
          sort: ['publishedAt:desc'],
        });
        
        const { data } = await strapiClient.get(`/blog-posts?${query}`);
        
        return data.data.map(mapStrapiBlogPostToUI);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!category,
  });
};

// Hook to fetch related blog posts
export const useRelatedBlogPosts = (category: string | undefined, currentPostId: string | undefined) => {
  return useQuery({
    queryKey: ['blog-posts', 'related', category, currentPostId],
    queryFn: async (): Promise<BlogPostData[]> => {
      if (!category || !currentPostId) return [];
      
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
        
        return data.data.map(mapStrapiBlogPostToUI);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!category && !!currentPostId,
  });
};

// Service Type Definition
export interface StrapiService {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content: string;
    icon: string;
    publishedAt: string;
    featured: boolean;
    image: {
      data: {
        attributes: {
          url: string;
        }
      }
    };
  };
}

// Formatted Service Type for UI
export interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
  featured: boolean;
  image: string;
}

// Mapping function to transform Strapi service data to our app format
const mapStrapiServiceToUI = (service: StrapiService): ServiceData => {
  return {
    id: service.id.toString(),
    title: service.attributes.title,
    slug: service.attributes.slug,
    description: service.attributes.description,
    content: service.attributes.content,
    icon: service.attributes.icon,
    featured: service.attributes.featured,
    image: service.attributes.image?.data?.attributes?.url 
      ? `${service.attributes.image.data.attributes.url}`
      : 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
  };
};

// Hook to fetch all services
export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async (): Promise<ServiceData[]> => {
      try {
        const query = buildStrapiQuery({
          populate: ['image'],
        });
        
        const { data } = await strapiClient.get(`/services?${query}`);
        
        return data.data.map(mapStrapiServiceToUI);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
  });
};

// Hook to fetch a single service by slug
export const useServiceBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: async (): Promise<ServiceData | null> => {
      if (!slug) return null;
      
      try {
        const query = buildStrapiQuery({
          populate: ['image'],
          filters: {
            slug: {
              $eq: slug,
            },
          },
        });
        
        const { data } = await strapiClient.get(`/services?${query}`);
        
        if (data.data.length === 0) return null;
        
        return mapStrapiServiceToUI(data.data[0]);
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!slug,
  });
};

// Client Portal Types
export interface StrapiClient {
  id: number;
  attributes: {
    name: string;
    email: string;
    company: string;
    user: {
      data: {
        id: number;
      }
    };
  };
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  company: string;
  userId: string;
}

// Client Portal Document Types
export interface StrapiClientDocument {
  id: number;
  attributes: {
    title: string;
    description: string;
    documentType: string;
    file: {
      data: {
        attributes: {
          url: string;
          name: string;
        }
      }
    };
    client: {
      data: {
        id: number;
      }
    };
  };
}

export interface ClientDocumentData {
  id: string;
  title: string;
  description: string;
  documentType: string;
  fileUrl: string;
  fileName: string;
  clientId: string;
}

// Hook to fetch client data
export const useClientData = (userId: string | undefined) => {
  return useQuery({
    queryKey: ['client', userId],
    queryFn: async (): Promise<ClientData | null> => {
      if (!userId) return null;
      
      try {
        const query = buildStrapiQuery({
          filters: {
            user: {
              id: {
                $eq: userId,
              },
            },
          },
        });
        
        const { data } = await strapiClient.get(`/clients?${query}`);
        
        if (data.data.length === 0) return null;
        
        const client = data.data[0];
        return {
          id: client.id.toString(),
          name: client.attributes.name,
          email: client.attributes.email,
          company: client.attributes.company,
          userId: client.attributes.user.data.id.toString(),
        };
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!userId,
  });
};

// Hook to fetch client documents
export const useClientDocuments = (clientId: string | undefined) => {
  return useQuery({
    queryKey: ['client-documents', clientId],
    queryFn: async (): Promise<ClientDocumentData[]> => {
      if (!clientId) return [];
      
      try {
        const query = buildStrapiQuery({
          populate: ['file'],
          filters: {
            client: {
              id: {
                $eq: clientId,
              },
            },
          },
        });
        
        const { data } = await strapiClient.get(`/client-documents?${query}`);
        
        return data.data.map((doc: StrapiClientDocument) => ({
          id: doc.id.toString(),
          title: doc.attributes.title,
          description: doc.attributes.description,
          documentType: doc.attributes.documentType,
          fileUrl: doc.attributes.file.data.attributes.url,
          fileName: doc.attributes.file.data.attributes.name,
          clientId: doc.attributes.client.data.id.toString(),
        }));
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!clientId,
  });
};

// Page Type Definition
export interface StrapiPage {
  id: number;
  attributes: {
    title: string;
    slug: string;
    content: string;
    metaDescription: string;
    publishedAt: string;
    sections: any[];
  };
}

// Formatted Page Type for UI
export interface PageData {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaDescription: string;
  publishedAt: string;
  sections: any[];
}

// Hook to fetch a single page by slug
export const usePageBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['page', slug],
    queryFn: async (): Promise<PageData | null> => {
      if (!slug) return null;
      
      try {
        const query = buildStrapiQuery({
          populate: ['sections'],
          filters: {
            slug: {
              $eq: slug,
            },
          },
        });
        
        const { data } = await strapiClient.get(`/pages?${query}`);
        
        if (data.data.length === 0) return null;
        
        const page = data.data[0];
        return {
          id: page.id.toString(),
          title: page.attributes.title,
          slug: page.attributes.slug,
          content: page.attributes.content,
          metaDescription: page.attributes.metaDescription,
          publishedAt: page.attributes.publishedAt,
          sections: page.attributes.sections || [],
        };
      } catch (error) {
        throw handleStrapiError(error);
      }
    },
    enabled: !!slug,
  });
};
