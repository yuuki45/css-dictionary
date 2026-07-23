// CSSプロパティ⇄Tailwind対応データ（Tailwind v4基準。v3との差分はnoteに明記）
// キーは実在するプロパティID（npm run validateで検証）。
// 方針: 代表クラス＋パターン表記のみ。全ユーティリティの網羅列挙はしない（仕様書参照）。
import type { TailwindMapping } from '@/types/css';

export type { TailwindMapping };

// 対応が存在する全プロパティを収録済み（仕様書 docs/specs/20260724_tailwind-layer.md）。
// 未収録 = Tailwindに意味のある対応が無いもの（clamp / min-max-functions / grid-template-areas /
// css-nesting / anchor-positioning / at-property / at-scope / text-spacing-trim）。
export const tailwindMap: Record<string, TailwindMapping> = {
  display: {
    classes: [
      { className: 'block', css: 'display: block' },
      { className: 'inline-block', css: 'display: inline-block' },
      { className: 'inline', css: 'display: inline' },
      { className: 'hidden', css: 'display: none' },
    ],
    note: 'flex / grid は display-flex・display-grid の項を参照。「hidden」がdisplay: noneに当たる点に注意（visibility: hiddenではない）。',
  },
  'justify-content': {
    classes: [
      { className: 'justify-start', css: 'justify-content: flex-start' },
      { className: 'justify-center', css: 'justify-content: center' },
      { className: 'justify-between', css: 'justify-content: space-between' },
      { className: 'justify-end', css: 'justify-content: flex-end' },
    ],
    note: 'safe対応はjustify-center-safe（v4.1+）。',
  },
  'align-items': {
    classes: [
      { className: 'items-start', css: 'align-items: flex-start' },
      { className: 'items-center', css: 'align-items: center' },
      { className: 'items-end', css: 'align-items: flex-end' },
      { className: 'items-baseline', css: 'align-items: baseline' },
      { className: 'items-stretch', css: 'align-items: stretch' },
    ],
  },
  gap: {
    classes: [
      { className: 'gap-2', css: 'gap: 8px' },
      { className: 'gap-4', css: 'gap: 16px' },
    ],
    pattern: 'gap-{n}（n×4px。gap-4 = 16px）',
    arbitrary: 'gap-[18px]',
    note: '行・列を別々に指定するときは gap-x-{n} / gap-y-{n}。',
  },
  padding: {
    classes: [
      { className: 'p-4', css: 'padding: 16px' },
      { className: 'px-4', css: 'padding-inline: 16px' },
      { className: 'py-2', css: 'padding-block: 8px' },
      { className: 'pt-2', css: 'padding-top: 8px' },
    ],
    pattern: 'p-{n}（n×4px。p-4 = 16px）',
    arbitrary: 'p-[18px]',
    note: '論理プロパティ版は ps-{n}（padding-inline-start）/ pe-{n}（padding-inline-end）。',
  },
  margin: {
    classes: [
      { className: 'm-4', css: 'margin: 16px' },
      { className: 'mx-auto', css: 'margin-inline: auto' },
      { className: 'mt-2', css: 'margin-top: 8px' },
      { className: '-mt-2', css: 'margin-top: -8px' },
    ],
    pattern: 'm-{n}（n×4px。負の値は -m-{n}）',
    arbitrary: 'm-[18px]',
  },
  'border-radius': {
    classes: [
      { className: 'rounded-sm', css: 'border-radius: 4px' },
      { className: 'rounded-md', css: 'border-radius: 6px' },
      { className: 'rounded-lg', css: 'border-radius: 8px' },
      { className: 'rounded-full', css: 'border-radius: 9999px' },
    ],
    arbitrary: 'rounded-[10px]',
    note: 'v4でスケール名が変更: v3のrounded→rounded-sm、rounded-sm→rounded-xsに改名。角ごとの指定は rounded-t-* / rounded-tl-* など。',
  },
  'box-shadow': {
    classes: [
      { className: 'shadow-sm', css: 'box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), ...' },
      { className: 'shadow-md', css: 'box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), ...' },
      { className: 'shadow-lg', css: 'box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), ...' },
      { className: 'inset-shadow-sm', css: 'box-shadow: inset ...' },
    ],
    arbitrary: 'shadow-[0_4px_12px_rgb(0_0_0_/_0.25)]',
    note: 'v4でスケール名が変更: v3のshadow→shadow-sm、shadow-sm→shadow-xsに改名。インセット影のinset-shadow-*はv4新設。',
  },
  width: {
    classes: [
      { className: 'w-full', css: 'width: 100%' },
      { className: 'w-1/2', css: 'width: 50%' },
      { className: 'w-fit', css: 'width: fit-content' },
      { className: 'w-4', css: 'width: 16px' },
    ],
    pattern: 'w-{n}（n×4px）',
    arbitrary: 'w-[52px]',
  },
  position: {
    classes: [
      { className: 'static', css: 'position: static' },
      { className: 'relative', css: 'position: relative' },
      { className: 'absolute', css: 'position: absolute' },
      { className: 'fixed', css: 'position: fixed' },
      { className: 'sticky', css: 'position: sticky' },
    ],
  },
  'pseudo-hover': {
    variant: 'hover:',
    classes: [{ className: 'hover:bg-red-700', css: ':hover { background-color: ... }' }],
    note: 'v4のhover:は「ホバー可能なデバイス」でのみ有効（@media (hover: hover)内）。タッチデバイスでの疑似ホバー問題が仕様レベルで解決された。',
  },
  'pseudo-focus-visible': {
    variant: 'focus-visible:',
    classes: [
      { className: 'focus-visible:outline-2', css: ':focus-visible { outline-width: 2px }' },
    ],
    note: '単なるfocus:よりfocus-visible:推奨（マウスクリックではリングを出さない）。',
  },
  'prefers-reduced-motion': {
    variant: 'motion-reduce:',
    classes: [
      { className: 'motion-reduce:animate-none', css: '@media (prefers-reduced-motion: reduce) { animation: none }' },
    ],
    note: '逆条件（動きを減らす設定がOFFのときだけ動かす）は motion-safe:。',
  },

  // ---- レイアウト・Flexbox・Grid ----
  'display-flex': {
    classes: [
      { className: 'flex', css: 'display: flex' },
      { className: 'inline-flex', css: 'display: inline-flex' },
    ],
  },
  'display-grid': {
    classes: [
      { className: 'grid', css: 'display: grid' },
      { className: 'inline-grid', css: 'display: inline-grid' },
    ],
  },
  order: {
    classes: [
      { className: 'order-1', css: 'order: 1' },
      { className: 'order-first', css: 'order: -9999' },
      { className: 'order-last', css: 'order: 9999' },
    ],
    pattern: 'order-{n}',
    arbitrary: 'order-[13]',
  },
  'container-type': {
    classes: [
      { className: '@container', css: 'container-type: inline-size' },
    ],
    note: '名前付きコンテナは @container/{name}。問い合わせる子側は @sm: / @md: などのコンテナバリアントを使う（container-queriesの項を参照）。',
  },
  'container-queries': {
    variant: '@sm: / @md: / @lg:',
    classes: [
      { className: '@sm:flex-row', css: '@container (min-width: 24rem) { flex-direction: row }' },
    ],
    note: '親に @container を指定した上で使う。ビューポート基準の sm: とは別物。任意幅は @min-[420px]:。',
  },
  subgrid: {
    classes: [
      { className: 'grid-cols-subgrid', css: 'grid-template-columns: subgrid' },
      { className: 'grid-rows-subgrid', css: 'grid-template-rows: subgrid' },
    ],
  },
  'aspect-ratio': {
    classes: [
      { className: 'aspect-square', css: 'aspect-ratio: 1 / 1' },
      { className: 'aspect-video', css: 'aspect-ratio: 16 / 9' },
      { className: 'aspect-auto', css: 'aspect-ratio: auto' },
    ],
    arbitrary: 'aspect-[4/3]',
  },
  'css-custom-properties': {
    pattern: 'bg-(--brand-color) のように (--変数名) でCSS変数を参照（v4）',
    arbitrary: '[--gap:1rem]（任意のカスタムプロパティを定義）',
    note: 'v3の bg-[var(--brand)] 記法はv4で (--brand) に短縮された。テーマ変数は @theme で定義する。',
  },
  'backdrop-filter': {
    classes: [
      { className: 'backdrop-blur-sm', css: 'backdrop-filter: blur(8px)' },
      { className: 'backdrop-brightness-50', css: 'backdrop-filter: brightness(0.5)' },
    ],
    pattern: 'backdrop-{filter}-{amount}',
    arbitrary: 'backdrop-blur-[2px]',
    note: 'v4でスケール名が変更: v3のbackdrop-blur→backdrop-blur-sm等（blurのリネームに追従）。',
  },
  filter: {
    classes: [
      { className: 'blur-sm', css: 'filter: blur(8px)' },
      { className: 'grayscale', css: 'filter: grayscale(100%)' },
      { className: 'brightness-75', css: 'filter: brightness(0.75)' },
    ],
    pattern: '{filter}-{amount}（併記で複数フィルタを合成）',
    arbitrary: 'blur-[2px]',
    note: 'v4でスケール名が変更: v3のblur→blur-sm、blur-sm→blur-xsに改名。',
  },
  'object-fit': {
    classes: [
      { className: 'object-cover', css: 'object-fit: cover' },
      { className: 'object-contain', css: 'object-fit: contain' },
      { className: 'object-fill', css: 'object-fit: fill' },
      { className: 'object-scale-down', css: 'object-fit: scale-down' },
    ],
  },
  'place-items': {
    classes: [
      { className: 'place-items-center', css: 'place-items: center' },
      { className: 'place-items-start', css: 'place-items: start' },
      { className: 'place-items-stretch', css: 'place-items: stretch' },
    ],
  },
  'place-content': {
    classes: [
      { className: 'place-content-center', css: 'place-content: center' },
      { className: 'place-content-between', css: 'place-content: space-between' },
    ],
  },
  'flex-direction': {
    classes: [
      { className: 'flex-row', css: 'flex-direction: row' },
      { className: 'flex-col', css: 'flex-direction: column' },
      { className: 'flex-row-reverse', css: 'flex-direction: row-reverse' },
      { className: 'flex-col-reverse', css: 'flex-direction: column-reverse' },
    ],
  },
  'justify-items': {
    classes: [
      { className: 'justify-items-start', css: 'justify-items: start' },
      { className: 'justify-items-center', css: 'justify-items: center' },
      { className: 'justify-items-stretch', css: 'justify-items: stretch' },
    ],
  },
  'align-content': {
    classes: [
      { className: 'content-start', css: 'align-content: flex-start' },
      { className: 'content-center', css: 'align-content: center' },
      { className: 'content-between', css: 'align-content: space-between' },
    ],
  },
  'flex-wrap': {
    classes: [
      { className: 'flex-wrap', css: 'flex-wrap: wrap' },
      { className: 'flex-nowrap', css: 'flex-wrap: nowrap' },
      { className: 'flex-wrap-reverse', css: 'flex-wrap: wrap-reverse' },
    ],
  },
  'flex-grow-shrink-basis': {
    classes: [
      { className: 'flex-1', css: 'flex: 1 1 0%' },
      { className: 'flex-auto', css: 'flex: 1 1 auto' },
      { className: 'flex-none', css: 'flex: none' },
      { className: 'grow', css: 'flex-grow: 1' },
      { className: 'shrink-0', css: 'flex-shrink: 0' },
      { className: 'basis-1/2', css: 'flex-basis: 50%' },
    ],
    note: '「画像が潰れる」対策の flex-shrink: 0 は shrink-0。',
  },
  'grid-template-columns': {
    classes: [
      { className: 'grid-cols-3', css: 'grid-template-columns: repeat(3, minmax(0, 1fr))' },
      { className: 'grid-cols-none', css: 'grid-template-columns: none' },
    ],
    pattern: 'grid-cols-{n}',
    arbitrary: 'grid-cols-[200px_1fr]',
  },
  'grid-auto-fit-fill': {
    arbitrary: 'grid-cols-[repeat(auto-fit,minmax(120px,1fr))]',
    note: 'auto-fit / auto-fill 専用のユーティリティは無く、任意値で書く。頻出ならテーマにカスタム登録する。',
  },
  'z-index': {
    classes: [
      { className: 'z-10', css: 'z-index: 10' },
      { className: 'z-50', css: 'z-index: 50' },
      { className: 'z-auto', css: 'z-index: auto' },
      { className: '-z-10', css: 'z-index: -10' },
    ],
    pattern: 'z-{n}',
    arbitrary: 'z-[999]',
  },

  // ---- テキスト・色・背景 ----
  color: {
    classes: [
      { className: 'text-gray-900', css: 'color: パレットのgray-900' },
      { className: 'text-white', css: 'color: #fff' },
      { className: 'text-red-500/50', css: 'color: red-500を50%の透明度で' },
    ],
    pattern: 'text-{color}-{shade}（/nで透明度）',
    arbitrary: 'text-[#b0413e]',
    note: 'v4の標準パレットはOKLCHで定義されている。',
  },
  'font-size': {
    classes: [
      { className: 'text-sm', css: 'font-size: 0.875rem（14px）' },
      { className: 'text-base', css: 'font-size: 1rem（16px）' },
      { className: 'text-xl', css: 'font-size: 1.25rem（20px）' },
    ],
    pattern: 'text-{size}（xs〜9xl）',
    arbitrary: 'text-[15px]',
    note: 'text-sm/6 のように「サイズ/行の高さ」を同時指定できる。',
  },
  'font-weight': {
    classes: [
      { className: 'font-normal', css: 'font-weight: 400' },
      { className: 'font-semibold', css: 'font-weight: 600' },
      { className: 'font-bold', css: 'font-weight: 700' },
    ],
    pattern: 'font-{weight}',
    arbitrary: 'font-[350]',
  },
  'line-height': {
    classes: [
      { className: 'leading-none', css: 'line-height: 1' },
      { className: 'leading-tight', css: 'line-height: 1.25' },
      { className: 'leading-relaxed', css: 'line-height: 1.625' },
      { className: 'leading-6', css: 'line-height: 24px' },
    ],
    pattern: 'leading-{n}（n×4px）',
    arbitrary: 'leading-[1.8]',
  },
  'letter-spacing': {
    classes: [
      { className: 'tracking-tight', css: 'letter-spacing: -0.025em' },
      { className: 'tracking-normal', css: 'letter-spacing: 0' },
      { className: 'tracking-wide', css: 'letter-spacing: 0.025em' },
    ],
    arbitrary: 'tracking-[0.2em]',
  },
  'text-align': {
    classes: [
      { className: 'text-left', css: 'text-align: left' },
      { className: 'text-center', css: 'text-align: center' },
      { className: 'text-right', css: 'text-align: right' },
      { className: 'text-justify', css: 'text-align: justify' },
    ],
    note: '書字方向対応の論理値は text-start / text-end。',
  },
  'text-decoration': {
    classes: [
      { className: 'underline', css: 'text-decoration-line: underline' },
      { className: 'line-through', css: 'text-decoration-line: line-through' },
      { className: 'no-underline', css: 'text-decoration-line: none' },
    ],
    note: '線の色・太さ・スタイルは decoration-{color} / decoration-2 / decoration-wavy。',
  },
  'text-transform': {
    classes: [
      { className: 'uppercase', css: 'text-transform: uppercase' },
      { className: 'lowercase', css: 'text-transform: lowercase' },
      { className: 'capitalize', css: 'text-transform: capitalize' },
      { className: 'normal-case', css: 'text-transform: none' },
    ],
  },
  'vertical-align': {
    classes: [
      { className: 'align-middle', css: 'vertical-align: middle' },
      { className: 'align-top', css: 'vertical-align: top' },
      { className: 'align-baseline', css: 'vertical-align: baseline' },
    ],
  },
  'text-wrap': {
    classes: [
      { className: 'text-balance', css: 'text-wrap: balance' },
      { className: 'text-pretty', css: 'text-wrap: pretty' },
      { className: 'text-nowrap', css: 'text-wrap: nowrap' },
    ],
  },
  'overflow-wrap': {
    classes: [
      { className: 'break-words', css: 'overflow-wrap: break-word' },
      { className: 'wrap-anywhere', css: 'overflow-wrap: anywhere' },
    ],
    note: 'wrap-anywhere / wrap-break-word はv4.1新設。',
  },
  'word-break': {
    classes: [
      { className: 'break-all', css: 'word-break: break-all' },
      { className: 'break-keep', css: 'word-break: keep-all' },
    ],
    note: '英単語の折り返しなら word-break ではなく break-words（overflow-wrap）が先。',
  },
  'white-space': {
    classes: [
      { className: 'whitespace-nowrap', css: 'white-space: nowrap' },
      { className: 'whitespace-pre', css: 'white-space: pre' },
      { className: 'whitespace-pre-wrap', css: 'white-space: pre-wrap' },
    ],
  },
  'text-overflow': {
    classes: [
      { className: 'truncate', css: 'overflow: hidden + text-overflow: ellipsis + white-space: nowrap' },
      { className: 'text-ellipsis', css: 'text-overflow: ellipsis' },
      { className: 'text-clip', css: 'text-overflow: clip' },
    ],
    note: '1行省略は truncate 1つで3点セットが揃う。',
  },
  'writing-mode': {
    arbitrary: '[writing-mode:vertical-rl]',
    note: '専用ユーティリティは無く任意値で書く。縦書きは論理プロパティ（ms-*/ps-*等）との併用が前提。',
  },
  'caret-color': {
    classes: [
      { className: 'caret-pink-500', css: 'caret-color: パレットのpink-500' },
    ],
    pattern: 'caret-{color}-{shade}',
  },
  'accent-color': {
    classes: [
      { className: 'accent-pink-500', css: 'accent-color: パレットのpink-500' },
    ],
    pattern: 'accent-{color}-{shade}',
  },
  'color-scheme': {
    classes: [
      { className: 'scheme-light', css: 'color-scheme: light' },
      { className: 'scheme-dark', css: 'color-scheme: dark' },
      { className: 'scheme-light-dark', css: 'color-scheme: light dark' },
    ],
    note: 'scheme-* はv4新設。フォーム部品やスクロールバーの配色をOSテーマに追従させる。',
  },
  'prefers-color-scheme': {
    variant: 'dark:',
    classes: [
      { className: 'dark:bg-gray-900', css: '@media (prefers-color-scheme: dark) { background-color: ... }' },
    ],
    note: 'v4のdark:は既定でprefers-color-scheme連動。クラス切り替え式（.darkを親に付ける）にするには@custom-variantで上書きする。',
  },
  'color-mix': {
    pattern: 'bg-red-500/50 などの透明度修飾（内部でcolor-mix()が使われる）',
    note: 'color-mix()を直接書くユーティリティは無いが、v4の/50透明度記法やcurrentColor混色の実体はcolor-mix()。',
  },
  'light-dark': {
    arbitrary: '[color:light-dark(#1a1712,#fdfaf3)]',
    note: '専用ユーティリティは無い。Tailwindではdark:バリアントで書き分けるのが慣例（scheme-*の指定が前提）。',
  },
  oklch: {
    arbitrary: 'bg-[oklch(0.65_0.2_25)]',
    note: 'v4の標準パレット自体がOKLCHで定義されている。任意値でもoklch()をそのまま使える。',
  },
  'background-color': {
    classes: [
      { className: 'bg-white', css: 'background-color: #fff' },
      { className: 'bg-red-500', css: 'background-color: パレットのred-500' },
      { className: 'bg-transparent', css: 'background-color: transparent' },
    ],
    pattern: 'bg-{color}-{shade}（/nで透明度）',
    arbitrary: 'bg-[#fdfaf3]',
  },
  'background-image': {
    classes: [
      { className: 'bg-none', css: 'background-image: none' },
    ],
    arbitrary: "bg-[url('/paper.png')]",
    note: 'グラデーションは bg-linear-* / bg-radial / bg-conic（linear-gradientの項を参照）。',
  },
  'background-size': {
    classes: [
      { className: 'bg-cover', css: 'background-size: cover' },
      { className: 'bg-contain', css: 'background-size: contain' },
      { className: 'bg-auto', css: 'background-size: auto' },
    ],
    arbitrary: 'bg-[length:200px_100px]',
  },
  'background-position': {
    classes: [
      { className: 'bg-center', css: 'background-position: center' },
      { className: 'bg-top', css: 'background-position: top' },
      { className: 'bg-left', css: 'background-position: left' },
    ],
    arbitrary: 'bg-[position:20%_80%]',
  },
  'linear-gradient': {
    classes: [
      { className: 'bg-linear-to-r', css: 'background-image: linear-gradient(to right, ...)' },
      { className: 'bg-linear-65', css: 'background-image: linear-gradient(65deg, ...)' },
    ],
    pattern: 'from-{color} via-{color} to-{color} で色を指定',
    note: 'v4で bg-gradient-* から bg-linear-* に改名。補間色空間も指定可（bg-linear-to-r/oklch）。',
  },
  'radial-gradient': {
    classes: [
      { className: 'bg-radial', css: 'background-image: radial-gradient(...)' },
      { className: 'bg-radial-[at_25%_25%]', css: 'background-image: radial-gradient(at 25% 25%, ...)' },
    ],
    pattern: 'from-{color} / to-{color} で色を指定',
    note: 'bg-radial / bg-conic はv4新設。v3にはユーティリティが無かった。',
  },

  // ---- ボックス・サイズ ----
  height: {
    classes: [
      { className: 'h-full', css: 'height: 100%' },
      { className: 'h-screen', css: 'height: 100vh' },
      { className: 'h-dvh', css: 'height: 100dvh' },
      { className: 'h-4', css: 'height: 16px' },
    ],
    pattern: 'h-{n}（n×4px）',
    arbitrary: 'h-[52px]',
    note: 'モバイルのアドレスバー対策には h-dvh / h-svh / h-lvh。',
  },
  'max-width': {
    classes: [
      { className: 'max-w-md', css: 'max-width: 28rem（448px）' },
      { className: 'max-w-full', css: 'max-width: 100%' },
      { className: 'max-w-none', css: 'max-width: none' },
    ],
    pattern: 'max-w-{size}（xs〜7xl）',
    arbitrary: 'max-w-[720px]',
  },
  'min-width': {
    classes: [
      { className: 'min-w-0', css: 'min-width: 0' },
      { className: 'min-w-full', css: 'min-width: 100%' },
      { className: 'min-w-fit', css: 'min-width: fit-content' },
    ],
    note: 'flexアイテムで省略（…）が効かないときの min-w-0 が頻出。',
  },
  'box-sizing': {
    classes: [
      { className: 'box-border', css: 'box-sizing: border-box' },
      { className: 'box-content', css: 'box-sizing: content-box' },
    ],
    note: 'Preflight（リセットCSS）が全要素をborder-boxにするため、通常は書かない。',
  },
  border: {
    classes: [
      { className: 'border', css: 'border-width: 1px' },
      { className: 'border-2', css: 'border-width: 2px' },
      { className: 'border-t', css: 'border-top-width: 1px' },
      { className: 'border-dashed', css: 'border-style: dashed' },
    ],
    pattern: '色は border-{color}-{shade}',
    note: 'v4では border の既定色がcurrentColorに変更された（v3はgray-200）。色の明示を推奨。',
  },
  opacity: {
    classes: [
      { className: 'opacity-50', css: 'opacity: 0.5' },
      { className: 'opacity-0', css: 'opacity: 0' },
    ],
    pattern: 'opacity-{n}（0〜100）',
    arbitrary: 'opacity-[0.85]',
    note: '色だけ半透明にするなら bg-red-500/50 のような透明度修飾の方が適切。',
  },
  'list-style': {
    classes: [
      { className: 'list-none', css: 'list-style-type: none' },
      { className: 'list-disc', css: 'list-style-type: disc' },
      { className: 'list-decimal', css: 'list-style-type: decimal' },
      { className: 'list-inside', css: 'list-style-position: inside' },
    ],
  },
  'clip-path': {
    arbitrary: '[clip-path:polygon(50%_0,100%_100%,0_100%)]',
    note: '専用ユーティリティは無く任意値で書く。マスクは mask-* ユーティリティ（v4新設）がある。',
  },
  'object-position': {
    classes: [
      { className: 'object-center', css: 'object-position: center' },
      { className: 'object-top', css: 'object-position: top' },
    ],
    arbitrary: 'object-[25%_75%]',
  },
  inset: {
    classes: [
      { className: 'inset-0', css: 'inset: 0' },
      { className: 'inset-x-0', css: 'inset-inline: 0' },
      { className: 'top-0', css: 'top: 0' },
      { className: '-top-4', css: 'top: -16px' },
    ],
    pattern: 'inset-{n} / top-{n} / bottom-{n}（n×4px）',
    arbitrary: 'inset-[10%]',
  },
  'mix-blend-mode': {
    classes: [
      { className: 'mix-blend-multiply', css: 'mix-blend-mode: multiply' },
      { className: 'mix-blend-screen', css: 'mix-blend-mode: screen' },
    ],
    pattern: 'mix-blend-{mode}',
  },
  'background-blend-mode': {
    classes: [
      { className: 'bg-blend-multiply', css: 'background-blend-mode: multiply' },
      { className: 'bg-blend-overlay', css: 'background-blend-mode: overlay' },
    ],
    pattern: 'bg-blend-{mode}',
  },
  isolation: {
    classes: [
      { className: 'isolate', css: 'isolation: isolate' },
      { className: 'isolation-auto', css: 'isolation: auto' },
    ],
  },
  'align-self': {
    classes: [
      { className: 'self-start', css: 'align-self: flex-start' },
      { className: 'self-center', css: 'align-self: center' },
      { className: 'self-end', css: 'align-self: flex-end' },
      { className: 'self-stretch', css: 'align-self: stretch' },
    ],
  },
  'justify-self': {
    classes: [
      { className: 'justify-self-start', css: 'justify-self: start' },
      { className: 'justify-self-center', css: 'justify-self: center' },
      { className: 'justify-self-stretch', css: 'justify-self: stretch' },
    ],
  },
  'grid-column': {
    classes: [
      { className: 'col-span-2', css: 'grid-column: span 2 / span 2' },
      { className: 'col-span-full', css: 'grid-column: 1 / -1' },
      { className: 'col-start-2', css: 'grid-column-start: 2' },
    ],
    pattern: 'col-span-{n} / col-start-{n}',
  },
  'grid-row': {
    classes: [
      { className: 'row-span-2', css: 'grid-row: span 2 / span 2' },
      { className: 'row-span-full', css: 'grid-row: 1 / -1' },
      { className: 'row-start-1', css: 'grid-row-start: 1' },
    ],
    pattern: 'row-span-{n} / row-start-{n}',
  },
  'logical-properties': {
    pattern: 'ms-* / me-*（margin-inline-start/end）、ps-* / pe-*、start-* / end-*',
    note: 'v4は物理系ユーティリティ（mx-*等）の実体も論理プロパティ（margin-inline）で出力される。RTL対応はms-*/me-*を選ぶ。',
  },
  'margin-inline': {
    classes: [
      { className: 'mx-4', css: 'margin-inline: 16px' },
      { className: 'ms-4', css: 'margin-inline-start: 16px' },
      { className: 'me-4', css: 'margin-inline-end: 16px' },
    ],
    pattern: 'mx-{n} / ms-{n} / me-{n}',
  },
  'padding-inline': {
    classes: [
      { className: 'ps-4', css: 'padding-inline-start: 16px' },
      { className: 'pe-4', css: 'padding-inline-end: 16px' },
    ],
    pattern: 'px-{n} / ps-{n} / pe-{n}',
    note: 'px-* の実体はv4では padding-inline。',
  },
  'inset-inline': {
    classes: [
      { className: 'start-0', css: 'inset-inline-start: 0' },
      { className: 'end-0', css: 'inset-inline-end: 0' },
    ],
    pattern: 'start-{n} / end-{n}',
  },

  // ---- インタラクション・エフェクト ----
  transition: {
    classes: [
      { className: 'transition', css: 'transition-property: color, background-color, border-color, opacity, transform など' },
      { className: 'transition-colors', css: 'transition-property: color, background-color, border-color, ...' },
      { className: 'transition-none', css: 'transition-property: none' },
    ],
    pattern: 'duration-{n}ms / ease-out / delay-{n}ms と組み合わせる',
    note: '所要時間の既定は150ms。v4ではtransition-behavior: allow-discreteを含む。',
  },
  transform: {
    classes: [
      { className: 'scale-105', css: 'scale: 1.05' },
      { className: 'rotate-45', css: 'rotate: 45deg' },
      { className: 'translate-x-4', css: 'translate: 16px 0' },
      { className: '-translate-y-2', css: 'translate: 0 -8px' },
    ],
    pattern: 'scale-{n} / rotate-{deg} / translate-{x|y}-{n}',
    arbitrary: 'translate-x-[5px]',
    note: 'v4は個別プロパティ（scale/rotate/translate）で出力される。v3のようなtransformクラスの前置は不要。',
  },
  animation: {
    classes: [
      { className: 'animate-spin', css: 'animation: spin 1s linear infinite' },
      { className: 'animate-pulse', css: 'animation: pulse 2s ... infinite' },
      { className: 'animate-bounce', css: 'animation: bounce 1s infinite' },
      { className: 'animate-none', css: 'animation: none' },
    ],
    arbitrary: 'animate-[wiggle_1s_ease-in-out_infinite]',
    note: 'motion-reduce:animate-none の併記を推奨（prefers-reduced-motionの項を参照）。',
  },
  keyframes: {
    pattern: '@theme { --animate-{name}: ...; @keyframes {name} { ... } } で登録',
    note: 'キーフレーム自体のユーティリティは無い。v4ではCSSの@theme内に定義すると animate-{name} が自動生成される。',
  },
  cursor: {
    classes: [
      { className: 'cursor-pointer', css: 'cursor: pointer' },
      { className: 'cursor-not-allowed', css: 'cursor: not-allowed' },
      { className: 'cursor-help', css: 'cursor: help' },
    ],
    pattern: 'cursor-{keyword}',
  },
  overflow: {
    classes: [
      { className: 'overflow-hidden', css: 'overflow: hidden' },
      { className: 'overflow-x-auto', css: 'overflow-x: auto' },
      { className: 'overflow-y-scroll', css: 'overflow-y: scroll' },
      { className: 'overflow-clip', css: 'overflow: clip' },
    ],
  },
  visibility: {
    classes: [
      { className: 'visible', css: 'visibility: visible' },
      { className: 'invisible', css: 'visibility: hidden' },
      { className: 'collapse', css: 'visibility: collapse' },
    ],
    note: 'invisible は visibility: hidden（領域は残る）。display: none は hidden（displayの項）。',
  },
  'user-select': {
    classes: [
      { className: 'select-none', css: 'user-select: none' },
      { className: 'select-text', css: 'user-select: text' },
      { className: 'select-all', css: 'user-select: all' },
    ],
  },
  'pointer-events': {
    classes: [
      { className: 'pointer-events-none', css: 'pointer-events: none' },
      { className: 'pointer-events-auto', css: 'pointer-events: auto' },
    ],
  },
  'will-change': {
    classes: [
      { className: 'will-change-transform', css: 'will-change: transform' },
      { className: 'will-change-auto', css: 'will-change: auto' },
    ],
    arbitrary: 'will-change-[top,left]',
  },
  contain: {
    arbitrary: '[contain:layout_paint]',
    note: '専用ユーティリティは無く任意値で書く。コンテナクエリ用途なら @container（container-typeの項）。',
  },
  'table-layout': {
    classes: [
      { className: 'table-fixed', css: 'table-layout: fixed' },
      { className: 'table-auto', css: 'table-layout: auto' },
    ],
  },
  'content-visibility': {
    arbitrary: '[content-visibility:auto]',
    note: '専用ユーティリティは無く任意値で書く。',
  },
  appearance: {
    classes: [
      { className: 'appearance-none', css: 'appearance: none' },
      { className: 'appearance-auto', css: 'appearance: auto' },
    ],
  },
  outline: {
    classes: [
      { className: 'outline-2', css: 'outline-width: 2px' },
      { className: 'outline-offset-2', css: 'outline-offset: 2px' },
      { className: 'outline-hidden', css: '不可視アウトライン（forced-colors時のみ表示）' },
      { className: 'outline-none', css: 'outline-style: none' },
    ],
    note: 'v4で旧outline-noneはoutline-hiddenに改名。新しいoutline-noneは本当にoutlineを消すので、フォーカスリングの代替を必ず用意する。',
  },
  resize: {
    classes: [
      { className: 'resize', css: 'resize: both' },
      { className: 'resize-y', css: 'resize: vertical' },
      { className: 'resize-none', css: 'resize: none' },
    ],
  },
  'field-sizing': {
    classes: [
      { className: 'field-sizing-content', css: 'field-sizing: content' },
      { className: 'field-sizing-fixed', css: 'field-sizing: fixed' },
    ],
    note: 'v4新設。入力に合わせて伸びるtextarea（UIレシピ集に実装例あり）。',
  },
  'interpolate-size': {
    arbitrary: '[interpolate-size:allow-keywords]',
    note: '専用ユーティリティは無く任意値で書く。height: auto へのアニメーションに必要。',
  },

  // ---- スクロール ----
  'scroll-behavior': {
    classes: [
      { className: 'scroll-smooth', css: 'scroll-behavior: smooth' },
      { className: 'scroll-auto', css: 'scroll-behavior: auto' },
    ],
    note: 'motion-reduce:scroll-auto の併記を推奨。',
  },
  'scroll-snap-type': {
    classes: [
      { className: 'snap-x', css: 'scroll-snap-type: x var(--tw-scroll-snap-strictness)' },
      { className: 'snap-mandatory', css: '--tw-scroll-snap-strictness: mandatory' },
      { className: 'snap-proximity', css: '--tw-scroll-snap-strictness: proximity' },
    ],
    note: 'snap-x snap-mandatory のように2つ重ねて使う。',
  },
  'scroll-snap-align': {
    classes: [
      { className: 'snap-start', css: 'scroll-snap-align: start' },
      { className: 'snap-center', css: 'scroll-snap-align: center' },
      { className: 'snap-align-none', css: 'scroll-snap-align: none' },
    ],
  },
  'scroll-snap': {
    pattern: '親に snap-x snap-mandatory、子に snap-start / snap-center',
    note: '構成要素は scroll-snap-type / scroll-snap-align の項を参照。',
  },
  'overscroll-behavior': {
    classes: [
      { className: 'overscroll-contain', css: 'overscroll-behavior: contain' },
      { className: 'overscroll-none', css: 'overscroll-behavior: none' },
    ],
  },
  'scroll-margin': {
    classes: [
      { className: 'scroll-mt-14', css: 'scroll-margin-top: 56px' },
    ],
    pattern: 'scroll-m{t|b|s|e}-{n}（n×4px）',
    arbitrary: 'scroll-mt-[56px]',
  },
  'position-sticky': {
    pattern: 'sticky + top-{n}（top等の指定が必須）',
    note: 'クラス自体は position の項の sticky。効かないときは祖先の overflow を疑う。',
  },

  // ---- バリアント（疑似クラス・メディア特性・新しいat-rule） ----
  'media-queries': {
    variant: 'sm: / md: / lg: / xl:',
    classes: [
      { className: 'md:grid-cols-2', css: '@media (min-width: 48rem) { grid-template-columns: repeat(2, ...) }' },
    ],
    note: 'モバイルファースト（min-width基準）。上限側は max-md:、任意幅は min-[420px]:。',
  },
  'pseudo-first-child': {
    variant: 'first: / last: / only:',
    classes: [
      { className: 'first:border-t-0', css: ':first-child { border-top-width: 0 }' },
    ],
  },
  'pseudo-nth-child': {
    variant: 'odd: / even: / nth-{n}:',
    classes: [
      { className: 'odd:bg-gray-50', css: ':nth-child(odd) { background-color: ... }' },
    ],
    note: 'nth-3: や nth-[3n+1]: のような指定もv4で可能。',
  },
  'pseudo-nth-of-type': {
    variant: 'nth-of-type-{n}:',
    note: 'first-of-type: / last-of-type: もある。',
  },
  'pseudo-focus-within': {
    variant: 'focus-within:',
    classes: [
      { className: 'focus-within:border-red-400', css: ':focus-within { border-color: ... }' },
    ],
  },
  'pseudo-has': {
    variant: 'has-[...]: / has-checked:',
    classes: [
      { className: 'has-checked:bg-red-50', css: ':has(:checked) { background-color: ... }' },
    ],
    note: 'group-has-* で「親のhas状態」も参照できる。',
  },
  'pseudo-user-valid': {
    variant: 'user-valid: / user-invalid:',
    classes: [
      { className: 'user-invalid:border-red-500', css: ':user-invalid { border-color: ... }' },
    ],
    note: 'v4新設のバリアント。invalid: と違い入力後にのみ発火する。',
  },
  'at-starting-style': {
    variant: 'starting:',
    classes: [
      { className: 'starting:opacity-0', css: '@starting-style { opacity: 0 }' },
    ],
    note: 'v4新設。表示された瞬間からのエントリーアニメーションに使う。',
  },
  'view-transition-name': {
    arbitrary: '[view-transition-name:card]',
    note: '専用ユーティリティは無く任意値で書く。',
  },
  'animation-timeline': {
    arbitrary: '[animation-timeline:scroll()]',
    note: '専用ユーティリティは無く任意値で書く。スクロール駆動アニメーション用。',
  },
  'cascade-layers': {
    pattern: '@layer theme, base, components, utilities（v4の内部構造）',
    note: 'v4自体がカスケードレイヤーの上に構築されている。自作CSSは @layer components 等に入れると詳細度の衝突を避けられる。',
  },
};
