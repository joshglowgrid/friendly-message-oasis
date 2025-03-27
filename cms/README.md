
# GlowGrid Media CMS

This is the Strapi CMS backend for GlowGrid Media. It manages content for the website, blog, and client portal.

## Getting Started

1. Install dependencies:
```
cd cms
npm install
```

2. Start the development server:
```
npm run develop
```

This will start the Strapi admin panel at http://localhost:1337/admin

## Content Structure

### Collection Types
- **Blog Posts**: Articles and insights for the blog section
- **Services**: Marketing and media services offered
- **Client Projects**: Client work showcases
- **Client Documents**: Files and assets for the client portal

### Single Types
- **Homepage**: Main landing page content
- **About Page**: Company information and team details
- **Contact Information**: Contact details and form settings

## API Endpoints

All content is available via the Strapi REST API:
- Blog Posts: `/api/blog-posts`
- Services: `/api/services`
- Clients: `/api/clients`
- Client Documents: `/api/client-documents`
- Homepage: `/api/homepage`

## Administration

1. Create your admin user when first starting the application
2. Configure permissions for each content type in Settings > Roles
3. Set up webhooks to trigger builds when content changes
