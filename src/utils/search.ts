import { CSSProperty } from "../types/css";

// マッチの強さでスコアリングする（大きいほど上位に表示）
function scoreProperty(property: CSSProperty, lowerQuery: string): number {
  const name = property.name.toLowerCase();
  if (name === lowerQuery) return 100;
  if (name.startsWith(lowerQuery)) return 80;

  const aliases = property.searchAliases ?? [];
  if (aliases.some((alias) => alias.toLowerCase() === lowerQuery)) return 75;
  if (aliases.some((alias) => alias.toLowerCase().includes(lowerQuery))) return 70;

  if (name.includes(lowerQuery)) return 60;
  if (property.description.toLowerCase().includes(lowerQuery)) return 40;
  if (property.category.toLowerCase().includes(lowerQuery)) return 30;
  if (property.syntax.toLowerCase().includes(lowerQuery)) return 20;
  if (
    property.examples.some(
      (example) =>
        example.code.toLowerCase().includes(lowerQuery) ||
        example.description.toLowerCase().includes(lowerQuery)
    )
  ) {
    return 10;
  }
  return 0;
}

export function searchProperties(
  properties: CSSProperty[],
  query: string
): CSSProperty[] {
  if (!query.trim()) {
    return properties;
  }

  const lowerQuery = query.trim().toLowerCase();

  return properties
    .map((property) => ({ property, score: scoreProperty(property, lowerQuery) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.property);
}

export function getUniqueCategories(properties: CSSProperty[]): string[] {
  const categories = properties.map((property) => property.category);
  const uniqueCategories = Array.from(new Set(categories));

  // 「その他」カテゴリーを最後に配置するためのカスタムソート
  return uniqueCategories.sort((a, b) => {
    if (a === "その他") return 1;
    if (b === "その他") return -1;
    return a.localeCompare(b);
  });
}

export function filterByCategory(
  properties: CSSProperty[],
  category: string
): CSSProperty[] {
  if (!category) {
    return properties;
  }
  return properties.filter((property) => property.category === category);
}
