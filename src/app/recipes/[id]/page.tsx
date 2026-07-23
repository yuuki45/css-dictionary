import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RecipeDetailClient } from './RecipeDetailClient';
import { recipes } from '@/data/recipes';
import { SITE_URL } from '@/utils/propertyMarkdown';

export async function generateStaticParams() {
  return recipes.map((recipe) => ({ id: recipe.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    return { title: 'レシピが見つかりません - CSS辞書' };
  }
  const title = `${recipe.title}のCSS実装【コピペ&編集して試せる】 | CSS辞書`;
  return {
    title,
    description: recipe.description,
    alternates: {
      canonical: `/recipes/${recipe.id}/`,
      types: {
        'text/markdown': `/recipes/${recipe.id}.md`,
      },
    },
    openGraph: {
      title,
      description: recipe.description,
      url: `${SITE_URL}/recipes/${recipe.id}/`,
    },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = recipes.find((r) => r.id === id);
  if (!recipe) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${recipe.title}のCSS実装`,
    description: recipe.description,
    inLanguage: 'ja',
    mainEntityOfPage: `${SITE_URL}/recipes/${recipe.id}/`,
    author: { '@type': 'Organization', name: 'CSS辞書', url: SITE_URL },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeDetailClient recipe={recipe} />
    </>
  );
}
