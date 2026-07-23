'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wind, Bot, Check, Search } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { Navigation } from '@/components/Navigation';
import { cssProperties } from '@/data/properties';
import { tailwindMap } from '@/data/tailwindMap';
import { tailwindMapToMarkdown } from '@/utils/propertyMarkdown';
import { useAnalytics } from '@/hooks/useAnalytics';
import type { CSSProperty, TailwindMapping } from '@/types/css';

interface Row {
  property: CSSProperty;
  tw: TailwindMapping;
}

function matchesQuery(row: Row, lowerQuery: string): boolean {
  const { property, tw } = row;
  return (
    property.name.toLowerCase().includes(lowerQuery) ||
    property.description.toLowerCase().includes(lowerQuery) ||
    (tw.variant ?? '').toLowerCase().includes(lowerQuery) ||
    (tw.pattern ?? '').toLowerCase().includes(lowerQuery) ||
    (tw.classes ?? []).some((entry) =>
      entry.className.toLowerCase().includes(lowerQuery)
    )
  );
}

function CopyForAITailwindButton() {
  const [copied, setCopied] = useState(false);
  const analytics = useAnalytics();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tailwindMapToMarkdown(cssProperties));
      setCopied(true);
      analytics.trackCopyForAI('tailwind-cheatsheet', 'CSS⇄Tailwind対応表');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードが使えない環境では何もしない
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        copied
          ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-700'
          : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
      }`}
      title="対応表全体をMarkdownでコピーして、AIチャットに貼り付けられます"
    >
      {copied ? <Check className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      {copied ? 'コピーしました' : 'AI用にコピー'}
    </button>
  );
}

export function TailwindClient() {
  const [query, setQuery] = useState('');
  const lowerQuery = query.trim().toLowerCase();

  const rows: Row[] = cssProperties
    .filter((p) => tailwindMap[p.id])
    .map((p) => ({ property: p, tw: tailwindMap[p.id] }));

  const filtered = lowerQuery
    ? rows.filter((row) => matchesQuery(row, lowerQuery))
    : rows;

  // ユーティリティ対応とバリアント対応（hover:等）に分ける。バリアント項目は末尾セクションのみに出す
  const utilities = filtered.filter(
    (row) =>
      !row.tw.variant &&
      ((row.tw.classes?.length ?? 0) > 0 || row.tw.pattern || row.tw.arbitrary)
  );
  const variants = filtered.filter((row) => row.tw.variant);

  const categories = [...new Set(utilities.map((row) => row.property.category))];

  return (
    <Layout>
      <div className="py-10">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="w-6 h-6 text-vermillion-500 dark:text-gold-400" />
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100">
              CSS⇄Tailwind対応表
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            CSSプロパティとTailwindユーティリティクラスの対応を引ける一覧です（Tailwind
            v4基準・全{rows.length}項目）。プロパティ名から辞書の解説ページに飛べます。
            hover:などのバリアント対応は末尾にまとめています。
          </p>
          <CopyForAITailwindButton />
        </div>

        {/* 絞り込み */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="クラス名・プロパティ名で絞り込み（例: rounded）"
            aria-label="対応表の絞り込み"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:border-vermillion-500 dark:focus:border-gold-400 transition-colors"
          />
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            「{query}」に一致する対応が見つかりませんでした。
          </p>
        )}

        {/* カテゴリ別ユーティリティ対応 */}
        <div className="space-y-10">
          {categories.map((category) => (
            <section key={category}>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {category}
                </h2>
              </div>
              <div className="space-y-3">
                {utilities
                  .filter((row) => row.property.category === category)
                  .map(({ property, tw }) => (
                    <div
                      key={property.id}
                      className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                        <Link
                          href={`/property/${property.id}/`}
                          className="font-mono font-semibold text-gray-900 dark:text-gray-100 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
                        >
                          {property.name}
                        </Link>
                        {tw.pattern && (
                          <span className="font-mono text-xs text-gray-500 dark:text-gray-400">
                            {tw.pattern}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {(tw.classes ?? []).map((entry) => (
                          <code
                            key={entry.className}
                            title={entry.css}
                            className="px-2 py-0.5 font-mono text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-sm text-gray-700 dark:text-gray-300"
                          >
                            {entry.className}
                          </code>
                        ))}
                        {tw.arbitrary && (
                          <code className="px-2 py-0.5 font-mono text-xs border border-dashed border-gray-300 dark:border-gray-600 rounded-sm text-gray-500 dark:text-gray-400">
                            {tw.arbitrary}
                          </code>
                        )}
                      </div>
                      {tw.note && (
                        <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                          {tw.note}
                        </p>
                      )}
                    </div>
                  ))}
              </div>
            </section>
          ))}

          {/* バリアント対応 */}
          {variants.length > 0 && (
            <section>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="entry-marker" aria-hidden="true" />
                <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                  バリアント対応（疑似クラス・メディア特性）
                </h2>
              </div>
              <div className="space-y-3">
                {variants.map(({ property, tw }) => (
                  <div
                    key={property.id}
                    className="bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700 p-4"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <Link
                        href={`/property/${property.id}/`}
                        className="font-mono font-semibold text-gray-900 dark:text-gray-100 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
                      >
                        {property.name}
                      </Link>
                      <code className="px-2 py-0.5 font-mono text-xs bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-sm text-vermillion-600 dark:text-gold-300 font-semibold">
                        {tw.variant}
                      </code>
                    </div>
                    {(tw.classes ?? []).map((entry) => (
                      <p
                        key={entry.className}
                        className="font-mono text-xs text-gray-500 dark:text-gray-400"
                      >
                        {entry.className}{' '}
                        <span className="text-gray-400 dark:text-gray-500">→ {entry.css}</span>
                      </p>
                    ))}
                    {tw.note && (
                      <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                        {tw.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation />
    </Layout>
  );
}
