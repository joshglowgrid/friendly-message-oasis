
export const craftConfig = {
  // API endpoints
  apiEndpoint: import.meta.env.VITE_CRAFT_API_ENDPOINT || '/api',
  graphqlEndpoint: import.meta.env.VITE_CRAFT_GRAPHQL_ENDPOINT || '/api/graphql',
  
  // Content sections
  sections: {
    blog: 'blog',
    pages: 'pages',
    services: 'services',
  },
  
  // Category groups
  categoryGroups: {
    blogCategories: 'blogCategories',
    serviceCategories: 'serviceCategories',
  },
  
  // Settings for SEOMatic integration
  seomatic: {
    enabled: true,
    metaTitleSuffix: ' | GlowGrid Media',
    defaultDescription: 'Digital marketing studio crafting scalable brand ecosystems for healthcare, aesthetics, and wellness brands.',
    defaultImage: 'https://img.glowgridmedia.com/social-card.png',
  }
};
