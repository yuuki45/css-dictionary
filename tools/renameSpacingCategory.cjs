const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/cssProperties.json');
const json = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

let changed = false;
json.forEach(prop => {
  if (prop.category === 'スペーシング・サイズ') {
    prop.category = 'スペーシング';
    changed = true;
  }
});

if (changed) {
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf-8');
  console.log('カテゴリー名「スペーシング・サイズ」を「スペーシング」に一括変換しました。');
} else {
  console.log('該当するカテゴリーはありませんでした。');
}
