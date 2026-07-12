'use client';

import React from 'react';
import Link from 'next/link';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

/**
 * 全ページ共通ヘッダー。
 * ワードマーク（明朝）・モダンCSSへの導線・テーマ切替を提供する。
 */
export function Header() {
  const { theme, toggleTheme, isLoaded } = useTheme();

  return (
    <header className="bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm rule-double relative z-40">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2 group">
          <span className="font-serif text-xl font-bold tracking-wide text-gray-900 dark:text-gray-100 group-hover:text-vermillion-600 dark:group-hover:text-gold-300 transition-colors">
            CSS辞書
          </span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
            CSS Dictionary
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            href="/modern/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-gray-600 dark:text-gray-300 hover:text-vermillion-600 dark:hover:text-gold-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">モダンCSS</span>
          </Link>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-vermillion-600 dark:hover:text-gold-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title={theme === 'dark' ? 'ライトモードに切替' : 'ダークモードに切替'}
            aria-label="テーマ切替"
          >
            {/* ハイドレーション不一致を避けるため、読込完了までは中立アイコン */}
            {!isLoaded ? (
              <Sun className="w-5 h-5 opacity-0" />
            ) : theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
