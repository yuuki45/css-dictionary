const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/PropertyDetail.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 新しいビジュアルデモを追加するコード
const newDemos = `      "object-position": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="w-64 h-40 bg-gray-300 dark:bg-gray-600 relative overflow-hidden rounded">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%233b82f6' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white'%3EImg%3C/text%3E%3C/svg%3E"
                alt="Demo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">画像を中央に配置</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="w-64 h-40 bg-gray-300 dark:bg-gray-600 relative overflow-hidden rounded">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%2310b981' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white'%3EImg%3C/text%3E%3C/svg%3E"
                alt="Demo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top right"
                }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">画像を右上に配置</div>
          </div>
        ),
      },
      "text-transform": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-2">
            <div className="text-blue-600 dark:text-blue-400 font-medium" style={{ textTransform: "uppercase" }}>
              hello world!
            </div>
            <div className="text-xs text-gray-500">すべて大文字に変換</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-2">
            <div className="text-green-600 dark:text-green-400 font-medium" style={{ textTransform: "lowercase" }}>
              HELLO WORLD!
            </div>
            <div className="text-xs text-gray-500">すべて小文字に変換</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-2">
            <div className="text-purple-600 dark:text-purple-400 font-medium" style={{ textTransform: "capitalize" }}>
              hello world from tokyo
            </div>
            <div className="text-xs text-gray-500">各単語の先頭を大文字に</div>
          </div>
        ),
      },
      "outline": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              style={{ outline: "2px solid #3b82f6", outlineOffset: "4px" }}
            >
              フォーカスボタン
            </button>
            <div className="text-xs text-gray-500 mt-2">青色のアウトラインと4pxのオフセット</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="w-32 h-32 bg-green-500 rounded-lg"
              style={{ outline: "3px dashed #ef4444", outlineOffset: "2px" }}
            />
            <div className="text-xs text-gray-500 mt-2">赤色の破線アウトライン</div>
          </div>
        ),
      },
      "vertical-align": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-lg">
              テキスト<img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%233b82f6'/%3E%3C/svg%3E"
                alt="icon"
                style={{ verticalAlign: "middle", width: "24px", height: "24px" }}
                className="inline mx-1"
              />中央揃え
            </div>
            <div className="text-xs text-gray-500 mt-2">アイコンがテキストの中央に揃う</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-lg">
              テキスト<img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%2310b981'/%3E%3C/svg%3E"
                alt="icon"
                style={{ verticalAlign: "top", width: "24px", height: "24px" }}
                className="inline mx-1"
              />上揃え
            </div>
            <div className="text-xs text-gray-500 mt-2">アイコンがテキストの上に揃う</div>
          </div>
        ),
      },
      "mix-blend-mode": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="relative w-64 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded">
              <div
                className="absolute top-8 left-8 w-32 h-16 bg-yellow-400 rounded"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">乗算モード（暗くなる）</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="relative w-64 h-32 bg-gradient-to-r from-blue-900 to-purple-900 rounded">
              <div
                className="absolute top-8 left-8 w-32 h-16 bg-yellow-400 rounded"
                style={{ mixBlendMode: "screen" }}
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">スクリーンモード（明るくなる）</div>
          </div>
        ),
      },
      "background-blend-mode": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div
              className="w-64 h-32 rounded"
              style={{
                background: "linear-gradient(45deg, rgba(59, 130, 246, 0.8), rgba(168, 85, 247, 0.8)), linear-gradient(135deg, #10b981, #3b82f6)",
                backgroundBlendMode: "multiply"
              }}
            />
            <div className="text-xs text-gray-500 mt-2">背景レイヤーを乗算</div>
          </div>
        ),
      },
      "caret-color": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <input
              type="text"
              placeholder="カーソルが赤色"
              className="px-3 py-2 border rounded w-full"
              style={{ caretColor: "#ef4444" }}
            />
            <div className="text-xs text-gray-500 mt-2">入力フィールドのカーソルを赤色に</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <input
              type="text"
              placeholder="カーソルが青色"
              className="px-3 py-2 border rounded w-full"
              style={{ caretColor: "#3b82f6" }}
            />
            <div className="text-xs text-gray-500 mt-2">入力フィールドのカーソルを青色に</div>
          </div>
        ),
      },
      "appearance": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div>
              <div className="text-sm mb-1">デフォルト:</div>
              <input type="checkbox" id="default-check" />
              <label htmlFor="default-check" className="ml-2">チェックボックス</label>
            </div>
            <div>
              <div className="text-sm mb-1">appearance: none:</div>
              <input
                type="checkbox"
                id="custom-check"
                style={{ appearance: "none", width: "20px", height: "20px", border: "2px solid #3b82f6", borderRadius: "4px" }}
              />
              <label htmlFor="custom-check" className="ml-2">カスタムスタイル</label>
            </div>
            <div className="text-xs text-gray-500 mt-2">appearance: noneでネイティブスタイルを無効化</div>
          </div>
        ),
      },
      "resize": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <textarea
              className="w-full border rounded px-3 py-2"
              style={{ resize: "vertical", minHeight: "60px" }}
              placeholder="縦方向にリサイズ可能"
            />
            <div className="text-xs text-gray-500 mt-2">右下をドラッグして縦方向にリサイズ</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <textarea
              className="w-full border rounded px-3 py-2"
              style={{ resize: "both", minHeight: "60px" }}
              placeholder="縦横両方向にリサイズ可能"
            />
            <div className="text-xs text-gray-500 mt-2">右下をドラッグして自由にリサイズ</div>
          </div>
        ),
      },
      "align-self": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="flex h-32 gap-2 border-2 border-dashed border-gray-400 p-2">
              <div className="bg-blue-500 text-white px-4 py-2 text-sm">Normal</div>
              <div className="bg-green-500 text-white px-4 py-2 text-sm self-start">flex-start</div>
              <div className="bg-purple-500 text-white px-4 py-2 text-sm self-center">center</div>
              <div className="bg-pink-500 text-white px-4 py-2 text-sm self-end">flex-end</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">各アイテムが個別に配置される</div>
          </div>
        ),
      },
      "justify-self": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-3 gap-2 border-2 border-dashed border-gray-400 p-2">
              <div className="bg-blue-500 text-white px-3 py-2 text-sm text-center">Normal</div>
              <div className="bg-green-500 text-white px-3 py-2 text-sm justify-self-start">start</div>
              <div className="bg-purple-500 text-white px-3 py-2 text-sm justify-self-center">center</div>
              <div className="bg-pink-500 text-white px-3 py-2 text-sm justify-self-end">end</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">Gridアイテムが個別に横位置を調整</div>
          </div>
        ),
      },
      "grid-column": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-2 bg-blue-500 text-white px-3 py-2 text-sm text-center">col-span-2</div>
              <div className="bg-green-500 text-white px-3 py-2 text-sm text-center">1列</div>
              <div className="bg-purple-500 text-white px-3 py-2 text-sm text-center">1列</div>
              <div className="col-span-4 bg-pink-500 text-white px-3 py-2 text-sm text-center">col-span-4 (全列)</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">アイテムが複数列を占有</div>
          </div>
        ),
      },
      "grid-row": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="grid grid-rows-3 grid-cols-3 gap-2 h-48">
              <div className="row-span-2 bg-blue-500 text-white px-3 py-2 text-sm flex items-center justify-center">row-span-2</div>
              <div className="bg-green-500 text-white px-3 py-2 text-sm flex items-center justify-center">1行</div>
              <div className="row-span-3 bg-purple-500 text-white px-3 py-2 text-sm flex items-center justify-center">row-span-3</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">アイテムが複数行を占有</div>
          </div>
        ),
      },
      "scroll-snap-type": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="overflow-x-auto flex gap-2 p-2" style={{ scrollSnapType: "x mandatory" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48 h-32 bg-blue-500 text-white flex items-center justify-center text-2xl rounded"
                  style={{ scrollSnapAlign: "start" }}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">横スクロールで各アイテムにスナップ</div>
          </div>
        ),
      },
      "scroll-snap-align": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="overflow-x-auto flex gap-2 p-2" style={{ scrollSnapType: "x mandatory" }}>
              {["start", "center", "end"].map((align, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48 h-32 bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center rounded"
                  style={{ scrollSnapAlign: align }}
                >
                  {align}
                </div>
              ))}
            </div>
            <div className="text-xs text-gray-500 mt-2">各アイテムが異なる位置でスナップ</div>
          </div>
        ),
      },
`;

// 挿入位置を探す（};の前）
const insertMarker = '    };\n\n    return examples[propertyId]?.[exampleIndex] || null;';
const insertPosition = content.indexOf(insertMarker);

if (insertPosition === -1) {
  console.error('❌ 挿入位置が見つかりませんでした');
  process.exit(1);
}

// 新しいデモを挿入
const before = content.substring(0, insertPosition);
const after = content.substring(insertPosition);
const newContent = before + newDemos + '\n' + after;

// ファイルに書き込み
fs.writeFileSync(filePath, newContent, 'utf8');

console.log('✓ 14個の新しいビジュアルデモを追加しました：');
console.log('  - object-position');
console.log('  - text-transform');
console.log('  - outline');
console.log('  - vertical-align');
console.log('  - mix-blend-mode');
console.log('  - background-blend-mode');
console.log('  - caret-color');
console.log('  - appearance');
console.log('  - resize');
console.log('  - align-self');
console.log('  - justify-self');
console.log('  - grid-column');
console.log('  - grid-row');
console.log('  - scroll-snap-type');
console.log('  - scroll-snap-align');
