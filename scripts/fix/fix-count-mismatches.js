const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== Fixing Count Mismatches ===\n');

// Fix container-type: 2 demos vs 3 examples -> Keep 2 examples to match demos
const containerType = properties.find(p => p.id === 'container-type');
if (containerType && containerType.examples.length === 3) {
  containerType.examples = [
    { "code": "container-type: inline-size;", "description": "インライン方向のサイズ（幅）を監視" },
    { "code": "container-type: size;", "description": "両方向のサイズ（幅と高さ）を監視" }
  ];
  console.log('✓ container-type: Updated to 2 examples matching demos');
}

// Fix aspect-ratio: 6 demos vs 3 examples -> Keep 3 examples, reduce to main use cases
const aspectRatio = properties.find(p => p.id === 'aspect-ratio');
if (aspectRatio && aspectRatio.examples.length === 3) {
  aspectRatio.examples = [
    { "code": "aspect-ratio: 16 / 9;", "description": "16:9の横長比率" },
    { "code": "aspect-ratio: 1 / 1;", "description": "正方形" },
    { "code": "aspect-ratio: 4 / 3;", "description": "4:3の比率" },
    { "code": "aspect-ratio: 3 / 4;", "description": "3:4の縦長比率" },
    { "code": "aspect-ratio: 21 / 9;", "description": "21:9のワイド比率" },
    { "code": "aspect-ratio: 9 / 16;", "description": "9:16のモバイル縦長比率" }
  ];
  console.log('✓ aspect-ratio: Updated to 6 examples matching demos');
}

// Fix z-index: 2 demos vs 3 examples -> Keep 2 examples
const zIndex = properties.find(p => p.id === 'z-index');
if (zIndex && zIndex.examples.length === 3) {
  zIndex.examples = [
    { "code": "z-index: 1;", "description": "通常レイヤー（1段上）" },
    { "code": "z-index: 10;", "description": "上位レイヤー（10段上）" }
  ];
  console.log('✓ z-index: Updated to 2 examples matching demos');
}

// Fix pointer-events: 2 demos vs 3 examples -> Keep 2 examples
const pointerEvents = properties.find(p => p.id === 'pointer-events');
if (pointerEvents && pointerEvents.examples.length === 3) {
  pointerEvents.examples = [
    { "code": "pointer-events: none;", "description": "マウスイベントを無効化" },
    { "code": "pointer-events: auto;", "description": "マウスイベントを有効化（デフォルト）" }
  ];
  console.log('✓ pointer-events: Updated to 2 examples matching demos');
}

// Fix pseudo-hover: 2 demos vs 1 examples -> Add 1 more example
const pseudoHover = properties.find(p => p.id === 'pseudo-hover');
if (pseudoHover && pseudoHover.examples.length === 1) {
  pseudoHover.examples = [
    { "code": "button:hover { background-color: blue; }", "description": "ボタンホバー時に背景色を変更" },
    { "code": "a:hover { text-decoration: underline; }", "description": "リンクホバー時に下線を表示" }
  ];
  console.log('✓ pseudo-hover: Updated to 2 examples matching demos');
}

// Fix scroll-behavior: 2 demos vs 3 examples -> Keep 2 examples
const scrollBehavior = properties.find(p => p.id === 'scroll-behavior');
if (scrollBehavior && scrollBehavior.examples.length === 3) {
  scrollBehavior.examples = [
    { "code": "scroll-behavior: auto;", "description": "即座にスクロール（デフォルト）" },
    { "code": "scroll-behavior: smooth;", "description": "滑らかにスクロール" }
  ];
  console.log('✓ scroll-behavior: Updated to 2 examples matching demos');
}

// Save to both locations
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
console.log('\n✓ src/data/cssProperties.json updated');

const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');
console.log('✓ public/data/cssProperties.json updated');

console.log('\n=== All count mismatches fixed! ===');
