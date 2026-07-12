import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AnimationDetailClient } from './AnimationDetailClient';
import { animations } from '@/data/animations';
import { SITE_URL } from '@/utils/propertyMarkdown';

export async function generateStaticParams() {
  return animations.map((animation) => ({ id: animation.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const animation = animations.find((a) => a.id === id);
  if (!animation) {
    return { title: 'アニメーションが見つかりません - CSS辞書' };
  }
  const title = `${animation.title}のCSSアニメーション実装【編集して試せる】 | CSS辞書`;
  return {
    title,
    description: animation.description,
    alternates: {
      canonical: `/animations/${animation.id}/`,
      types: {
        'text/markdown': `/animations/${animation.id}.md`,
      },
    },
    openGraph: {
      title,
      description: animation.description,
      url: `${SITE_URL}/animations/${animation.id}/`,
    },
  };
}

export default async function AnimationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const animation = animations.find((a) => a.id === id);
  if (!animation) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${animation.title}のCSSアニメーション実装`,
    description: animation.description,
    inLanguage: 'ja',
    mainEntityOfPage: `${SITE_URL}/animations/${animation.id}/`,
    author: { '@type': 'Organization', name: 'CSS辞書', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnimationDetailClient animation={animation} />
    </>
  );
}
