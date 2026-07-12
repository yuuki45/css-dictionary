import { Metadata } from 'next';
import Link from 'next/link';
import { Bot, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { cssProperties } from '@/data/properties';
import { getUniqueCategories } from '@/utils/search';
import { getCategoryAccent } from '@/utils/categoryColors';
import { SITE_URL } from '@/utils/propertyMarkdown';

const itemCount = cssProperties.filter((p) => p.aiNotes).length;

export const metadata: Metadata = {
  title: `AI生成CSSレビューチェックリスト【全${itemCount}項目】 | CSS辞書`,
  description:
    'ChatGPTやClaudeが生成したCSSをレビューするための観点集。min-widthのはみ出し、sticky hover、outline:noneの禁じ手など、AIがよく間違えるポイントをプロパティ別に全網羅しました。',
  alternates: {
    canonical: '/ai-review/',
    types: {
      'text/markdown': '/ai-review.md',
    },
  },
  openGraph: {
    title: `AI生成CSSレビューチェックリスト【全${itemCount}項目】`,
    description:
      'AIが生成したCSSをレビューするための観点集。AIがよく間違えるポイントをプロパティ別に全網羅。',
    url: `${SITE_URL}/ai-review/`,
  },
};

export default function AiReviewPage() {
  const categories = getUniqueCategories(cssProperties);
  const grouped = categories
    .map((category) => ({
      category,
      items: cssProperties.filter((p) => p.category === category && p.aiNotes),
    }))
    .filter((group) => group.items.length > 0);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'AI生成CSSレビューチェックリスト',
    description: metadata.description,
    inLanguage: 'ja',
    mainEntityOfPage: `${SITE_URL}/ai-review/`,
    author: { '@type': 'Organization', name: 'CSS辞書', url: SITE_URL },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-10 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="w-6 h-6 text-purple-500 dark:text-purple-300" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              AI生成CSSレビューチェックリスト
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            ChatGPTやClaudeが書いたCSSは一見それらしくても、定番の落とし穴を踏んでいることがあります。
            このページは全{itemCount}
            項目の「AIがよく間違えるポイント」をプロパティ別に集約したレビュー観点集です。
            AI生成コードに登場するプロパティをこのリストと突き合わせてください。
          </p>
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4 text-sm text-purple-800 dark:text-purple-300">
            💡 このページ自体をAIに渡すこともできます:{' '}
            <a
              href="/ai-review.md"
              className="underline hover:text-purple-600 dark:hover:text-purple-200"
            >
              Markdown版（/ai-review.md）
            </a>
            をレビュー用のシステムプロンプトやコンテキストとして貼り付けると、AI自身にセルフチェックさせられます。
          </div>
        </div>

        {/* 目次 */}
        <nav className="mb-10 flex flex-wrap gap-2" aria-label="カテゴリ目次">
          {grouped.map(({ category, items }) => (
            <a
              key={category}
              href={`#${encodeURIComponent(category)}`}
              className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-sm text-gray-600 dark:text-gray-300 hover:border-vermillion-400 hover:text-vermillion-600 dark:hover:border-gold-500 dark:hover:text-gold-300 transition-colors"
            >
              {category}（{items.length}）
            </a>
          ))}
        </nav>

        <div className="space-y-12">
          {grouped.map(({ category, items }) => (
            <section key={category} id={encodeURIComponent(category)}>
              <div className="flex items-center gap-2.5 mb-5 rule-double pb-2">
                <span
                  className={`inline-block w-1 h-5 rounded-r ${getCategoryAccent(category)}`}
                  aria-hidden="true"
                />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
                <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
                  {items.length}項目
                </span>
              </div>
              <dl className="space-y-5">
                {items.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <dt className="mb-2">
                      <Link
                        href={`/property/${property.id}/`}
                        className="inline-flex items-center gap-1.5 font-mono font-semibold text-gray-900 dark:text-gray-100 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
                      >
                        {property.name}
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                      </Link>
                    </dt>
                    <dd className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {property.aiNotes}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
