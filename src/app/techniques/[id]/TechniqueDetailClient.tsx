'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { useAnalytics } from '@/hooks/useAnalytics';
import { Technique } from '@/data/techniques';
import { ArrowLeft, Copy, CheckCircle, Eye, Code, Lightbulb } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TechniqueDetailClientProps {
  technique: Technique;
}

export function TechniqueDetailClient({ technique }: TechniqueDetailClientProps) {
  const [copiedType, setCopiedType] = useState<'html' | 'css' | null>(null);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const analytics = useAnalytics();
  const router = useRouter();

  const handleCopy = async (content: string, type: 'html' | 'css') => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedType(type);
      analytics.trackCodeCopy(technique.id, type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

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
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            テクニック一覧に戻る
          </button>

          {/* Header */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {technique.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              {technique.description}
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm">
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'preview'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              プレビュー
            </button>
            <button
              onClick={() => setViewMode('code')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'code'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Code className="w-4 h-4" />
              コード
            </button>
          </div>

          {/* Content */}
          {viewMode === 'preview' ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                プレビュー
              </h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
                <style dangerouslySetInnerHTML={{ __html: technique.css }} />
                <div dangerouslySetInnerHTML={{ __html: technique.html }} />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* HTML Code */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    HTML
                  </h2>
                  <button
                    onClick={() => handleCopy(technique.html, 'html')}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {copiedType === 'html' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        コピー
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{technique.html}</code>
                </pre>
              </div>

              {/* CSS Code */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    CSS
                  </h2>
                  <button
                    onClick={() => handleCopy(technique.css, 'css')}
                    className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    {copiedType === 'css' ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        コピー
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{technique.css}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tips */}
          {technique.tips && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
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