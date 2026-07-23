// UIレシピ集データ
// 各レシピはサンドボックスiframeでそのまま動く自己完結のHTML/CSS（＋最小限のJS）。
// keyPropertiesは実在するプロパティIDのみ（npm run validateで検証）。
// ラインナップは docs/specs/20260723_ui-recipes.md の「初期ラインナップ（24件・確定）」に従う。
import type { Recipe } from '@/types/css';

export type { Recipe };

export const recipeCategories = [
  'ボタン・操作',
  'カード',
  'フォーム',
  'ナビゲーション',
  '表示・フィードバック',
  'レイアウトパターン',
] as const;

export const recipes: Recipe[] = [
  // ============ ボタン・操作 ============
  {
    id: 'loading-button',
    title: 'ローディング状態付きボタン',
    description:
      '押すとスピナーが回り「保存中…」に変わるボタン。二重送信を防ぎ、aria-busyで処理中であることを支援技術にも伝えます。',
    category: 'ボタン・操作',
    html: `<button type="button" id="save-btn" class="btn">
  <span class="spinner" aria-hidden="true"></span>
  <span class="label">保存する</span>
</button>`,
    css: `.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: 1px solid #b0413e;
  border-radius: 6px;
  background: #b0413e;
  color: #fff;
  font: inherit;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn:focus-visible {
  outline: 2px solid #1a1712;
  outline-offset: 2px;
}

.btn .spinner {
  display: none;
  width: 14px;
  height: 14px;
  border: 2px solid rgb(255 255 255 / 0.4);
  border-top-color: #fff;
  border-radius: 50%;
}

.btn.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.btn.is-loading .spinner {
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .btn.is-loading .spinner { animation: none; }
}`,
    js: `const btn = document.getElementById('save-btn');
btn.addEventListener('click', () => {
  btn.classList.add('is-loading');
  btn.setAttribute('aria-busy', 'true');
  btn.querySelector('.label').textContent = '保存中…';
  // デモ用: 2秒後に元へ戻す（実際は通信完了時に戻す）
  setTimeout(() => {
    btn.classList.remove('is-loading');
    btn.removeAttribute('aria-busy');
    btn.querySelector('.label').textContent = '保存する';
  }, 2000);
});`,
    explanation:
      'ローディング中は is-loading クラスで opacity を下げ、pointer-events: none で連打（二重送信）を防ぎます。スピナーは border の一辺だけ色を変えた円を回転させる定番の作りです。disabled 属性ではなく aria-busy を使うのは、disabled にするとフォーカスが外れてしまうためです。動きを減らす設定のユーザーには回転を止め、文言と薄化だけで状態を伝えます。',
    keyProperties: ['animation', 'transform', 'opacity', 'transition', 'border-radius'],
    tips: 'フォーム送信ボタンの場合も type="button" でJS側から送信を制御すると、状態管理が単純になります。',
    aiPrompt:
      'クリックするとスピナーが表示され「保存中…」になるローディング状態付きボタンを作ってください。aria-busyの付与、pointer-eventsでの二重送信防止、prefers-reduced-motionでアニメーション停止も含めてください。',
  },
  {
    id: 'copy-feedback-button',
    title: 'コピー完了フィードバックボタン',
    description:
      'コードスニペット横の「コピー」ボタン。押すと2秒間「コピーしました」に変わり、色でも完了を伝えるマイクロインタラクションです。',
    category: 'ボタン・操作',
    html: `<div class="copy-row">
  <code>npm run build</code>
  <button type="button" id="copy-btn" class="copy-btn">コピー</button>
</div>`,
    css: `.copy-row {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  font-family: ui-monospace, monospace;
}

.copy-btn {
  padding: 4px 12px;
  border: 1px solid #cbbfa5;
  border-radius: 6px;
  background: transparent;
  color: #5c5445;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s;
}

.copy-btn:hover {
  border-color: #b0413e;
  color: #b0413e;
}

.copy-btn:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: 2px;
}

.copy-btn.is-copied {
  background-color: #4a7c59;
  border-color: #4a7c59;
  color: #fff;
}`,
    js: `const copyBtn = document.getElementById('copy-btn');
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('npm run build');
  } catch {
    // クリップボードが使えない環境（このプレビュー内など）でも表示は切り替える
  }
  copyBtn.textContent = 'コピーしました';
  copyBtn.classList.add('is-copied');
  setTimeout(() => {
    copyBtn.textContent = 'コピー';
    copyBtn.classList.remove('is-copied');
  }, 2000);
});`,
    explanation:
      'navigator.clipboard.writeText でコピーし、成功・失敗にかかわらずボタンの文言と色を2秒間切り替えて結果を伝えます。色だけでなく文言も変えるのは、色覚特性のあるユーザーにも伝わるようにするためです。transition を background-color 等に限定しているので、切り替えがなめらかに見えます。',
    keyProperties: ['transition', 'background-color', 'border-radius', 'color'],
    tips: 'このプレビューのサンドボックス内ではクリップボードAPIがブロックされるため表示切り替えのみ動きます。実サイトではHTTPS（またはlocalhost）が必要です。',
    aiPrompt:
      'コードブロック横に置くコピーボタンを作ってください。navigator.clipboardでコピーし、2秒間「コピーしました」と文言と背景色が変わるフィードバック付き。クリップボードが使えない環境でも落ちないようにtry-catchしてください。',
  },
  {
    id: 'segmented-control',
    title: 'セグメンテッドコントロール',
    description:
      'iOS風の切り替えスイッチをradioボタンで実装。見た目はCSSだけで作り、キーボード操作とフォーム送信はブラウザ標準のまま使えます。',
    category: 'ボタン・操作',
    html: `<fieldset class="segmented">
  <legend class="sr-only">表示の切り替え</legend>
  <label>
    <input type="radio" name="view" value="list" checked>
    <span>一覧</span>
  </label>
  <label>
    <input type="radio" name="view" value="grid">
    <span>グリッド</span>
  </label>
  <label>
    <input type="radio" name="view" value="map">
    <span>地図</span>
  </label>
</fieldset>`,
    css: `.segmented {
  display: inline-flex;
  gap: 2px;
  margin: 0;
  padding: 3px;
  border: 1px solid #cbbfa5;
  border-radius: 8px;
  background: #f3ecd9;
}

.segmented input {
  appearance: none;
  position: absolute;
  margin: 0;
}

.segmented span {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 6px;
  font-size: 14px;
  color: #5c5445;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}

.segmented input:checked + span {
  background: #fff;
  color: #1a1712;
  font-weight: 600;
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.15);
}

.segmented input:focus-visible + span {
  outline: 2px solid #b0413e;
  outline-offset: 1px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}`,
    explanation:
      '実体はただのradioボタンです。input自体は appearance: none と absolute 配置で見えなくし、隣接する span を「:checked + span」で選択中の見た目に切り替えます。radioなのでTabでグループに入り矢印キーで選択でき、name属性ごとフォーム送信にも使えます。フォーカスリングは input:focus-visible + span で span 側に描きます。',
    keyProperties: ['appearance', 'display-flex', 'border-radius', 'box-shadow', 'pseudo-focus-visible'],
    tips: 'divとJSで自作するとキーボード操作・aria属性をすべて自前で書くことになります。radioで作れば無料でついてきます。',
    aiPrompt:
      'radioボタンを使ったセグメンテッドコントロール（iOS風の切り替えUI）を作ってください。inputはappearance: noneで隠し、:checked + spanで選択状態を表現、フォーカスリングも表示してください。JSは使わないでください。',
  },
  {
    id: 'fab',
    title: 'フローティングアクションボタン',
    description:
      '画面右下に追従する円形のアクションボタン（FAB）。position: fixedとinsetの1行で配置し、ホバーで浮き上がります。',
    category: 'ボタン・操作',
    html: `<p>ページをスクロールしても、右下のボタンは画面に追従します。</p>
<p style="height: 400px">（スクロール用の余白）</p>
<p>ページの末尾です。</p>

<button type="button" class="fab" aria-label="新規作成">＋</button>`,
    css: `.fab {
  position: fixed;
  inset: auto 16px 16px auto; /* 上 右 下 左 → 右下に固定 */
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background: #b0413e;
  color: #fff;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.25);
  transition: box-shadow 0.2s, transform 0.2s;
}

.fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgb(0 0 0 / 0.3);
}

.fab:focus-visible {
  outline: 3px solid #1a1712;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .fab { transition: none; }
}`,
    explanation:
      'position: fixed でビューポート基準に固定し、inset: auto 16px 16px auto の1行で「右下から16px」を表現します（top/right/bottom/leftを個別に書くより短い）。テキストは「＋」だけなので、ボタンの意味は aria-label で伝えます。ホバー時は transform と影の強調で浮き上がりを演出します。',
    keyProperties: ['position', 'inset', 'border-radius', 'box-shadow', 'transition'],
    tips: 'モバイル実機では下端のブラウザUIと重なることがあります。env(safe-area-inset-bottom)を足すと安全です。',
    aiPrompt:
      '画面右下に固定表示される円形のフローティングアクションボタン（FAB）を作ってください。insetで配置し、aria-labelでボタンの意味を伝え、ホバーで浮き上がるエフェクトとフォーカスリングを付けてください。',
  },

  // ============ カード ============
  {
    id: 'article-card',
    title: '記事カード（画像＋タグ）',
    description:
      'ブログ一覧で使う記事カード。サムネイル・タグ・タイトル・抜粋・日付の定番構成を、aspect-ratioとoverflowで崩れないように組みます。',
    category: 'カード',
    html: `<article class="card">
  <div class="card-media" role="img" aria-label="記事のサムネイル"></div>
  <div class="card-body">
    <div class="card-tags">
      <span class="tag">CSS</span>
      <span class="tag">レイアウト</span>
    </div>
    <h3 class="card-title">Gridで作る雑誌風レイアウト入門</h3>
    <p class="card-excerpt">grid-template-areasを使うと、複雑な誌面のような配置もHTMLの順序を変えずに実現できます。</p>
    <p class="card-meta">2026-07-23 ・ 5分で読める</p>
  </div>
</article>`,
    css: `.card {
  max-width: 280px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 10px;
  overflow: hidden; /* 角丸から画像がはみ出さないように */
}

.card-media {
  aspect-ratio: 16 / 9; /* 画像が未読込でも高さが確保されガタつかない */
  background: linear-gradient(135deg, #d9c79a, #b0413e);
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px 16px;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 2px 10px;
  border: 1px solid #cbbfa5;
  border-radius: 999px;
  font-size: 11px;
  color: #8a6d3b;
}

.card-title {
  margin: 0;
  font-size: 16px;
  line-height: 1.4;
}

.card-excerpt {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #5c5445;
}

.card-meta {
  margin: 0;
  font-size: 12px;
  color: #b5a583;
}`,
    explanation:
      'サムネイル領域に aspect-ratio: 16 / 9 を指定しておくと、画像の読み込み前後で高さが変わらず、一覧のガタつき（レイアウトシフト）を防げます。カード全体の overflow: hidden は、角丸の内側に画像を収めるためです。本文は flex-direction: column と gap で縦に積み、要素間の余白をmarginではなくgapで一元管理しています。',
    keyProperties: ['aspect-ratio', 'overflow', 'display-flex', 'flex-direction', 'gap'],
    tips: '実際の画像を使う場合は img に width/height 属性か object-fit: cover を指定します。抜粋の行数制限には line-clamp が使えます。',
    aiPrompt:
      'ブログ一覧用の記事カードを作ってください。サムネイル（aspect-ratio: 16/9）・タグの列・タイトル・抜粋・日付の構成で、画像読み込み時にレイアウトシフトが起きない作りにしてください。',
  },
  {
    id: 'profile-card',
    title: 'プロフィールカード',
    description:
      'アバター・名前・肩書き・フォローボタンを縦に積んだプロフィールカード。円形アバターと中央揃えの基本形です。',
    category: 'カード',
    html: `<article class="profile">
  <div class="avatar" role="img" aria-label="山田花子のアバター"></div>
  <h3 class="name">山田 花子</h3>
  <p class="role">フロントエンドエンジニア</p>
  <dl class="stats">
    <div><dt>投稿</dt><dd>128</dd></div>
    <div><dt>フォロワー</dt><dd>1.2k</dd></div>
  </dl>
  <button type="button" class="follow">フォローする</button>
</article>`,
    css: `.profile {
  width: 240px;
  padding: 24px 20px 20px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 12px;
  text-align: center;
}

.avatar {
  width: 72px;
  height: 72px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #d9c79a, #8a6d3b);
}

.name {
  margin: 0 0 2px;
  font-size: 17px;
}

.role {
  margin: 0 0 14px;
  font-size: 12px;
  color: #8a6d3b;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin: 0 0 16px;
}

.stats dt {
  font-size: 11px;
  color: #b5a583;
}

.stats dd {
  margin: 0;
  font-weight: 700;
}

.follow {
  width: 100%;
  padding: 8px 0;
  border: 1px solid #b0413e;
  border-radius: 6px;
  background: #b0413e;
  color: #fff;
  font: inherit;
  cursor: pointer;
}

.follow:hover { background: #97362f; }

.follow:focus-visible {
  outline: 2px solid #1a1712;
  outline-offset: 2px;
}`,
    explanation:
      '円形アバターは border-radius: 50% の定番技です。中身はカード全体の text-align: center で中央に寄せ、アバターだけは margin: 0 auto でブロックごと中央配置します。実数のペア（投稿数など）は dl/dt/dd でマークアップすると、ラベルと値の関係が支援技術にも伝わります。',
    keyProperties: ['border-radius', 'text-align', 'display-flex', 'justify-content', 'gap'],
    tips: '実際のアバター画像を使うときは img に object-fit: cover を指定すると、縦横比の違う画像でも円内に収まります。',
    aiPrompt:
      'プロフィールカードを作ってください。円形アバター・名前・肩書き・投稿数とフォロワー数（dlでマークアップ）・フォローボタンの縦積み構成で、中央揃えにしてください。',
  },
  {
    id: 'media-card',
    title: '横並びメディアカード',
    description:
      'サムネイルが左、テキストが右の横並びカード。flex-shrink: 0で画像の潰れを防ぎ、長いタイトルは省略記号で丸めます。',
    category: 'カード',
    html: `<a href="#" class="media-card">
  <div class="thumb" aria-hidden="true"></div>
  <div class="body">
    <h3 class="title">flex-wrapの使いどころ — 折り返しの基本とカードグリッドとの使い分け</h3>
    <p class="desc">「なぜか1行に潰れて並ぶ」「余白が揃わない」を解決する、折り返し設計の考え方。</p>
  </div>
</a>`,
    css: `.media-card {
  display: flex;
  gap: 14px;
  max-width: 400px;
  padding: 12px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 10px;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.2s;
}

.media-card:hover,
.media-card:focus-visible {
  border-color: #b0413e;
}

.thumb {
  flex-shrink: 0; /* テキストが長くても画像を潰さない */
  width: 88px;
  aspect-ratio: 1;
  border-radius: 8px;
  background: linear-gradient(135deg, #a8b8a0, #4a7c59);
}

.body {
  min-width: 0; /* flexアイテム内で省略(…)を効かせるのに必須 */
}

.title {
  margin: 0 0 4px;
  font-size: 14px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc {
  margin: 0;
  font-size: 12px;
  line-height: 1.6;
  color: #5c5445;
}`,
    explanation:
      '横並びカードの2大トラブルは「画像が潰れる」と「省略記号が効かない」です。前者はサムネイルに flex-shrink: 0、後者はテキスト側の flexアイテムに min-width: 0 を指定して解決します（flexアイテムのmin-widthは初期値autoのため、内容より小さくなれず ellipsis が発動しません）。タイトルの1行省略は overflow / text-overflow / white-space の3点セットです。',
    keyProperties: ['display-flex', 'gap', 'flex-grow-shrink-basis', 'aspect-ratio', 'text-overflow'],
    tips: 'カード全体をaで包むと、タップ領域が広く使いやすくなります。中に別のリンクを入れたい場合は構造を見直してください（aの入れ子は不可）。',
    aiPrompt:
      'サムネイル左・テキスト右の横並びメディアカードを作ってください。画像はflex-shrink: 0で固定、テキスト側はmin-width: 0を指定し、長いタイトルはtext-overflow: ellipsisで1行に省略してください。',
  },
  {
    id: 'hover-reveal-card',
    title: 'ホバーで詳細が現れるカード',
    description:
      'ホバーまたはキーボードフォーカスで、下からオーバーレイがスライドして詳細が現れるカード。focus-within対応でキーボードでも使えます。',
    category: 'カード',
    html: `<article class="reveal-card">
  <div class="media" aria-hidden="true"></div>
  <h3 class="caption">京都の路地</h3>
  <div class="overlay">
    <p>石畳の続く先斗町の小径。夕暮れの提灯が灯る時間帯が見頃です。</p>
    <a href="#">詳しく見る</a>
  </div>
</article>`,
    css: `.reveal-card {
  position: relative;
  width: 240px;
  border: 1px solid #e2d8c2;
  border-radius: 10px;
  overflow: hidden; /* スライドしてくるオーバーレイを枠内に収める */
  background: #fff;
}

.media {
  aspect-ratio: 4 / 3;
  background: linear-gradient(160deg, #d9c79a 30%, #97362f);
}

.caption {
  margin: 0;
  padding: 12px 16px;
  font-size: 15px;
}

.overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 14px 16px;
  background: rgb(26 23 18 / 0.88);
  color: #fdfaf3;
  font-size: 13px;
  line-height: 1.6;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.overlay p { margin: 0 0 8px; }

.overlay a { color: #d9a441; }

.reveal-card:hover .overlay,
.reveal-card:focus-within .overlay {
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  .overlay { transition: none; }
}`,
    explanation:
      'オーバーレイを absolute でカード下端に貼り付け、初期状態は transform: translateY(100%) で自分の高さぶん下（=カード外）に隠しておきます。カードの overflow: hidden ではみ出しを非表示にし、:hover と :focus-within で transform を解除するとスライドインします。:focus-within を併記することで、中のリンクにTabで到達したときも開き、マウスなしでも内容にアクセスできます。',
    keyProperties: ['position', 'transform', 'transition', 'overflow', 'pseudo-focus-within'],
    tips: 'タッチデバイスにはホバーがありません。重要な情報や導線はオーバーレイの中だけに置かず、常時見える場所にも用意してください。',
    aiPrompt:
      'ホバーで下からオーバーレイがスライドして詳細が現れる画像カードを作ってください。transform: translateY(100%)で隠し、:hoverと:focus-withinの両方で表示。prefers-reduced-motionではアニメーションを無効にしてください。',
  },

  // ============ フォーム ============
  {
    id: 'floating-label-input',
    title: 'フローティングラベル入力欄',
    description:
      'フォーカスまたは入力済みのときにラベルが小さく上へ移動する入力欄。placeholderと:placeholder-shownを使いJSなしで実現します。',
    category: 'フォーム',
    html: `<div class="field">
  <input type="text" id="name" placeholder=" " autocomplete="name" />
  <label for="name">お名前</label>
</div>`,
    css: `.field {
  position: relative;
  width: 260px;
}

.field input {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 12px 6px;
  border: 1px solid #cbbfa5;
  border-radius: 6px;
  background: #fff;
  font: inherit;
}

.field input:focus {
  outline: 2px solid #b0413e;
  outline-offset: -1px;
}

.field label {
  position: absolute;
  left: 13px;
  top: 13px;
  color: #8a7d63;
  pointer-events: none; /* ラベル越しに入力欄をクリックできるように */
  transform-origin: left top;
  transition: transform 0.15s, color 0.15s;
}

.field input:focus + label,
.field input:not(:placeholder-shown) + label {
  transform: translateY(-9px) scale(0.72);
  color: #b0413e;
}

@media (prefers-reduced-motion: reduce) {
  .field label { transition: none; }
}`,
    explanation:
      '鍵は placeholder=" "（半角スペース）です。:placeholder-shown は「プレースホルダが見えている＝未入力」のときに一致する擬似クラスなので、input:not(:placeholder-shown) で「入力済み」を表せます。これとフォーカス時（input:focus + label）の2条件でラベルを transform で縮小移動します。ラベルは本物の label 要素なので、クリックでの入力欄フォーカスや支援技術との関連付けはそのまま機能します。',
    keyProperties: ['position', 'transition', 'transform', 'outline'],
    tips: 'transformで動かしているのはレイアウト再計算を避けるためです。font-sizeやtopを直接アニメーションさせるとカクつくことがあります。',
    aiPrompt:
      'JSを使わないフローティングラベル入力欄を作ってください。placeholder=" "と:placeholder-shownで入力済みを判定し、フォーカス時と入力済み時にlabelをtransformで左上に縮小移動させてください。',
  },
  {
    id: 'validated-input',
    title: 'リアルタイムバリデーション表示',
    description:
      '入力し終えてから初めてエラーを表示するメール入力欄。:user-invalidと:has()により、JSなしで「入力前に怒らない」検証UIを作ります。',
    category: 'フォーム',
    html: `<form class="signup">
  <div class="field">
    <label for="email">メールアドレス</label>
    <input type="email" id="email" required placeholder="you@example.com" autocomplete="email" />
    <p class="error" role="alert">メールアドレスの形式で入力してください</p>
  </div>
  <button type="submit" class="submit">登録する</button>
</form>`,
    css: `.field {
  width: 280px;
  margin-bottom: 12px;
}

.field label {
  display: block;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 600;
}

.field input {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  border: 1px solid #cbbfa5;
  border-radius: 6px;
  background: #fff;
  font: inherit;
}

.field input:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: -1px;
}

.field input:user-valid {
  border-color: #4a7c59;
}

.field input:user-invalid {
  border-color: #b0413e;
  background: #fdf3f2;
}

.error {
  display: none;
  margin: 4px 0 0;
  font-size: 12px;
  color: #b0413e;
}

.field:has(:user-invalid) .error {
  display: block;
}

.submit {
  padding: 8px 20px;
  border: 1px solid #b0413e;
  border-radius: 6px;
  background: #b0413e;
  color: #fff;
  font: inherit;
  cursor: pointer;
}`,
    explanation:
      ':invalid はページ表示直後の空欄にも一致してしまい「入力前から赤い」フォームになりがちです。:user-invalid はユーザーが操作を終えた（フォーカスを外した）後にだけ一致するため、体験を壊さずに検証結果を出せます。エラーメッセージの表示は、親要素側から .field:has(:user-invalid) で子の状態を参照して切り替えます。正しく入力し直すと :user-valid で緑の枠に変わります。',
    keyProperties: ['pseudo-user-valid', 'pseudo-has', 'border', 'display'],
    tips: 'エラー文はrole="alert"にすると表示された時点でスクリーンリーダーが読み上げます。文言は「何をどう直すか」まで書くのが親切です。',
    aiPrompt:
      'required付きメール入力欄のバリデーション表示を作ってください。:user-invalidで入力後のみエラースタイルを適用し、:has()で親要素からエラーメッセージ（role="alert"）の表示を切り替えてください。JSは使わないでください。',
  },
  {
    id: 'custom-checkbox',
    title: 'カスタムチェックボックス',
    description:
      'appearance: noneでブラウザ標準の見た目を外し、input要素自体をデザインするチェックボックス。キーボード操作もラベル連動もそのまま生きます。',
    category: 'フォーム',
    html: `<fieldset class="prefs">
  <legend>通知の設定</legend>
  <label class="check">
    <input type="checkbox" checked />
    メールで受け取る
  </label>
  <label class="check">
    <input type="checkbox" />
    プッシュ通知で受け取る
  </label>
</fieldset>`,
    css: `.prefs {
  display: grid;
  gap: 10px;
  padding: 16px;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  width: fit-content;
}

.check {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.check input {
  appearance: none; /* 標準の見た目を外してinput自体を装飾する */
  margin: 0;
  width: 18px;
  height: 18px;
  border: 2px solid #cbbfa5;
  border-radius: 4px;
  background: #fff;
  display: inline-grid;
  place-content: center;
  transition: background-color 0.15s, border-color 0.15s;
}

.check input::before {
  content: "";
  width: 10px;
  height: 10px;
  background: #fff;
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transition: transform 0.15s;
}

.check input:checked {
  background-color: #b0413e;
  border-color: #b0413e;
}

.check input:checked::before {
  transform: scale(1);
}

.check input:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .check input, .check input::before { transition: none; }
}`,
    explanation:
      '昔の定番だった「inputを隠してspanを装飾」ではなく、appearance: none でinput要素自体を直接デザインします。要素を差し替えないので、クリック・スペースキー・label連動・:checked などの標準動作がすべてそのまま使えます。チェックマークは ::before の clip-path で描き、:checked で scale(0)→scale(1) に切り替えて表示します。',
    keyProperties: ['appearance', 'place-content', 'border-radius', 'transition', 'pseudo-focus-visible'],
    tips: '色を変えたいだけなら accent-color: #b0413e; の1行で済みます。形まで変えたいときにこのレシピを使ってください。',
    aiPrompt:
      'appearance: noneを使ったカスタムチェックボックスを作ってください。inputを隠すのではなくinput自体を装飾し、チェックマークは::beforeとclip-pathで描画、:checkedで表示、focus-visibleのリングも付けてください。',
  },
  {
    id: 'styled-range',
    title: 'スタイル済みレンジスライダー',
    description:
      '音量調整などに使うrangeスライダーの装飾。appearance: noneでトラックとつまみを自作し、ブラウザごとの見た目の差をなくします。',
    category: 'フォーム',
    html: `<label class="volume">
  音量
  <input type="range" min="0" max="100" value="60" />
</label>`,
    css: `.volume {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
}

.volume input {
  appearance: none;
  width: 220px;
  height: 6px;
  border-radius: 999px;
  /* 60% の位置まで塗る（value="60" に合わせたデモ用の固定値） */
  background: linear-gradient(to right, #b0413e 60%, #e2d8c2 60%);
  cursor: pointer;
}

.volume input::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid #b0413e;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.2);
}

.volume input::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border: 2px solid #b0413e;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgb(0 0 0 / 0.2);
}

.volume input:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: 4px;
}`,
    explanation:
      'rangeスライダーはブラウザ標準の見た目の差が大きい部品です。appearance: none でリセットし、トラックはinput自体の背景（linear-gradientの塗り分けで進捗風に）、つまみは ::-webkit-slider-thumb と ::-moz-range-thumb の2系統に同じ装飾を書きます。この2つのベンダー擬似要素は現状まとめて書けないため、別々のルールにする必要があります。',
    keyProperties: ['appearance', 'border-radius', 'box-shadow', 'pseudo-focus-visible'],
    tips: '塗り分けを実際の値に追従させるにはJSでinputイベントを拾いCSS変数を更新します。色だけならaccent-colorが最短です。',
    aiPrompt:
      'input type="range"のスライダーをカスタムデザインしてください。appearance: noneでリセットし、::-webkit-slider-thumbと::-moz-range-thumbの両方につまみの装飾を書き、focus-visibleのリングも付けてください。',
  },

  // ============ ナビゲーション ============
  {
    id: 'breadcrumb',
    title: 'パンくずリスト',
    description:
      '現在地を示すパンくずリスト。olとaria-labelで意味づけし、区切り記号はCSSの擬似要素で入れるためHTMLが汚れません。',
    category: 'ナビゲーション',
    html: `<nav class="breadcrumb" aria-label="パンくずリスト">
  <ol>
    <li><a href="#">ホーム</a></li>
    <li><a href="#">CSS</a></li>
    <li aria-current="page">パンくずリスト</li>
  </ol>
</nav>`,
    css: `.breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

.breadcrumb li + li::before {
  content: "/";
  margin-right: 8px;
  color: #b5a583;
}

.breadcrumb a {
  color: #8a6d3b;
  text-decoration: none;
}

.breadcrumb a:hover,
.breadcrumb a:focus-visible {
  text-decoration: underline;
}

.breadcrumb [aria-current="page"] {
  color: #1a1712;
  font-weight: 600;
}`,
    explanation:
      '順序付きリスト（ol）を display: flex で横並びにし、区切りの「/」は li + li::before の擬似要素で描画します。区切り記号をHTMLに書かないことで、スクリーンリーダーに余計な記号が読み上げられません。現在地は aria-current="page" で示し、リンクにはしません。',
    keyProperties: ['display', 'flex-wrap', 'gap', 'list-style'],
    tips: '項目が長い場合は flex-wrap: wrap で折り返せます。省略したい場合は white-space / text-overflow の組み合わせも検討してください。',
    aiPrompt:
      'アクセシブルなパンくずリストをHTMLとCSSで作ってください。ol要素とaria-label、現在地にはaria-current="page"を使い、区切り記号はCSSの擬似要素で入れてください。',
  },

  {
    id: 'css-tabs',
    title: 'CSSのみのタブ切り替え',
    description:
      'radioボタンと:has()だけで作るタブUI。JSなしでパネルが切り替わり、キーボードの矢印キー操作もradio標準のまま使えます。',
    category: 'ナビゲーション',
    html: `<div class="tabs">
  <input type="radio" name="tab" id="tab-a" checked>
  <label for="tab-a">概要</label>
  <input type="radio" name="tab" id="tab-b">
  <label for="tab-b">仕様</label>
  <input type="radio" name="tab" id="tab-c">
  <label for="tab-c">レビュー</label>

  <div class="panel panel-a">gapはFlexbox・Grid共通で使える余白プロパティです。</div>
  <div class="panel panel-b">値は1つ（全方向）または2つ（行・列）で指定します。</div>
  <div class="panel panel-c">「marginの相殺に悩まなくなった」と好評です。</div>
</div>`,
    css: `.tabs {
  width: 320px;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  background: #fff;
  overflow: hidden;
}

.tabs input {
  position: absolute;
  opacity: 0;
}

.tabs label {
  display: inline-block;
  padding: 10px 18px;
  font-size: 14px;
  color: #5c5445;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tabs .panel {
  display: none;
  padding: 16px;
  font-size: 13px;
  line-height: 1.7;
  border-top: 1px solid #e2d8c2;
}

/* :has()でコンテナから「どのタブが選択中か」を参照する */
.tabs:has(#tab-a:checked) label[for="tab-a"],
.tabs:has(#tab-b:checked) label[for="tab-b"],
.tabs:has(#tab-c:checked) label[for="tab-c"] {
  color: #b0413e;
  font-weight: 600;
  border-bottom-color: #b0413e;
}

.tabs:has(#tab-a:checked) .panel-a,
.tabs:has(#tab-b:checked) .panel-b,
.tabs:has(#tab-c:checked) .panel-c {
  display: block;
}

.tabs input:focus-visible + label {
  outline: 2px solid #b0413e;
  outline-offset: -2px;
}`,
    explanation:
      'タブの状態はradioボタンが持ちます。:has() が使える現在は「.tabs:has(#tab-a:checked) .panel-a」のように、コンテナ起点で選択中のタブに対応するパネルだけを display: block にできるため、旧来の「inputとpanelを兄弟に並べる」HTML構造の制約から自由になりました。radioなのでタブ間の移動は矢印キーがそのまま効きます。',
    keyProperties: ['pseudo-has', 'display', 'border', 'pseudo-focus-visible'],
    tips: '本格的なタブにはrole="tablist"とJSでのフォーカス管理が推奨されます（WAI-ARIA準拠）。この方式は設定画面など軽量な表示切り替え向けです。',
    aiPrompt:
      'JSを使わないCSSのみのタブUIを作ってください。radioボタンで状態を持ち、:has()を使ってコンテナ起点で選択中のラベルの強調とパネルの表示を切り替えてください。フォーカスリングも付けてください。',
  },
  {
    id: 'drawer-menu',
    title: 'ドロワーメニュー',
    description:
      'ハンバーガーボタンで左からスライドして開くドロワー。transformでの開閉と背景オーバーレイ、aria-expandedの更新を最小のJSで行います。',
    category: 'ナビゲーション',
    html: `<header class="bar">
  <button type="button" id="menu-btn" class="menu-btn" aria-expanded="false" aria-controls="drawer">
    ☰ メニュー
  </button>
</header>

<div class="backdrop" id="backdrop" hidden></div>

<nav id="drawer" class="drawer" aria-label="メインメニュー">
  <button type="button" id="drawer-close" class="drawer-close" aria-label="メニューを閉じる">×</button>
  <a href="#">ホーム</a>
  <a href="#">プロパティ一覧</a>
  <a href="#">UIレシピ集</a>
</nav>`,
    css: `.bar {
  padding: 10px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
}

.menu-btn, .drawer-close {
  border: none;
  background: none;
  font: inherit;
  cursor: pointer;
  padding: 6px 10px;
}

.menu-btn:focus-visible, .drawer-close:focus-visible, .drawer a:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: 2px;
}

.backdrop {
  position: fixed;
  inset: 0;
  background: rgb(26 23 18 / 0.4);
  z-index: 1;
}

.drawer {
  position: fixed;
  inset: 0 auto 0 0; /* 左端に上下いっぱい */
  width: 200px;
  padding: 16px;
  background: #fff;
  border-right: 1px solid #e2d8c2;
  transform: translateX(-100%); /* 初期状態は画面外 */
  transition: transform 0.25s ease;
  z-index: 2;
}

.drawer.is-open {
  transform: none;
}

.drawer a {
  display: block;
  padding: 10px 8px;
  color: #1a1712;
  text-decoration: none;
  border-radius: 6px;
}

.drawer a:hover { background: #f3ecd9; }

.drawer-close {
  display: block;
  margin-left: auto;
  font-size: 18px;
}

@media (prefers-reduced-motion: reduce) {
  .drawer { transition: none; }
}`,
    js: `const menuBtn = document.getElementById('menu-btn');
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('backdrop');

function setOpen(open) {
  drawer.classList.toggle('is-open', open);
  backdrop.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
}

menuBtn.addEventListener('click', () => setOpen(true));
document.getElementById('drawer-close').addEventListener('click', () => setOpen(false));
backdrop.addEventListener('click', () => setOpen(false));`,
    explanation:
      'ドロワー本体は position: fixed で左端に固定し、初期状態は transform: translateX(-100%) で自分の幅ぶん画面外に置きます。開閉は is-open クラスで transform を切り替えるだけで、transformはレイアウト再計算を起こさないため滑らかです。JSの仕事は「クラスの付け外し・背景の表示・aria-expanded の更新」の3点に絞っています。背景クリックでも閉じられます。',
    keyProperties: ['position', 'transform', 'transition', 'inset', 'z-index'],
    tips: 'Escキーで閉じる・フォーカスをドロワー内に閉じ込める、まで必要なら<dialog>で作る方が早いです（モーダルダイアログのレシピ参照）。',
    aiPrompt:
      '左からスライドして開くドロワーメニューを作ってください。transform: translateX(-100%)とクラス切り替えで開閉し、背景オーバーレイのクリックでも閉じ、aria-expandedとaria-controlsを正しく更新する最小のJSを付けてください。',
  },
  {
    id: 'pagination',
    title: 'ページネーション',
    description:
      '記事一覧の下に置くページ送りナビ。現在ページはaria-current="page"で示し、タップしやすい36px四方のリンクをgapで等間隔に並べます。',
    category: 'ナビゲーション',
    html: `<nav aria-label="ページ送り">
  <ul class="pagination">
    <li><a href="#" aria-label="前のページへ">‹</a></li>
    <li><a href="#">1</a></li>
    <li><a href="#" aria-current="page">2</a></li>
    <li><a href="#">3</a></li>
    <li><span class="gap-dots" aria-hidden="true">…</span></li>
    <li><a href="#">12</a></li>
    <li><a href="#" aria-label="次のページへ">›</a></li>
  </ul>
</nav>`,
    css: `.pagination {
  display: flex;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination a,
.gap-dots {
  display: grid;
  place-items: center;
  min-width: 36px;
  height: 36px;
  padding: 0 6px;
  border-radius: 6px;
  font-size: 14px;
  color: #5c5445;
  text-decoration: none;
}

.pagination a {
  border: 1px solid #e2d8c2;
  background: #fff;
  transition: border-color 0.15s, color 0.15s;
}

.pagination a:hover {
  border-color: #b0413e;
  color: #b0413e;
}

.pagination a:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: 2px;
}

.pagination a[aria-current="page"] {
  background: #b0413e;
  border-color: #b0413e;
  color: #fff;
  font-weight: 600;
}`,
    explanation:
      'ページ番号の並びは ul/li でマークアップし、nav の aria-label で「ページ送り」であることを伝えます。現在ページの見た目は専用クラスではなく aria-current="page" 属性セレクタで当てるのがポイントで、スタイルとアクセシビリティ情報が常に一致します。各リンクは display: grid + place-items: center で数字を中央に置き、min-widthと高さ36pxでタップしやすい大きさを確保しています。',
    keyProperties: ['display-flex', 'gap', 'list-style', 'place-items', 'border-radius'],
    tips: '省略（…）はリンクにせずaria-hiddenにします。前へ・次へは記号だけなのでaria-labelを忘れずに。',
    aiPrompt:
      'ページネーションを作ってください。ul/liとnav[aria-label]でマークアップし、現在ページはaria-current="page"属性セレクタでスタイリング、各リンクは36px四方以上でタップしやすくしてください。',
  },

  // ============ 表示・フィードバック ============
  {
    id: 'modal-dialog',
    title: 'モーダルダイアログ',
    description:
      'HTML標準の<dialog>要素で作るモーダル。フォーカス管理とEscで閉じる挙動はブラウザ任せにでき、JSは開閉の数行だけです。',
    category: '表示・フィードバック',
    html: `<button type="button" id="open-modal" class="btn">モーダルを開く</button>

<dialog id="modal" class="modal" aria-labelledby="modal-title">
  <h2 id="modal-title">確認</h2>
  <p>この操作を実行しますか？</p>
  <div class="modal-actions">
    <button type="button" id="close-modal" class="btn btn-ghost">キャンセル</button>
    <button type="button" class="btn">実行する</button>
  </div>
</dialog>`,
    css: `.modal {
  border: 1px solid #e2d8c2;
  border-radius: 10px;
  padding: 24px;
  max-width: 320px;
  box-shadow: 0 12px 32px rgb(0 0 0 / 0.18);
}

.modal::backdrop {
  background: rgb(26 23 18 / 0.5);
}

.modal h2 {
  margin: 0 0 8px;
  font-size: 18px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.btn {
  padding: 8px 16px;
  border: 1px solid #b0413e;
  border-radius: 6px;
  background: #b0413e;
  color: #fff;
  cursor: pointer;
}

.btn-ghost {
  background: transparent;
  border-color: #cbbfa5;
  color: #5c5445;
}`,
    js: `document.getElementById('open-modal').addEventListener('click', () => {
  document.getElementById('modal').showModal();
});
document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').close();
});`,
    explanation:
      '<dialog>要素の showModal() で開くと、最前面表示・背面の操作ブロック・Escキーで閉じる・フォーカスの閉じ込めをブラウザが標準で行います。背景の暗幕は ::backdrop 擬似要素でスタイルします。div とJSで自作するより短く、アクセシビリティの抜けも起きにくい実装です。',
    keyProperties: ['border', 'border-radius', 'padding', 'box-shadow', 'display', 'gap'],
    tips: '開くボタンと閉じるボタンはtype="button"にします（form内でsubmit扱いになるのを防ぐ）。閉じるアニメーションを付けたい場合は@starting-styleとtransition-behaviorを検討してください。',
    aiPrompt:
      'HTML標準の<dialog>要素を使ったモーダルダイアログを作ってください。showModal()で開き、::backdropで背景を暗くし、JSは開閉のイベントリスナーだけの最小構成にしてください。',
  },
  {
    id: 'tooltip-css',
    title: 'ツールチップ（CSSのみ）',
    description:
      '用語にホバーまたはフォーカスすると上に説明が浮かぶツールチップ。opacityとvisibilityの併用でJSなしのフェード表示を実現します。',
    category: '表示・フィードバック',
    html: `<p>
  この機能は
  <span class="tip-anchor" tabindex="0">
    Baseline
    <span class="tip" role="tooltip">主要ブラウザで使える状態かを示すWeb標準の指標</span>
  </span>
  対応です。
</p>`,
    css: `.tip-anchor {
  position: relative;
  border-bottom: 1px dashed #8a6d3b;
  cursor: help;
}

.tip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 12px;
  border-radius: 6px;
  background: #1a1712;
  color: #fdfaf3;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden; /* 非表示中はホバー判定からも除外する */
  transition: opacity 0.15s, visibility 0.15s;
}

/* 吹き出しの三角 */
.tip::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1a1712;
}

.tip-anchor:hover .tip,
.tip-anchor:focus-visible .tip {
  opacity: 1;
  visibility: visible;
}

@media (prefers-reduced-motion: reduce) {
  .tip { transition: none; }
}`,
    explanation:
      'ツールチップは absolute + bottom: calc(100% + 8px) でアンカーの真上に配置し、left: 50% と translateX(-50%) で中央揃えにします。非表示は opacity: 0 だけでなく visibility: hidden も併用するのがポイントで、透明なツールチップが上に被さってホバー判定を奪う事故を防ぎつつ、opacityのフェードも効かせられます。tabindex="0" と :focus-visible でキーボードでも表示できます。',
    keyProperties: ['position', 'opacity', 'visibility', 'transition', 'white-space'],
    tips: '長文になる場合はwhite-space: nowrapを外してwidthを指定してください。今後はAnchor Positioningやpopover属性での実装も選択肢になります（対応状況に注意）。',
    aiPrompt:
      'JSなしのCSSツールチップを作ってください。ホバーと:focus-visibleの両方で表示し、opacityとvisibilityを併用したフェード、::afterによる吹き出しの三角も付けてください。',
  },
  {
    id: 'accordion',
    title: 'アコーディオン（FAQ）',
    description:
      'HTML標準の<details>で作る開閉式FAQ。開閉ロジックはブラウザ任せで、CSSは見た目と「＋」印の回転だけを担当します。',
    category: '表示・フィードバック',
    html: `<details class="acc" open>
  <summary>返品はできますか？</summary>
  <p>商品到着後14日以内であれば返品を承ります。同封の返品票をご利用ください。</p>
</details>
<details class="acc">
  <summary>送料はいくらですか？</summary>
  <p>全国一律520円です。5,000円以上のご注文で送料無料になります。</p>
</details>`,
    css: `.acc {
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  background: #fff;
}

.acc + .acc {
  margin-top: 8px;
}

.acc summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  list-style: none; /* 標準の▶マーカーを消す */
}

.acc summary::-webkit-details-marker {
  display: none; /* 旧Safari向けのマーカー除去 */
}

.acc summary::after {
  content: "＋";
  color: #b0413e;
  transition: transform 0.2s;
}

.acc[open] summary::after {
  transform: rotate(45deg); /* ＋を45度回して×（閉じる）に見せる */
}

.acc summary:focus-visible {
  outline: 2px solid #b0413e;
  outline-offset: -2px;
  border-radius: 8px;
}

.acc p {
  margin: 0;
  padding: 0 16px 14px;
  font-size: 13px;
  line-height: 1.7;
  color: #5c5445;
}

@media (prefers-reduced-motion: reduce) {
  .acc summary::after { transition: none; }
}`,
    explanation:
      '<details>と<summary>は、クリックでの開閉・Enterキー操作・open属性の管理をすべてブラウザが標準で行います。CSSの仕事は装飾だけです。標準の▶マーカーは summary の list-style: none（旧Safariは ::-webkit-details-marker）で消し、代わりに ::after の「＋」を配置。open状態で45度回転させると「×」に見え、閉じられることが伝わります。',
    keyProperties: ['list-style', 'display-flex', 'transition', 'transform', 'border-radius'],
    tips: '開閉に高さのアニメーションを付けたい場合は、interpolate-size: allow-keywords と transitionの組み合わせが新しい定番です（対応ブラウザに注意）。',
    aiPrompt:
      '<details>と<summary>を使ったアコーディオン型FAQを作ってください。標準マーカーはlist-style: noneで消して::afterの「＋」に置き換え、open時に45度回転させてください。JSは使わないでください。',
  },
  {
    id: 'toast',
    title: 'トースト通知',
    description:
      '画面右下にスライドインする通知トースト。role="status"で支援技術にも伝え、prefers-reduced-motionでは動きなしで表示します。',
    category: '表示・フィードバック',
    html: `<div class="toast" role="status">
  <span class="toast-icon" aria-hidden="true">✓</span>
  変更を保存しました
</div>

<p class="note">画面右下に通知が表示されています（プレビューを再読込すると再生されます）</p>`,
    css: `.toast {
  position: fixed;
  inset: auto 16px 16px auto; /* 右下に固定 */
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: 8px;
  background: #1a1712;
  color: #fdfaf3;
  font-size: 14px;
  box-shadow: 0 6px 20px rgb(0 0 0 / 0.25);
  animation: toast-in 0.3s ease-out;
}

.toast-icon {
  display: grid;
  place-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a7c59;
  font-size: 12px;
}

@keyframes toast-in {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .toast { animation: none; }
}

.note {
  font-size: 12px;
  color: #8a7d63;
}`,
    explanation:
      'position: fixed と inset で右下に固定し、出現は @keyframes で「少し下＋透明」から現在位置へ戻すスライドインにしています。toが省略されているのは「要素本来の状態へ戻る」というCSSアニメーションの仕様を利用した書き方です。role="status" を付けると、表示された時点でスクリーンリーダーが内容を読み上げます（割り込みの強いrole="alert"はエラー用に取っておきます）。',
    keyProperties: ['position', 'animation', 'box-shadow', 'border-radius', 'display-flex'],
    tips: '実運用では「JSで要素を追加→数秒後に削除」の管理が必要です。複数同時に出す場合は縦に積むコンテナを用意します。',
    aiPrompt:
      '右下にスライドインするトースト通知を作ってください。position: fixedとinsetで配置、@keyframesで下からのフェードイン、role="status"の付与、prefers-reduced-motionでのアニメーション無効化も含めてください。',
  },

  // ============ レイアウトパターン ============
  {
    id: 'hero-section',
    title: 'ヒーローセクション',
    description:
      'ファーストビューの中央寄せヒーロー。place-itemsによる一発センタリングと、clamp()による画面幅連動の見出しサイズが柱です。',
    category: 'レイアウトパターン',
    html: `<section class="hero">
  <p class="eyebrow">日本語で引けるCSSリファレンス</p>
  <h1>CSSを、辞書で引くように。</h1>
  <p class="lead">実務で使うプロパティを、動く実例と一緒に学べます。</p>
  <div class="actions">
    <a class="btn-primary" href="#">はじめる</a>
    <a class="btn-ghost" href="#">詳しく見る</a>
  </div>
</section>`,
    css: `.hero {
  display: grid;
  place-items: center;
  gap: 8px;
  min-height: 320px;
  padding: 48px 24px;
  text-align: center;
  background: linear-gradient(180deg, #fdfaf3, #f3ecd9);
  border: 1px solid #e2d8c2;
  border-radius: 12px;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: #8a6d3b;
}

.hero h1 {
  margin: 0;
  /* 最小24px〜画面幅の5%〜最大40pxで自動伸縮 */
  font-size: clamp(24px, 5vw, 40px);
  line-height: 1.3;
}

.lead {
  margin: 0;
  color: #5c5445;
}

.actions {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.btn-primary, .btn-ghost {
  padding: 10px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 14px;
}

.btn-primary {
  background: #b0413e;
  border: 1px solid #b0413e;
  color: #fff;
}

.btn-ghost {
  border: 1px solid #cbbfa5;
  color: #5c5445;
}

.btn-primary:focus-visible, .btn-ghost:focus-visible {
  outline: 2px solid #1a1712;
  outline-offset: 2px;
}`,
    explanation:
      '中央寄せは display: grid + place-items: center の2行で完了します（縦横同時に効く現代の定番）。見出しの font-size: clamp(24px, 5vw, 40px) は「最小・推奨・最大」の3値指定で、メディアクエリを書かずにモバイルからデスクトップまで滑らかにサイズが変わります。要素間の余白はgapに寄せ、個別marginを最小限にしています。',
    keyProperties: ['display-grid', 'place-items', 'gap', 'clamp', 'text-align'],
    tips: '背景に画像を敷く場合は、テキストとのコントラスト確保のため半透明のオーバーレイを重ねてください。',
    aiPrompt:
      'LPのヒーローセクションを作ってください。display: gridとplace-itemsで中央寄せ、見出しはclamp()で画面幅に応じて伸縮、CTAボタンを2つ（メインとゴースト）並べてください。',
  },
  {
    id: 'holy-grail',
    title: '聖杯レイアウト（Grid）',
    description:
      'ヘッダー・サイドバー・メイン・フッターの全体骨格をgrid-template-areasで組む定番構成。エリア名の並びがそのまま画面の設計図になります。',
    category: 'レイアウトパターン',
    html: `<div class="layout">
  <header class="area-header">ヘッダー</header>
  <nav class="area-nav">ナビ</nav>
  <main class="area-main">メインコンテンツ。この骨格の中に各ページの中身が入ります。</main>
  <aside class="area-aside">サイド</aside>
  <footer class="area-footer">フッター</footer>
</div>`,
    css: `.layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "nav    main   aside"
    "footer footer footer";
  grid-template-columns: 90px 1fr 90px;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  min-height: 300px;
}

.area-header { grid-area: header; }
.area-nav    { grid-area: nav; }
.area-main   { grid-area: main; }
.area-aside  { grid-area: aside; }
.area-footer { grid-area: footer; }

/* 見た目（デモ用） */
.layout > * {
  padding: 12px;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 6px;
  font-size: 13px;
}

/* 幅が狭いときは1カラムに畳む */
@media (max-width: 480px) {
  .layout {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}`,
    explanation:
      'grid-template-areas は「エリア名を文字で並べた行」がそのまま画面のレイアウト図になるプロパティです。各要素は grid-area でエリア名を名乗るだけで配置され、HTMLの記述順と表示位置が独立します。レスポンシブ対応もメディアクエリ内でareasの文字列を書き換えるだけで、要素の移動が完結します。中央行を1frにすることでメインが余白を吸収します。',
    keyProperties: ['display-grid', 'grid-template-areas', 'grid-template-columns', 'gap'],
    tips: 'エリア名の並びは行ごとに列数を揃える必要があります（揃っていないと定義全体が無効になります）。',
    aiPrompt:
      'grid-template-areasを使った聖杯レイアウト（ヘッダー・左ナビ・メイン・右サイド・フッター）を作ってください。狭い画面ではメディアクエリでareasを書き換えて1カラムに畳んでください。',
  },
  {
    id: 'responsive-card-grid',
    title: 'レスポンシブカードグリッド',
    description:
      'メディアクエリなしで列数が自動調整されるカードグリッド。repeat(auto-fit, minmax())の1行がこのレシピの本体です。',
    category: 'レイアウトパターン',
    html: `<div class="grid">
  <div class="cell">1</div>
  <div class="cell">2</div>
  <div class="cell">3</div>
  <div class="cell">4</div>
  <div class="cell">5</div>
  <div class="cell">6</div>
</div>
<p class="note">プレビュー枠の右下をドラッグして幅を変えると、列数が自動で変わります</p>`,
    css: `.grid {
  display: grid;
  /* 1列120px以上を確保できるだけ並べ、余りは均等に分配 */
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.cell {
  display: grid;
  place-items: center;
  aspect-ratio: 4 / 3;
  background: #fff;
  border: 1px solid #e2d8c2;
  border-radius: 8px;
  font-weight: 700;
  color: #8a6d3b;
}

.note {
  font-size: 12px;
  color: #8a7d63;
}`,
    explanation:
      'grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)) の意味は「1列あたり最低120pxを確保できる数だけ列を作り、余った幅は1frで均等に分ける」です。コンテナ幅が変わると列数が自動で増減するため、ブレークポイントの管理が不要になります。auto-fitは空の列を潰してカードを引き伸ばすのに対し、auto-fillは空列を残します（カードが少ないときに違いが出ます）。',
    keyProperties: ['display-grid', 'grid-template-columns', 'gap', 'aspect-ratio'],
    tips: 'minmaxの最小値は「カードの内容が崩れない最小幅」を基準に決めます。小さすぎるとテキストが窮屈になります。',
    aiPrompt:
      'メディアクエリを使わないレスポンシブなカードグリッドを作ってください。grid-template-columns: repeat(auto-fit, minmax(120px, 1fr))を使い、auto-fitとauto-fillの違いも説明してください。',
  },
  {
    id: 'sticky-header-footer',
    title: 'スティッキーヘッダー＋最下部フッター',
    description:
      'スクロールしても上部に残る半透明ヘッダーと、内容が少なくても最下部に付くフッター。ページ全体骨格の実用テンプレートです。',
    category: 'レイアウトパターン',
    html: `<div class="page">
  <header class="site-header">サイト名（スクロールしても残ります）</header>
  <main class="content">
    <p>本文コンテンツ。</p>
    <p style="height: 300px">（スクロール用の余白）</p>
    <p>本文の末尾。</p>
  </main>
  <footer class="site-footer">© サイト名</footer>
</div>`,
    css: `.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 内容が少なくてもフッターを最下部へ */
  margin: -16px;     /* デモ用: プレビューのbody余白を打ち消す */
}

.site-header {
  position: sticky;
  top: 0; /* stickyはtop等の指定がないと効かない */
  padding: 12px 16px;
  background: rgb(253 250 243 / 0.8);
  backdrop-filter: blur(8px); /* 透けた背景をぼかして読みやすく */
  border-bottom: 1px solid #e2d8c2;
  font-weight: 600;
}

.content {
  flex: 1 0 auto; /* 余った高さを本文が引き受ける */
  padding: 16px;
}

.site-footer {
  padding: 14px 16px;
  background: #1a1712;
  color: #fdfaf3;
  font-size: 13px;
}`,
    explanation:
      '2つの定番を1つの骨格にまとめています。フッター最下部固定は「全体をflex縦積み＋min-height: 100vh＋本文にflex: 1」の組み合わせで、内容が少ないページでもフッターが浮き上がりません。ヘッダーは position: sticky と top: 0 でスクロール追従し、半透明背景に backdrop-filter: blur() を重ねると、透けた本文がぼけてヘッダーの文字が読みやすくなります。',
    keyProperties: ['position', 'display-flex', 'flex-direction', 'flex-grow-shrink-basis', 'backdrop-filter'],
    tips: 'stickyが効かないときは、祖先のoverflow: hiddenが原因のことが多いです。モバイルではmin-height: 100dvhにするとアドレスバーの伸縮に追従します。',
    aiPrompt:
      'スクロールで上部に残る半透明ヘッダー（position: sticky + backdrop-filter: blur）と、内容が少なくても最下部に付くフッター（flexとmin-height: 100vh）を組み合わせたページ骨格を作ってください。',
  },
];
