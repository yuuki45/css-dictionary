import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TechniqueDetailClient } from './TechniqueDetailClient';
import { techniques } from '@/data/techniques';

export async function generateStaticParams() {
  return techniques.map((technique) => ({
    id: technique.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const technique = techniques.find((t) => t.id === id);
  
  if (!technique) {
    return {
      title: 'テクニックが見つかりません - CSS辞書',
      description: '指定されたCSSテクニックが見つかりませんでした。',
    };
  }

  return {
    title: `${technique.title} | CSSテクニック - CSS辞書`,
    description: technique.description,
    openGraph: {
      title: `${technique.title} | CSSテクニック - CSS辞書`,
      description: technique.description,
      url: `https://www.css-dictionary.com/techniques/${technique.id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${technique.title} | CSSテクニック - CSS辞書`,
      description: technique.description,
    },
  };
}

export default async function TechniqueDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const technique = techniques.find((t) => t.id === id);
  
  if (!technique) {
    notFound();
  }

  return <TechniqueDetailClient technique={technique} />;
}