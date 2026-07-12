import type { CSSProperty, Technique, Comparison, AnimationExample } from '@/types/css';

export const SITE_URL = 'https://www.css-dictionary.com';

const baselineLabels: Record<string, string> = {
  widely: 'Baseline 広く利用可能',
  newly: 'Baseline 新しく利用可能',
  limited: '対応が限定的',
};

// 年月 "2023-09" → "2023年9月"
function formatYearMonth(yearMonth: string): string {
  const [year, month] = yearMonth.split('-');
  return `${year}年${Number(month)}月`;
}

/**
 * CSSプロパティをAIエージェント/LLMが読みやすいクリーンなMarkdownに変換する。
 * ページ単位 .md 配信（prebuild生成）と「AI用にコピー」機能の共通単一ソース。
 */
export function propertyToMarkdown(property: CSSProperty): string {
  const lines: string[] = [];
  const bs = property.browserSupport;

  lines.push(`# ${property.name}`);
  lines.push('');
  lines.push(`> ${property.description}`);
  lines.push('');
  lines.push(`- カテゴリ: ${property.category}`);
  lines.push(`- URL: ${SITE_URL}/property/${property.id}/`);
  if (property.mdnUrl) lines.push(`- MDN: ${property.mdnUrl}`);
  lines.push('');

  lines.push('## 構文');
  lines.push('');
  lines.push('```css');
  lines.push(property.syntax);
  lines.push('```');
  lines.push('');

  lines.push('## ブラウザ対応');
  lines.push('');
  let baselineLine = `- ${baselineLabels[bs.baseline] ?? bs.baseline}`;
  if (bs.baseline === 'newly' && bs.baselineLowDate) {
    baselineLine += `（${formatYearMonth(bs.baselineLowDate)}に全主要ブラウザ対応）`;
  }
  lines.push(baselineLine);
  const versions = (
    [
      ['Chrome', bs.chrome],
      ['Firefox', bs.firefox],
      ['Safari', bs.safari],
      ['Edge', bs.edge],
    ] as const
  )
    .map(([name, v]) => (v ? `${name} ${v}+` : `${name} 未対応`))
    .join(' / ');
  lines.push(`- ${versions}`);
  if (bs.note) lines.push(`- 補足: ${bs.note}`);
  lines.push('');

  lines.push('## コード例');
  lines.push('');
  property.examples.forEach((example, i) => {
    lines.push(`### 例${i + 1}: ${example.description}`);
    lines.push('');
    lines.push('```css');
    lines.push(example.code);
    lines.push('```');
    lines.push('');
  });

  if (property.tips) {
    lines.push('## TIPS');
    lines.push('');
    lines.push(property.tips);
    lines.push('');
  }

  if (property.commonMistakes) {
    lines.push('## よくある間違い');
    lines.push('');
    lines.push(property.commonMistakes);
    lines.push('');
  }

  if (property.aiNotes) {
    lines.push('## AIがよく間違えるポイント');
    lines.push('');
    lines.push(property.aiNotes);
    lines.push('');
  }

  if (property.promptExamples && property.promptExamples.length > 0) {
    lines.push('## AIへの依頼文例');
    lines.push('');
    for (const prompt of property.promptExamples) {
      lines.push(`- ${prompt}`);
    }
    lines.push('');
  }

  if (property.relatedProperties.length > 0) {
    lines.push('## 関連プロパティ');
    lines.push('');
    for (const relatedId of property.relatedProperties) {
      lines.push(`- [${relatedId}](${SITE_URL}/property/${relatedId}.md)`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/** 比較記事をMarkdownに変換する */
export function comparisonToMarkdown(comparison: Comparison): string {
  const lines: string[] = [];
  lines.push(`# ${comparison.title}`);
  lines.push('');
  lines.push(`> ${comparison.tldr}`);
  lines.push('');
  lines.push(`- URL: ${SITE_URL}/compare/${comparison.id}/`);
  lines.push('');
  lines.push('## 比較表');
  lines.push('');
  lines.push(`| 観点 | ${comparison.labels.join(' | ')} |`);
  lines.push(`| --- | ${comparison.labels.map(() => '---').join(' | ')} |`);
  for (const row of comparison.rows) {
    lines.push(`| ${row.aspect} | ${row.values.join(' | ')} |`);
  }
  lines.push('');
  lines.push('## 使い分けの指針');
  lines.push('');
  lines.push(comparison.guideline);
  lines.push('');
  if (comparison.aiNote) {
    lines.push('## AIがよくやる取り違え');
    lines.push('');
    lines.push(comparison.aiNote);
    lines.push('');
  }
  lines.push('## それぞれの詳しい解説');
  lines.push('');
  for (const propertyId of comparison.propertyIds) {
    lines.push(`- [${propertyId}](${SITE_URL}/property/${propertyId}.md)`);
  }
  lines.push('');
  return lines.join('\n');
}

/** アニメーション実装例をMarkdownに変換する */
export function animationToMarkdown(animation: AnimationExample): string {
  const lines: string[] = [];
  lines.push(`# ${animation.title}のCSSアニメーション実装`);
  lines.push('');
  lines.push(`> ${animation.description}`);
  lines.push('');
  lines.push(`- カテゴリ: ${animation.category}`);
  lines.push(`- URL: ${SITE_URL}/animations/${animation.id}/`);
  lines.push('');
  lines.push('## HTML');
  lines.push('');
  lines.push('```html');
  lines.push(animation.html);
  lines.push('```');
  lines.push('');
  lines.push('## CSS');
  lines.push('');
  lines.push('```css');
  lines.push(animation.css);
  lines.push('```');
  lines.push('');
  lines.push('## 仕組みの解説');
  lines.push('');
  lines.push(animation.explanation);
  lines.push('');
  if (animation.tips) {
    lines.push('## 実装のポイント');
    lines.push('');
    lines.push(animation.tips);
    lines.push('');
  }
  lines.push('## 使っているプロパティ');
  lines.push('');
  for (const propertyId of animation.keyProperties) {
    lines.push(`- [${propertyId}](${SITE_URL}/property/${propertyId}.md)`);
  }
  lines.push('');
  return lines.join('\n');
}

/** CSSテクニックをMarkdownに変換する */
export function techniqueToMarkdown(technique: Technique): string {
  const lines: string[] = [];
  lines.push(`# ${technique.title}`);
  lines.push('');
  lines.push(`> ${technique.description}`);
  lines.push('');
  lines.push(`- URL: ${SITE_URL}/techniques/${technique.id}/`);
  lines.push('');
  lines.push('## HTML');
  lines.push('');
  lines.push('```html');
  lines.push(technique.html);
  lines.push('```');
  lines.push('');
  lines.push('## CSS');
  lines.push('');
  lines.push('```css');
  lines.push(technique.css);
  lines.push('```');
  lines.push('');
  if (technique.tips) {
    lines.push('## TIPS');
    lines.push('');
    lines.push(technique.tips);
    lines.push('');
  }
  return lines.join('\n');
}
