// 比較記事データ（「AとBの違い」）
// 「違い」系の検索クエリとAI引用を狙った、結論ファーストの比較コンテンツ。
import type { Comparison } from '@/types/css';

export type { Comparison };

export const comparisons: Comparison[] = [
  {
    id: 'word-break-vs-overflow-wrap',
    title: 'word-break と overflow-wrap の違い',
    description:
      'テキストのはみ出し対策で混同されがちなword-breakとoverflow-wrapの違いを比較表で解説。英単語をぶつ切りにしない正しい折り返し方と使い分けの指針。',
    propertyIds: ['word-break', 'overflow-wrap'],
    labels: ['word-break', 'overflow-wrap'],
    tldr: 'はみ出し対策の第一選択はoverflow-wrap: break-word。word-break: break-allは英単語もぶつ切りにする強い指定で、表の詰め込みなど限定的な場面用です。',
    rows: [
      {
        aspect: '折り返しの方針',
        values: [
          'どの文字間で折り返せるかのルール自体を変える',
          '収まらない場合にのみ、単語の途中での折り返しを許可する',
        ],
      },
      {
        aspect: '英単語の扱い',
        values: [
          'break-allでは単語の可読性を無視してぶつ切りになる',
          '通常は単語境界を守り、はみ出す単語だけ途中で折る',
        ],
      },
      {
        aspect: '日本語への影響',
        values: [
          'normalでも日本語は折り返される。auto-phraseで文節改行（Chrome限定）',
          '日本語にはほぼ影響なし（長い英数字列にだけ効く）',
        ],
      },
      {
        aspect: '典型用途',
        values: [
          'セルにとにかく詰め込みたい表、等幅のログ表示',
          'コメント欄・チャット等、ユーザー入力の長いURL対策',
        ],
      },
    ],
    guideline:
      'まずoverflow-wrap: break-wordを試すのが原則です。flex/grid内で効かない場合はmin-width: 0を併用。それでも制御できない表のような場面で初めてword-break: break-allを検討します。日本語見出しの改行位置を整えたい場合は、別系統のword-break: auto-phraseやtext-wrapの領域です。',
    aiNote:
      'AIは「テキストがはみ出す」という相談に反射的にword-break: break-allを提案しがちですが、英単語の可読性を壊します。多くの場合overflow-wrap: break-wordが正解です。',
  },
  {
    id: 'flex-vs-grid',
    title: 'Flexbox と Grid の違い（使い分け）',
    description:
      'display: flexとdisplay: gridはどう使い分ける？1次元/2次元という原則から、典型用途・入れ子の要否まで比較表で解説します。',
    propertyIds: ['display-flex', 'display-grid'],
    labels: ['Flexbox', 'Grid'],
    tldr: '1方向の並び（ナビ、ボタン列、中央寄せ）はflex、行と列を同時に制御するレイアウト（カード一覧、ページ骨格）はgrid。「デザインが表・格子に見えるならgrid」が目安です。',
    rows: [
      {
        aspect: '次元',
        values: ['1次元（行または列の流れ）', '2次元（行と列を同時に定義）'],
      },
      {
        aspect: 'サイズの主導権',
        values: [
          'コンテンツ主導（中身に応じて伸縮）',
          'レイアウト主導（先にトラックを定義して流し込む）',
        ],
      },
      {
        aspect: '典型用途',
        values: [
          'ヘッダー内の横並び、ボタングループ、中央寄せ',
          'カードグリッド、ページ全体の骨格、フォームの整列',
        ],
      },
      {
        aspect: '子孫の整列',
        values: [
          '入れ子のflexが増えがち',
          'grid-template-areasやsubgridで深い整列も1つで管理',
        ],
      },
      {
        aspect: 'gap',
        values: ['対応（全ブラウザ）', '対応'],
      },
    ],
    guideline:
      '迷ったら「行と列の両方を揃えたいか」で判断します。両方ならgrid、片方ならflex。flexの入れ子が3段以上になったら、gridで書き直せないか疑うのが良いサインです。両者は排他ではなく、grid骨格の中の部品にflexを使うのが実務の標準形です。',
    aiNote:
      'AIはgridで一発のレイアウトをflexの入れ子で組みがちです。「gridで書き直せないか」を一度聞くだけでコードが大幅に簡潔になることがあります。',
  },
  {
    id: 'display-none-vs-visibility-vs-opacity',
    title: 'display: none / visibility: hidden / opacity: 0 の違い',
    description:
      '要素を隠す3つの方法の違いを比較。レイアウト領域・スクリーンリーダー・クリック可否・アニメーション対応の違いから正しい使い分けを解説。',
    propertyIds: ['display', 'visibility', 'opacity'],
    labels: ['display: none', 'visibility: hidden', 'opacity: 0'],
    tldr: '完全に消すならdisplay: none、領域を保ったまま隠すならvisibility: hidden、フェードで見せ隠しするならopacity（+visibility併用）。opacity: 0は見えないのにクリックできてしまう点に注意。',
    rows: [
      {
        aspect: 'レイアウト領域',
        values: ['消える（詰まる）', '残る（空白になる）', '残る'],
      },
      {
        aspect: 'スクリーンリーダー',
        values: ['読まれない', '読まれない', '読まれる'],
      },
      {
        aspect: 'クリック/フォーカス',
        values: ['不可', '不可', '可能（罠になりやすい）'],
      },
      {
        aspect: 'アニメーション',
        values: [
          '従来不可（現在はallow-discrete+@starting-styleで可能）',
          '離散的に切替（遅延切替に使える）',
          '滑らかにフェード可能',
        ],
      },
      {
        aspect: '典型用途',
        values: ['タブ・モーダルの非表示側', 'レイアウトを保った出し入れ', 'フェード演出の一部'],
      },
    ],
    guideline:
      'フェードアウトの定番は「opacityでフェード + visibilityを遅延で切替」のセットです（見えなくなった後にクリックも無効化）。モダンブラウザだけなら、display切替にtransition-behavior: allow-discreteと@starting-styleを使うCSSのみの実装も選べます。',
    aiNote:
      'AIはopacity: 0で「隠した」つもりのコードを出しがちですが、リンクやボタンが透明なまま押せてしまう事故につながります。操作不能にする指定（visibilityやpointer-events）まで含めて依頼してください。',
  },
  {
    id: 'margin-vs-padding',
    title: 'margin と padding の違い',
    description:
      '外側の余白marginと内側の余白paddingの違いを比較表で解説。背景色・クリック領域・マージン相殺など、選び間違いによるバグの原因も整理。',
    propertyIds: ['margin', 'padding'],
    labels: ['margin', 'padding'],
    tldr: '要素の「外」との距離がmargin、要素の「中」の余白がpadding。背景色を含めたい・クリック範囲を広げたいならpadding、隣との間隔を空けたいならmargin（またはgap）です。',
    rows: [
      {
        aspect: '位置',
        values: ['ボーダーの外側', 'ボーダーの内側'],
      },
      {
        aspect: '背景色',
        values: ['付かない（透明）', '付く'],
      },
      {
        aspect: 'クリック領域',
        values: ['含まれない', '含まれる（タップ領域拡大に有効）'],
      },
      {
        aspect: '相殺（collapsing）',
        values: ['縦方向で発生する', '発生しない'],
      },
      {
        aspect: '負の値',
        values: ['指定可能', '指定不可'],
      },
    ],
    guideline:
      'リンクやボタンのタップ領域を広げるのはpaddingの仕事です（44px四方が目安）。要素間の等間隔は、個別のmarginより親のgapで管理する方が現代的で保守しやすい設計です。「余白が思ったより狭い/広い」ときはマージン相殺をまず疑ってください。',
    aiNote:
      'AIは「余白を足して」という曖昧な依頼にmarginとpaddingを場当たり的に混ぜがちです。背景・クリック領域に関わるかどうかを伝えると正しく選びます。',
  },
  {
    id: 'transition-vs-animation',
    title: 'transition と animation の違い',
    description:
      'CSSアニメーションの2つの仕組み、transitionとanimationの違いを比較。トリガー・キーフレーム・ループの観点から使い分けを解説。',
    propertyIds: ['transition', 'animation', 'keyframes'],
    labels: ['transition', 'animation'],
    tldr: 'hover・クラス切替など「状態の変化」に反応させるならtransition、読み込み時から自動で動く・ループする・多段階の動きならanimation（@keyframes）です。',
    rows: [
      {
        aspect: 'トリガー',
        values: ['状態変化が必要（hover、クラス付替え等）', '適用された瞬間から自動で開始できる'],
      },
      {
        aspect: '中間状態',
        values: ['始点と終点の2点のみ', '@keyframesで何段階でも定義可能'],
      },
      {
        aspect: 'ループ',
        values: ['不可', 'infinite等で可能'],
      },
      {
        aspect: '逆再生',
        values: ['状態が戻れば自動で逆向きに再生される', 'animation-directionで制御'],
      },
      {
        aspect: '典型用途',
        values: ['hoverエフェクト、開閉、テーマ切替', 'ローディングスピナー、注目喚起、複雑な演出'],
      },
    ],
    guideline:
      'UIの応答（押した・開いた・切り替えた）はtransitionが基本で、コードも短く状態戻りも自動です。自律的に動き続けるものだけanimationにします。どちらもprefers-reduced-motion対応をセットで入れるのが現代の作法です。',
    aiNote:
      'AIはhoverで戻りのアニメーションが必要なだけの場面にも@keyframesを持ち出すことがあります。状態変化への反応ならtransitionで十分か、先に確認させると簡潔になります。',
  },
  {
    id: 'absolute-vs-fixed-vs-sticky',
    title: 'position: absolute / fixed / sticky の違い',
    description:
      'positionの3つの値 absolute・fixed・sticky の違いを比較。基準となる要素、スクロール時の挙動、効かないときの原因まで解説。',
    propertyIds: ['position', 'position-sticky', 'z-index'],
    labels: ['absolute', 'fixed', 'sticky'],
    tldr: '祖先基準で自由配置がabsolute、画面に完全固定がfixed、「閾値まで通常・そこから貼り付き」がsticky。fixedはtransform等を持つ祖先がいると画面基準でなくなる罠があります。',
    rows: [
      {
        aspect: '配置の基準',
        values: [
          'position指定のある最も近い祖先',
          'ビューポート（※transform等の祖先で変わる）',
          '最も近いスクロールコンテナと親要素の範囲',
        ],
      },
      {
        aspect: 'スクロール時',
        values: ['ページと一緒に動く', '常に画面に固定', '閾値までは通常、以降は固定に切替'],
      },
      {
        aspect: '元のレイアウト領域',
        values: ['抜ける（詰まる）', '抜ける', '残る'],
      },
      {
        aspect: '必須の相棒',
        values: ['基準にする祖先のposition: relative', 'inset系での位置指定', 'top等の閾値指定'],
      },
      {
        aspect: '典型用途',
        values: ['バッジ、ドロップダウン', 'ヘッダー、FAB、モーダル', '目次、テーブルヘッダー、セクション見出し'],
      },
    ],
    guideline:
      'stickyが効かない三大原因は「祖先のoverflow: hidden/auto」「top等の閾値未指定」「親の高さ不足」です。fixedが画面基準にならないときは祖先のtransform/filter/will-changeを疑ってください。単純な固定ヘッダーはstickyの方が領域が残る分、レイアウトが簡単なことも多いです。',
    aiNote:
      'AIはfixedのモーダルが祖先のtransformで壊れるケースをなかなか特定できません。「スタッキングコンテキストと包含ブロックの観点で調査して」と方向付けると速く解決します。',
  },
  {
    id: 'media-vs-container',
    title: '@media と @container の違い',
    description:
      'メディアクエリとコンテナクエリの違いを比較。画面幅基準とコンテナ基準、それぞれが適する場面と併用の指針を解説。',
    propertyIds: ['media-queries', 'container-queries', 'container-type'],
    labels: ['@media', '@container'],
    tldr: 'ページ全体のレイアウト分岐は@media、置かれた場所の幅で変わるべき「部品」は@container。コンポーネント指向の開発では@containerが主役になりつつあります。',
    rows: [
      {
        aspect: '判定の基準',
        values: ['ビューポート（画面）のサイズや特性', '指定した祖先コンテナのサイズ'],
      },
      {
        aspect: '事前準備',
        values: ['不要', '親にcontainer-typeの指定が必須'],
      },
      {
        aspect: '得意分野',
        values: ['ページの骨格、グローバルな出し分け', 'カード等の再利用部品、配置場所依存のUI'],
      },
      {
        aspect: '専用単位',
        values: ['vw / vh など', 'cqw / cqi など'],
      },
      {
        aspect: '画面幅以外の判定',
        values: ['hover可否、prefers-*（ダークモード等）も判定可能', 'サイズとスタイル（style()）'],
      },
    ],
    guideline:
      '「このカードはサイドバーに置いても本文に置いても正しく振る舞ってほしい」なら@containerです。逆にダークモード検知やhover可否の判定は@mediaにしかできません。両者は競合ではなく階層の違い——ページは@media、部品は@containerと覚えるのが実用的です。',
    aiNote:
      'AIはコンポーネント単位の分岐まで@mediaで書きがちで、コンテナクエリの提案は明示しないと出にくいです。またcontainer-typeの指定漏れはAI生成コードの定番バグです。',
  },
  {
    id: 'auto-fit-vs-auto-fill',
    title: 'auto-fit と auto-fill の違い',
    description:
      'グリッドのrepeat()で使うauto-fitとauto-fillの違いを比較。アイテムが少ないときの挙動の差と使い分けを図解的に解説。',
    propertyIds: ['grid-auto-fit-fill', 'grid-template-columns'],
    labels: ['auto-fit', 'auto-fill'],
    tldr: '違いが出るのはアイテムが少ないとき。auto-fitは空きトラックを潰してアイテムを広げ、auto-fillは空きトラックを残してアイテム幅を保ちます。',
    rows: [
      {
        aspect: '空トラックの扱い',
        values: ['0に潰す（アイテムが領域いっぱいに広がる）', '幅を保って残す（右側に空きが見える）'],
      },
      {
        aspect: 'アイテム1個のとき',
        values: ['1個がコンテナ幅いっぱいに伸びる', '1個分の幅のまま左に配置される'],
      },
      {
        aspect: 'アイテムが十分あるとき',
        values: ['同じ見た目になる', '同じ見た目になる'],
      },
      {
        aspect: '向いている場面',
        values: ['件数が変動する一覧を常に埋めたい', 'カードサイズを揃えたい（ダッシュボード等）'],
      },
    ],
    guideline:
      '迷ったらauto-fitが無難です（少数でも間延びして見えにくい）。カードの幅が揃っていることが重要なUIではauto-fillを選びます。定番のminmax(240px, 1fr)はコンテナが240px未満ではみ出すため、minmax(min(240px, 100%), 1fr)と書いておくと小画面でも安全です。',
    aiNote:
      'auto-fitとauto-fillの挙動説明はAIがしばしば逆にします。「アイテム1個のときどうなるか」で検算させると取り違えに気づけます。',
  },
  {
    id: 'gap-vs-margin',
    title: 'gap と margin の違い（要素間の余白）',
    description:
      '要素間の余白管理はgapとmarginのどちらでやるべきか。端の処理・相殺・保守性の観点から比較し、現代的な使い分けを解説。',
    propertyIds: ['gap', 'margin'],
    labels: ['gap', 'margin'],
    tldr: 'flex/gridの「アイテム間」の等間隔はgap一択。外周には付かず、打ち消しも相殺もない。marginは外周の余白や個別の例外調整に使います。',
    rows: [
      {
        aspect: '効く場所',
        values: ['アイテムとアイテムの間だけ', '指定した要素の周囲（外周にも付く）'],
      },
      {
        aspect: '端の処理',
        values: ['外周には付かない（打ち消し不要）', ':last-child等での打ち消しが必要になりがち'],
      },
      {
        aspect: 'マージン相殺',
        values: ['なし', '縦方向で発生する'],
      },
      {
        aspect: '使える場所',
        values: ['flex / grid /（段組み）コンテナ内', 'どこでも'],
      },
      {
        aspect: '保守性',
        values: ['間隔の定義がコンテナ1箇所に集まる', '各アイテムに散らばりやすい'],
      },
    ],
    guideline:
      '「一覧の間隔」はコンテナのgapに寄せ、「セクション同士の距離」や「この要素だけ特別に離す」例外はmarginで、と役割を分けるとスタイルが散らかりません。既存のmargin+:last-child打ち消しパターンを見つけたら、gapへのリファクタリング候補です。',
    aiNote:
      'AIは古い作法のmargin-right + :last-childの打ち消しを今でも出すことがあります。flexのgapも2021年から全ブラウザ対応済みなので、gapで書くよう指定して問題ありません。',
  },
  {
    id: 'focus-visible-vs-focus-within',
    title: ':focus-visible と :focus-within の違い',
    description:
      'フォーカス系擬似クラスの:focus-visibleと:focus-withinの違いを比較。「キーボードのときだけ」と「子孫にフォーカスがあれば親に」という直交する2つの概念を整理。',
    propertyIds: ['pseudo-focus-visible', 'pseudo-focus-within', 'outline'],
    labels: [':focus-visible', ':focus-within'],
    tldr: '「キーボード操作のときだけスタイルを出す」のが:focus-visible、「子孫にフォーカスがあるとき親に効かせる」のが:focus-within。判定軸が違う直交概念なので、:has(:focus-visible)で組み合わせることもできます。',
    rows: [
      {
        aspect: '判定するもの',
        values: ['フォーカスの見せ方が必要か（主にキーボード操作か）', '自分または子孫がフォーカスを持つか'],
      },
      {
        aspect: 'スタイルが当たる要素',
        values: ['フォーカスされた要素自身', '親（コンテナ）側'],
      },
      {
        aspect: 'マウスクリック時',
        values: ['通常は発火しない（テキスト入力欄は例外）', '発火する'],
      },
      {
        aspect: '典型用途',
        values: ['フォーカスリングの上品な出し分け', '検索ボックス全体の強調、フォーカスで開くメニュー'],
      },
    ],
    guideline:
      'フォーカスリングは「:focus { outline: none }で消す」のではなく:focus-visibleで出し分けるのが現代の標準です。「キーボード操作のときだけ親を強調」したい場合は、2つを合成した:has(:focus-visible)が使えます。',
    aiNote:
      'AIはこの2つを混同した説明をしがちで、また今でもoutline: none単独の危険なコードを出すことがあります。フォーカス関連の依頼では「アクセシビリティを保って」と一言添えるのが有効です。',
  },
];
