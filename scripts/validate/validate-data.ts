/**
 * データ整合性検証スクリプト
 *
 * 実行: npm run validate（= npx tsx scripts/validate/validate-data.ts）
 * CIとローカルで実行し、データ品質をゲートする。
 *
 * エラー（exit 1）:
 *   - ID重複
 *   - relatedProperties / usecases.propertyIds の未解決参照・自己参照・重複
 *   - 非正準カテゴリ名
 *   - browserSupport の構造不正
 *   - examples が空
 *   - interactive.enabled なのに controls が空
 * 警告（exit 0）:
 *   - description が50文字未満（SEO推奨）
 *   - baseline が web-features の最新値と不一致（データ陳腐化の検知）
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { getCategorySlug } from '../../src/utils/categorySlug';
import { usecases } from '../../src/data/usecases';
import { comparisons } from '../../src/data/comparisons';
import { lookupBaseline } from '../lib/baseline-source';

interface PropertyEntry {
  id: string;
  name: string;
  category: string;
  description: string;
  syntax: string;
  examples: Array<{ code: string; description: string }>;
  relatedProperties: string[];
  browserSupport: {
    chrome?: string;
    firefox?: string;
    safari?: string;
    edge?: string;
    baseline: string;
    baselineLowDate?: string;
    note?: string;
  };
  interactive?: { enabled: boolean; controls?: unknown[] };
}

const dataPath = path.join(__dirname, '../../src/data/cssProperties.json');
const properties: PropertyEntry[] = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const errors: string[] = [];
const warnings: string[] = [];

// 1. ID重複
const ids = new Set<string>();
for (const p of properties) {
  if (ids.has(p.id)) errors.push(`ID重複: ${p.id}`);
  ids.add(p.id);
}

// 2. 各プロパティの検証
const versionPattern = /^\d+(\.\d+)*$/;
const yearMonthPattern = /^\d{4}-\d{2}$/;
const baselineValues = new Set(['widely', 'newly', 'limited']);

for (const p of properties) {
  const label = `[${p.id}]`;

  // relatedProperties
  const seenRefs = new Set<string>();
  for (const ref of p.relatedProperties ?? []) {
    if (!ids.has(ref)) errors.push(`${label} relatedProperties 未解決参照: "${ref}"`);
    if (ref === p.id) errors.push(`${label} relatedProperties 自己参照`);
    if (seenRefs.has(ref)) errors.push(`${label} relatedProperties 重複: "${ref}"`);
    seenRefs.add(ref);
  }

  // カテゴリ（正準リストは src/utils/categorySlug.ts が単一ソース）
  if (getCategorySlug(p.category) === 'other' && p.category !== 'その他') {
    errors.push(`${label} 非正準カテゴリ名: "${p.category}"`);
  }

  // browserSupport 構造
  const bs = p.browserSupport;
  if (!bs || typeof bs !== 'object') {
    errors.push(`${label} browserSupport が構造化されていない`);
  } else {
    if (!baselineValues.has(bs.baseline)) {
      errors.push(`${label} baseline 不正値: "${bs.baseline}"`);
    }
    for (const browser of ['chrome', 'firefox', 'safari', 'edge'] as const) {
      const v = bs[browser];
      if (v !== undefined && !versionPattern.test(v)) {
        errors.push(`${label} browserSupport.${browser} バージョン形式不正: "${v}"`);
      }
    }
    if (bs.baselineLowDate !== undefined && !yearMonthPattern.test(bs.baselineLowDate)) {
      errors.push(`${label} baselineLowDate 形式不正: "${bs.baselineLowDate}"`);
    }

    // web-features とのクロスチェック（警告のみ — データ陳腐化の検知）
    const latest = lookupBaseline(p.id);
    if (latest && latest.baseline !== bs.baseline) {
      warnings.push(
        `${label} baseline が web-features と不一致: データ=${bs.baseline} / 最新=${latest.baseline}`
      );
    }
  }

  // examples
  if (!Array.isArray(p.examples) || p.examples.length === 0) {
    errors.push(`${label} examples が空`);
  }

  // description
  if (!p.description || p.description.length < 50) {
    warnings.push(`${label} description が50文字未満（${p.description?.length ?? 0}文字）`);
  }

  // interactive
  if (p.interactive?.enabled && (!p.interactive.controls || p.interactive.controls.length === 0)) {
    errors.push(`${label} interactive.enabled だが controls が空`);
  }
}

// 3. usecases の参照整合性
for (const usecase of usecases) {
  for (const ref of usecase.propertyIds) {
    if (!ids.has(ref)) {
      errors.push(`[usecase:${usecase.id}] 未解決参照: "${ref}"`);
    }
  }
}

// 4. comparisons の整合性
const comparisonIds = new Set<string>();
for (const comparison of comparisons) {
  const label = `[compare:${comparison.id}]`;
  if (comparisonIds.has(comparison.id)) errors.push(`${label} ID重複`);
  comparisonIds.add(comparison.id);
  for (const ref of comparison.propertyIds) {
    if (!ids.has(ref)) errors.push(`${label} 未解決参照: "${ref}"`);
  }
  for (const row of comparison.rows) {
    if (row.values.length !== comparison.labels.length) {
      errors.push(
        `${label} 行「${row.aspect}」の列数がlabelsと不一致（${row.values.length} vs ${comparison.labels.length}）`
      );
    }
  }
}

// 結果出力
if (warnings.length > 0) {
  console.warn(`⚠️  警告 ${warnings.length}件:`);
  for (const w of warnings) console.warn(`  ${w}`);
}
if (errors.length > 0) {
  console.error(`\n❌ エラー ${errors.length}件:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`\n✅ 検証OK: プロパティ${properties.length}件 / ユースケース${usecases.length}件 / 比較${comparisons.length}件（警告${warnings.length}件）`);
