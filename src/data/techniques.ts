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
];
