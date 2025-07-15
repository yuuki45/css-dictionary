import { Metadata } from 'next';
import { FavoritesClient } from './FavoritesClient';

export const metadata: Metadata = {
  title: 'お気に入りプロパティ | CSS辞書',
  description: 'よく使うCSSプロパティをお気に入りに登録して素早くアクセス。個人の学習進度に合わせてカスタマイズできます。',
  openGraph: {
    title: 'お気に入りプロパティ | CSS辞書',
    description: 'よく使うCSSプロパティをお気に入りに登録して素早くアクセス。個人の学習進度に合わせてカスタマイズできます。',
    url: 'https://www.css-dictionary.com/favorites',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'お気に入りプロパティ | CSS辞書',
    description: 'よく使うCSSプロパティをお気に入りに登録して素早くアクセス。個人の学習進度に合わせてカスタマイズできます。',
  },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}