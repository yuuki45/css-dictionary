import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { cssProperties } from '@/data/properties';
import { animations } from '@/data/animations';
import { recipes } from '@/data/recipes';
import { comparisons } from '@/data/comparisons';
import { techniques } from '@/data/techniques';

export const metadata: Metadata = {
  title: 'よみもの - 特集コンテンツ一覧 | CSS辞書',
  description:
    'モダンCSS・アニメーション実装集・比較記事・AIレビューチェックリスト・テクニック集。CSS辞書の特集コンテンツの目次です。',
  alternates: {
    canonical: '/read/',
  },
};

const kanjiNumbers = ['一', '二', '三', '四', '五', '六'];

export default function ReadPage() {
  const modernCount = cssProperties.filter(
    (p) => p.browserSupport.baseline !== 'widely' || (p.browserSupport.baselineLowDate ?? '') >= '2022-01'
  ).length;
  const aiCount = cssProperties.filter((p) => p.aiNotes).length;

  const features = [
    {
      href: '/modern/',
      title: 'モダンCSS',
      description: 'あなたのAIが知らないかもしれない、2022年以降の新しいCSS機能',
      count: `${modernCount}項目`,
    },
    {
      href: '/animations/',
      title: 'アニメーション実装集',
      description: '動くプレビュー付き・その場で編集できる実装例',
      count: `${animations.length}例`,
    },
    {
      href: '/recipes/',
      title: 'UIレシピ集',
      description: 'ボタン・カード・フォームなど完成UI部品のレシピ。辞書リンク・Baseline対応状況付き',
      count: `${recipes.length}例`,
    },
    {
      href: '/compare/',
      title: '比較でわかるCSS',
      description: 'FlexとGridの違いなど、混同しがちな「違い」を比較表で整理',
      count: `${comparisons.length}記事`,
    },
    {
      href: '/ai-review/',
      title: 'AI生成CSSレビューチェックリスト',
      description: 'AIがよく間違えるポイントを全プロパティ分集約した観点集',
      count: `${aiCount}観点`,
    },
    {
      href: '/techniques/',
      title: 'CSSテクニック集',
      description: 'ボタンデザインや料金テーブルなど、コピペで使える定番実装',
      count: `${techniques.length}本`,
    },
  ];

  return (
    <Layout>
      <div className="py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            よみもの
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            辞書を「引く」だけでなく「読む」ための特集コンテンツです。
          </p>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700 border-y border-gray-200 dark:border-gray-700">
          {features.map((feature, index) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group flex items-center gap-4 py-5 px-2 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              <span className="font-serif text-lg text-vermillion-600 dark:text-gold-400 shrink-0 w-10 text-center">
                【{kanjiNumbers[index]}】
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                    {feature.title}
                  </h2>
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                    {feature.count}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {feature.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-vermillion-500 dark:group-hover:text-gold-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
