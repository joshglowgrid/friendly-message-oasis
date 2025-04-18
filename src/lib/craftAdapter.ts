import axios from 'axios';
import { BlogPost, BlogCategoryModel, Author } from '@/types/blog';
import { craftConfig } from '@/config/craftConfig';

/**
 * Fetch blog posts from Craft CMS
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    // If using GraphQL
    const response = await axios.post(craftConfig.graphqlEndpoint, {
      query: `
        query BlogPosts {
          entries(section: "${craftConfig.sections.blog}", limit: 100) {
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
    const response = await axios.post(craftConfig.graphqlEndpoint, {
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
    const response = await axios.post(craftConfig.graphqlEndpoint, {
      query: `
        query BlogPost($slug: String!) {
          entry(section: "${craftConfig.sections.blog}", slug: $slug) {
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
    name: craftPost.author.fullName || 'GlowGrid Media',
    bio: craftPost.author.biography || '',
    avatar: craftPost.author.authorImage?.url || '/placeholder.svg',
    role: craftPost.author.role || '',
    hidden: craftPost.author.hidden || false
  } : { id: 'default', name: 'GlowGrid Media' };

  return {
    id: craftPost.id || '',
    slug: craftPost.slug || '',
    title: craftPost.title || 'Untitled Post',
    excerpt: craftPost.excerpt || 'No excerpt available',
    content: craftPost.content || 'No content available',
    image: craftPost.postImage?.url || '/placeholder.svg',
    date: craftPost.postDate || new Date().toLocaleDateString(),
    readTime: craftPost.readTime || '5 min read',
    author: author,
    category: craftPost.blogCategory?.slug || 'general',
    tags: craftPost.tags || [],
    featured: Boolean(craftPost.featured),
    published: true,
    
    // SEO fields with fallbacks
    metaTitle: craftPost.seomatic?.metaTitleContainer || craftPost.title || 'GlowGrid Media Blog',
    metaDescription: craftPost.seomatic?.metaDescriptionContainer || craftPost.excerpt || 'GlowGrid Media blog post',
    metaLinks: craftPost.seomatic?.metaLinkContainer || '',
    metaJsonLd: craftPost.seomatic?.metaJsonLdContainer || '',
    metaSiteVars: craftPost.seomatic?.metaSiteVarsContainer || '',
    metaTags: craftPost.seomatic?.metaTagContainer || '',
    canonicalUrl: craftPost.seomatic?.canonicalUrl || `https://www.glowgridmedia.com/blog/${craftPost.slug}`,
    twitter: craftPost.seomatic?.twitter || {},
    facebook: craftPost.seomatic?.facebook || {}
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

/**
 * Generate JSON-LD structured data for blog posts
 */
export function generateBlogJsonLd(post: BlogPost): string {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": typeof post.author === 'string' ? post.author : post.author.name
    },
    "publisher": {
      "@type": "Organization",
      "name": "GlowGrid Media",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.glowgridmedia.com/logo.png"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.canonicalUrl || `https://www.glowgridmedia.com/blog/${post.slug}`
    }
  };

  return JSON.stringify(articleData);
}
