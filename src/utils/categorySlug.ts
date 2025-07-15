// 日本語カテゴリ名を英語スラッグに変換
const categorySlugMap: Record<string, string> = {
  'レイアウト・配置': 'layout',
  'テキスト・フォント': 'text',
  '背景・装飾': 'background',
  'アニメーション・エフェクト': 'animation',
  'スペーシング・サイズ': 'spacing',
  'レスポンシブ・関数': 'responsive',
  'インタラクション・UX': 'interaction',
  '擬似クラス': 'pseudo-class',
  'その他': 'other'
};

// 英語スラッグを日本語カテゴリ名に変換
const slugToCategoryMap: Record<string, string> = Object.fromEntries(
  Object.entries(categorySlugMap).map(([key, value]) => [value, key])
);

export function getCategorySlug(category: string): string {
  return categorySlugMap[category] || 'other';
}

export function getCategoryFromSlug(slug: string): string {
  return slugToCategoryMap[slug] || 'その他';
}

export function getAllCategorySlugs(): string[] {
  return Object.values(categorySlugMap);
}