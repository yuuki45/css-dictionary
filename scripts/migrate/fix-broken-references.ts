/**
 * relatedProperties の壊れ参照修復スクリプト（一回限り）
 *
 * - 既存エントリで代替できる参照は置換（例: top/left → inset）
 * - 代替先がない参照は削除し、removed-references.json に記録する
 *   （Phase 3 で該当プロパティを追加した際にこの記録を元に復元する）
 *
 * 実行: npx tsx scripts/migrate/fix-broken-references.ts
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

// 壊れ参照 → 既存エントリへの置換マップ
const replacements: Record<string, string> = {
  top: 'inset',
  right: 'inset',
  bottom: 'inset',
  left: 'inset',
  flex: 'flex-grow-shrink-basis',
  'flex-basis': 'flex-grow-shrink-basis',
  'flex-grow': 'flex-grow-shrink-basis',
  'flex-shrink': 'flex-grow-shrink-basis',
  'grid-gap': 'gap',
  'row-gap': 'gap',
  'column-gap': 'gap',
  'min()': 'min-max-functions',
  'max()': 'min-max-functions',
  'clamp()': 'clamp',
  'var()': 'css-custom-properties',
  '@container': 'container-queries',
  'container-name': 'container-queries',
  '@keyframes': 'keyframes',
  'minmax()': 'grid-template-columns',
  'grid-template-rows': 'grid-template-columns',
  'overflow-x': 'overflow',
  'overflow-y': 'overflow',
  'word-wrap': 'word-break',
  'overflow-wrap': 'word-break',
  'max-height': 'height',
  'min-height': 'height',
  'border-width': 'border',
  'border-style': 'border',
  'border-color': 'border',
  'linear-gradient()': 'linear-gradient',
  'radial-gradient()': 'radial-gradient',
  ':first-child': 'pseudo-first-child',
  ':nth-of-type': 'pseudo-nth-of-type',
  ':nth-child()': 'pseudo-nth-child',
  'place-self': 'place-items',
  background: 'background-color',
  direction: 'writing-mode',
};

const dataPath = path.join(__dirname, '../../src/data/cssProperties.json');
const properties: Array<{ id: string; relatedProperties: string[] }> = JSON.parse(
  fs.readFileSync(dataPath, 'utf8')
);
const ids = new Set(properties.map((p) => p.id));

const removed: Record<string, string[]> = {};
let replacedCount = 0;
let removedCount = 0;

for (const property of properties) {
  const seen = new Set<string>();
  const fixed: string[] = [];
  for (const ref of property.relatedProperties) {
    let resolved: string | undefined;
    if (ids.has(ref)) {
      resolved = ref;
    } else if (replacements[ref] && ids.has(replacements[ref])) {
      resolved = replacements[ref];
      replacedCount++;
    } else {
      (removed[ref] ??= []).push(property.id);
      removedCount++;
      continue;
    }
    // 自己参照と重複を除去
    if (resolved === property.id || seen.has(resolved)) continue;
    seen.add(resolved);
    fixed.push(resolved);
  }
  property.relatedProperties = fixed;
}

fs.writeFileSync(dataPath, JSON.stringify(properties, null, 2) + '\n', 'utf8');

const removedPath = path.join(__dirname, 'removed-references.json');
fs.writeFileSync(
  removedPath,
  JSON.stringify(
    {
      note: 'Phase 3 でプロパティを追加した際、このリストを元に relatedProperties を復元する。キー: 削除された参照ID、値: 参照元プロパティID',
      removedAt: new Date().toISOString().slice(0, 10),
      removed,
    },
    null,
    2
  ) + '\n',
  'utf8'
);

console.log(`✅ 置換 ${replacedCount}件 / 削除 ${removedCount}件（${Object.keys(removed).length}種類）`);
console.log(`削除記録: ${removedPath}`);
