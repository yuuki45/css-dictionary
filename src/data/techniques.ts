// 最新CSSテクニック集データ
export type Technique = {
  id: string;
  title: string;
  description: string;
  html: string;
  css: string;
  tips?: string;
};

export const techniques: Technique[] = [
  {
    id: "full-bleed-side",
    title: "左右片方だけinner幅を超えて横幅いっぱいにする",
    description:
      "親のpaddingやmax-widthに制限されず、片側だけ画面端まで背景や装飾を広げたい時に使えるテクニックです。主にカードやセクションの背景装飾などで活躍します。",
    html: `<section class="container">
  <div class="full-bleed-right">
    <h2>見出し</h2>
    <p>この部分だけ右側が画面端まで背景色で広がります。</p>
  </div>
</section>`,
    css: `.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.full-bleed-right {
  margin-right: calc(50% - 50vw);
  padding: 1.5rem;
  background: #e0e7ff;
  border-radius: 0.75rem;
}
`,
    tips: "左右どちらでも応用可能。margin-left: calc(50% - 50vw); で左側だけ広げることもできます。",
  },
  {
    id: "equal-height-center",
    title: "子要素の高さを揃えてコンテンツを上下中央",
    description:
      "複数の子要素を同じ高さに揃えつつ、各子要素内のコンテンツを上下中央に配置するテクニックです。カードレイアウトやリストでよく使います。",
    html: `<div class="card-row">
  <div class="card">
    <div class="card-content">
      <h3>タイトル1</h3>
      <p>短いテキスト</p>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <h3>タイトル2</h3>
      <p>こちらは少し長めのテキストが入ります。<br>複数行でも高さが揃います。</p>
    </div>
  </div>
  <div class="card">
    <div class="card-content">
      <h3>タイトル3</h3>
      <p>中央揃え＆高さ揃え</p>
    </div>
  </div>
</div>`,
    css: `.card-row {
  display: flex;
  gap: 1rem;
}
.card {
  flex: 1 1 0;
  background: #f1f5f9;
  border-radius: 0.75rem;
  min-width: 0;
  display: flex;
  /* stretchで高さ揃え */
  align-items: stretch;
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  width: 100%;
  height: 100%;
}
`,
    tips: "親にdisplay: flex; 子にalign-items: stretch; 子要素内にjustify-content: center; align-items: center;でOK。min-width: 0;で折り返しも安全。",
  },
  {
    id: "text-hover-underline",
    title: "テキストホバー時のアンダーライン(下線)アニメーション",
    description:
      "テキストにホバーした時に、左から右へ滑らかに下線が伸びるアニメーション効果です。ナビゲーションリンクやボタンで使われる人気のUIエフェクトです。",
    html: `<div class="text-links">
  <a href="#" class="hover-underline">ホバーしてみてください</a>
  <a href="#" class="hover-underline">ナビゲーションリンク</a>
  <a href="#" class="hover-underline">お問い合わせ</a>
</div>

<div class="text-links">
  <h3>バリエーション</h3>
  <a href="#" class="hover-underline-center">中央から外側へ</a>
  <a href="#" class="hover-underline-thick">太い下線</a>
  <a href="#" class="hover-underline-color">色変化付き</a>
</div>`,
    css: `.text-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* 基本の左から右へのアニメーション */
.hover-underline {
  position: relative;
  text-decoration: none;
  color: #1e40af;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.hover-underline::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #1e40af;
  transition: width 0.3s ease;
}

.hover-underline:hover::before {
  width: 100%;
}

.hover-underline:hover {
  color: #1d4ed8;
}

/* 中央から外側へのアニメーション */
.hover-underline-center {
  position: relative;
  text-decoration: none;
  color: #dc2626;
  padding: 0.5rem 0;
}

.hover-underline-center::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #dc2626;
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.hover-underline-center:hover::before {
  width: 100%;
}

/* 太い下線 */
.hover-underline-thick {
  position: relative;
  text-decoration: none;
  color: #059669;
  padding: 0.5rem 0;
}

.hover-underline-thick::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 4px;
  background-color: #059669;
  transition: width 0.4s ease;
  border-radius: 2px;
}

.hover-underline-thick:hover::before {
  width: 100%;
}

/* 色変化付き */
.hover-underline-color {
  position: relative;
  text-decoration: none;
  color: #7c3aed;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.hover-underline-color::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #7c3aed, #ec4899);
  transition: width 0.3s ease;
}

.hover-underline-color:hover::before {
  width: 100%;
}

.hover-underline-color:hover {
  color: #ec4899;
}
`,
    tips: "::before疑似要素でwidth: 0から100%に変化させるのがポイント。transform: scaleX()を使う方法もありますが、widthの方が直感的です。中央から広がるアニメーションはleft: 50%; transform: translateX(-50%);で実現できます。",
  },
  {
    id: "hover-image-zoom",
    title: "hoverで画像拡大",
    description:
      "画像にマウスをホバーした時に、滑らかに拡大するアニメーション効果です。ギャラリーやカード、商品一覧などでよく使われるインタラクティブなUIエフェクトです。",
    html: `<div class="image-gallery">
  <div class="image-item">
    <img src="https://picsum.photos/300/200?random=1" alt="サンプル画像1" class="zoom-image">
    <div class="image-overlay">
      <h3>基本の拡大効果</h3>
      <p>1.1倍に拡大</p>
    </div>
  </div>
  
  <div class="image-item">
    <img src="https://picsum.photos/300/200?random=2" alt="サンプル画像2" class="zoom-image-large">
    <div class="image-overlay">
      <h3>大きく拡大</h3>
      <p>1.3倍に拡大</p>
    </div>
  </div>
  
  <div class="image-item">
    <img src="https://picsum.photos/300/200?random=3" alt="サンプル画像3" class="zoom-image-slow">
    <div class="image-overlay">
      <h3>ゆっくり拡大</h3>
      <p>0.8秒かけて拡大</p>
    </div>
  </div>
</div>

<div class="card-gallery">
  <div class="card-item">
    <div class="card-image">
      <img src="https://picsum.photos/250/150?random=4" alt="カード画像" class="zoom-image">
    </div>
    <div class="card-content">
      <h4>商品カード例</h4>
      <p>画像部分だけ拡大</p>
    </div>
  </div>
  
  <div class="card-item">
    <div class="card-image">
      <img src="https://picsum.photos/250/150?random=5" alt="カード画像" class="zoom-image">
    </div>
    <div class="card-content">
      <h4>ギャラリー例</h4>
      <p>オーバーフロー非表示</p>
    </div>
  </div>
</div>`,
    css: `.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.image-item {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

/* 基本の拡大効果 */
.zoom-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.zoom-image:hover {
  transform: scale(1.1);
}

/* 大きく拡大 */
.zoom-image-large {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.zoom-image-large:hover {
  transform: scale(1.3);
}

/* ゆっくり拡大 */
.zoom-image-slow {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.8s ease;
}

.zoom-image-slow:hover {
  transform: scale(1.15);
}

/* 画像オーバーレイ */
.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
  padding: 1.5rem 1rem 1rem;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.image-item:hover .image-overlay {
  transform: translateY(0);
}

.image-overlay h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.image-overlay p {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* カードギャラリー */
.card-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card-item {
  background: white;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card-item:hover {
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.card-image {
  overflow: hidden;
  height: 150px;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.card-image:hover img {
  transform: scale(1.1);
}

.card-content {
  padding: 1rem;
}

.card-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
}

.card-content p {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}
`,
    tips: "overflow: hidden;で画像が枠からはみ出さないようにするのが重要。transform: scale()は要素の中心から拡大されます。object-fit: cover;で画像の縦横比を保持。transition時間を調整してユーザビリティを向上させましょう。",
  },
  {
    id: "button-arrow-hover",
    title: "ボタン内の矢印とhoverで色の反転やアニメーション",
    description:
      "ボタン内に矢印アイコンを配置し、hover時にボタンの色が反転したり、矢印がスライド・アニメーションするインタラクティブなUIテクニックです。CTAやリンクボタンでよく使われます。",
    html: `<div class="button-demo">
  <button class="arrow-btn">
    詳しく見る
    <span class="arrow">→</span>
  </button>
  <button class="arrow-btn reverse">
    お申し込み
    <span class="arrow">→</span>
  </button>
  <button class="arrow-btn slide">
    次へ
    <span class="arrow">→</span>
  </button>
  <button class="arrow-btn bounce">
    続きを読む
    <span class="arrow">→</span>
  </button>
</div>`,
    css: `.button-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.arrow-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.75em 1.5em;
  border-radius: 9999px;
  background: #2563eb;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  box-shadow: 0 2px 8px -2px rgba(37,99,235,0.08);
  position: relative;
  overflow: hidden;
}

.arrow-btn .arrow {
  display: inline-block;
  transition: transform 0.3s, color 0.3s;
  font-size: 1.2em;
}

/* 色の反転 */
.arrow-btn.reverse {
  background: #fff;
  color: #2563eb;
  border: 2px solid #2563eb;
}
.arrow-btn.reverse:hover {
  background: #2563eb;
  color: #fff;
}

/* 矢印スライド */
.arrow-btn.slide .arrow {
  transform: translateX(0);
}
.arrow-btn.slide:hover .arrow {
  transform: translateX(0.5em);
}

/* 矢印バウンス */
.arrow-btn.bounce .arrow {
  animation: none;
}
.arrow-btn.bounce:hover .arrow {
  animation: bounce-arrow 0.5s;
}
@keyframes bounce-arrow {
  0% { transform: translateX(0); }
  30% { transform: translateX(0.5em); }
  50% { transform: translateX(0.2em); }
  70% { transform: translateX(0.7em); }
  100% { transform: translateX(0); }
}

/* 通常hoverで色反転 */
.arrow-btn:hover {
  background: #fff;
  color: #2563eb;
  border: 2px solid #2563eb;
}

.arrow-btn:not(.reverse):hover .arrow {
  color: #2563eb;
}
`,
    tips: "矢印は<span>やSVGでもOK。hover時に色やtransformで動きをつけると視覚的なアクセントになります。バウンスはkeyframesで実現。ボタンのborder-radiusやbox-shadowでモダンな印象に。",
  },
  {
    id: "scrollable-table",
    title: "テーブルで横スクロール可能にする",
    description:
      "画面幅が狭い時にテーブル全体を横スクロールできるようにするテクニックです。レスポンシブ対応やデータ量の多い表で便利です。",
    html: `<div class="table-scroll-wrapper">
  <table class="scrollable-table">
    <thead>
      <tr>
        <th>名前</th>
        <th>メールアドレス</th>
        <th>電話番号</th>
        <th>住所</th>
        <th>備考</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>山田 太郎</td>
        <td>taro@example.com</td>
        <td>090-1234-5678</td>
        <td>東京都新宿区1-2-3</td>
        <td>VIP顧客</td>
      </tr>
      <tr>
        <td>佐藤 花子</td>
        <td>hanako@example.com</td>
        <td>080-9876-5432</td>
        <td>大阪市北区4-5-6</td>
        <td>新規</td>
      </tr>
      <tr>
        <td>鈴木 一郎</td>
        <td>ichiro@example.com</td>
        <td>070-1111-2222</td>
        <td>名古屋市中区7-8-9</td>
        <td>リピーター</td>
      </tr>
    </tbody>
  </table>
</div>`,
    css: `.table-scroll-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  background: linear-gradient(90deg, #f1f5f9 80%, transparent);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
}

.scrollable-table {
  min-width: 600px;
  border-collapse: collapse;
  width: 100%;
  background: white;
}

.scrollable-table th,
.scrollable-table td {
  padding: 0.75rem 1.25rem;
  border: 1px solid #e5e7eb;
  text-align: left;
  white-space: nowrap;
}

.scrollable-table th {
  background: #f3f4f6;
  font-weight: 700;
  color: #374151;
}

.scrollable-table tr:nth-child(even) {
  background: #f9fafb;
}

/* スクロールバーのカスタマイズ（任意） */
.table-scroll-wrapper::-webkit-scrollbar {
  height: 8px;
}
.table-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
`,
    tips: "親要素にoverflow-x: auto;を指定し、テーブルにmin-widthを設定するのがポイント。スマホや小さい画面で横スクロールが発生します。white-space: nowrap;でセル内改行を防止。スクロールバーのカスタマイズも可能です。",
  },
  {
    id: "simple-dropdown-menu",
    title: "シンプルなドロップダウンメニュー",
    description:
      "CSSだけで実装できるシンプルなドロップダウンメニューのテクニックです。ホバーやフォーカスでメニューを表示し、ナビゲーションやアクションリストに使えます。",
    html: `<div class="dropdown">
  <button class="dropdown-btn">メニュー ▼</button>
  <ul class="dropdown-menu">
    <li><a href="#">プロフィール</a></li>
    <li><a href="#">設定</a></li>
    <li><a href="#">ログアウト</a></li>
  </ul>
</div>`,
    css: `.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-btn {
  padding: 0.5em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5em;
  background: #2563eb;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.dropdown-btn:hover,
.dropdown-btn:focus {
  background: #1d4ed8;
}

.dropdown-menu {
  display: none;
  position: absolute;
  top: 110%;
  left: 0;
  min-width: 160px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5em;
  box-shadow: 0 4px 16px -4px rgba(0,0,0,0.08);
  z-index: 10;
  padding: 0.5em 0;
}

.dropdown:hover .dropdown-menu,
.dropdown:focus-within .dropdown-menu {
  display: block;
}

.dropdown-menu li {
  list-style: none;
}

.dropdown-menu a {
  display: block;
  padding: 0.5em 1.5em;
  color: #374151;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
  border-radius: 0.25em;
}

.dropdown-menu a:hover,
.dropdown-menu a:focus {
  background: #2563eb;
  color: #fff;
}
`,
    tips: "親要素に:hoverや:focus-withinを使うことで、CSSだけでメニューの表示/非表示を制御できます。z-indexやbox-shadowで重なりや視認性も向上。アクセシビリティを考慮する場合はaria属性やキーボード操作も追加推奨。",
  },
  {
    id: "flex-prevent-shrink",
    title: "flex-boxで画像や要素が小さく潰れるのを防ぐ",
    description:
      "flexboxレイアウトで画像やボタンなどの要素が極端に小さく潰れてしまうのを防ぐテクニックです。min-widthやmin-height、flex-shrink: 0;を活用します。",
    html: `<div class="flex-demo">
  <img src="https://picsum.photos/120/80" alt="サンプル画像" class="flex-img" />
  <button class="flex-btn">ボタン</button>
  <div class="flex-text">テキストが長い場合でも画像やボタンが潰れません。</div>
</div>`,
    css: `.flex-demo {
  display: flex;
  gap: 1rem;
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  align-items: center;
  max-width: 600px;
  margin-bottom: 2rem;
}

.flex-img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
  flex-shrink: 0;
  min-width: 80px;
}

.flex-btn {
  padding: 0.5em 1.5em;
  font-size: 1rem;
  border-radius: 0.5em;
  background: #2563eb;
  color: #fff;
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  min-width: 90px;
}

.flex-text {
  font-size: 1rem;
  color: #374151;
  background: #f1f5f9;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  min-width: 120px;
}
`,
    tips: "画像やボタンなど潰したくない要素にflex-shrink: 0;やmin-widthを指定。flex-basisやmin-heightも有効。親のflex-wrap: wrap;で折り返しも検討。",
  },
];
