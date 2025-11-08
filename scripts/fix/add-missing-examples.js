const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'cssProperties.json');
const properties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log('=== ビジュアルデモに対応するコード例を追加 ===\n');

// Check which properties exist and add examples
const updates = [];

// 1. scroll-snap
let scrollSnap = properties.find(p => p.id === 'scroll-snap');
if (!scrollSnap) {
  scrollSnap = {
    "id": "scroll-snap",
    "name": "scroll-snap",
    "description": "スクロールスナップを使用してスムーズなスクロール体験を提供します。scroll-snap-typeとscroll-snap-alignを組み合わせて使用します。",
    "examples": [
      { "code": "scroll-snap-type: x mandatory;", "description": "水平方向に必須スナップ" },
      { "code": "scroll-snap-align: center;", "description": "要素を中央にスナップ" }
    ],
    "syntax": "scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ]",
    "tips": "カルーセルやフォトギャラリーに最適",
    "relatedProperties": ["scroll-snap-type", "scroll-snap-align", "scroll-margin"],
    "browserSupport": "Modern browsers"
  };
  properties.push(scrollSnap);
  updates.push('scroll-snap (新規追加)');
} else if (!scrollSnap.examples || scrollSnap.examples.length === 0) {
  scrollSnap.examples = [
    { "code": "scroll-snap-type: x mandatory;", "description": "水平方向に必須スナップ" },
    { "code": "scroll-snap-align: center;", "description": "要素を中央にスナップ" }
  ];
  updates.push('scroll-snap (例追加)');
}

// 2. position-sticky
let positionSticky = properties.find(p => p.id === 'position-sticky');
if (!positionSticky) {
  positionSticky = {
    "id": "position-sticky",
    "name": "position: sticky",
    "description": "スクロール位置に応じて、通常のフローとfixedの間で切り替わる配置方法です。指定した位置に到達するまで通常配置、到達後は固定されます。",
    "examples": [
      { "code": "position: sticky; top: 0;", "description": "上端に到達したら固定" },
      { "code": "position: sticky; top: 20px;", "description": "上から20pxの位置で固定" }
    ],
    "syntax": "position: sticky; top | right | bottom | left: <length>",
    "tips": "親要素にoverflow: hiddenがあると動作しない",
    "relatedProperties": ["position", "top", "z-index"],
    "browserSupport": "Modern browsers"
  };
  properties.push(positionSticky);
  updates.push('position-sticky (新規追加)');
}

// 3. color-scheme
let colorScheme = properties.find(p => p.id === 'color-scheme');
if (!colorScheme) {
  colorScheme = {
    "id": "color-scheme",
    "name": "color-scheme",
    "description": "要素がどのカラースキーム（ライト/ダーク）で表示されるかを示します。ブラウザのフォーム要素などのデフォルトスタイルに影響します。",
    "examples": [
      { "code": "color-scheme: light dark;", "description": "ライト・ダーク両対応" },
      { "code": "color-scheme: dark;", "description": "ダークモードのみ" }
    ],
    "syntax": "color-scheme: normal | [ light | dark | <custom-ident> ]+",
    "tips": "ブラウザのフォーム要素の外観も変わる",
    "relatedProperties": ["prefers-color-scheme"],
    "browserSupport": "Modern browsers"
  };
  properties.push(colorScheme);
  updates.push('color-scheme (新規追加)');
}

// 4. prefers-color-scheme
let prefersColorScheme = properties.find(p => p.id === 'prefers-color-scheme');
if (!prefersColorScheme) {
  prefersColorScheme = {
    "id": "prefers-color-scheme",
    "name": "@media (prefers-color-scheme)",
    "description": "ユーザーのシステム設定がライトモードかダークモードかを検出するメディアクエリです。",
    "examples": [
      { "code": "@media (prefers-color-scheme: dark) { body { background: black; } }", "description": "ダークモード時のスタイル" },
      { "code": "@media (prefers-color-scheme: light) { body { background: white; } }", "description": "ライトモード時のスタイル" }
    ],
    "syntax": "@media (prefers-color-scheme: light | dark)",
    "tips": "OSやブラウザのテーマ設定を自動検出",
    "relatedProperties": ["color-scheme"],
    "browserSupport": "Modern browsers"
  };
  properties.push(prefersColorScheme);
  updates.push('prefers-color-scheme (新規追加)');
}

