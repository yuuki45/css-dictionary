// カテゴリごとのアクセント色（和色ベースのパレットに対応）
// Tailwindのパージ対象になるよう、クラス名は完全な文字列で保持する。

const categoryAccents: Record<string, string> = {
  'レイアウト・配置': 'bg-blue-500 dark:bg-blue-400',
  'テキスト・フォント': 'bg-gray-600 dark:bg-gray-400',
  '背景・装飾': 'bg-green-500 dark:bg-green-400',
  'アニメーション・エフェクト': 'bg-vermillion-500 dark:bg-vermillion-400',
  'スペーシング・サイズ': 'bg-gold-500 dark:bg-gold-400',
  'レスポンシブ・関数': 'bg-purple-500 dark:bg-purple-400',
  'インタラクション・UX': 'bg-blue-700 dark:bg-blue-300',
  '擬似クラス': 'bg-green-700 dark:bg-green-300',
  'その他': 'bg-gray-400 dark:bg-gray-500',
};

/** カテゴリの見出しバー等に使うアクセント背景クラス */
export function getCategoryAccent(category: string): string {
  return categoryAccents[category] ?? categoryAccents['その他'];
}
