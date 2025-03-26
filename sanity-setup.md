
# Sanity Setup Instructions for GlowGrid Media

Follow these steps to set up Sanity for your project:

## 1. Create a Sanity Project (if not already done)

```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Create a new Sanity project
sanity init
```

During the initialization:
- Create a new project
- Give it a name (e.g., "GlowGrid Media")
- Use the default dataset configuration
- Choose a schema template (blog is a good starting point)

## 2. Set Environment Variables

Create a `.env` file in your project root with:

```
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

Replace `your-project-id` with your actual Sanity project ID.

## 3. Configure Sanity Studio

1. In your Sanity studio folder, update `sanity.config.ts` to include:

```ts
export default defineConfig({
  name: 'default',
  title: 'GlowGrid Media',
  projectId: 'your-project-id',
  dataset: 'production',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: '/studio',
})
```

2. Deploy Sanity Studio:

```bash
cd your-sanity-studio-folder
sanity deploy
```

When prompted, choose the hostname: `web.glowgridmedia.com`

## 4. CORS Configuration

In your Sanity management console (https://manage.sanity.io/):
1. Go to API settings
2. Add these CORS origins:
   - http://localhost:8080 (for development)
   - https://glowgridmedia.com (for production)
   - https://web.glowgridmedia.com (for Sanity Studio)

## 5. Content Schema

The schema has been set up for:
- Blog posts
- Services
- Industries
- Team members
- Client portal content

You can now add content through the Sanity Studio interface and it will automatically appear on your website.
