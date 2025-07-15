import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PropertyDetailClient } from './PropertyDetailClient';
import cssPropertiesData from '@/data/cssProperties.json';
import { CSSProperty } from '@/types/css';

const properties: CSSProperty[] = cssPropertiesData;

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    return {
      title: 'プロパティが見つかりません - CSS辞書',
      description: '指定されたCSSプロパティが見つかりませんでした。',
    };
  }

  return {
    title: `${property.name} - ${property.description} | CSS辞書`,
    description: `CSS ${property.name}プロパティの使い方。${property.description}。実用的なサンプルコードと詳細解説付き。`,
    openGraph: {
      title: `${property.name} - CSS辞書`,
      description: `CSS ${property.name}プロパティの使い方。${property.description}。`,
      url: `https://www.css-dictionary.com/property/${property.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.name} - CSS辞書`,
      description: `CSS ${property.name}プロパティの使い方。${property.description}。`,
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  
  if (!property) {
    notFound();
  }

  return <PropertyDetailClient property={property} />;
}