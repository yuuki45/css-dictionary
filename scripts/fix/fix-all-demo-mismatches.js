const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== Fixing All Demo/Example Mismatches ===\n');

// Fix text-align - remove extra example (left)
const textAlign = properties.find(p => p.id === 'text-align');
if (textAlign) {
  textAlign.examples = [
    { "code": "text-align: left;", "description": "左揃え（デフォルト）" },
    { "code": "text-align: center;", "description": "中央揃え" },
    { "code": "text-align: justify;", "description": "両端揃え" },
    { "code": "text-align: right;", "description": "右揃え" }
  ];
  console.log('✓ text-align: Updated to 4 examples matching demos');
}

// Fix object-position - match actual demo values
const objectPosition = properties.find(p => p.id === 'object-position');
if (objectPosition) {
  objectPosition.examples = [
    { "code": "object-position: center;", "description": "画像を中央に配置（デフォルト）" },
    { "code": "object-position: top left;", "description": "画像を左上に配置" },
    { "code": "object-position: bottom right;", "description": "画像を右下に配置" }
  ];
  console.log('✓ object-position: Updated to 3 examples matching demos');
}

// Fix align-self - update to match demos
const alignSelf = properties.find(p => p.id === 'align-self');
if (alignSelf) {
  alignSelf.examples = [
    { "code": "align-self: flex-start;", "description": "交差軸の開始位置に配置" },
    { "code": "align-self: flex-end;", "description": "交差軸の終了位置に配置" },
    { "code": "align-self: stretch;", "description": "交差軸方向に伸縮（デフォルト）" }
  ];
  console.log('✓ align-self: Updated to 3 examples matching demos');
}

// Fix justify-self - update to match demos
const justifySelf = properties.find(p => p.id === 'justify-self');
if (justifySelf) {
  justifySelf.examples = [
    { "code": "justify-self: start;", "description": "セルの開始位置に配置" },
    { "code": "justify-self: center;", "description": "セルの中央に配置" },
    { "code": "justify-self: end;", "description": "セルの終了位置に配置" }
  ];
  console.log('✓ justify-self: Updated to 3 examples matching demos');
}

// Fix grid-column - match actual demos
const gridColumn = properties.find(p => p.id === 'grid-column');
if (gridColumn) {
  gridColumn.examples = [
    { "code": "grid-column: span 2;", "description": "2列分の幅を占める" },
    { "code": "grid-column: 1 / 4;", "description": "1列目から4列目まで" }
  ];
  console.log('✓ grid-column: Updated to 2 examples matching demos');
}

// Fix grid-row - match actual demos
const gridRow = properties.find(p => p.id === 'grid-row');
if (gridRow) {
  gridRow.examples = [
    { "code": "grid-row: span 2;", "description": "2行分の高さを占める" },
    { "code": "grid-row: 1 / 4;", "description": "1行目から4行目まで" }
  ];
  console.log('✓ grid-row: Updated to 2 examples matching demos');
}

// Fix mix-blend-mode - match actual demos
const mixBlendMode = properties.find(p => p.id === 'mix-blend-mode');
if (mixBlendMode) {
  mixBlendMode.examples = [
    { "code": "mix-blend-mode: multiply;", "description": "乗算合成（暗くなる）" },
    { "code": "mix-blend-mode: screen;", "description": "スクリーン合成（明るくなる）" },
    { "code": "mix-blend-mode: difference;", "description": "差の絶対値合成" }
  ];
  console.log('✓ mix-blend-mode: Updated to 3 examples matching demos');
}

// Fix background-blend-mode - match actual demos
const backgroundBlendMode = properties.find(p => p.id === 'background-blend-mode');
if (backgroundBlendMode) {
  backgroundBlendMode.examples = [
    { "code": "background-blend-mode: multiply;", "description": "背景画像を乗算合成" },
    { "code": "background-blend-mode: screen;", "description": "背景画像をスクリーン合成" }
  ];
  console.log('✓ background-blend-mode: Updated to 2 examples matching demos');
}

// Fix inset - match actual demos
const inset = properties.find(p => p.id === 'inset');
if (inset) {
  inset.examples = [
    { "code": "inset: 20px;", "description": "全方向から20px" },
    { "code": "inset: 10px 30px;", "description": "上下10px、左右30px" },
    { "code": "inset: auto 10px 10px auto;", "description": "右10px、下10px（左上は自動）" }
  ];
  console.log('✓ inset: Updated to 3 examples matching demos');
}

// Save to both locations
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
console.log('\n✓ src/data/cssProperties.json updated');

const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.json updated');

console.log('\n=== All mismatches fixed! ===');
