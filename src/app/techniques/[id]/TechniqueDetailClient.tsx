'use client';

import { Navigation } from '@/components/Navigation';
import { Playground } from '@/components/Playground';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Technique } from '@/data/techniques';
import { ArrowLeft, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TechniqueDetailClientProps {
  technique: Technique;
}

export function TechniqueDetailClient({ technique }: TechniqueDetailClientProps) {
  const analytics = useAnalytics();
  const router = useRouter();

  const handleBack = () => {
    router.push('/techniques');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-vermillion-600 dark:hover:text-gold-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            テクニック一覧に戻る
          </button>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-md p-6 border border-gray-200 dark:border-gray-700">
            <h1 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {technique.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {technique.description}
            </p>
          </div>

          {/* 編集可能プレイグラウンド */}
          <Playground
            initialHtml={technique.html}
            initialCss={technique.css}
            onCopy={(type) => analytics.trackCodeCopy(technique.id, type)}
            onFirstEdit={() =>
              analytics.trackEvent('playground_edit', {
                technique_id: technique.id,
                technique_title: technique.title,
              })
            }
          />

          {/* Tips */}
          {technique.tips && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-serif font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    実装のポイント
                  </h3>
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    {technique.tips}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ height: '64px' }} aria-hidden="true" />
      <Navigation activeTab="techniques" onTabChange={() => {}} />
    </div>
  );
}
