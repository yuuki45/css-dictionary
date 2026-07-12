import React from 'react';
import type { CSSProperty } from '@/types/css';
import { getCategorySlug } from '@/utils/categorySlug';
import { SITE_URL } from '@/utils/propertyMarkdown';

interface PropertyStructuredDataProps {
  property: CSSProperty;
  title: string;
}

/**
 * プロパティページ用のJSON-LD（TechArticle + BreadcrumbList）。
 * Server Componentから<head>ではなくbody先頭に挿入してもGoogleは解釈する。
 */
export function PropertyStructuredData({ property, title }: PropertyStructuredDataProps) {
  const pageUrl = `${SITE_URL}/property/${property.id}/`;

  const techArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: property.description,
    inLanguage: 'ja',
    mainEntityOfPage: pageUrl,
    author: {
      '@type': 'Organization',
      name: 'CSS辞書',
      url: SITE_URL,
    },
    about: {
      '@type': 'DefinedTerm',
      name: property.name,
      description: property.description,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'CSSプロパティ',
        url: SITE_URL,
      },
    },
  };

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'ホーム',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: property.category,
        item: `${SITE_URL}/categories/${getCategorySlug(property.category)}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: property.name,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
