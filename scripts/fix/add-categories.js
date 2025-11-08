const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== カテゴリを追加 ===\n');

const updates = [];

// 1. scroll-snap
const scrollSnap = properties.find(p => p.id === 'scroll-snap');
if (scrollSnap && !scrollSnap.category) {
  scrollSnap.category = 'インタラクション・UX';
  updates.push('scroll-snap → インタラクション・UX');
}

// 2. position-sticky
const positionSticky = properties.find(p => p.id === 'position-sticky');
if (positionSticky && !positionSticky.category) {
  positionSticky.category = 'レイアウト・配置';
  updates.push('position-sticky → レイアウト・配置');
}

// 3. color-scheme
const colorScheme = properties.find(p => p.id === 'color-scheme');
if (colorScheme && !colorScheme.category) {
  colorScheme.category = 'その他';
  updates.push('color-scheme → その他');
}

// 4. prefers-color-scheme
const prefersColorScheme = properties.find(p => p.id === 'prefers-color-scheme');
if (prefersColorScheme && !prefersColorScheme.category) {
  prefersColorScheme.category = 'レスポンシブ・関数';
  updates.push('prefers-color-scheme → レスポンシブ・関数');
}

// 5. prefers-reduced-motion
const prefersReducedMotion = properties.find(p => p.id === 'prefers-reduced-motion');
if (prefersReducedMotion && !prefersReducedMotion.category) {
  prefersReducedMotion.category = 'レスポンシブ・関数';
  updates.push('prefers-reduced-motion → レスポンシブ・関数');
}

// 6. focus-visible
const focusVisible = properties.find(p => p.id === 'focus-visible');
if (focusVisible && !focusVisible.category) {
  focusVisible.category = '擬似クラス';
  updates.push('focus-visible → 擬似クラス');
}

// 7. logical-properties
const logicalProperties = properties.find(p => p.id === 'logical-properties');
if (logicalProperties && !logicalProperties.category) {
  logicalProperties.category = 'レイアウト・配置';
  updates.push('logical-properties → レイアウト・配置');
}

// 8. :nth-child
const nthChild = properties.find(p => p.id === ':nth-child');
if (nthChild && !nthChild.category) {
  nthChild.category = '擬似クラス';
  updates.push(':nth-child → 擬似クラス');
}

// Save
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

console.log('追加したカテゴリ:');
updates.forEach(u => console.log(`  ✓ ${u}`));
console.log(`\n総更新数: ${updates.length}件`);
console.log('✓ src/data/cssProperties.json updated');
console.log('✓ public/data/cssProperties.json updated');
