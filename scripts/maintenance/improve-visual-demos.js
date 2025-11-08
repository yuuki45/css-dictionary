const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'components', 'PropertyDetail.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 改善されたビジュアルデモ
const improvedDemos = `
      // 改善: より明確な視覚デモ
      "border-radius": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold" style={{ borderRadius: "0px" }}>
              0px
            </div>
            <div className="text-xs text-gray-500">角の丸みなし（デフォルト）</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold" style={{ borderRadius: "16px" }}>
              16px
            </div>
            <div className="text-xs text-gray-500">中程度の丸み</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold" style={{ borderRadius: "50%" }}>
              50%
            </div>
            <div className="text-xs text-gray-500">完全な円形</div>
          </div>
        ),
      },
      "opacity": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="relative h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 text-white px-6 py-4 font-bold text-lg" style={{ opacity: 1 }}>
                  opacity: 1
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">完全に不透明</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="relative h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 text-white px-6 py-4 font-bold text-lg" style={{ opacity: 0.5 }}>
                  opacity: 0.5
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">半透明（背景が透けて見える）</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="relative h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-600 text-white px-6 py-4 font-bold text-lg" style={{ opacity: 0.1 }}>
                  opacity: 0.1
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">ほぼ透明（うっすらと見える）</div>
          </div>
        ),
      },
      "text-align": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-4 border-2 border-blue-300" style={{ textAlign: "left" }}>
              <div className="text-blue-600 dark:text-blue-400 font-bold">左揃え</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">これはテキストの配置サンプルです。</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">text-align: left（デフォルト）</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-4 border-2 border-green-300" style={{ textAlign: "center" }}>
              <div className="text-green-600 dark:text-green-400 font-bold">中央揃え</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">これはテキストの配置サンプルです。</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">text-align: center</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="bg-white dark:bg-gray-800 p-4 border-2 border-purple-300" style={{ textAlign: "right" }}>
              <div className="text-purple-600 dark:text-purple-400 font-bold">右揃え</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">これはテキストの配置サンプルです。</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">text-align: right</div>
          </div>
        ),
      },
      "font-weight": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-2xl text-gray-700 dark:text-gray-200" style={{ fontWeight: 300 }}>
              軽い文字 (300)
            </div>
            <div className="text-xs text-gray-500 mt-2">font-weight: 300 - Light</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-2xl text-gray-700 dark:text-gray-200" style={{ fontWeight: 400 }}>
              通常の文字 (400)
            </div>
            <div className="text-xs text-gray-500 mt-2">font-weight: 400 - Normal</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-2xl text-gray-700 dark:text-gray-200" style={{ fontWeight: 700 }}>
              太い文字 (700)
            </div>
            <div className="text-xs text-gray-500 mt-2">font-weight: 700 - Bold</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-2xl text-gray-700 dark:text-gray-200" style={{ fontWeight: 900 }}>
              最も太い文字 (900)
            </div>
            <div className="text-xs text-gray-500 mt-2">font-weight: 900 - Black</div>
          </div>
        ),
      },
      "letter-spacing": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-xl text-gray-800 dark:text-gray-200" style={{ letterSpacing: "-0.05em" }}>
              詰まった文字間隔
            </div>
            <div className="text-xs text-gray-500 mt-2">letter-spacing: -0.05em（文字が詰まる）</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-xl text-gray-800 dark:text-gray-200" style={{ letterSpacing: "0em" }}>
              通常の文字間隔
            </div>
            <div className="text-xs text-gray-500 mt-2">letter-spacing: 0em（デフォルト）</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-xl text-gray-800 dark:text-gray-200" style={{ letterSpacing: "0.1em" }}>
              広い文字間隔
            </div>
            <div className="text-xs text-gray-500 mt-2">letter-spacing: 0.1em（文字が広がる）</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="text-xl text-gray-800 dark:text-gray-200" style={{ letterSpacing: "0.2em" }}>
              とても広い文字間隔
            </div>
            <div className="text-xs text-gray-500 mt-2">letter-spacing: 0.2em（さらに広がる）</div>
          </div>
        ),
      },
      "cursor": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded" style={{ cursor: "pointer" }}>
              マウスを乗せてください（pointer）
            </button>
            <div className="text-xs text-gray-500">cursor: pointer - クリック可能</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-full px-4 py-3 bg-gray-400 text-gray-700 font-medium rounded" style={{ cursor: "not-allowed" }}>
              マウスを乗せてください（not-allowed）
            </div>
            <div className="text-xs text-gray-500">cursor: not-allowed - 操作不可</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-full px-4 py-3 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-medium rounded border-2 border-green-300" style={{ cursor: "text" }}>
              マウスを乗せてください（text）
            </div>
            <div className="text-xs text-gray-500">cursor: text - テキスト選択</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border space-y-3">
            <div className="w-full px-4 py-3 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-medium rounded border-2 border-purple-300" style={{ cursor: "move" }}>
              マウスを乗せてください（move）
            </div>
            <div className="text-xs text-gray-500">cursor: move - 移動可能</div>
          </div>
        ),
      },
      "box-shadow": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-40 h-24 bg-white dark:bg-gray-800 rounded flex items-center justify-center font-medium" style={{ boxShadow: "none" }}>
              影なし
            </div>
            <div className="text-xs text-gray-500 mt-2">box-shadow: none</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-40 h-24 bg-white dark:bg-gray-800 rounded flex items-center justify-center font-medium" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              軽い影
            </div>
            <div className="text-xs text-gray-500 mt-2">軽い影（ぼかし4px）</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-40 h-24 bg-white dark:bg-gray-800 rounded flex items-center justify-center font-medium" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
              中程度の影
            </div>
            <div className="text-xs text-gray-500 mt-2">中程度の影（ぼかし12px）</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-40 h-24 bg-white dark:bg-gray-800 rounded flex items-center justify-center font-medium" style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
              強い影
            </div>
            <div className="text-xs text-gray-500 mt-2">強い影（ぼかし30px）</div>
          </div>
        ),
      },
      "transform": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" style={{ transform: "rotate(0deg)" }}>
              0°
            </div>
            <div className="text-xs text-gray-500 mt-2">回転なし</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" style={{ transform: "rotate(15deg)" }}>
              15°
            </div>
            <div className="text-xs text-gray-500 mt-2">15度回転</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" style={{ transform: "scale(1.3)" }}>
              130%
            </div>
            <div className="text-xs text-gray-500 mt-2">1.3倍に拡大</div>
          </div>
        ),
        3: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg" style={{ transform: "skewX(-10deg)" }}>
              傾斜
            </div>
            <div className="text-xs text-gray-500 mt-2">X軸に-10度傾斜</div>
          </div>
        ),
      },
      "overflow": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="w-48 h-24 bg-white dark:bg-gray-800 border-2 border-blue-500 p-2" style={{ overflow: "visible" }}>
              <div className="text-sm">
                これは長いテキストです。要素からはみ出しても表示されます。これは長いテキストです。これは長いテキストです。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">overflow: visible（はみ出す）</div>
          </div>
        ),
        1: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="w-48 h-24 bg-white dark:bg-gray-800 border-2 border-red-500 p-2" style={{ overflow: "hidden" }}>
              <div className="text-sm">
                これは長いテキストです。要素からはみ出した部分は隠されます。これは長いテキストです。これは長いテキストです。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">overflow: hidden（隠す）</div>
          </div>
        ),
        2: (
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded border">
            <div className="w-48 h-24 bg-white dark:bg-gray-800 border-2 border-green-500 p-2" style={{ overflow: "scroll" }}>
              <div className="text-sm">
                これは長いテキストです。スクロールバーが表示されます。これは長いテキストです。これは長いテキストです。
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">overflow: scroll（スクロール）</div>
          </div>
        ),
      },
      "z-index": {
        0: (
          <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded border">
            <div className="relative h-40">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold" style={{ zIndex: 1 }}>
                z-index: 1
              </div>
              <div className="absolute top-8 left-12 w-32 h-32 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold" style={{ zIndex: 2 }}>
                z-index: 2
              </div>
              <div className="absolute top-16 left-24 w-32 h-32 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold" style={{ zIndex: 3 }}>
                z-index: 3
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">値が大きいほど手前に表示される</div>
          </div>
        ),
      },`;

