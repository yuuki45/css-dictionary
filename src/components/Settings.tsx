import React from 'react';
import { Moon, Sun, Trash2, Info } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

interface SettingsProps {
  onClearHistory: () => void;
}

export function Settings({ onClearHistory }: SettingsProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">設定</h1>

      {/* Theme Setting */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">表示設定</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            )}
            <span className="text-gray-900 dark:text-gray-100">
              ダークモード
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              theme === 'dark' ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">データ管理</h2>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 
                   rounded-md transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          閲覧履歴をクリア
        </button>
      </div>

      {/* App Info */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">アプリ情報</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Info className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                CSS Dictionary
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Version 1.0.0
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            CSSプロパティを効率的に学習するための辞書アプリです。検索、カテゴリ分け、お気に入り管理などの機能を提供します。
          </p>
        </div>
      </div>
    </div>
  );
}