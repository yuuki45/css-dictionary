# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js version of the Japanese CSS Dictionary web application, migrated from React + Vite for improved SEO. It serves as a comprehensive learning tool for CSS properties with search, categorization, reverse lookup, and techniques sections.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Export static files
npm run export

# Install dependencies
npm install
```

## Architecture & Structure

### Next.js App Router Structure
- **Pages**: Uses App Router with file-based routing
- **Layout**: Root layout with comprehensive SEO meta tags and Google Analytics
- **Static Generation**: All CSS property pages are pre-generated at build time
- **Client Components**: Most interactive components use 'use client' directive

### Key Routes
- `/` - Home page with search and popular properties
- `/property/[id]` - Dynamic property detail pages (pre-generated)
- `/categories` - Category listing and detail pages
- `/reverse` - Reverse lookup functionality
- `/techniques` - CSS techniques collection
- `/favorites` - User favorites (client-side only)
- `/settings` - App settings

### SEO Improvements
- **Static Generation**: All property pages pre-generated for better SEO
- **Meta Tags**: Dynamic meta tags for each property page
- **Structured Data**: JSON-LD schema for WebApplication
- **Open Graph**: Full OG and Twitter Card support
- **Sitemap**: Static sitemap.xml and robots.txt included

### Data Structure
- **cssProperties.json**: Main data source with all CSS properties
- **techniques.ts**: Collection of modern CSS techniques
- **usecases.ts**: Reverse lookup data for "what CSS property achieves X" queries

### Custom Hooks (Client-side)
- **useAnalytics**: Google Analytics 4 integration
- **useFavorites**: LocalStorage-based favorites management
- **useRecentlyViewed**: Track recently viewed properties
- **useTheme**: Dark/light mode toggle
- **useLocalStorage**: Generic localStorage hook
- **useLazyLoading**: Performance optimization

### Build Configuration
- **Static Export**: Configured for static site generation
- **Image Optimization**: Disabled for static export
- **Error Handling**: TypeScript and ESLint errors ignored for build
- **PWA**: Removed in favor of better SEO

## Key Changes from Vite Version

### Routing Migration
- Converted from state-based routing to Next.js App Router
- Each tab now has its own route for better SEO
- Dynamic routes for property details

### SSG Implementation
- All property pages are statically generated
- generateStaticParams used for dynamic routes
- generateMetadata for dynamic meta tags

### Component Structure
- Most components unchanged, wrapped in client components
- PropertyDetail split into server and client components
- Navigation adapted for Next.js routing

## Development Notes

- **Working directory**: `/css-dictionary-next/`
- **No test framework**: No unit tests currently implemented
- **Static export**: Builds to static files for deployment
- **localStorage warnings**: Expected during SSG, works fine in browser
- **Japanese UI**: Primary language is Japanese
- **Google Analytics**: Integrated with tracking ID G-5JHPBNY2J3

## Deployment

The application is configured for static export and can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages. The build process generates all pages at build time for optimal SEO performance.