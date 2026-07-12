// CSSアニメーション実装集データ
// 各例はサンドボックスiframeでそのまま動く自己完結のHTML/CSS。
// ループや大きな動きには prefers-reduced-motion への配慮を含める。
import type { AnimationExample } from '@/types/css';

export type { AnimationExample };

export const animationCategories = [
  'ホバー',
  'ローディング',
  '出現・入場',
  'テキスト',
  'マイクロインタラクション',
  '背景・装飾',
] as const;

export const animations: AnimationExample[] = [
  // ============ ホバー ============
  {
    id: 'hover-lift',
    title: 'カードのリフト（浮き上がり）',
    description:
      'ホバーでカードがふわっと浮き上がる定番エフェクト。translateと二段構えの影で自然な浮遊感を作ります。',
    category: 'ホバー',
    html: `<div class="card">
  <strong>ホバーしてみて</strong>
  <p>ふわっと浮き上がります</p>
</div>`,
    css: `.card {
  width: 220px;
  padding: 20px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 10px;
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
  transition: translate 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  translate: 0 -6px;
  box-shadow:
    0 2px 4px rgb(0 0 0 / 0.05),
    0 16px 32px -12px rgb(0 0 0 / 0.2);
}

.card p {
  margin: 6px 0 0;
  color: #7d7159;
  font-size: 14px;
}`,
    explanation:
      '位置の移動にはmarginやtopではなく個別変形プロパティのtranslateを使います（レイアウトを再計算させず、GPUで合成されるため滑らか）。影は「小さく濃い影+大きく薄い影」の二段重ねにすると、単発の影より自然な奥行きが出ます。transitionの対象をtranslateとbox-shadowに限定しているのは、allにして意図しないプロパティまで動かさないためです。',
    keyProperties: ['transition', 'transform', 'box-shadow', 'pseudo-hover'],
    tips: 'タッチデバイスではホバーが貼り付くため、実務では@media (hover: hover)でガードすると安全です。',
  },
  {
    id: 'hover-shine',
    title: 'ボタンの光沢スイープ',
    description:
      'ホバーで光の帯がボタンを横切るシャインエフェクト。擬似要素+グラデーション+transformだけで実装できます。',
    category: 'ホバー',
    html: `<button class="shine">ホバーで光る</button>`,
    css: `.shine {
  position: relative;
  overflow: hidden;
  padding: 12px 28px;
  border: none;
  border-radius: 8px;
  background: #3c5c88;
  color: #fff;
  font-size: 15px;
  cursor: pointer;
}

.shine::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgb(255 255 255 / 0.5) 50%,
    transparent 60%
  );
  translate: -100% 0;
  transition: translate 0.5s ease;
}

.shine:hover::before {
  translate: 100% 0;
}`,
    explanation:
      '光の帯は::before擬似要素に描いた透明→白→透明のグラデーションです。初期状態でtranslate: -100% 0（左外側）に待機させ、ホバーで100%（右外側）まで移動させることで「通過」を表現します。親のoverflow: hiddenで帯がボタンの外に見えないように切り抜くのがポイントです。',
    keyProperties: ['linear-gradient', 'transform', 'overflow', 'transition', 'pseudo-hover'],
    tips: '帯の角度（105deg）や透明度を変えるだけで印象が大きく変わります。金属的にしたいなら白の透明度を上げて幅を狭く。',
  },
  {
    id: 'hover-arrow-nudge',
    title: 'リンク矢印のナッジ',
    description:
      '「詳しく見る →」の矢印がホバーで前に動くマイクロインタラクション。1行のtransitionで完結する最小の気配りです。',
    category: 'ホバー',
    html: `<a class="more" href="#">詳しく見る <span class="arrow">→</span></a>`,
    css: `.more {
  color: #3c5c88;
  font-size: 16px;
  text-decoration: none;
  font-weight: 600;
}

.more .arrow {
  display: inline-block;
  transition: translate 0.2s ease;
}

.more:hover .arrow {
  translate: 5px 0;
}

.more:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}`,
    explanation:
      '矢印のspanをdisplay: inline-blockにするのが唯一の罠ポイントです（インライン要素はtranslateなどの変形が効きません）。動きはわずか5pxですが、「押すと進む」というリンクの意味を動きで補強できます。ホバー時の下線はtext-underline-offsetで文字から少し離すと上品に見えます。',
    keyProperties: ['transition', 'transform', 'text-decoration', 'pseudo-hover'],
  },

  // ============ ローディング ============
  {
    id: 'spinner-ring',
    title: 'リングスピナー',
    description:
      '最も定番のローディングスピナー。border+border-radius+rotateの3点セットで、画像なしの数行で実装できます。',
    category: 'ローディング',
    html: `<div class="spinner" role="status" aria-label="読み込み中"></div>`,
    css: `.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2d8c2;
  border-top-color: #c2452f;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { rotate: 1turn; }
}

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation-duration: 2s;
  }
}`,
    explanation:
      '正方形にborder-radius: 50%で円を作り、4辺のボーダーのうち上辺だけ色を変えて回転させると「欠けたリングが回っている」ように見えます。イージングは必ずlinear（等速）にします——easeだと回転にムラが出て酔うような動きになります。role="status"を付けるとスクリーンリーダーに読み込み中と伝わります。',
    keyProperties: ['animation', 'keyframes', 'border', 'border-radius'],
    tips: 'prefers-reduced-motionでは止めるのではなく回転を遅くしています。「読み込み中」という情報自体は伝え続けるための設計です。',
  },
  {
    id: 'spinner-dots',
    title: '3点ドットローダー',
    description:
      '3つのドットが順番に跳ねるローダー。animation-delayをずらすだけで「順番に動く」リズムが生まれます。',
    category: 'ローディング',
    html: `<div class="dots" role="status" aria-label="読み込み中">
  <span></span><span></span><span></span>
</div>`,
    css: `.dots {
  display: flex;
  gap: 8px;
}

.dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #c2452f;
  animation: bounce 1s ease-in-out infinite;
}

.dots span:nth-child(2) { animation-delay: 0.15s; }
.dots span:nth-child(3) { animation-delay: 0.3s; }

@keyframes bounce {
  0%, 100% { translate: 0 0; opacity: 0.4; }
  50% { translate: 0 -10px; opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .dots span {
    animation: pulse 1.5s ease-in-out infinite;
  }
  @keyframes pulse {
    50% { opacity: 0.4; }
  }
}`,
    explanation:
      '3つのドットは同じアニメーションを共有し、:nth-child()でanimation-delayを0.15秒ずつずらしているだけです。この「同じ動き+時間差」はスタッガー（stagger）と呼ばれ、CSSアニメーションで律動感を出す基本テクニックです。0%と100%を同じ状態にするとループの継ぎ目が見えなくなります。',
    keyProperties: ['animation', 'keyframes', 'pseudo-nth-child', 'opacity'],
    tips: 'reduced-motion時は跳ねる動きをやめ、その場で明滅する控えめな表現に差し替えています。',
  },
  {
    id: 'skeleton-shimmer',
    title: 'スケルトンスクリーン',
    description:
      'コンテンツ読み込み中のプレースホルダー。グラデーションのbackground-positionを動かして「光が流れる」質感を作ります。',
    category: 'ローディング',
    html: `<div class="skeleton-card">
  <div class="skeleton avatar"></div>
  <div class="lines">
    <div class="skeleton line"></div>
    <div class="skeleton line short"></div>
  </div>
</div>`,
    css: `.skeleton-card {
  display: flex;
  gap: 12px;
  align-items: center;
  width: 260px;
}

.skeleton {
  background: linear-gradient(
    90deg,
    #ece4d2 25%,
    #f7f1e3 37%,
    #ece4d2 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s ease infinite;
}

@keyframes shimmer {
  from { background-position: 100% 0; }
  to { background-position: 0 0; }
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  flex-shrink: 0;
}

.lines { flex: 1; }
.line {
  height: 12px;
  border-radius: 6px;
  margin-block: 8px;
}
.line.short { width: 60%; }

@media (prefers-reduced-motion: reduce) {
  .skeleton { animation: none; }
}`,
    explanation:
      '要素の背景に「地の色→少し明るい色→地の色」の横グラデーションを敷き、background-sizeを400%に拡大してからbackground-positionを100%→0%へ動かすと、光の帯が左から右へ流れて見えます。widthやtransformを動かさないためリフローが起きず、多数のスケルトンを同時に表示しても軽いのが利点です。',
    keyProperties: ['linear-gradient', 'background-size', 'background-position', 'animation'],
    tips: '実物のレイアウト（アバター+2行）に形を似せるほど、読み込み後の切り替わりが自然に感じられます。',
  },

  // ============ 出現・入場 ============
  {
    id: 'fade-up-stagger',
    title: '順次フェードイン（スタッガー）',
    description:
      'リスト項目が下から順番にふわっと現れる入場アニメーション。animation-delayの時間差で「流れ」を作ります。',
    category: '出現・入場',
    html: `<ul class="stagger">
  <li>ひとつめの項目</li>
  <li>ふたつめの項目</li>
  <li>みっつめの項目</li>
  <li>よっつめの項目</li>
</ul>`,
    css: `.stagger {
  list-style: none;
  padding: 0;
  width: 240px;
}

.stagger li {
  padding: 12px 16px;
  margin-block: 8px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  animation: fade-up 0.5s ease-out both;
}

.stagger li:nth-child(1) { animation-delay: 0.05s; }
.stagger li:nth-child(2) { animation-delay: 0.15s; }
.stagger li:nth-child(3) { animation-delay: 0.25s; }
.stagger li:nth-child(4) { animation-delay: 0.35s; }

@keyframes fade-up {
  from {
    opacity: 0;
    translate: 0 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .stagger li { animation: none; }
}`,
    explanation:
      'ポイントはanimation-fill-mode: both（ショートハンド内のboth）です。これがないとdelay中はアニメ開始前の状態（=表示済み）になり、「一瞬見えてから消えて現れる」チラつきが起きます。@keyframesはfromだけ書けばtoは現在のスタイルが使われるため、終了状態を二重管理せずに済みます。',
    keyProperties: ['animation', 'keyframes', 'opacity', 'transform', 'pseudo-nth-child'],
    tips: '項目数が可変の場合、nth-childの列挙の代わりにインラインstyleでanimation-delay: calc(var(--i) * 0.1s)を渡す設計がよく使われます。',
  },
  {
    id: 'entry-starting-style',
    title: 'DOM追加時のフェードイン（@starting-style）',
    description:
      'JavaScriptなしで「要素が追加された瞬間」にアニメーションする最新手法。トースト通知や動的リストの定番になりつつあります。',
    category: '出現・入場',
    html: `<div class="toast">保存しました ✓</div>
<p class="note">このプレビューを再読込（リセット）すると出現時の動きが見えます</p>`,
    css: `.toast {
  width: fit-content;
  padding: 12px 20px;
  background: #2b4233;
  color: #fff;
  border-radius: 8px;
  opacity: 1;
  translate: 0 0;
  transition: opacity 0.5s ease, translate 0.5s ease;

  @starting-style {
    opacity: 0;
    translate: 0 16px;
  }
}

.note {
  font-size: 12px;
  color: #7d7159;
}

@media (prefers-reduced-motion: reduce) {
  .toast { transition: none; }
}`,
    explanation:
      '@starting-styleは「要素が最初にレンダリングされる瞬間のスタイル」を定義するアットルールです。通常のtransitionは状態変化がないと動きませんが、これによりDOM追加直後（=初回描画）を起点にした遷移が可能になります。従来はJSでクラスを1フレーム後に付け替えるハックが必要だった処理が、CSSだけで完結します。',
    keyProperties: ['at-starting-style', 'transition', 'opacity', 'transform'],
    tips: 'display: noneからの表示に使う場合はtransition-behavior: allow-discreteの併用が必要です。詳細は@starting-styleのページを参照してください。',
  },
  {
    id: 'scroll-reveal',
    title: 'スクロールで現れる要素（scroll-driven）',
    description:
      'スクロールに連動して要素がフェードインする演出を、JavaScriptなしのanimation-timeline: view()で実装します。',
    category: '出現・入場',
    html: `<div class="scroller">
  <p class="hint">↓ この枠内をスクロール</p>
  <div class="item">アイテム 1</div>
  <div class="item">アイテム 2</div>
  <div class="item">アイテム 3</div>
  <div class="item">アイテム 4</div>
  <div class="item">アイテム 5</div>
  <div class="item">アイテム 6</div>
</div>`,
    css: `.scroller {
  height: 230px;
  overflow-y: auto;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  padding: 12px;
  width: 240px;
}

.hint {
  color: #7d7159;
  font-size: 12px;
  margin: 0 0 60px;
}

.item {
  padding: 16px;
  margin-block: 16px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 90%;
}

@keyframes reveal {
  from {
    opacity: 0;
    translate: 0 24px;
    scale: 0.96;
  }
}

@media (prefers-reduced-motion: reduce) {
  .item { animation: none; }
}`,
    explanation:
      'animation-timeline: view()は「要素がスクロールコンテナ内に見えている割合」をアニメーションの進行度にします。時間ではなくスクロール位置が進行度なので、ゆっくりスクロールすればゆっくり現れます。animation-rangeのentry 0%〜90%は「見え始めから9割見えるまで」の区間で再生する指定です。従来のIntersectionObserver+クラス付替えを完全に置き換えられます。',
    keyProperties: ['animation-timeline', 'animation', 'keyframes', 'overflow', 'opacity'],
    tips: 'Firefoxは2026年7月時点で未対応です。animationショートハンドの後にanimation-timelineを書かないとリセットされる点にも注意（AI生成コードの定番バグ）。',
  },

  // ============ テキスト ============
  {
    id: 'typewriter',
    title: 'タイプライター',
    description:
      '文字が1文字ずつ打たれていくタイプライター演出。steps()イージングとwidthアニメーション、点滅キャレットの組み合わせです。',
    category: 'テキスト',
    html: `<p class="type">Typing with pure CSS!</p>`,
    css: `.type {
  font-family: 'Courier New', monospace;
  font-size: 18px;
  width: 21ch;
  white-space: nowrap;
  overflow: hidden;
  border-right: 3px solid #c2452f;
  animation:
    typing 2.4s steps(21) forwards,
    blink 0.7s step-end infinite;
}

@keyframes typing {
  from { width: 0; }
}

@keyframes blink {
  50% { border-color: transparent; }
}

@media (prefers-reduced-motion: reduce) {
  .type {
    animation: blink 0.7s step-end infinite;
    width: 21ch;
  }
}`,
    explanation:
      '幅を0から21ch（=21文字分）へ、steps(21)で21段階に区切って広げることで「1文字ずつ現れる」動きになります。滑らかに広げるのではなく階段状に進むのがsteps()の役割です。右ボーダーをキャレットに見立て、別のアニメーションで点滅させています。ch単位は半角文字の幅基準なので、文字数とステップ数を一致させるのがコツです。',
    keyProperties: ['animation', 'keyframes', 'white-space', 'overflow', 'width'],
    tips: '日本語（全角）はchと幅が合わないため、この手法は等幅フォントの英数字向けです。日本語ではclip-pathを使う方法もあります。',
  },
  {
    id: 'text-gradient-flow',
    title: '流れるグラデーションテキスト',
    description:
      '文字の中をグラデーションが流れ続けるヒーロー見出し向けの演出。background-clip: textが主役です。',
    category: 'テキスト',
    html: `<h1 class="flow-text">Gradient Flow</h1>`,
    css: `.flow-text {
  font-size: 40px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    90deg,
    #c2452f, #a98338, #3c5c88, #c2452f
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: flow 6s linear infinite;
}

@keyframes flow {
  to { background-position: 300% 0; }
}

@media (prefers-reduced-motion: reduce) {
  .flow-text { animation: none; }
}`,
    explanation:
      'background-clip: textで背景を文字の形に切り抜き、color: transparentで文字自体を透明にすると「グラデーションでできた文字」になります。あとはスケルトンと同じ要領でbackground-positionを流すだけです。グラデーションの最初と最後を同じ色（ここでは朱色）にしておくと、ループの継ぎ目が見えません。',
    keyProperties: ['linear-gradient', 'background-size', 'background-position', 'animation', 'color'],
    tips: 'background-clip: textは-webkit-プレフィックス付きの記述も併記するのが現在も安全です（実装の歴史的経緯によるもの）。',
  },
  {
    id: 'text-wave',
    title: '波打つテキスト',
    description:
      '1文字ずつ上下に波打つ楽しげなテキスト演出。文字をspanに分けてanimation-delayをずらすスタッガーの応用です。',
    category: 'テキスト',
    html: `<p class="wave" aria-label="CSS!">
  <span>C</span><span>S</span><span>S</span><span>!</span>
</p>`,
    css: `.wave {
  font-size: 36px;
  font-weight: 700;
  color: #3c5c88;
  display: flex;
  gap: 2px;
}

.wave span {
  display: inline-block;
  animation: rise 1.4s ease-in-out infinite;
}

.wave span:nth-child(2) { animation-delay: 0.1s; }
.wave span:nth-child(3) { animation-delay: 0.2s; }
.wave span:nth-child(4) { animation-delay: 0.3s; }

@keyframes rise {
  0%, 100% { translate: 0 0; }
  30% { translate: 0 -12px; }
}

@media (prefers-reduced-motion: reduce) {
  .wave span { animation: none; }
}`,
    explanation:
      '文字を1つずつspanで包み、同じ上下アニメーションに0.1秒ずつのdelayを与えると波に見えます。キーフレームの山を30%に置いている（50%ではなく）のは、上がる動きを素早く・戻りをゆっくりにして弾む感じを出すためです。親のaria-labelに全文を持たせ、分割したspanが1文字ずつ読み上げられるのを防いでいます。',
    keyProperties: ['animation', 'keyframes', 'transform', 'pseudo-nth-child'],
    tips: '文字分割はアクセシビリティと引き換えです。装飾的な短い単語だけに使い、本文には使わないでください。',
  },

  // ============ マイクロインタラクション ============
  {
    id: 'heart-pop',
    title: 'いいねのポップ',
    description:
      'ハートを押すと弾んで膨らむ「いいね」アニメーション。checkboxハックとオーバーシュートするイージングが鍵です。',
    category: 'マイクロインタラクション',
    html: `<input type="checkbox" id="like" class="like-input">
<label for="like" class="like" aria-label="いいね">❤</label>`,
    css: `.like-input {
  display: none;
}

.like {
  display: inline-block;
  font-size: 40px;
  color: #cec2a8;
  cursor: pointer;
  transition: color 0.2s, scale 0.15s;
  user-select: none;
}

.like:hover {
  scale: 1.1;
}

.like-input:checked + .like {
  color: #bd3a2e;
  animation: pop 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.4);
}

@keyframes pop {
  0% { scale: 0.6; }
  60% { scale: 1.3; }
  100% { scale: 1; }
}`,
    explanation:
      'チェック状態をCSSだけで扱うため、非表示のcheckboxと隣接セレクタ（:checked + .like）を使っています。弾む質感の正体はcubic-bezier(0.175, 0.885, 0.32, 1.4)——第4引数が1を超えると「行き過ぎて戻る」オーバーシュートになります。keyframesでも60%で1.3倍まで膨らませて仕上げの弾みを重ねています。',
    keyProperties: ['animation', 'keyframes', 'transition', 'transform', 'user-select', 'cursor'],
    tips: '実務ではbutton要素+aria-pressedで実装し、:checkedの代わりに[aria-pressed="true"]で同じCSSを当てるとよりアクセシブルです。',
  },
  {
    id: 'shake-error',
    title: 'エラーシェイク',
    description:
      '入力エラーをプルプルと震えて知らせるフィードバック。:user-invalidと組み合わせるとJavaScriptなしで動きます。',
    category: 'マイクロインタラクション',
    html: `<label>
  メールアドレス（必須）
  <input type="email" required placeholder="入力せずに外をクリック">
</label>`,
    css: `label {
  display: block;
  font-size: 13px;
  color: #5d5344;
  width: 240px;
}

input {
  display: block;
  width: 100%;
  margin-top: 6px;
  padding: 10px 12px;
  font-size: 14px;
  border: 1.5px solid #cec2a8;
  border-radius: 6px;
  background: #fff;
}

input:user-invalid {
  border-color: #bd3a2e;
  background: #fbecec;
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  20% { translate: -6px 0; }
  40% { translate: 6px 0; }
  60% { translate: -4px 0; }
  80% { translate: 4px 0; }
}

@media (prefers-reduced-motion: reduce) {
  input:user-invalid { animation: none; }
}`,
    explanation:
      '左右に振れ幅を減らしながら揺れる（-6→6→-4→4px）ことで、機械的な往復ではなく減衰する自然な振動になります。トリガーには:user-invalid（ユーザーが操作した後にだけ発火する検証擬似クラス）を使っているため、ページを開いた瞬間に震えることはありません。',
    keyProperties: ['animation', 'keyframes', 'pseudo-user-valid', 'transform', 'border'],
    tips: '揺れはエラーの「通知」であって「説明」ではありません。何が悪いかのテキストメッセージは必ず併用してください。',
  },
  {
    id: 'toggle-switch',
    title: 'トグルスイッチ',
    description:
      'iOS風のオン/オフスイッチ。checkbox+擬似要素+transitionの組み合わせで、ノブの移動に弾みを付けます。',
    category: 'マイクロインタラクション',
    html: `<label class="switch">
  <input type="checkbox">
  <span class="track" aria-hidden="true"></span>
  通知を受け取る
</label>`,
    css: `.switch {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  cursor: pointer;
  user-select: none;
}

.switch input {
  position: absolute;
  opacity: 0;
}

.track {
  position: relative;
  width: 52px;
  height: 30px;
  border-radius: 15px;
  background: #cec2a8;
  transition: background 0.25s ease;
  flex-shrink: 0;
}

.track::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.25);
  transition: translate 0.25s cubic-bezier(0.2, 0.7, 0.3, 1.2);
}

.switch input:checked + .track {
  background: #527f5e;
}

.switch input:checked + .track::after {
  translate: 22px 0;
}

.switch input:focus-visible + .track {
  outline: 2px solid #c2452f;
  outline-offset: 2px;
}`,
    explanation:
      'checkboxはdisplay: noneではなくopacity: 0で「見えないが存在する」状態にしています（キーボードフォーカスを受けられるように）。ノブの移動はleftではなくtranslateで行い、少しオーバーシュートするcubic-bezierで「カチッ」とした手応えを演出します。:focus-visible時のoutlineをトラック側に描くことで、キーボード操作でも現在位置が分かります。',
    keyProperties: ['transition', 'transform', 'border-radius', 'pseudo-focus-visible', 'outline'],
    tips: '実務ではrole="switch"とaria-checkedの利用も検討してください。フォーム部品の色だけ変えたい場合はaccent-colorという1行の選択肢もあります。',
  },

  // ============ 背景・装飾 ============
  {
    id: 'gradient-flow-bg',
    title: '動くグラデーション背景',
    description:
      'ヒーローセクション向けの、ゆっくり揺らめくグラデーション背景。background-positionだけを動かす軽量な実装です。',
    category: '背景・装飾',
    html: `<div class="hero">
  <strong>Gradient Background</strong>
</div>`,
    css: `.hero {
  display: grid;
  place-items: center;
  width: 260px;
  height: 150px;
  border-radius: 12px;
  color: #453d31;
  background: linear-gradient(
    120deg,
    #f2d7cb, #efe2c6, #dde5ee, #e3dcec, #f2d7cb
  );
  background-size: 400% 400%;
  animation: drift 10s ease-in-out infinite alternate;
}

@keyframes drift {
  to { background-position: 100% 100%; }
}

@media (prefers-reduced-motion: reduce) {
  .hero { animation: none; }
}`,
    explanation:
      'グラデーション自体は静止画のまま、background-sizeで4倍に拡大した背景の「見えている窓」をbackground-positionでゆっくり移動させています。widthやfilterを動かさないため描画負荷が小さく、常時動かす背景に向いています。animation-direction: alternateで往復させると、ループの継ぎ目なく揺らぎ続けます。',
    keyProperties: ['linear-gradient', 'background-size', 'background-position', 'animation'],
    tips: '文字を載せる場合はコントラストが常に確保できる色域に留めるか、文字側に半透明の座布団を敷いてください。',
  },
  {
    id: 'pulse-ring',
    title: 'パルスリング（波紋）',
    description:
      '通知ドットやライブ配信中バッジで使われる、波紋が広がり続ける演出。scaleとopacityの同時アニメーションです。',
    category: '背景・装飾',
    html: `<div class="live">
  <span class="dot"></span>
  配信中
</div>`,
    css: `.live {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #bd3a2e;
}

.dot {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #bd3a2e;
}

.dot::before,
.dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: inherit;
  animation: ripple 2s ease-out infinite;
}

.dot::after {
  animation-delay: 1s;
}

@keyframes ripple {
  from { scale: 1; opacity: 0.6; }
  to { scale: 3.2; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .dot::before, .dot::after { animation: none; }
}`,
    explanation:
      '波紋の正体は、ドットと同じ形の::beforeと::afterを拡大しながら透明にしていくアニメーションです。2つの擬似要素に1秒差のdelayを付けることで、波が途切れなく続いて見えます（1つだけだと波の間に空白ができます）。background: inheritで親の色を引き継ぐため、色替えは.dotの1箇所で済みます。',
    keyProperties: ['animation', 'keyframes', 'transform', 'opacity', 'inset', 'border-radius'],
  },
  {
    id: 'floating-blobs',
    title: 'ふわふわ浮かぶ玉',
    description:
      '背景装飾の定番、ゆっくり漂う半透明の円。duration違いの同じアニメーションを重ねて有機的な動きを作ります。',
    category: '背景・装飾',
    html: `<div class="blobs">
  <span class="blob b1"></span>
  <span class="blob b2"></span>
  <span class="blob b3"></span>
</div>`,
    css: `.blobs {
  position: relative;
  width: 260px;
  height: 160px;
  border-radius: 12px;
  background: #f7f1e3;
  overflow: hidden;
}

.blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.55;
  filter: blur(2px);
  animation: float ease-in-out infinite alternate;
}

.b1 {
  width: 90px; height: 90px;
  left: 20px; top: 30px;
  background: #d98a71;
  animation-duration: 6s;
}

.b2 {
  width: 60px; height: 60px;
  right: 40px; top: 20px;
  background: #9db4d0;
  animation-duration: 9s;
}

.b3 {
  width: 70px; height: 70px;
  right: 70px; bottom: 10px;
  background: #d0b271;
  animation-duration: 7.5s;
  animation-delay: 1s;
}

@keyframes float {
  to { translate: 14px -18px; }
}

@media (prefers-reduced-motion: reduce) {
  .blob { animation: none; }
}`,
    explanation:
      '3つの円はすべて同じ@keyframes floatを共有していますが、animation-durationとdelayをバラバラにすることで、同期しない有機的な漂いになります。alternateで往復させているのでループの継ぎ目はありません。「同じ動き×違う周期」は少ないコードで複雑さを演出する常套手段です。',
    keyProperties: ['animation', 'keyframes', 'transform', 'filter', 'opacity', 'overflow'],
    tips: '円の数を増やすほどリッチになりますが、blurは負荷が高めなので枚数と半径はほどほどに。',
  },
];
