import { Metadata } from 'next';
import { FindClient } from './FindClient';

export const metadata: Metadata = {
  title: 'さがす - 検索・カテゴリ・逆引き | CSS辞書',
  description:
    'CSSプロパティを検索、カテゴリから一覧、やりたいことから逆引き。CSS辞書の全127項目への入口です。',
  alternates: {
    canonical: '/find/',
  },
};

export default function FindPage() {
  return <FindClient />;
}
