import React from "react";
import { Copy } from "lucide-react";
import { copyToClipboard } from "../clipboard";

interface SyntaxSectionProps {
  syntax: string;
}

export function SyntaxSection({ syntax }: SyntaxSectionProps) {
  return (
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
            onClick={() => copyToClipboard(syntax)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="コピー"
          >
            <Copy className="w-4 h-4" />
          </button>
        </div>
        <code className="text-gray-800 dark:text-gray-200 font-mono text-sm">
          {syntax}
        </code>
      </div>
    </section>
  );
}
