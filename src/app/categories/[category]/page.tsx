import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CategoryDetailClient } from './CategoryDetailClient';
import cssPropertiesData from '@/data/cssProperties.json';
import { CSSProperty } from '@/types/css';
import { getUniqueCategories, filterByCategory } from '@/utils/search';
import { getCategorySlug, getCategoryFromSlug, getAllCategorySlugs } from '@/utils/categorySlug';

const properties: CSSProperty[] = cssPropertiesData;

export async function generateStaticParams() {
  const categories = getUniqueCategories(properties);
  return categories.map((category) => ({
    category: getCategorySlug(category),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const categoryName = getCategoryFromSlug(category);
  const categories = getUniqueCategories(properties);
  
  if (!categories.includes(categoryName)) {
    return {
      title: 'カテゴリが見つかりません - CSS辞書',
      description: '指定されたカテゴリが見つかりませんでした。',
    };
  }

  const categoryProperties = filterByCategory(properties, categoryName);
  const propertyCount = categoryProperties.length;

  return {
    title: `${categoryName} - CSSプロパティ (${propertyCount}件) | CSS辞書`,
    description: `${categoryName}カテゴリのCSSプロパティ一覧。${propertyCount}個のプロパティを掲載。効率的にCSSを学習できます。`,
    openGraph: {
      title: `${categoryName} - CSSプロパティ | CSS辞書`,
      description: `${categoryName}カテゴリのCSSプロパティ一覧。${propertyCount}個のプロパティを掲載。`,
      url: `https://www.css-dictionary.com/categories/${category}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryName} - CSSプロパティ | CSS辞書`,
      description: `${categoryName}カテゴリのCSSプロパティ一覧。${propertyCount}個のプロパティを掲載。`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const categoryName = getCategoryFromSlug(category);
  const categories = getUniqueCategories(properties);
  
  if (!categories.includes(categoryName)) {
    notFound();
  }

  const categoryProperties = filterByCategory(properties, categoryName);

  return <CategoryDetailClient category={categoryName} properties={categoryProperties} />;
}