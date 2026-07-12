/**
 * browserSupport 移行スクリプト（一回限り・実行済み）
 *
 * cssProperties.json の自由記述 browserSupport 文字列を、
 * web-features（W3C WebDX Baseline の公式オープンデータ）に基づく
 * 構造化オブジェクト { chrome, firefox, safari, edge, baseline, baselineLowDate } に変換する。
 * 既に構造化済みのエントリはスキップするため再実行は安全。
 *
 * 実行: npx tsx scripts/migrate/structure-browser-support.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { candidateKeys, lookupBaseline } from '../lib/baseline-source';

const dataPath = path.join(__dirname, '../../src/data/cssProperties.json');
const properties: Array<Record<string, unknown>> = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const unresolved: string[] = [];
const report: string[] = [];

for (const property of properties) {
  const id = property.id as string;
  if (typeof property.browserSupport === 'object' && property.browserSupport !== null) {
    report.push(`${id}: 既に構造化済み（スキップ）`);
    continue;
  }
  const structured = lookupBaseline(id);
  if (!structured) {
    unresolved.push(`${id} (候補: ${candidateKeys(id).join(', ')}) 旧値: ${property.browserSupport}`);
    continue;
  }
  report.push(
    `${id}: baseline=${structured.baseline}` +
      ` chrome=${structured.chrome ?? '-'} firefox=${structured.firefox ?? '-'}` +
      ` safari=${structured.safari ?? '-'} edge=${structured.edge ?? '-'}` +
      ` since=${structured.baselineLowDate ?? '-'} | 旧: ${property.browserSupport}`
  );
  property.browserSupport = structured;
}

console.log(report.join('\n'));

if (unresolved.length > 0) {
  console.error('\n=== 未解決（手動対応が必要） ===');
  console.error(unresolved.join('\n'));
  process.exit(1);
}

fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2) + '\n', 'utf8');
console.log(`\n✅ ${properties.length}件を処理して ${dataPath} に書き込みました`);
