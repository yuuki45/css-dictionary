import React from "react";
import { Copy } from "lucide-react";
import { copyToClipboard } from "../clipboard";

interface PromptExamplesSectionProps {
  promptExamples: string[];
}

export function PromptExamplesSection({ promptExamples }: PromptExamplesSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        💬 AIへの頼み方
      </h2>
      <div className="space-y-3">
        {promptExamples.map((prompt, index) => (
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
  );
}
