/**
 * 削除済み参照の復元スクリプト
 *
 * Phase 1で削除した relatedProperties の参照（removed-references.json に記録）のうち、
 * その後プロパティとして追加されたIDへの参照を復元する。
 * 新しいプロパティを追加するたびに実行する（冪等）。
 *
 * 実行: npx tsx scripts/migrate/restore-references.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const dataPath = path.join(__dirname, '../../src/data/cssProperties.json');
const removedPath = path.join(__dirname, 'removed-references.json');

const properties: Array<{ id: string; relatedProperties: string[] }> = JSON.parse(
  fs.readFileSync(dataPath, 'utf8')
);
const record: { note: string; removedAt: string; removed: Record<string, string[]> } = JSON.parse(
  fs.readFileSync(removedPath, 'utf8')
);

const ids = new Set(properties.map((p) => p.id));
const byId = new Map(properties.map((p) => [p.id, p]));

let restored = 0;
for (const [ref, sources] of Object.entries(record.removed)) {
  if (!ids.has(ref)) continue; // まだ追加されていない
  for (const sourceId of sources) {
    const source = byId.get(sourceId);
    if (!source) continue;
    if (source.relatedProperties.includes(ref) || sourceId === ref) continue;
    source.relatedProperties.push(ref);
    restored++;
    console.log(`復元: ${sourceId} → ${ref}`);
  }
  delete record.removed[ref];
}

if (restored > 0) {
  fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2) + '\n', 'utf8');
  fs.writeFileSync(removedPath, JSON.stringify(record, null, 2) + '\n', 'utf8');
}
console.log(`✅ ${restored}件の参照を復元（未復元の記録: ${Object.keys(record.removed).length}種類）`);
