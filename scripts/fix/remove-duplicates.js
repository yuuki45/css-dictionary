const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== 重複プロパティを削除 ===\n');

const before = properties.length;

// Remove focus-visible (keep pseudo-focus-visible)
const focusVisibleIndex = properties.findIndex(p => p.id === 'focus-visible');
if (focusVisibleIndex !== -1) {
  properties.splice(focusVisibleIndex, 1);
  console.log('✓ focus-visible を削除 (pseudo-focus-visible が既存)');
}

// Remove :nth-child (keep pseudo-nth-child)
const nthChildIndex = properties.findIndex(p => p.id === ':nth-child');
if (nthChildIndex !== -1) {
  properties.splice(nthChildIndex, 1);
  console.log('✓ :nth-child を削除 (pseudo-nth-child が既存)');
}

const after = properties.length;

// Save
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

console.log(`\n削除前: ${before}件`);
console.log(`削除後: ${after}件`);
console.log(`削除数: ${before - after}件`);
console.log('\n✓ src/data/cssProperties.json updated');
console.log('✓ public/data/cssProperties.json updated');
