
# Sanity Setup Instructions for GlowGrid Media

Follow these steps to connect your website to Sanity:

## 1. Connect to Existing Sanity Project

Ensure your environment variables are set up correctly in the `.env` file:

```
VITE_SANITY_PROJECT_ID=4gfcvz43
VITE_SANITY_DATASET=production
```

## 2. Configure CORS Settings for Production

In your Sanity management console (https://manage.sanity.io/):

1. Go to your project
2. Navigate to API settings
3. Add these CORS origins:
   - https://glowgridmedia.com (for production)
   - https://web.glowgridmedia.com (for Sanity Studio)
   - Make sure to check "Allow credentials" for both

## 3. Deploy Sanity Studio to web.glowgridmedia.com

1. In your Sanity studio folder, update `sanity.config.ts` to include:

```ts
export default defineConfig({
  name: 'default',
  title: 'GlowGrid Media',
  projectId: '4gfcvz43',
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

## 4. Content Schema

The following schemas have been configured:

- Blog posts (`post`)
- Services (`service`)
- Industries (`industry`)
- Team members (`team`)
- Client portal content (`portal`)

You can now add content through the Sanity Studio interface at `https://web.glowgridmedia.com/studio`, and it will automatically appear on your website.

## 5. Using Sanity Data in Components

Import the appropriate hooks to access Sanity data in your components:

```jsx
import { useBlogPosts, useBlogPost, useServices, useIndustries } from '@/hooks/useSanityData';

// In your component:
const { data: blogPosts, isLoading } = useBlogPosts();
```
