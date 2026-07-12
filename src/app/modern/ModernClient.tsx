'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Layout } from '@/components/Layout';
import { BaselineBadge } from '@/components/BaselineBadge';
import { cssProperties } from '@/data/properties';
import { CSSProperty } from '@/types/css';

// 年月 "2023-09" → "2023年9月"
function formatYearMonth(yearMonth?: string): string | null {
  if (!yearMonth) return null;
  const [year, month] = yearMonth.split('-');
  return `${year}年${Number(month)}月`;
}

// baselineLowDate降順（新しい順）。日付なしは末尾
function byNewest(a: CSSProperty, b: CSSProperty): number {
  return (b.browserSupport.baselineLowDate ?? '').localeCompare(
    a.browserSupport.baselineLowDate ?? ''
  );
}

function ModernPropertyCard({ property }: { property: CSSProperty }) {
  const since = formatYearMonth(property.browserSupport.baselineLowDate);
  return (
    <Link
      href={`/property/${property.id}/`}
      className="block bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4 hover:border-vermillion-400 dark:hover:border-gold-500 transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-mono font-semibold text-gray-900 dark:text-gray-100">
          {property.name}
        </span>
        <BaselineBadge baseline={property.browserSupport.baseline} size="sm" />
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
        {property.description}
      </p>
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>{since ? `${since}〜 全ブラウザ対応` : '一部ブラウザのみ対応'}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export function ModernClient() {
  // 2022年以降にBaseline到達 or まだ到達していない機能
  const newly = cssProperties
    .filter((p) => p.browserSupport.baseline === 'newly')
    .sort(byNewest);
  const limited = cssProperties.filter((p) => p.browserSupport.baseline === 'limited');
  const recentlyWidely = cssProperties
    .filter(
      (p) =>
        p.browserSupport.baseline === 'widely' &&
        (p.browserSupport.baselineLowDate ?? '') >= '2022-01'
    )
    .sort(byNewest);

  return (
    <Layout>
      <div className="py-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 text-blue-500" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              モダンCSS
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            あなたのAIはこのCSSを知らないかもしれない —
            2022年以降に使えるようになった新しいCSS機能の一覧です。
            AIアシスタントの学習データに含まれていないことが多いため、
            各ページの「AI用にコピー」でAIにコンテキストとして渡すのがおすすめです。
          </p>
        </div>

        <div className="space-y-10">
          {newly.length > 0 && (
            <section>
              <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                新しく利用可能になった機能
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                全主要ブラウザで使えるようになったばかりの機能（Baseline Newly）
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newly.map((property) => (
                  <ModernPropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          )}

          {limited.length > 0 && (
            <section>
              <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                対応が限定的な最先端機能
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                一部のブラウザでのみ使える機能。プログレッシブエンハンスメント前提で
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {limited.map((property) => (
                  <ModernPropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          )}

          {recentlyWidely.length > 0 && (
            <section>
              <h2 className="font-serif text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                定着した比較的新しい機能
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                2022年以降に全ブラウザ対応し、現在は安心して使える機能（Baseline Widely）
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentlyWidely.map((property) => (
                  <ModernPropertyCard key={property.id} property={property} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <div style={{ height: '64px' }} />
      <Navigation />
    </Layout>
  );
}
