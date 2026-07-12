import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { comparisons } from '@/data/comparisons';
import { cssProperties } from '@/data/properties';
import { SITE_URL } from '@/utils/propertyMarkdown';

export async function generateStaticParams() {
  return comparisons.map((comparison) => ({ id: comparison.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const comparison = comparisons.find((c) => c.id === id);
  if (!comparison) {
    return { title: '比較記事が見つかりません - CSS辞書' };
  }
  const title = `${comparison.title}【比較表で解説】 | CSS辞書`;
  return {
    title,
    description: comparison.description,
    alternates: {
      canonical: `/compare/${comparison.id}/`,
      types: {
        'text/markdown': `/compare/${comparison.id}.md`,
      },
    },
    openGraph: {
      title,
      description: comparison.description,
      url: `${SITE_URL}/compare/${comparison.id}/`,
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const comparison = comparisons.find((c) => c.id === id);
  if (!comparison) {
    notFound();
  }

  const relatedProperties = comparison.propertyIds
    .map((propertyId) => cssProperties.find((p) => p.id === propertyId))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: comparison.title,
    description: comparison.description,
    inLanguage: 'ja',
    mainEntityOfPage: `${SITE_URL}/compare/${comparison.id}/`,
    author: { '@type': 'Organization', name: 'CSS辞書', url: SITE_URL },
  };

  return (
    <Layout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="py-8 max-w-4xl">
        <Link
          href="/compare/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          比較記事一覧に戻る
        </Link>

        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-snug">
          {comparison.title}
        </h1>

        {/* 結論ファースト */}
        <div className="bg-white dark:bg-gray-800 border-l-4 border-vermillion-500 dark:border-gold-400 border border-gray-200 dark:border-gray-700 rounded-md p-5 mb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-vermillion-600 dark:text-gold-400 mb-2">
            TL;DR — ひとことで言うと
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
            {comparison.tldr}
          </p>
        </div>

        {/* 比較表 */}
        <section className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="entry-marker" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
              比較表
            </h2>
          </div>
          <div className="overflow-x-auto rounded-md border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm bg-white dark:bg-gray-800">
              <thead>
                <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                  <th className="text-left p-3 font-serif text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">
                    観点
                  </th>
                  {comparison.labels.map((label) => (
                    <th
                      key={label}
                      className="text-left p-3 font-mono font-semibold text-gray-900 dark:text-gray-100 whitespace-nowrap"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr
                    key={row.aspect}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <th className="text-left p-3 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap align-top bg-gray-100/60 dark:bg-gray-900/40">
                      {row.aspect}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className="p-3 text-gray-600 dark:text-gray-300 align-top leading-relaxed min-w-[180px]"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 使い分けの指針 */}
        <section className="mb-8">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="entry-marker" aria-hidden="true" />
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
              使い分けの指針
            </h2>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
            <p className="text-green-800 dark:text-green-300 leading-relaxed">
              {comparison.guideline}
            </p>
          </div>
        </section>

        {/* AIの取り違え */}
        {comparison.aiNote && (
          <section className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="entry-marker" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                🤖 AIがよくやる取り違え
              </h2>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-md p-4">
              <p className="text-purple-800 dark:text-purple-300 leading-relaxed">
                {comparison.aiNote}
              </p>
            </div>
          </section>
        )}

        {/* 関連プロパティ */}
        {relatedProperties.length > 0 && (
          <section className="mb-8">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="entry-marker" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                それぞれの詳しい解説
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/property/${property.id}/`}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-sm font-mono font-medium text-gray-700 dark:text-gray-300 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
                >
                  {property.name}
                  <ExternalLink className="w-3 h-3" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
