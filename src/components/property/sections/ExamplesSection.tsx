import React from "react";
import { Copy, Eye } from "lucide-react";
import { CodeExample } from "../../../types/css";
import { getVisualExample } from "../visualExamples";
import { copyToClipboard } from "../clipboard";
import { ExamplePlayground } from "../ExamplePlayground";

interface ExamplesSectionProps {
  propertyId: string;
  examples: CodeExample[];
}

export function ExamplesSection({ propertyId, examples }: ExamplesSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="font-serif text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        コード例
      </h2>
      <div className="space-y-6">
        {examples.map((example, index) => (
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
            {getVisualExample(propertyId, index) && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    実行結果
                  </span>
                </div>
                {getVisualExample(propertyId, index)}
              </div>
            )}

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {example.description}
            </p>

            {/* 編集して試す */}
            <ExamplePlayground propertyId={propertyId} code={example.code} />
          </div>
        ))}
      </div>
    </section>
  );
}
