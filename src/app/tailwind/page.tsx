import { Metadata } from 'next';
import { TailwindClient } from './TailwindClient';
import { tailwindMap } from '@/data/tailwindMap';

const count = Object.keys(tailwindMap).length;

export const metadata: Metadata = {
  title: `CSS⇄Tailwind対応表【${count}項目・v4基準】 | CSS辞書`,
  description:
    'CSSプロパティとTailwind CSSのユーティリティクラスの対応を引ける一覧表。hover:やmotion-reduce:などのバリアント対応も収録。各クラスから辞書のプロパティ解説にリンクし、AIに貼り付けられるMarkdownコピーにも対応しています。',
  alternates: {
    canonical: '/tailwind/',
    types: {
      'text/markdown': '/tailwind.md',
    },
  },
  openGraph: {
    title: `CSS⇄Tailwind対応表【${count}項目】`,
    description:
      'CSSプロパティとTailwindユーティリティ・バリアントの対応表。辞書のプロパティ解説と連動。',
    url: 'https://www.css-dictionary.com/tailwind/',
  },
};

export default function TailwindPage() {
  return <TailwindClient />;
}
