import { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { comparisons } from '@/data/comparisons';

export const metadata: Metadata = {
  title: '比較でわかるCSS - 「違い」がひと目でわかる比較記事 | CSS辞書',
  description:
    'word-breakとoverflow-wrap、FlexboxとGrid、@mediaと@containerなど、混同しやすいCSSの「違い」を比較表と使い分けの指針で解説します。',
  alternates: {
    canonical: '/compare/',
  },
};

export default function ComparePage() {
  return (
    <Layout>
      <div className="py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-6 h-6 text-vermillion-500 dark:text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              比較でわかるCSS
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            似ていて混同しやすいCSSの「違い」を、比較表と使い分けの指針で整理しました。
            AIに実装を頼む前の判断材料としても使えます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.id}
              href={`/compare/${comparison.id}/`}
              className="group block bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-5 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
            >
              <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                {comparison.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {comparison.tldr}
              </p>
              <div className="flex items-center justify-end text-vermillion-600 dark:text-gold-400">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
