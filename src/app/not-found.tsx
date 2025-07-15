import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ページが見つかりません | CSS辞書',
  description: '指定されたページが見つかりませんでした。CSS辞書で他のページをご覧ください。',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-400 dark:text-gray-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            ページが見つかりません
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            お探しのページは存在しないか、移動された可能性があります。
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Home className="w-4 h-4" />
            ホームに戻る
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              カテゴリ一覧
            </Link>
            <Link
              href="/techniques"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              テクニック集
            </Link>
            <Link
              href="/reverse"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
            >
              逆引き検索
            </Link>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>または、ブラウザの戻るボタンで前のページに戻ってください。</p>
        </div>
      </div>
    </div>
  );
}