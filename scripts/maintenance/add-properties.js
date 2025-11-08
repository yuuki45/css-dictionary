const fs = require('fs');
const path = require('path');

// 既存のプロパティを読み込み
const filePath = path.join(__dirname, 'src/data/cssProperties.json');
const existingProperties = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// 新しいプロパティを定義
const newProperties = [
  {
    "id": "object-position",
    "name": "object-position",
    "category": "背景・装飾",
    "description": "object-fitと組み合わせて使用し、画像や動画などの置換要素の位置を調整するプロパティです。",
    "syntax": "object-position: <position>",
    "examples": [
      {
        "code": "object-position: center;",
        "description": "画像を中央に配置（デフォルト）"
      },
      {
        "code": "object-position: top right;",
        "description": "画像を右上に配置"
      },
      {
        "code": "object-position: 50% 25%;",
        "description": "X軸50%、Y軸25%の位置に配置"
      },
      {
        "code": "object-position: 10px 20px;",
        "description": "左上から10px、上から20pxの位置に配置"
      }
    ],
    "tips": "object-fit: cover;と組み合わせて、画像の表示位置を細かく制御できる。レスポンシブ画像で重要な部分を確実に表示したい場合に便利。",
    "commonMistakes": "object-fitを指定しないと効果がない。background-positionと混同しやすいが、こちらは<img>タグなどの置換要素用。",
    "relatedProperties": ["object-fit", "aspect-ratio"],
    "browserSupport": "Chrome 32+, Firefox 36+, Safari 10+"
  },
  {
    "id": "scroll-behavior",
    "name": "scroll-behavior",
    "category": "レイアウト・配置",
    "description": "スクロール動作をスムーズにするか、即座に移動するかを指定するプロパティです。",
    "syntax": "scroll-behavior: auto | smooth",
    "examples": [
      {
        "code": "html { scroll-behavior: smooth; }",
        "description": "ページ全体のスクロールをスムーズに"
      },
      {
        "code": ".container { scroll-behavior: smooth; }",
        "description": "特定のコンテナ内のスクロールをスムーズに"
      },
      {
        "code": "scroll-behavior: auto;",
        "description": "通常の即座のスクロール（デフォルト）"
      }
    ],
    "tips": "アンカーリンク（#section1など）のスクロールが自動的にスムーズになる。JavaScriptなしで実装可能。",
    "commonMistakes": "htmlまたはスクロールコンテナに指定する必要がある。子要素に指定しても効果がない。ユーザーの設定でモーション削減が有効な場合は無効化される場合がある。",
    "relatedProperties": ["overflow", "scroll-snap-type"],
    "browserSupport": "Chrome 61+, Firefox 36+, Safari 15.4+"
  },
  {
    "id": "inset",
    "name": "inset",
    "category": "レイアウト・配置",
    "description": "top、right、bottom、leftを一括で指定できる短縮プロパティです。position: absoluteやfixedと組み合わせて使用します。",
    "syntax": "inset: <top> <right> <bottom> <left>",
    "examples": [
      {
        "code": "inset: 0;",
        "description": "上下左右すべて0（親要素いっぱいに広げる）"
      },
      {
        "code": "inset: 10px;",
        "description": "上下左右すべて10px"
      },
      {
        "code": "inset: 10px 20px;",
        "description": "上下10px、左右20px"
      },
      {
        "code": "inset: 10px 20px 30px 40px;",
        "description": "上10px、右20px、下30px、左40px"
      }
    ],
    "tips": "モーダルやオーバーレイを親要素いっぱいに広げたい時、inset: 0;が便利。コードが短くなり読みやすい。",
    "commonMistakes": "position: static（デフォルト）では効果がない。position: absolute、fixed、relative、stickyと組み合わせて使う。",
    "relatedProperties": ["position", "top", "right", "bottom", "left"],
    "browserSupport": "Chrome 87+, Firefox 66+, Safari 14.1+"
  },
  {
    "id": "scroll-snap-type",
    "name": "scroll-snap-type",
    "category": "レイアウト・配置",
    "description": "スクロールスナップコンテナの動作を定義するプロパティです。カルーセルやフルページスクロールの実装に使用します。",
    "syntax": "scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ]?",
    "examples": [
      {
        "code": "scroll-snap-type: x mandatory;",
        "description": "横スクロールで必ずスナップ位置に吸着"
      },
      {
        "code": "scroll-snap-type: y proximity;",
        "description": "縦スクロールでスナップ位置に近い場合のみ吸着"
      },
      {
        "code": "scroll-snap-type: both mandatory;",
        "description": "縦横両方向で必ずスナップ"
      },
      {
        "code": "scroll-snap-type: none;",
        "description": "スナップ無効"
      }
    ],
    "tips": "JavaScriptなしでカルーセルやフルページスクロールを実装できる。mandatoryは確実にスナップ、proximityは近い場合のみスナップ。",
    "commonMistakes": "子要素にscroll-snap-alignを指定しないと機能しない。overflowが設定されているコンテナに指定する必要がある。",
    "relatedProperties": ["scroll-snap-align", "scroll-snap-stop", "overflow"],
    "browserSupport": "Chrome 69+, Firefox 68+, Safari 11+"
  },
  {
    "id": "scroll-snap-align",
    "name": "scroll-snap-align",
    "category": "レイアウト・配置",
    "description": "スクロールスナップ時の子要素の配置位置を指定するプロパティです。scroll-snap-typeと組み合わせて使用します。",
    "syntax": "scroll-snap-align: none | start | end | center",
    "examples": [
      {
        "code": "scroll-snap-align: start;",
        "description": "要素の開始位置でスナップ"
      },
      {
        "code": "scroll-snap-align: center;",
        "description": "要素の中央でスナップ"
      },
      {
        "code": "scroll-snap-align: end;",
        "description": "要素の終了位置でスナップ"
      },
      {
        "code": "scroll-snap-align: none;",
        "description": "この要素ではスナップしない"
      }
    ],
    "tips": "カルーセルのスライドや、画像ギャラリーの各アイテムに指定する。centerを使うと見栄えが良い。",
    "commonMistakes": "親要素にscroll-snap-typeが必要。scroll-snap-typeとセットで使わないと効果がない。",
    "relatedProperties": ["scroll-snap-type", "scroll-margin"],
    "browserSupport": "Chrome 69+, Firefox 68+, Safari 11+"
  },
  {
    "id": "overscroll-behavior",
    "name": "overscroll-behavior",
    "category": "レイアウト・配置",
    "description": "スクロール領域の境界に達した時の動作を制御するプロパティです。スクロールチェーンを防ぐのに便利。",
    "syntax": "overscroll-behavior: auto | contain | none",
    "examples": [
      {
        "code": "overscroll-behavior: contain;",
        "description": "親要素へのスクロール伝播を防ぐ"
      },
      {
        "code": "overscroll-behavior: none;",
        "description": "スクロール伝播とバウンス効果を無効化"
      },
      {
        "code": "overscroll-behavior-y: contain;",
        "description": "縦方向のみスクロール伝播を防ぐ"
      },
      {
        "code": "overscroll-behavior: auto;",
        "description": "デフォルトの動作"
      }
    ],
    "tips": "モーダル内でスクロールした時、背景がスクロールするのを防げる。モバイルでの「引っ張って更新」を無効化できる。",
    "commonMistakes": "overflowが設定されている要素に指定する必要がある。すべてのブラウザで完全にサポートされているわけではない。",
    "relatedProperties": ["overflow", "scroll-behavior"],
    "browserSupport": "Chrome 63+, Firefox 59+, Safari 16+"
  },
  {
    "id": "scroll-margin",
    "name": "scroll-margin",
    "category": "レイアウト・配置",
    "description": "スクロールスナップ時のマージンを指定するプロパティです。固定ヘッダーがある場合などに便利。",
    "syntax": "scroll-margin: <length>",
    "examples": [
      {
        "code": "scroll-margin-top: 80px;",
        "description": "固定ヘッダー分のマージンを確保"
      },
      {
        "code": "scroll-margin: 20px;",
        "description": "全方向に20pxのマージン"
      },
      {
        "code": "scroll-margin: 10px 20px;",
        "description": "上下10px、左右20px"
      }
    ],
    "tips": "アンカーリンクでジャンプした時、固定ヘッダーの下に隠れないようにできる。scroll-snap-alignと組み合わせて余白を調整。",
    "commonMistakes": "scroll-paddingと混同しやすい。scroll-marginは子要素に、scroll-paddingは親要素に指定する。",
    "relatedProperties": ["scroll-snap-align", "scroll-padding", "scroll-behavior"],
    "browserSupport": "Chrome 69+, Firefox 68+, Safari 14.1+"
  },
  {
    "id": "mix-blend-mode",
    "name": "mix-blend-mode",
    "category": "背景・装飾",
    "description": "要素の内容が背景とどのように混ざり合うかを指定するプロパティです。Photoshopのブレンドモードと同様の効果。",
    "syntax": "mix-blend-mode: normal | multiply | screen | overlay | darken | lighten | ...",
    "examples": [
      {
        "code": "mix-blend-mode: multiply;",
        "description": "乗算モード（暗くなる）"
      },
      {
        "code": "mix-blend-mode: screen;",
        "description": "スクリーンモード（明るくなる）"
      },
      {
        "code": "mix-blend-mode: overlay;",
        "description": "オーバーレイモード（コントラスト強調）"
      },
      {
        "code": "mix-blend-mode: difference;",
        "description": "差の絶対値モード（反転効果）"
      }
    ],
    "tips": "テキストと画像を重ねて見やすくしたり、デザイン性の高いエフェクトを作成できる。multiply、screen、overlayがよく使われる。",
    "commonMistakes": "親要素にisolation: isolate;がないと、予期しない要素ともブレンドされる。パフォーマンスに影響する場合がある。",
    "relatedProperties": ["background-blend-mode", "isolation", "opacity"],
    "browserSupport": "Chrome 41+, Firefox 32+, Safari 8+"
  },
  {
    "id": "background-blend-mode",
    "name": "background-blend-mode",
    "category": "背景・装飾",
    "description": "背景画像と背景色、または複数の背景画像同士のブレンド方法を指定するプロパティです。",
    "syntax": "background-blend-mode: normal | multiply | screen | overlay | ...",
    "examples": [
      {
        "code": "background-blend-mode: multiply;",
        "description": "背景画像と背景色を乗算"
      },
      {
        "code": "background-blend-mode: overlay;",
        "description": "背景にオーバーレイ効果"
      },
      {
        "code": "background-blend-mode: luminosity;",
        "description": "輝度モード（グレースケール的な効果）"
      },
      {
        "code": "background-blend-mode: screen, multiply;",
        "description": "複数の背景画像にそれぞれ異なるモードを適用"
      }
    ],
    "tips": "画像にカラーオーバーレイをかけたり、デュオトーン効果を作成できる。filterと組み合わせるとさらに多彩な表現が可能。",
    "commonMistakes": "background-colorも指定しないと効果が分かりにくい場合がある。mix-blend-modeとの違いに注意。",
    "relatedProperties": ["background-image", "background-color", "mix-blend-mode", "filter"],
    "browserSupport": "Chrome 35+, Firefox 30+, Safari 8+"
  },
  {
    "id": "isolation",
    "name": "isolation",
    "category": "レイアウト・配置",
    "description": "新しいスタッキングコンテキストを作成し、ブレンドモードの影響範囲を制限するプロパティです。",
    "syntax": "isolation: auto | isolate",
    "examples": [
      {
        "code": "isolation: isolate;",
        "description": "新しいスタッキングコンテキストを作成"
      },
      {
        "code": "isolation: auto;",
        "description": "通常の動作（デフォルト）"
      }
    ],
    "tips": "mix-blend-modeやz-indexの影響範囲を制御したい時に使う。意図しない要素とのブレンドを防げる。",
    "commonMistakes": "効果が視覚的に分かりにくいプロパティ。ブレンドモードを使う親要素に指定することが多い。",
    "relatedProperties": ["mix-blend-mode", "z-index", "transform"],
    "browserSupport": "Chrome 41+, Firefox 36+, Safari 8+"
  },
  {
    "id": "align-self",
    "name": "align-self",
    "category": "レイアウト・配置",
    "description": "FlexboxやGridの子要素が個別に縦方向（交差軸）の配置を上書きするプロパティです。",
    "syntax": "align-self: auto | flex-start | flex-end | center | baseline | stretch",
    "examples": [
      {
        "code": "align-self: flex-start;",
        "description": "この要素だけ上に配置"
      },
      {
        "code": "align-self: center;",
        "description": "この要素だけ中央に配置"
      },
      {
        "code": "align-self: flex-end;",
        "description": "この要素だけ下に配置"
      },
      {
        "code": "align-self: stretch;",
        "description": "この要素だけ高さいっぱいに伸ばす"
      }
    ],
    "tips": "親のalign-itemsを個別の子要素で上書きできる。1つだけ異なる配置にしたい時に便利。",
    "commonMistakes": "親がFlexboxまたはGridでないと効果がない。align-itemsとの違いを理解する（親 vs 子）。",
    "relatedProperties": ["align-items", "justify-self", "flex-direction"],
    "browserSupport": "全ブラウザ対応"
  },
  {
    "id": "justify-self",
    "name": "justify-self",
    "category": "レイアウト・配置",
    "description": "Grid子要素が個別に横方向（インライン軸）の配置を指定するプロパティです。Flexboxでは効果がない点に注意。",
    "syntax": "justify-self: auto | start | end | center | stretch",
    "examples": [
      {
        "code": "justify-self: start;",
        "description": "この要素だけ左に配置"
      },
      {
        "code": "justify-self: center;",
        "description": "この要素だけ中央に配置"
      },
      {
        "code": "justify-self: end;",
        "description": "この要素だけ右に配置"
      },
      {
        "code": "justify-self: stretch;",
        "description": "この要素だけ幅いっぱいに伸ばす"
      }
    ],
    "tips": "Grid Layoutで個別のアイテムを配置する際に使用。Flexboxでは動作しない点に注意（Flexboxではmargin: autoを使う）。",
    "commonMistakes": "Flexboxでは効かない！Grid専用。justify-itemsとの違いを理解する（親 vs 子）。",
    "relatedProperties": ["justify-items", "align-self", "place-self"],
    "browserSupport": "Chrome 57+, Firefox 52+, Safari 10.1+"
  },
  {
    "id": "grid-column",
    "name": "grid-column",
    "category": "レイアウト・配置",
    "description": "グリッドアイテムが占める列の範囲を指定する短縮プロパティです。grid-column-startとgrid-column-endを一括指定。",
    "syntax": "grid-column: <start-line> / <end-line>",
    "examples": [
      {
        "code": "grid-column: 1 / 3;",
        "description": "1列目から3列目の手前まで（2列分）を占める"
      },
      {
        "code": "grid-column: 2 / span 2;",
        "description": "2列目から2列分を占める"
      },
      {
        "code": "grid-column: 1 / -1;",
        "description": "1列目から最後の列まで（全列）を占める"
      },
      {
        "code": "grid-column: span 3;",
        "description": "現在位置から3列分を占める"
      }
    ],
    "tips": "-1は最後の列を意味する。spanを使うと相対的な指定ができる。レスポンシブレイアウトで列数を変更しやすい。",
    "commonMistakes": "終了位置は「その列の手前」を指す。1 / 3は1列目と2列目の2列分。列番号は1から始まる（0ではない）。",
    "relatedProperties": ["grid-row", "grid-area", "grid-template-columns"],
    "browserSupport": "Chrome 57+, Firefox 52+, Safari 10.1+"
  },
  {
    "id": "grid-row",
    "name": "grid-row",
    "category": "レイアウト・配置",
    "description": "グリッドアイテムが占める行の範囲を指定する短縮プロパティです。grid-row-startとgrid-row-endを一括指定。",
    "syntax": "grid-row: <start-line> / <end-line>",
    "examples": [
      {
        "code": "grid-row: 1 / 3;",
        "description": "1行目から3行目の手前まで（2行分）を占める"
      },
      {
        "code": "grid-row: 2 / span 3;",
        "description": "2行目から3行分を占める"
      },
      {
        "code": "grid-row: 1 / -1;",
        "description": "1行目から最後の行まで（全行）を占める"
      },
      {
        "code": "grid-row: span 2;",
        "description": "現在位置から2行分を占める"
      }
    ],
    "tips": "grid-columnと組み合わせて、複雑なレイアウトを実現。カード型レイアウトで特定のアイテムを大きく表示する際に便利。",
    "commonMistakes": "終了位置は「その行の手前」を指す。行番号も1から始まる。",
    "relatedProperties": ["grid-column", "grid-area", "grid-template-rows"],
    "browserSupport": "Chrome 57+, Firefox 52+, Safari 10.1+"
  },
  {
    "id": "caret-color",
    "name": "caret-color",
    "category": "テキスト・フォント",
    "description": "テキスト入力時のカーソル（キャレット）の色を指定するプロパティです。",
    "syntax": "caret-color: auto | <color>",
    "examples": [
      {
        "code": "caret-color: red;",
        "description": "カーソルを赤色にする"
      },
      {
        "code": "caret-color: #3b82f6;",
        "description": "カーソルを青色にする"
      },
      {
        "code": "caret-color: transparent;",
        "description": "カーソルを非表示にする"
      },
      {
        "code": "caret-color: auto;",
        "description": "デフォルトの色（通常は黒）"
      }
    ],
    "tips": "ブランドカラーに合わせたり、ダークモードで見やすくできる。アクセシビリティも考慮して、コントラストの高い色を選ぶ。",
    "commonMistakes": "input、textarea、contenteditableな要素にのみ効果がある。通常のテキストには効かない。",
    "relatedProperties": ["color", "accent-color"],
    "browserSupport": "Chrome 57+, Firefox 53+, Safari 11.1+"
  },
  {
    "id": "appearance",
    "name": "appearance",
    "category": "背景・装飾",
    "description": "フォーム要素などのネイティブな見た目を制御するプロパティです。カスタムスタイルを適用する際に使用。",
    "syntax": "appearance: none | auto",
    "examples": [
      {
        "code": "appearance: none;",
        "description": "ネイティブスタイルを無効化（カスタムスタイル適用可能に）"
      },
      {
        "code": "select { appearance: none; }",
        "description": "セレクトボックスの矢印を消す"
      },
      {
        "code": "input[type=\"checkbox\"] { appearance: none; }",
        "description": "チェックボックスのデフォルトスタイルを無効化"
      },
      {
        "code": "appearance: auto;",
        "description": "ブラウザデフォルトの見た目"
      }
    ],
    "tips": "カスタムデザインのフォーム部品を作る際の第一歩。appearance: none;後に独自のスタイルを適用する。",
    "commonMistakes": "appearance: none;だけでは見た目が消えるだけ。独自のスタイルを必ず追加する必要がある。ベンダープレフィックス（-webkit-、-moz-）が必要な場合がある。",
    "relatedProperties": ["border", "background", "accent-color"],
    "browserSupport": "Chrome 84+, Firefox 80+, Safari 15.4+ (プレフィックスなし)"
  },
  {
    "id": "outline",
    "name": "outline",
    "category": "背景・装飾",
    "description": "要素の周囲に輪郭線を描画するプロパティです。borderと似ていますが、レイアウトに影響しません。",
    "syntax": "outline: <outline-width> <outline-style> <outline-color>",
    "examples": [
      {
        "code": "outline: 2px solid blue;",
        "description": "青色の2px実線アウトライン"
      },
      {
        "code": "outline: 3px dashed red;",
        "description": "赤色の3px破線アウトライン"
      },
      {
        "code": "outline: none;",
        "description": "アウトラインを無効化（アクセシビリティ注意）"
      },
      {
        "code": "outline-offset: 5px;",
        "description": "アウトラインと要素の間に5pxの隙間"
      }
    ],
    "tips": "フォーカス状態の表示に使われる。borderと違いレイアウトに影響しない。outline: none;を使う場合は代替のフォーカススタイルを必ず用意する。",
    "commonMistakes": "outline: none;でフォーカス表示を消すとアクセシビリティ問題。代わりに独自のフォーカススタイルを実装する。outline-offsetで位置調整可能。",
    "relatedProperties": ["border", "outline-offset", "box-shadow"],
    "browserSupport": "全ブラウザ対応"
  },
  {
    "id": "vertical-align",
    "name": "vertical-align",
    "category": "テキスト・フォント",
    "description": "インライン要素やテーブルセルの縦方向の配置を指定するプロパティです。",
    "syntax": "vertical-align: baseline | top | middle | bottom | text-top | text-bottom | <length> | <percentage>",
    "examples": [
      {
        "code": "vertical-align: middle;",
        "description": "画像とテキストを中央揃え"
      },
      {
        "code": "vertical-align: top;",
        "description": "上揃え"
      },
      {
        "code": "vertical-align: bottom;",
        "description": "下揃え"
      },
      {
        "code": "vertical-align: -5px;",
        "description": "ベースラインから5px下げる"
      },
      {
        "code": "vertical-align: text-top;",
        "description": "テキストの上端に揃える"
      }
    ],
    "tips": "アイコンとテキストを揃える時に便利。テーブルセルの縦位置調整にも使える。インライン要素またはtable-cell専用。",
    "commonMistakes": "ブロック要素には効かない！インライン、inline-block、table-cellのみ。Flexboxのalign-itemsと混同しやすい。",
    "relatedProperties": ["line-height", "align-items", "display"],
    "browserSupport": "全ブラウザ対応"
  },
  {
    "id": "text-transform",
    "name": "text-transform",
    "category": "テキスト・フォント",
    "description": "テキストの大文字・小文字を変換するプロパティです。",
    "syntax": "text-transform: none | capitalize | uppercase | lowercase",
    "examples": [
      {
        "code": "text-transform: uppercase;",
        "description": "すべて大文字に変換"
      },
      {
        "code": "text-transform: lowercase;",
        "description": "すべて小文字に変換"
      },
      {
        "code": "text-transform: capitalize;",
        "description": "各単語の先頭を大文字に変換"
      },
      {
        "code": "text-transform: none;",
        "description": "変換しない（デフォルト）"
      }
    ],
    "tips": "ナビゲーションメニューやボタンでよく使われる。HTMLの内容を変更せずにスタイルだけで変換できる。",
    "commonMistakes": "日本語には効果がない。capitalizeは各単語の先頭のみ（全角スペースでは動作しない場合がある）。",
    "relatedProperties": ["font-variant", "letter-spacing"],
    "browserSupport": "全ブラウザ対応"
  },
  {
    "id": "resize",
    "name": "resize",
    "category": "レイアウト・配置",
    "description": "ユーザーが要素のサイズを変更できるかどうかを指定するプロパティです。",
    "syntax": "resize: none | both | horizontal | vertical",
    "examples": [
      {
        "code": "resize: vertical;",
        "description": "縦方向のみリサイズ可能（textareaのデフォルト）"
      },
      {
        "code": "resize: horizontal;",
        "description": "横方向のみリサイズ可能"
      },
      {
        "code": "resize: both;",
        "description": "縦横両方向にリサイズ可能"
      },
      {
        "code": "resize: none;",
        "description": "リサイズ不可"
      }
    ],
    "tips": "textareaのリサイズを制御する際によく使う。overflowが visible 以外である必要がある。",
    "commonMistakes": "overflow: visible;では効果がない。overflow: auto;やhidden;などと組み合わせる。",
    "relatedProperties": ["overflow", "min-width", "max-width"],
    "browserSupport": "全ブラウザ対応"
  }
];

// プロパティをマージ（重複チェック）
const existingIds = new Set(existingProperties.map(p => p.id));
const propertiesToAdd = newProperties.filter(p => !existingIds.has(p.id));

if (propertiesToAdd.length === 0) {
  console.log('すべてのプロパティは既に存在します。');
  process.exit(0);
}

// 新しいプロパティを追加
const updatedProperties = [...existingProperties, ...propertiesToAdd];

// ファイルに書き込み
fs.writeFileSync(filePath, JSON.stringify(updatedProperties, null, 2), 'utf8');

console.log(`✓ ${propertiesToAdd.length}個の新しいプロパティを追加しました：`);
propertiesToAdd.forEach(p => console.log(`  - ${p.id}`));
console.log(`\n合計: ${updatedProperties.length}個のプロパティ`);
