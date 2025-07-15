import { Metadata } from 'next';
import { CategoriesClient } from './CategoriesClient';

export const metadata: Metadata = {
  title: 'カテゴリ別プロパティ一覧 | CSS辞書',
  description: 'CSSプロパティをカテゴリ別に整理。レイアウト、テキスト、背景、アニメーションなど目的別にプロパティを効率的に検索できます。',
  openGraph: {
    title: 'カテゴリ別プロパティ一覧 | CSS辞書',
    description: 'CSSプロパティをカテゴリ別に整理。レイアウト、テキスト、背景、アニメーションなど目的別にプロパティを効率的に検索できます。',
    url: 'https://www.css-dictionary.com/categories',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'カテゴリ別プロパティ一覧 | CSS辞書',
    description: 'CSSプロパティをカテゴリ別に整理。レイアウト、テキスト、背景、アニメーションなど目的別にプロパティを効率的に検索できます。',
  },
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}