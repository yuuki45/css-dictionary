import { Metadata } from 'next';
import { ModernClient } from './ModernClient';

export const metadata: Metadata = {
  title: 'モダンCSS一覧 - AIが知らない新しいCSS機能 | CSS辞書',
  description:
    '2022年以降に使えるようになった新しいCSS機能の一覧。:has()、CSSネスティング、View Transitions、アンカーポジショニングなど、AIアシスタントの学習データにない可能性が高い機能をBaseline対応状況とともに解説します。',
  alternates: {
    canonical: '/modern/',
  },
  openGraph: {
    title: 'モダンCSS一覧 - AIが知らない新しいCSS機能',
    description:
      '2022年以降の新しいCSS機能をBaseline対応状況とともに一覧。AIと協働する開発者のためのリファレンス。',
    url: 'https://www.css-dictionary.com/modern/',
  },
};

export default function ModernPage() {
  return <ModernClient />;
}
