import { Metadata } from 'next';
import { TechniquesClient } from './TechniquesClient';

export const metadata: Metadata = {
  title: '最新CSSテクニック集 | CSS辞書',
  description: '実用的なCSSテクニックをコピペ可能なサンプルコード付きで紹介。レスポンシブデザイン、レイアウト、アニメーションなど現場で使えるテクニック満載。',
  openGraph: {
    title: '最新CSSテクニック集 | CSS辞書',
    description: '実用的なCSSテクニックをコピペ可能なサンプルコード付きで紹介。レスポンシブデザイン、レイアウト、アニメーションなど現場で使えるテクニック満載。',
    url: 'https://www.css-dictionary.com/techniques',
  },
  twitter: {
    card: 'summary_large_image',
    title: '最新CSSテクニック集 | CSS辞書',
    description: '実用的なCSSテクニックをコピペ可能なサンプルコード付きで紹介。レスポンシブデザイン、レイアウト、アニメーションなど現場で使えるテクニック満載。',
  },
};

export default function TechniquesPage() {
  return <TechniquesClient />;
}