// 既存のデモを削除して新しいデモを挿入
const demoProperties = [
  'border-radius',
  'opacity',
  'text-align',
  'font-weight',
  'letter-spacing',
  'cursor',
  'box-shadow',
  'transform',
  'overflow',
  'z-index'
];

// 各プロパティの既存デモを検索して置換
demoProperties.forEach(prop => {
  const regex = new RegExp(`"${prop}":\\s*\\{[\\s\\S]*?\\},(?=\\s*(?:"[a-z-]+"|\\}\\s*;\\s*return))`, 'g');
  const match = content.match(regex);
  if (match) {
    console.log(`✓ Found existing demo for: ${prop}`);
  }
});

// improvedDemosを挿入する位置を見つける
const insertMarker = 'const examples: { [key: string]: { [key: number]: JSX.Element } } = {';
const insertPosition = content.indexOf(insertMarker);

if (insertPosition !== -1) {
  const afterMarker = content.indexOf('{', insertPosition) + 1;

  // 各プロパティの既存デモを削除
  demoProperties.forEach(prop => {
    const propRegex = new RegExp(`\\s*"${prop}":\\s*\\{[\\s\\S]*?\\},(?=\\s*(?:"[a-z-]+"|\\}\\s*;\\s*return))`, 'g');
    content = content.replace(propRegex, '');
  });

  // 新しいデモを挿入
  const before = content.substring(0, afterMarker);
  const after = content.substring(afterMarker);
  content = before + improvedDemos + after;

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('\\n✓ ビジュアルデモを改善しました！');
  console.log('改善されたプロパティ:');
  demoProperties.forEach(prop => console.log(`  - ${prop}`));
} else {
  console.error('❌ 挿入位置が見つかりませんでした');
}
