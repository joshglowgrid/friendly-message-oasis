import { createClient } from "tinacms/dist/client";
import { BlogPost } from '@/components/blog/BlogList';

// Create a client for fetching data from TinaCMS with proper configuration
const client = createClient({
  url: "/api/tina",
  queries: (client) => {
    return {};
  }
});

// Function to transform TinaCMS blog post to our BlogPost format
const transformTinaPost = (post: any): BlogPost => {
  return {
    id: post._sys.filename,
    title: post.title || "",
    excerpt: post.excerpt || "",
    author: post.author || "GlowGrid Media",
    date: post.date || new Date().toISOString(),
    readTime: post.readTime || "5 min read",
    category: post.category || "Blog",
    image: post.image || "/placeholder.svg",
    featured: post.featured || false,
    content: post.body
  };
};

// Get all blog posts from TinaCMS
export async function getTinaBlogPosts(): Promise<BlogPost[]> {
  try {
    // Use proper query syntax for TinaCMS client
    const postsResponse = await client.request({
      query: `query {
        postConnection {
          edges {
            node {
              _sys {
                filename
              }
              title
              excerpt
              author
              date
              readTime
              category
              image
              featured
              body
            }
          }
        }
      }`
    });
    
    if (!postsResponse || !postsResponse.data || !postsResponse.data.postConnection) {
      console.error("Failed to fetch posts from TinaCMS");
      return [];
    }
    
    return postsResponse.data.postConnection.edges.map((edge: any) => 
      transformTinaPost(edge.node)
    );
  } catch (error) {
    console.error("Error fetching posts from TinaCMS:", error);
    return [];
  }
}

// Get a single blog post by slug from TinaCMS
export async function getTinaBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // Use proper query syntax for TinaCMS client
    const response = await client.request({
      query: `query($relativePath: String!) {
        post(relativePath: $relativePath) {
          _sys {
            filename
          }
          title
          excerpt
          author
          date
          readTime
          category
          image
          featured
          body
        }
      }`,
      variables: { relativePath: `${slug}.md` }
    });
    
    if (!response || !response.data || !response.data.post) {
      return null;
    }
    return transformTinaPost(response.data.post);
  } catch (error) {
    console.error(`Error fetching post ${slug} from TinaCMS:`, error);
    return null;
  }
}

// Get page content from TinaCMS
export async function getTinaPage(slug: string = 'home') {
  try {
    // Use proper query syntax for TinaCMS client
    const response = await client.request({
      query: `query($relativePath: String!) {
        page(relativePath: $relativePath) {
          title
          description
          ogImage
          hero {
            heading
            subheading
            buttonText
            buttonLink
            backgroundImage
          }
          sections
        }
      }`,
      variables: { relativePath: `${slug}.json` }
    });
    
    if (!response || !response.data || !response.data.page) {
      return null;
    }
    
    return response.data.page;
  } catch (error) {
    console.error(`Error fetching page ${slug} from TinaCMS:`, error);
    return null;
  }
}
