// tools/reclassify.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/cssProperties.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// 9分類のキーワードマッピング
const categoryMap = [
  { name: 'アニメーション・エフェクト', keywords: ['アニメーション', 'エフェクト', 'transform', 'transition', 'keyframes', 'shadow', 'opacity', 'filter', 'backdrop'] },
  { name: 'インタラクション・UX', keywords: ['インタラクション', 'cursor', 'user-select', 'pointer', 'scroll-behavior', 'scroll-snap', 'visibility'] },
  { name: 'スペーシング・サイズ', keywords: ['スペーシング', 'サイズ', 'margin', 'padding', 'width', 'height', 'gap', 'box-sizing', 'min-', 'max-'] },
  { name: 'テキスト・フォント', keywords: ['テキスト', 'フォント', 'color', 'font', 'line-height', 'text-', 'letter-spacing', 'word-break'] },
  { name: 'レイアウト・配置', keywords: ['レイアウト', '配置', 'display', 'position', 'top', 'right', 'bottom', 'left', 'z-index', 'float', 'clear', 'overflow', 'flex', 'grid', 'align', 'justify'] },
  { name: 'レスポンシブ・関数', keywords: ['レスポンシブ', '関数', 'media', 'container', 'clamp', 'min(', 'max(', 'calc', 'aspect-ratio', 'object-fit'] },
  { name: '擬似クラス', keywords: [':hover', ':active', ':focus', ':visited', ':first-child', ':last-child', ':nth-child', '擬似'] },
  { name: '背景・装飾', keywords: ['背景', '装飾', 'background', 'border', 'gradient', 'box-shadow'] },
];

function classify(prop) {
  // name, id, category, description すべてを対象に判定
  const text = [prop.name, prop.id, prop.category, prop.description].join(' ').toLowerCase();
  for (const cat of categoryMap) {
    if (cat.keywords.some(kw => text.includes(kw.toLowerCase()))) {
      return cat.name;
    }
  }
  return 'その他';
}

const newData = data.map(prop => ({
  ...prop,
  category: classify(prop)
}));

fs.writeFileSync(filePath, JSON.stringify(newData, null, 2), 'utf-8');
console.log('カテゴリ再分類が完了しました！');
