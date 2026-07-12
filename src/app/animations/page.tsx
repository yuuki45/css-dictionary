import { Metadata } from 'next';
import Link from 'next/link';
import { Clapperboard, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { animations, animationCategories } from '@/data/animations';
import { buildSrcDoc } from '@/utils/sandboxDoc';

export const metadata: Metadata = {
  title: `CSSアニメーション実装集【全${animations.length}例・コピペ&編集OK】 | CSS辞書`,
  description:
    'スピナー・スケルトン・ホバーエフェクト・スクロール連動など、実務で使うCSSアニメーションの実装例集。すべてライブプレビュー付きで、その場で編集して試せます。prefers-reduced-motion対応の書き方も収録。',
  alternates: {
    canonical: '/animations/',
  },
  openGraph: {
    title: `CSSアニメーション実装集【全${animations.length}例】`,
    description:
      '実務で使うCSSアニメーションの実装例集。ライブプレビュー付き・その場で編集可能。',
    url: 'https://www.css-dictionary.com/animations/',
  },
};

export default function AnimationsPage() {
  const grouped = animationCategories
    .map((category) => ({
      category,
      items: animations.filter((a) => a.category === category),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <Layout>
      <div className="py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Clapperboard className="w-6 h-6 text-vermillion-500 dark:text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              アニメーション実装集
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            実務でよく使うCSSアニメーション{animations.length}例。すべて動くプレビュー付きで、
            各ページではコードをその場で書き換えて試せます。ループや大きな動きには
            prefers-reduced-motion（動きを減らす設定）への配慮を含めています。
          </p>
        </div>

        {/* 基礎はこちら */}
        <div className="mb-10 flex flex-wrap gap-2 text-sm">
          <span className="text-gray-500 dark:text-gray-400 py-1.5">基礎から知りたい:</span>
          {[
            { href: '/compare/transition-vs-animation/', label: 'transitionとanimationの違い' },
            { href: '/property/keyframes/', label: '@keyframes' },
            { href: '/property/animation-timeline/', label: 'スクロール駆動' },
            { href: '/property/prefers-reduced-motion/', label: 'prefers-reduced-motion' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-sm text-gray-600 dark:text-gray-300 hover:border-vermillion-400 hover:text-vermillion-600 dark:hover:border-gold-500 dark:hover:text-gold-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="space-y-12">
          {grouped.map(({ category, items }) => (
            <section key={category}>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {items.length}例
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((animation) => (
                  <Link
                    key={animation.id}
                    href={`/animations/${animation.id}/`}
                    className="group block bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                  >
                    {/* ライブプレビュー（サンドボックス・遅延読込） */}
                    <div className="h-40 border-b border-gray-200 dark:border-gray-700 bg-[#fdfaf3]">
                      <iframe
                        srcDoc={buildSrcDoc(animation.html, animation.css)}
                        sandbox=""
                        loading="lazy"
                        title={`${animation.title}のプレビュー`}
                        className="w-full h-full pointer-events-none"
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
                        {animation.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                        {animation.description}
                      </p>
                      <div className="flex items-center justify-end text-vermillion-600 dark:text-gold-400 text-xs">
                        編集して試す
                        <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
