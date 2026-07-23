'use client';

import React, { useState } from 'react';
import { Bot, Check } from 'lucide-react';
import { Recipe } from '@/types/css';
import { recipeToMarkdown } from '@/utils/propertyMarkdown';
import { useAnalytics } from '@/hooks/useAnalytics';

interface RecipeCopyForAIButtonProps {
  recipe: Recipe;
}

/**
 * レシピの実装全体（HTML/CSS/JS・解説・使用プロパティ）をMarkdownとしてコピーするボタン。
 * ChatGPT/Claude等のAIチャットにコンテキストとして貼り付ける用途を想定。
 */
export function RecipeCopyForAIButton({ recipe }: RecipeCopyForAIButtonProps) {
  const [copied, setCopied] = useState(false);
  const analytics = useAnalytics();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(recipeToMarkdown(recipe));
      setCopied(true);
      analytics.trackCopyForAI(`recipe-${recipe.id}`, recipe.title);
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
      title="このレシピの実装をMarkdownでコピーして、AIチャットに貼り付けられます"
    >
      {copied ? <Check className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      {copied ? 'コピーしました' : 'AI用にコピー'}
    </button>
  );
}
