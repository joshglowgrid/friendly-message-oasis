
import axios from 'axios';
import { BlogPost, BlogCategoryModel, Author } from '@/types/blog';

// Configuration for Craft CMS API
const CRAFT_API_ENDPOINT = import.meta.env.VITE_CRAFT_API_ENDPOINT || '/api';
const CRAFT_GRAPHQL_ENDPOINT = import.meta.env.VITE_CRAFT_GRAPHQL_ENDPOINT || '/api/graphql';

/**
 * Fetch blog posts from Craft CMS
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // If using GraphQL
    const response = await axios.post(CRAFT_GRAPHQL_ENDPOINT, {
      query: `
        query BlogPosts {
          entries(section: "blog", limit: 100) {
            id
            slug
            title
            ... on blog_blog_Entry {
              excerpt
              content
              postImage {
                url
              }
              postDate @formatDateTime(format: "MMMM D, YYYY")
              readTime
              author {
                id
                fullName
                biography
                authorImage {
                  url
                }
                role
                hidden
              }
              blogCategory {
                slug
              }
              tags
              featured
            }
            seomatic {
              metaTitleContainer
              metaDescriptionContainer
              metaLinkContainer
              metaJsonLdContainer
              metaSiteVarsContainer
              metaTagContainer
              canonicalUrl
              twitter {
                card
                site
                creator
                title
                description
                image
              }
              facebook {
                title
                description
                image
                url
                type
                siteName
              }
            }
          }
        }
      `
    });

    return transformCraftBlogPosts(response.data.data.entries);
  } catch (error) {
    console.error("Error fetching blog posts from Craft CMS:", error);
    // Fallback to static content if API call fails
    return [];
  }
}

/**
 * Fetch blog categories from Craft CMS
 */
export async function fetchBlogCategories(): Promise<BlogCategoryModel[]> {
  try {
    const response = await axios.post(CRAFT_GRAPHQL_ENDPOINT, {
      query: `
        query BlogCategories {
          categories(group: "blogCategories") {
            id
            title
            slug
            description
            categoryImage {
              url
            }
          }
        }
      `
    });

    return transformCraftCategories(response.data.data.categories);
  } catch (error) {
    console.error("Error fetching blog categories from Craft CMS:", error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await axios.post(CRAFT_GRAPHQL_ENDPOINT, {
      query: `
        query BlogPost($slug: String!) {
          entry(section: "blog", slug: $slug) {
            id
            slug
            title
            ... on blog_blog_Entry {
              excerpt
              content
              postImage {
                url
              }
              postDate @formatDateTime(format: "MMMM D, YYYY")
              readTime
              author {
                id
                fullName
                biography
                authorImage {
                  url
                }
                role
                hidden
              }
              blogCategory {
                slug
              }
              tags
              featured
            }
            seomatic {
              metaTitleContainer
              metaDescriptionContainer
              metaLinkContainer
              metaJsonLdContainer
              metaSiteVarsContainer
              metaTagContainer
              canonicalUrl
              twitter {
                card
                site
                creator
                title
                description
                image
              }
              facebook {
                title
                description
                image
                url
                type
                siteName
              }
            }
          }
        }
      `,
      variables: {
        slug
      }
    });

    if (!response.data.data.entry) return null;
    
    return transformCraftBlogPost(response.data.data.entry);
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Transform Craft CMS blog post data to our BlogPost interface
 */
function transformCraftBlogPost(craftPost: any): BlogPost {
  const author: Author = craftPost.author ? {
    id: craftPost.author.id,
    name: craftPost.author.fullName,
    bio: craftPost.author.biography,
    avatar: craftPost.author.authorImage?.url,
    role: craftPost.author.role,
    hidden: craftPost.author.hidden
  } : { id: 'default', name: 'GlowGrid Media' };

  return {
    id: craftPost.id,
    slug: craftPost.slug,
    title: craftPost.title,
    excerpt: craftPost.excerpt,
    content: craftPost.content,
    image: craftPost.postImage?.url || '/placeholder.svg',
    date: craftPost.postDate,
    readTime: craftPost.readTime || '5 min read',
    author: author,
    category: craftPost.blogCategory?.slug || 'general',
    tags: craftPost.tags || [],
    featured: Boolean(craftPost.featured),
    published: true,
    
    // SEO fields
    metaTitle: craftPost.seomatic?.metaTitleContainer,
    metaDescription: craftPost.seomatic?.metaDescriptionContainer,
    metaLinks: craftPost.seomatic?.metaLinkContainer,
    metaJsonLd: craftPost.seomatic?.metaJsonLdContainer,
    metaSiteVars: craftPost.seomatic?.metaSiteVarsContainer,
    metaTags: craftPost.seomatic?.metaTagContainer,
    canonicalUrl: craftPost.seomatic?.canonicalUrl,
    twitter: craftPost.seomatic?.twitter,
    facebook: craftPost.seomatic?.facebook
  };
}

/**
 * Transform multiple Craft CMS blog posts
 */
function transformCraftBlogPosts(craftPosts: any[]): BlogPost[] {
  return craftPosts.map(transformCraftBlogPost);
}

/**
 * Transform Craft CMS categories
 */
function transformCraftCategories(craftCategories: any[]): BlogCategoryModel[] {
  return craftCategories.map(category => ({
    id: category.id,
    name: category.title,
    slug: category.slug,
    description: category.description || '',
    image: category.categoryImage?.url
  }));
}
