
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || '';
export const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
export const apiVersion = '2023-05-03';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to true for better performance in production
});

// Set up image URL builder
const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);

// Helper function to check if Sanity is configured
export const isSanityConfigured = () => {
  return !!projectId && !!dataset;
};
