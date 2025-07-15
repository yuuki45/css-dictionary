import { CSSProperty } from "../types/css";

export function searchProperties(
  properties: CSSProperty[],
  query: string
): CSSProperty[] {
  if (!query.trim()) {
    return properties;
  }

  const lowerQuery = query.toLowerCase();

  return properties.filter((property) => {
    return (
      property.name.toLowerCase().includes(lowerQuery) ||
      property.description.toLowerCase().includes(lowerQuery) ||
      property.category.toLowerCase().includes(lowerQuery) ||
      property.syntax.toLowerCase().includes(lowerQuery) ||
      property.examples.some(
        (example) =>
          example.code.toLowerCase().includes(lowerQuery) ||
          example.description.toLowerCase().includes(lowerQuery)
      )
    );
  });
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
