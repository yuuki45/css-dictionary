import { Metadata } from 'next';
import { ReverseClient } from './ReverseClient';

export const metadata: Metadata = {
  title: '逆引き検索 | CSS辞書',
  description: '「中央寄せしたい」「角丸にしたい」など、やりたいことから必要なCSSプロパティを逆引き検索。初心者にも分かりやすい目的別検索機能。',
  openGraph: {
    title: '逆引き検索 | CSS辞書',
    description: '「中央寄せしたい」「角丸にしたい」など、やりたいことから必要なCSSプロパティを逆引き検索。初心者にも分かりやすい目的別検索機能。',
    url: 'https://www.css-dictionary.com/reverse',
  },
  twitter: {
    card: 'summary_large_image',
    title: '逆引き検索 | CSS辞書',
    description: '「中央寄せしたい」「角丸にしたい」など、やりたいことから必要なCSSプロパティを逆引き検索。初心者にも分かりやすい目的別検索機能。',
  },
};

export default function ReversePage() {
  return <ReverseClient />;
}