// 5. prefers-reduced-motion
let prefersReducedMotion = properties.find(p => p.id === 'prefers-reduced-motion');
if (!prefersReducedMotion) {
  prefersReducedMotion = {
    "id": "prefers-reduced-motion",
    "name": "@media (prefers-reduced-motion)",
    "description": "ユーザーがアニメーションを減らす設定を有効にしているかを検出するメディアクエリです。アクセシビリティ向上に重要です。",
    "examples": [
      { "code": "@media (prefers-reduced-motion: reduce) { * { animation: none; } }", "description": "アニメーションを無効化" },
      { "code": "@media (prefers-reduced-motion: no-preference) { .box { transition: all 0.3s; } }", "description": "通常のアニメーション" }
    ],
    "syntax": "@media (prefers-reduced-motion: no-preference | reduce)",
    "tips": "アクセシビリティのベストプラクティス",
    "relatedProperties": ["animation", "transition"],
    "browserSupport": "Modern browsers"
  };
  properties.push(prefersReducedMotion);
  updates.push('prefers-reduced-motion (新規追加)');
}

// 6. focus-visible
let focusVisible = properties.find(p => p.id === 'focus-visible');
if (!focusVisible) {
  focusVisible = {
    "id": "focus-visible",
    "name": ":focus-visible",
    "description": "キーボード操作などでフォーカスが可視化されるべき時のみマッチする疑似クラスです。マウスクリックではマッチしません。",
    "examples": [
      { "code": "button:focus-visible { outline: 2px solid blue; }", "description": "キーボードフォーカス時のみアウトライン表示" },
      { "code": ":focus-visible { box-shadow: 0 0 0 3px rgba(0,0,255,0.3); }", "description": "キーボードナビゲーション時のハイライト" }
    ],
    "syntax": ":focus-visible",
    "tips": "アクセシビリティと見た目の両立に最適",
    "relatedProperties": ["focus", "outline"],
    "browserSupport": "Modern browsers"
  };
  properties.push(focusVisible);
  updates.push('focus-visible (新規追加)');
}

// 7. logical-properties
let logicalProperties = properties.find(p => p.id === 'logical-properties');
if (!logicalProperties) {
  logicalProperties = {
    "id": "logical-properties",
    "name": "Logical Properties",
    "description": "書字方向（横書き・縦書き）に依存しない論理的なプロパティです。margin-inline-start、padding-block-endなど、方向に中立的な指定が可能です。",
    "examples": [
      { "code": "margin-inline-start: 20px;", "description": "テキスト開始側にマージン（横書きなら左、縦書きなら上）" },
      { "code": "padding-block: 10px 20px;", "description": "ブロック方向のパディング（横書きなら上下）" }
    ],
    "syntax": "margin-inline | margin-block | padding-inline | padding-block | inset-inline | inset-block",
    "tips": "国際化対応に最適。RTL言語でも自動対応",
    "relatedProperties": ["writing-mode", "direction"],
    "browserSupport": "Modern browsers"
  };
  properties.push(logicalProperties);
  updates.push('logical-properties (新規追加)');
}

// 8. :nth-child
let nthChild = properties.find(p => p.id === ':nth-child');
if (!nthChild) {
  nthChild = {
    "id": ":nth-child",
    "name": ":nth-child()",
    "description": "親要素内でn番目の子要素を選択する疑似クラスです。数式やキーワード（odd/even）を使用できます。",
    "examples": [
      { "code": "li:nth-child(odd) { background: #f0f0f0; }", "description": "奇数番目の要素" },
      { "code": "div:nth-child(3n) { color: blue; }", "description": "3の倍数番目の要素" }
    ],
    "syntax": ":nth-child(an+b) | :nth-child(odd) | :nth-child(even)",
    "tips": "リストやテーブルの交互の色付けに便利",
    "relatedProperties": ["nth-of-type", "nth-last-child"],
    "browserSupport": "All browsers"
  };
  properties.push(nthChild);
  updates.push(':nth-child (新規追加)');
}

// Save
fs.writeFileSync(filePath, JSON.stringify(properties, null, 2), 'utf8');
const publicPath = path.join(__dirname, 'public', 'data', 'cssProperties.json');
fs.writeFileSync(publicPath, JSON.stringify(properties, null, 2), 'utf8');

console.log('更新内容:');
updates.forEach(u => console.log(`  ✓ ${u}`));
console.log(`\n総更新数: ${updates.length}件`);
console.log('✓ src/data/cssProperties.json updated');
console.log('✓ public/data/cssProperties.json updated');
