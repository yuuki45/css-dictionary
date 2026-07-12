'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Lightbulb } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Playground } from '@/components/Playground';
import { useAnalytics } from '@/hooks/useAnalytics';
import { AnimationExample } from '@/data/animations';
import { cssProperties } from '@/data/properties';

interface AnimationDetailClientProps {
  animation: AnimationExample;
}

export function AnimationDetailClient({ animation }: AnimationDetailClientProps) {
  const analytics = useAnalytics();

  const keyProperties = animation.keyProperties
    .map((id) => cssProperties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <Link
            href="/animations/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            アニメーション実装集に戻る
          </Link>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {animation.title}
              </h1>
              <span className="px-2 py-0.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-sm shrink-0">
                {animation.category}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {animation.description}
            </p>
          </div>

          {/* 編集可能プレイグラウンド */}
          <Playground
            initialHtml={animation.html}
            initialCss={animation.css}
            onCopy={(type) => analytics.trackCodeCopy(`animation-${animation.id}`, type)}
            onFirstEdit={() =>
              analytics.trackEvent('playground_edit', {
                technique_id: `animation-${animation.id}`,
                technique_title: animation.title,
              })
            }
          />

          {/* 仕組みの解説 */}
          <section className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="entry-marker" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                仕組みの解説
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {animation.explanation}
            </p>
          </section>

          {/* Tips */}
          {animation.tips && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    実装のポイント
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    {animation.tips}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 使用プロパティ */}
          {keyProperties.length > 0 && (
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  使っているプロパティ
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {keyProperties.map((property) => (
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
      </div>

      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </div>
  );
}
