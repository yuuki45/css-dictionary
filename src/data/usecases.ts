// CSSユースケース逆引き用データ
export type Usecase = {
  id: string;
  label: string;
  description?: string;
  propertyIds: string[];
};

export const usecases: Usecase[] = [
  {
    id: "center",
    label: "中央寄せしたい",
    description: "要素やテキストを中央に配置したい場合",
    propertyIds: [
      "justify-content",
      "align-items",
      "text-align",
      "margin",
      "display",
      "place-items",
      "place-content",
      "position",
    ],
  },
  {
    id: "rounded",
    label: "角丸にしたい",
    description: "要素の角を丸くしたい場合",
    propertyIds: ["border-radius"],
  },
  {
    id: "shadow",
    label: "影を付けたい",
    description: "要素に影を付けたい場合",
    propertyIds: ["box-shadow", "filter"],
  },
  {
    id: "horizontal",
    label: "横並びにしたい",
    description: "要素を横並びにしたい場合",
    propertyIds: [
      "display",
      "flex-direction",
      "gap",
      "justify-content",
      "align-items",
      "flex-wrap",
    ],
  },
  {
    id: "ellipsis",
    label: "テキストを省略したい",
    description: "長いテキストを...で省略したい場合",
    propertyIds: ["text-overflow", "overflow", "white-space"],
  },
  {
    id: "responsive-width",
    label: "レスポンシブな幅にしたい",
    description: "画面幅に応じて自動調整したい場合",
    propertyIds: [
      "width",
      "min-width",
      "max-width",
      "clamp",
      "min-max-functions",
      "grid-auto-fit-fill",
      "container-queries",
      "container-type",
    ],
  },
  {
    id: "fixed-width",
    label: "固定幅にしたい",
    description: "幅を固定したい場合",
    propertyIds: ["width", "max-width", "min-width", "box-sizing"],
  },
  {
    id: "text-color",
    label: "テキスト色を変えたい",
    description: "文字色を変更したい場合",
    propertyIds: ["color"],
  },
  {
    id: "background-color",
    label: "背景色を変えたい",
    description: "背景色を変更したい場合",
    propertyIds: [
      "background-color",
      "background-image",
      "background-size",
      "background-position",
      "linear-gradient",
      "radial-gradient",
    ],
  },
  {
    id: "opacity",
    label: "透明度を変えたい",
    description: "要素の透明度を調整したい場合",
    propertyIds: ["opacity"],
  },
  {
    id: "z-index",
    label: "重なり順を変えたい",
    description: "要素の前後関係を調整したい場合",
    propertyIds: ["z-index", "position"],
  },
  {
    id: "grid",
    label: "グリッドレイアウトにしたい",
    description: "複数カラムのグリッドを作りたい場合",
    propertyIds: [
      "display",
      "display-grid",
      "grid-template-columns",
      "grid-template-areas",
      "grid-auto-fit-fill",
      "gap",
      "justify-items",
      "align-items",
      "place-items",
    ],
  },
  {
    id: "flex",
    label: "フレックスレイアウトにしたい",
    description: "柔軟な横並び・縦並びを作りたい場合",
    propertyIds: [
      "display",
      "display-flex",
      "flex-direction",
      "flex-wrap",
      "flex-grow-shrink-basis",
      "gap",
      "justify-content",
      "align-items",
      "align-content",
      "order",
    ],
  },
  {
    id: "scroll",
    label: "スクロールさせたい",
    description: "要素内でスクロールしたい場合",
    propertyIds: ["overflow", "height", "max-height", "width", "max-width"],
  },
  {
    id: "animation",
    label: "アニメーションしたい",
    description: "動きを付けたい場合",
    propertyIds: [
      "animation",
      "transition",
      "keyframes",
      "transform",
      "will-change",
    ],
  },
  {
    id: "hover",
    label: "ホバー時に変化させたい",
    description: "マウスオーバー時の効果を付けたい場合",
    propertyIds: [
      "pseudo-hover",
      "transition",
      "box-shadow",
      "color",
      "background-color",
      "transform",
      "opacity",
      "cursor",
    ],
  },
  {
    id: "nth-child",
    label: "リストやグリッドの特定の行・列だけ装飾したい",
    description: "偶数・奇数行やn番目だけにスタイルを付けたい場合",
    propertyIds: ["pseudo-nth-child", "pseudo-nth-of-type"],
  },
  {
    id: "blur-effect",
    label: "ぼかし効果を付けたい",
    description: "背景や要素にぼかし効果を適用したい場合",
    propertyIds: ["backdrop-filter", "filter"],
  },
  {
    id: "image-fit",
    label: "画像のサイズを調整したい",
    description: "画像をコンテナに収めたい場合",
    propertyIds: ["object-fit", "aspect-ratio", "width", "height"],
  },
  {
    id: "sticky-header",
    label: "ヘッダーを固定したい",
    description: "スクロール時にヘッダーを固定表示したい場合",
    propertyIds: ["position", "z-index", "top", "left", "right", "width"],
  },
  {
    id: "gradient-background",
    label: "グラデーション背景にしたい",
    description: "美しいグラデーション背景を作りたい場合",
    propertyIds: ["linear-gradient", "radial-gradient", "background-image"],
  },
  {
    id: "custom-variables",
    label: "CSS変数を使いたい",
    description: "再利用可能な値を定義したい場合",
    propertyIds: ["css-custom-properties"],
  },
  {
    id: "responsive-font",
    label: "レスポンシブなフォントサイズにしたい",
    description: "画面サイズに応じてフォントサイズを調整したい場合",
    propertyIds: [
      "clamp",
      "font-size",
      "min-max-functions",
      "font-weight",
      "line-height",
      "letter-spacing",
    ],
  },
  {
    id: "hide-element",
    label: "要素を非表示にしたい",
    description: "要素を隠したい場合（領域確保の有無で使い分け）",
    propertyIds: ["display", "visibility", "opacity"],
  },
  {
    id: "text-selection",
    label: "テキスト選択を制御したい",
    description: "テキストの選択可否を制御したい場合",
    propertyIds: ["user-select"],
  },
  {
    id: "cursor-style",
    label: "カーソルの形を変えたい",
    description: "ホバー時のカーソルの形を変更したい場合",
    propertyIds: ["cursor"],
  },
  {
    id: "clip-shape",
    label: "要素を切り抜きたい",
    description: "円形や多角形に要素を切り抜きたい場合",
    propertyIds: ["clip-path"],
  },
  {
    id: "performance-optimization",
    label: "アニメーションを最適化したい",
    description: "スムーズなアニメーションを実現したい場合",
    propertyIds: ["will-change", "transform", "transition"],
  },
  {
    id: "container-responsive",
    label: "コンテナサイズに応じて変化させたい",
    description: "親要素のサイズに応じてスタイルを変更したい場合",
    propertyIds: ["container-queries", "container-type"],
  },
  {
    id: "word-wrap",
    label: "長い単語を改行したい",
    description: "長いURLや単語を適切に改行したい場合",
    propertyIds: ["word-break", "white-space", "overflow-wrap"],
  },
  {
    id: "spacing-control",
    label: "余白を調整したい",
    description: "要素間の余白を調整したい場合",
    propertyIds: ["margin", "padding", "gap"],
  },
  {
    id: "border-style",
    label: "枠線を付けたい",
    description: "要素に枠線を付けたい場合",
    propertyIds: ["border", "border-radius"],
  },
  {
    id: "list-style",
    label: "リストの見た目を変えたい",
    description: "リストマーカーや番号を変更したい場合",
    propertyIds: ["list-style"],
  },
  {
    id: "form-accent",
    label: "フォーム部品の色を変えたい",
    description: "チェックボックスやラジオボタンの色を変更したい場合",
    propertyIds: ["accent-color"],
  },
  {
    id: "element-order",
    label: "要素の順序を変えたい",
    description: "HTMLを変更せずに表示順序を変更したい場合",
    propertyIds: ["order"],
  },
  {
    id: "text-decoration",
    label: "テキストに装飾を付けたい",
    description: "下線、取り消し線などを付けたい場合",
    propertyIds: ["text-decoration"],
  },
  {
    id: "pointer-events",
    label: "クリックを無効にしたい",
    description: "要素のクリックイベントを無効にしたい場合",
    propertyIds: ["pointer-events"],
  },
];
