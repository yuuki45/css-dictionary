'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Lightbulb, Sparkles } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Playground } from '@/components/Playground';
import { BaselineBadge } from '@/components/BaselineBadge';
import { RecipeCopyForAIButton } from '@/components/RecipeCopyForAIButton';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Recipe } from '@/data/recipes';
import { cssProperties } from '@/data/properties';
import { aggregateBaseline } from '@/utils/baselineAggregate';

interface RecipeDetailClientProps {
  recipe: Recipe;
}

export function RecipeDetailClient({ recipe }: RecipeDetailClientProps) {
  const analytics = useAnalytics();

  const keyProperties = recipe.keyProperties
    .map((id) => cssProperties.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // keyPropertiesのうち最も低いBaselineステータスを代表値として表示（プロパティ単位の近似）
  const baseline = aggregateBaseline(recipe.keyProperties);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <Link
            href="/recipes/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            UIレシピ集に戻る
          </Link>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {recipe.title}
              </h1>
              <span className="px-2 py-0.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-sm shrink-0">
                {recipe.category}
              </span>
              {baseline && <BaselineBadge baseline={baseline} size="sm" />}
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
              {recipe.description}
            </p>
            <RecipeCopyForAIButton recipe={recipe} />
          </div>

          {/* 編集可能プレイグラウンド */}
          <Playground
            initialHtml={recipe.html}
            initialCss={recipe.css}
            initialJs={recipe.js}
            onCopy={(type) => analytics.trackCodeCopy(`recipe-${recipe.id}`, type)}
            onFirstEdit={() =>
              analytics.trackEvent('playground_edit', {
                technique_id: `recipe-${recipe.id}`,
                technique_title: recipe.title,
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
              {recipe.explanation}
            </p>
          </section>

          {/* Tips */}
          {recipe.tips && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    実装のポイント
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    {recipe.tips}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* AIに依頼するときの文例 */}
          <section className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2.5 mb-4">
              <Sparkles className="w-5 h-5 text-vermillion-500 dark:text-gold-400" />
              <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100">
                AIに依頼するときの文例
              </h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-vermillion-400 dark:border-gold-500 pl-4">
              {recipe.aiPrompt}
            </p>
          </section>

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
