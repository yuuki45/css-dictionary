import { MetadataRoute } from 'next';
import cssPropertiesData from '@/data/cssProperties.json';
import { CSSProperty } from '@/types/css';

const properties: CSSProperty[] = cssPropertiesData;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.css-dictionary.com';
  const currentDate = new Date();

  // 静的ページ
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/categories/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/reverse/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/techniques/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/favorites/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/settings/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // カテゴリページ
  const categories = Array.from(new Set(properties.map(p => p.category)));
  const categoryPages: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/categories/${encodeURIComponent(category)}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // プロパティページ
  const propertyPages: MetadataRoute.Sitemap = properties.map(property => ({
    url: `${baseUrl}/property/${property.id}/`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // テクニック記事（IDを手動で列挙）
  const techniqueIds = [
    'full-bleed-side',
    'equal-height-center',
    'text-hover-underline',
    'gradient-text',
    'glassmorphism',
    'smooth-scroll',
    'sticky-header',
    'scroll-snap',
    'aspect-ratio-box',
    'truncate-text',
  ];
  const techniquePages: MetadataRoute.Sitemap = techniqueIds.map(id => ({
    url: `${baseUrl}/techniques/${id}/`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...propertyPages, ...techniquePages];
}
