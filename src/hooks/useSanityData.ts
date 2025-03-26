
import { useQuery } from '@tanstack/react-query';
import { client, isSanityConfigured } from '@/lib/sanity';

// Generic hook for fetching data from Sanity
export function useSanityData<T>(
  queryKey: string[], 
  groqQuery: string,
  params?: Record<string, any>,
  options?: {
    enabled?: boolean,
    staleTime?: number
  }
) {
  return useQuery({
    queryKey: queryKey,
    queryFn: async () => {
      if (!isSanityConfigured()) {
        console.warn('Sanity is not fully configured. Check your environment variables.');
        return null;
      }
      
      try {
        const data = await client.fetch<T>(groqQuery, params);
        return data;
      } catch (error) {
        console.error('Error fetching data from Sanity:', error);
        throw error;
      }
    },
    enabled: options?.enabled !== false && isSanityConfigured(),
    staleTime: options?.staleTime || 1000 * 60 * 5, // 5 minutes by default
  });
}

// Type-specific hooks
export function useBlogPosts(limit?: number) {
  const query = `*[_type == "post"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ''} {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "categories": categories[]->title,
    "authorName": author->name,
    "authorImage": author->image,
    mainImage
  }`;
  
  return useSanityData(['blogPosts', limit ? limit.toString() : undefined], query);
}

export function useBlogPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    "categories": categories[]->title,
    "author": author->{name, image, bio},
    mainImage
  }`;
  
  return useSanityData(['blogPost', slug], query, { slug }, { enabled: !!slug });
}

export function useServices() {
  const query = `*[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    features,
    image
  }`;
  
  return useSanityData(['services'], query);
}

export function useIndustries() {
  const query = `*[_type == "industry"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    image
  }`;
  
  return useSanityData(['industries'], query);
}
