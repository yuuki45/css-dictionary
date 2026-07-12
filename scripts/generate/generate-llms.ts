/**
 * LLMO/AI最適化アセットの生成スクリプト（prebuildで自動実行）
 *
 * public/ に以下を生成する（すべて.gitignore対象、ビルド時にout/へコピーされる）:
 *   - llms.txt          … サイト概要+全Markdownへの目次（https://llmstxt.org/ 仕様準拠）
 *   - llms-full.txt     … 全コンテンツ連結版
 *   - property/{id}.md  … プロパティごとのMarkdown（HTMLページと並列URL）
 *   - techniques/{id}.md … テクニックごとのMarkdown
 *   - reverse.md        … 逆引き（ユースケース→プロパティ）一覧
 *   - sitemap.xml       … 全ページのサイトマップ（手動メンテ廃止）
 *
 * 実行: npx tsx scripts/generate/generate-llms.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { cssProperties } from '../../src/data/properties';
import { techniques } from '../../src/data/techniques';
import { usecases } from '../../src/data/usecases';
import { comparisons } from '../../src/data/comparisons';
import {
  propertyToMarkdown,
  techniqueToMarkdown,
  comparisonToMarkdown,
  SITE_URL,
} from '../../src/utils/propertyMarkdown';
import { getUniqueCategories } from '../../src/utils/search';
import { getCategorySlug } from '../../src/utils/categorySlug';

const publicDir = path.join(__dirname, '../../public');

function writeFile(relativePath: string, content: string): void {
  const fullPath = path.join(publicDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, 'utf8');
}

// 生成ディレクトリ内の古い.mdを掃除（削除されたエントリの残骸を防ぐ）
for (const dir of ['property', 'techniques', 'compare']) {
  const fullDir = path.join(publicDir, dir);
  if (fs.existsSync(fullDir)) {
    for (const file of fs.readdirSync(fullDir)) {
      if (file.endsWith('.md')) fs.unlinkSync(path.join(fullDir, file));
    }
  }
}

// ---- 1. プロパティ/テクニックごとのMarkdown ----
for (const property of cssProperties) {
  writeFile(`property/${property.id}.md`, propertyToMarkdown(property) + '\n');
}
for (const technique of techniques) {
  writeFile(`techniques/${technique.id}.md`, techniqueToMarkdown(technique) + '\n');
}
for (const comparison of comparisons) {
  writeFile(`compare/${comparison.id}.md`, comparisonToMarkdown(comparison) + '\n');
}

// ---- 2. 逆引き一覧 reverse.md ----
const reverseLines: string[] = [
  '# CSS逆引きリファレンス（やりたいことから探す）',
  '',
  `> 「中央寄せしたい」「角丸にしたい」など、実現したいことから関連CSSプロパティを引ける一覧です。`,
  '',
  `- URL: ${SITE_URL}/reverse/`,
  '',
];
for (const usecase of usecases) {
  reverseLines.push(`## ${usecase.label}`);
  reverseLines.push('');
  if (usecase.description) {
    reverseLines.push(usecase.description);
    reverseLines.push('');
  }
  for (const id of usecase.propertyIds) {
    const property = cssProperties.find((p) => p.id === id);
    reverseLines.push(`- [${property?.name ?? id}](${SITE_URL}/property/${id}.md)`);
  }
  reverseLines.push('');
}
writeFile('reverse.md', reverseLines.join('\n'));

// ---- 2.5 AI生成CSSレビューチェックリスト ai-review.md ----
const aiItems = cssProperties.filter((p) => p.aiNotes);
const aiReviewLines: string[] = [
  '# AI生成CSSレビューチェックリスト',
  '',
  `> ChatGPTやClaudeが生成したCSSをレビューするための観点集。AIがよく間違えるポイントをプロパティ別に全${aiItems.length}項目収録。AI生成コードに登場するプロパティと突き合わせて使う。`,
  '',
  `- URL: ${SITE_URL}/ai-review/`,
  '',
];
for (const category of getUniqueCategories(cssProperties)) {
  const items = aiItems.filter((p) => p.category === category);
  if (items.length === 0) continue;
  aiReviewLines.push(`## ${category}`);
  aiReviewLines.push('');
  for (const p of items) {
    aiReviewLines.push(`- **${p.name}**（${SITE_URL}/property/${p.id}.md）: ${p.aiNotes}`);
  }
  aiReviewLines.push('');
}
writeFile('ai-review.md', aiReviewLines.join('\n'));

// ---- 3. llms.txt ----
const modernCount = cssProperties.filter((p) => p.browserSupport.baseline !== 'widely').length;
const llmsLines: string[] = [
  '# CSS辞書',
  '',
  `> 日本語で読めるCSSプロパティリファレンス。${cssProperties.length}のプロパティを実用的なコード例・W3C Baseline準拠のブラウザ対応情報・よくある間違いとともに解説しています。うち${modernCount}件は新しいCSS機能です。各ページは下記の .md URL からクリーンなMarkdownとして取得できます。`,
  '',
  'このファイルは https://llmstxt.org/ の仕様に準拠しています。',
  '',
  '## CSSプロパティ',
  '',
];
for (const property of cssProperties) {
  llmsLines.push(
    `- [${property.name}](${SITE_URL}/property/${property.id}.md): ${property.description}`
  );
}
llmsLines.push('');
llmsLines.push('## CSSテクニック');
llmsLines.push('');
for (const technique of techniques) {
  llmsLines.push(
    `- [${technique.title}](${SITE_URL}/techniques/${technique.id}.md): ${technique.description}`
  );
}
llmsLines.push('');
llmsLines.push('## AI協働');
llmsLines.push('');
llmsLines.push(
  `- [AI生成CSSレビューチェックリスト](${SITE_URL}/ai-review.md): AIがよく間違えるポイント全${aiItems.length}項目をプロパティ別に集約した観点集`
);
llmsLines.push('');
llmsLines.push('## 比較でわかるCSS（違いの解説）');
llmsLines.push('');
for (const comparison of comparisons) {
  llmsLines.push(
    `- [${comparison.title}](${SITE_URL}/compare/${comparison.id}.md): ${comparison.tldr}`
  );
}
llmsLines.push('');
llmsLines.push('## 逆引き');
llmsLines.push('');
llmsLines.push(
  `- [CSS逆引きリファレンス](${SITE_URL}/reverse.md): やりたいこと（${usecases.length}のユースケース）から関連プロパティを引く一覧`
);
llmsLines.push('');
llmsLines.push('## Optional');
llmsLines.push('');
llmsLines.push(`- [全コンテンツ連結版](${SITE_URL}/llms-full.txt): 全プロパティ・テクニックのMarkdownを1ファイルに連結したもの`);
llmsLines.push('');
writeFile('llms.txt', llmsLines.join('\n'));

// ---- 4. llms-full.txt ----
const fullSections: string[] = [
  `# CSS辞書 全コンテンツ（${SITE_URL}）`,
  ...cssProperties.map((p) => propertyToMarkdown(p)),
  ...comparisons.map((c) => comparisonToMarkdown(c)),
  ...techniques.map((t) => techniqueToMarkdown(t)),
  reverseLines.join('\n'),
];
writeFile('llms-full.txt', fullSections.join('\n\n---\n\n') + '\n');

// ---- 5. sitemap.xml ----
const today = new Date().toISOString().slice(0, 10);
const categories = getUniqueCategories(cssProperties);

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
}

const entries: SitemapEntry[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/modern/', priority: '0.9', changefreq: 'weekly' },
  { path: '/ai-review/', priority: '0.9', changefreq: 'weekly' },
  { path: '/categories/', priority: '0.8', changefreq: 'weekly' },
  ...categories.map((category) => ({
    path: `/categories/${getCategorySlug(category)}/`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
  ...cssProperties.map((property) => ({
    path: `/property/${property.id}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/compare/', priority: '0.8', changefreq: 'weekly' },
  ...comparisons.map((comparison) => ({
    path: `/compare/${comparison.id}/`,
    priority: '0.8',
    changefreq: 'monthly',
  })),
  { path: '/techniques/', priority: '0.7', changefreq: 'weekly' },
  ...techniques.map((technique) => ({
    path: `/techniques/${technique.id}/`,
    priority: '0.7',
    changefreq: 'monthly',
  })),
  { path: '/reverse/', priority: '0.7', changefreq: 'weekly' },
  { path: '/favorites/', priority: '0.3', changefreq: 'monthly' },
  { path: '/settings/', priority: '0.3', changefreq: 'monthly' },
];

const sitemapXml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  entries
    .map(
      (entry) =>
        `  <url>\n` +
        `    <loc>${SITE_URL}${entry.path}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${entry.changefreq}</changefreq>\n` +
        `    <priority>${entry.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  '\n</urlset>\n';
writeFile('sitemap.xml', sitemapXml);

console.log(
  `✅ 生成完了: property/*.md ${cssProperties.length}件, techniques/*.md ${techniques.length}件, ` +
    `compare/*.md ${comparisons.length}件, reverse.md, llms.txt, llms-full.txt, sitemap.xml (${entries.length} URL)`
);
