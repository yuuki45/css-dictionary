import React from "react";
import { Heart, Copy, ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { CSSProperty } from "../types/css";
import { InteractiveDemo } from "./InteractiveDemo";
import { BaselineBadge } from "./BaselineBadge";
import { CopyForAIButton } from "./CopyForAIButton";
import { getVisualExample } from "./property/visualExamples";

interface PropertyDetailProps {
  property: CSSProperty;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onNavigateToProperty: (id: string) => void;
}

export function PropertyDetail({
  property,
  isFavorite,
  onToggleFavorite,
  onBack,
  onNavigateToProperty,
}: PropertyDetailProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="sticky top-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm rule-double z-40 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            戻る
          </button>
          <div className="flex items-center gap-2">
            <CopyForAIButton property={property} />
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite
                  ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  : "text-gray-400 hover:text-red-500 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title and Category */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-mono text-3xl font-bold text-gray-900 dark:text-gray-100">
              {property.name}
            </h1>
            <span className="px-2 py-0.5 text-xs font-medium border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-sm">
              {property.category}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Syntax */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            構文
          </h2>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Syntax
              </span>
              <button
                onClick={() => copyToClipboard(property.syntax)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                title="コピー"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <code className="text-gray-800 dark:text-gray-200 font-mono text-sm">
              {property.syntax}
            </code>
          </div>
        </section>

        {/* Interactive Demo */}
        {property.interactive && (
          <section className="mb-8">
            <InteractiveDemo
              config={property.interactive}
              propertyName={property.name}
            />
          </section>
        )}

        {/* Examples */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            コード例
          </h2>
          <div className="space-y-6">
            {property.examples.map((example, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">
                    例 {index + 1}
                  </h3>
                  <button
                    onClick={() => copyToClipboard(example.code)}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    title="コピー"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Code */}
                <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4 font-mono text-sm border">
                  <code className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {example.code}
                  </code>
                </div>

                {/* Visual Result */}
                {getVisualExample(property.id, index) && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        実行結果
                      </span>
                    </div>
                    {getVisualExample(property.id, index)}
                  </div>
                )}

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {example.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        {property.tips && (
          <section className="mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💡 TIPS
            </h2>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-300">
                {property.tips}
              </p>
            </div>
          </section>
        )}

        {/* Common Mistakes */}
        {property.commonMistakes && (
          <section className="mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              ⚠️ よくある間違い
            </h2>
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <p className="text-orange-800 dark:text-orange-300">
                {property.commonMistakes}
              </p>
            </div>
          </section>
        )}

        {/* AI Notes */}
        {property.aiNotes && (
          <section className="mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              🤖 AIがよく間違えるポイント
            </h2>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <p className="text-purple-800 dark:text-purple-300">
                {property.aiNotes}
              </p>
            </div>
          </section>
        )}

        {/* Prompt Examples */}
        {property.promptExamples && property.promptExamples.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              💬 AIへの頼み方
            </h2>
            <div className="space-y-3">
              {property.promptExamples.map((prompt, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-start justify-between gap-3"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {prompt}
                  </p>
                  <button
                    onClick={() => copyToClipboard(prompt)}
                    className="shrink-0 p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    title="この依頼文をコピー"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              そのままAIチャットに貼り付けて使える依頼文の例です。ページ上部の「AI用にコピー」でこのページ全体をコンテキストとして渡せます。
            </p>
          </section>
        )}

        {/* Related Properties */}
        {property.relatedProperties.length > 0 && (
          <section className="mb-8">
            <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              関連プロパティ
            </h2>
            <div className="flex flex-wrap gap-2">
              {property.relatedProperties.map((relatedId) => (
                <button
                  key={relatedId}
                  onClick={() => onNavigateToProperty(relatedId)}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                           rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {relatedId}
                  <ExternalLink className="w-3 h-3" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Browser Support */}
        <section className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            ブラウザサポート
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-4">
            <BaselineBadge
              baseline={property.browserSupport.baseline}
              baselineLowDate={property.browserSupport.baselineLowDate}
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(
                [
                  ["Chrome", property.browserSupport.chrome],
                  ["Firefox", property.browserSupport.firefox],
                  ["Safari", property.browserSupport.safari],
                  ["Edge", property.browserSupport.edge],
                ] as const
              ).map(([browser, version]) => (
                <div
                  key={browser}
                  className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 text-center border border-blue-100 dark:border-blue-900"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {browser}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      version
                        ? "text-gray-900 dark:text-gray-100"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {version ? `${version}+` : "未対応"}
                  </div>
                </div>
              ))}
            </div>
            {property.browserSupport.note && (
              <p className="text-sm text-blue-800 dark:text-blue-300">
                {property.browserSupport.note}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
