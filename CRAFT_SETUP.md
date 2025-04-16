
# Craft CMS Setup Guide for GlowGrid Media

This document provides instructions for setting up Craft CMS with Vite + React integration for the GlowGrid Media website.

## Prerequisites

- PHP 8.0 or higher
- Composer
- MySQL 5.7.8+ or PostgreSQL 9.5+
- Node.js 14+ and npm/yarn

## Installation Steps

### 1. Install Craft CMS

```bash
composer create-project craftcms/craft craft-backend
cd craft-backend
./craft setup
```

### 2. Install Required Plugins

```bash
composer require nystudio107/craft-seomatic
composer require nystudio107/craft-vite
composer require craftcms/ckeditor
composer require craftcms/feed-me
```

### 3. Configure SEOMatic Plugin

- Go to Settings > SEOMatic
- Set up the global SEO settings
- Configure the SEO template paths
- Enable social media settings and preview cards

### 4. Set Up Content Structure

#### Create Sections

1. **Blog Section**
   - Section Type: Channel
   - Enable Multi-Site: Yes (if using multiple languages)
   - URL Format: `blog/{slug}`
   - Template: `blog/_entry`

2. **Pages Section**
   - Section Type: Structure
   - Enable Multi-Site: Yes
   - URL Format: `{slug}`
   - Template: `pages/_entry`

3. **Services Section**
   - Section Type: Structure
   - Enable Multi-Site: Yes
   - URL Format: `services/{slug}`
   - Template: `services/_entry`

#### Create Field Groups and Fields

1. **Blog Fields**
   - Excerpt (Plain Text)
   - Content (CKEditor)
   - Featured Image (Assets)
   - Author (Entries relation)
   - Category (Categories relation)
   - Tags (Tags field)
   - Read Time (Plain Text)
   - Featured (Lightswitch)

2. **SEO Fields (handled by SEOMatic)**

3. **Author Fields**
   - Full Name (Plain Text)
   - Biography (Plain Text)
   - Author Image (Assets)
   - Role (Plain Text)
   - Hidden (Lightswitch) - to hide author on frontend

### 5. Configure GraphQL API

1. Go to Settings > GraphQL
2. Create a new schema for "Frontend API"
3. Set up appropriate scope permissions
4. Generate a token for API access

### 6. Configure Craft-Vite Integration

1. Configure the vite config in the Craft CMS settings
2. Set up the build process to output to the correct Craft directory

### 7. Create Templates for GraphQL Endpoints

Create templates that output JSON for React components to consume:

```twig
{% header "Content-Type: application/json" %}
{% set entries = craft.entries.section('blog').all() %}
{{ entries|json_encode|raw }}
```

## Frontend Integration

1. Set up environment variables for API endpoints
2. Use the craftAdapter utility to fetch and transform data
3. Use the BlogListAdapter to display content from Craft CMS

## SEO Implementation

1. For each page component, import and use SEO metadata from Craft
2. Use structured data for blog posts and services
3. Implement og:image and twitter:card for social sharing

## Multi-language Support

1. Configure supported languages in Craft CMS
2. Set up frontend routes to handle language prefixes
3. Add language switcher component

## Deployment Considerations

1. Configure production environment variables
2. Set up cache busting for static assets
3. Configure CDN if needed
4. Set up proper redirects in the server config
