# 仕様書: UIレシピ集（/recipes/）

- 作成日: 2026-07-23 / 状態: 承認済み（2026-07-23 ラインナップ含めユーザー確定）
- 企画の種: 完成されたUI部品（ボタン・カード・フォーム等）のレシピコレクションを新設する。techniques（解決テクニック）・animations（動き）と役割を分け、「辞書リンク・Baselineバッジ・AI協働・編集可能プレイグラウンド」の4軸で既存のコピペ集サイトと差別化する。初期18〜24件。

## 背景・課題

- メインターゲットは「AIと協働する開発者」（リメイク計画の差別化軸）。加えて「CSS ボタン コピペ」「カード デザイン CSS」等の検索流入が見込める。
- 現状のコンテンツは techniques（困りごと解決の手法、10件）と animations（動き、18件）で、**完成されたUI部品**を単位とするコレクションが存在しない。techniques に UI部品系が3件（button-designs-10 / pricing-table-design / simple-dropdown-menu）混在しており、境界が曖昧になりつつある。
- 日本語圏には強いコピペ集競合（サルワカ・Copypet等）が存在するため、汎用コピペ集では勝てない。勝ち筋は辞書サイト固有の構造（プロパティ相互リンク・Baselineデータ・AI協働情報・その場で編集できるプレイグラウンド）。
- 成功条件（ユーザー決定 2026-07-23）: **リリース後3ヶ月で、Search Console にレシピページ群の表示回数・クリックが計測に現れること**（計測・判定はデプロイ後の運用でユーザーが行う）。

## 要件

### Must（初回リリースに必須。ユーザー決定 2026-07-23: 4差別化軸すべてMust）

1. **データ**: `src/data/recipes.ts` に `Recipe[]` を定義。型は `src/types/css.ts` に新設:
   - `id`（URLスラッグ・ケバブケース） / `title` / `description`（一覧・meta description用） / `category` / `html` / `css` / `js?`（最小限のJS。任意） / `explanation`（仕組みの解説） / `keyProperties`（実在プロパティIDのみ。validateで検証） / `tips?` / `aiPrompt`（このUIをAIに作らせる依頼文例）
   - AnimationExample 型（`src/types/css.ts`）の構造を踏襲する
2. **カテゴリ**: 「ボタン・操作」「カード」「フォーム」「ナビゲーション」「表示・フィードバック」「レイアウトパターン」の6種。`recipeCategories` としてデータファイルからエクスポート（animations の `animationCategories` と同パターン）
3. **件数**: 初期24件（各カテゴリ4件）。「初期ラインナップ（確定）」参照
4. **ルート**: `/recipes/`（一覧・カテゴリ別グルーピング）と `/recipes/[id]/`（詳細）。`generateStaticParams()` で全件SSG
5. **詳細ページの構成要素**:
   - ライブプレビュー + 編集可能プレイグラウンド（`src/components/Playground.tsx` を流用。JS対応の拡張が必要 → 影響範囲参照）
   - 使用プロパティ（`keyProperties` → `/property/[id]/` へリンク）
   - Baselineバッジ（`keyProperties` の各プロパティの `browserSupport.baseline` を集計し、**最も低いステータス**を代表値として `BaselineBadge` で表示。優先順: limited > newly > widely）
   - 解説（`explanation`）・実装のヒント（`tips`）
   - AI協働: `aiPrompt` の表示 + **Copy for AI**（タイトル・説明・HTML・CSS・JS・使用プロパティをMarkdownでクリップボードにコピー）
6. **JS方針**（ユーザー決定 2026-07-23: 最小限のJS許容）: `js` フィールドを持つレシピはプレイグラウンドにJSも表示し、プレビューiframeで実行する。iframe は `srcdoc` + `sandbox="allow-scripts"`（`allow-same-origin` は付与しない）。JSが無いレシピは従来通り `sandbox=""` を維持
7. **辞書側の逆リンク**: プロパティ詳細ページに「このプロパティを使ったレシピ」セクションを新設（`keyProperties` から逆引きして自動表示。該当が無いプロパティでは非表示）
8. **データ検証**: `scripts/validate/validate-data.ts` に recipes の検証を追加（ID重複・`keyProperties` の未解決参照・カテゴリ正当性・必須フィールド。animations の検証と同パターン）
9. **LLMO/SEO**: `scripts/generate/generate-llms.ts` に recipes を追加（llms.txt へのセクション追加・`recipes/{id}.md` のページ単位Markdown生成・sitemap.xml へのURL追加）。JSON-LD は既存 `StructuredData` のパターンに従う
10. **ナビゲーション**: 「よみもの」タブ配下。`src/components/Navigation.tsx` のパス判定に `/recipes` を追加し、`src/app/read/page.tsx` のハブ一覧にカードを追加
11. **品質基準**: 全レシピはダークモード両対応のページ表示・コピペ即動作・アクセシビリティ配慮（フォーカス可視、動きのあるものは `prefers-reduced-motion` 対応）を満たす
12. **計測**: `useAnalytics` を流用し、コピー・初回編集のイベントを送信（animations/techniques 詳細と同パターン）

### Should（次回以降に回す）

- techniques の UI部品系3件（button-designs-10 / pricing-table-design / simple-dropdown-menu）とレシピ集の相互リンク導線
- トップページ（辞書の目次）へのレシピ集導線の追加
- レシピの「モダンCSS版 / 安全版」2バージョン提示
- サイト内検索へのレシピ組み込み（ストレッチ項目「全ページ共通ヘッダ検索」と合流）
- プロパティ側逆リンクの animations への拡張（同じ仕組みで「このプロパティを使ったアニメーション」も出せるが、今回はレシピのみ）

### Won't（今回やらないと合意）

- 既存 techniques / animations のURL移動・統合・リダイレクト（サイト方針: URLスラッグは絶対に変えない）
- サーバー機能・DB・有料AI APIの導入（完全静的エクスポート維持）
- React/Vue等のコンポーネント形式での配布（コピペ用HTML/CSS/最小JSに限定）
- Sass等プリプロセッサ対応・多言語対応

## 受入条件

1. `npm run build` を実行したとき、エラーなく完了し `/out/recipes/index.html` と全レシピの `/out/recipes/{id}/index.html` が生成される
2. `/recipes/` を開いたとき、18件以上のレシピが6カテゴリにグルーピングされて表示される
3. レシピ詳細ページでHTMLまたはCSSのテキストエリアを編集したとき、プレビューiframeに編集結果が反映される
4. `js` フィールドを持つレシピの詳細ページを開いたとき、プレビュー内でJSが動作する（例: モーダルの開閉ができる）
5. `js` フィールドを持たないレシピのプレビューiframeは `sandbox=""`（スクリプト実行不可）のままである
6. レシピ詳細の「使用プロパティ」の各リンクをクリックしたとき、実在する `/property/{id}/` ページに遷移する
7. `keyProperties` に baseline が `limited` のプロパティを1つ含むレシピの詳細ページには「対応が限定的」バッジが表示される（集計は最低ステータス優先）
8. 「Copy for AI」をクリックしたとき、タイトル・説明・HTML・CSS・（あれば）JS・使用プロパティ一覧を含むMarkdownがクリップボードに入る
9. あるレシピの `keyProperties` に含まれるプロパティの詳細ページを開いたとき「このプロパティを使ったレシピ」にそのレシピへのリンクが表示され、どのレシピにも使われていないプロパティのページには当該セクションが表示されない
10. `recipes.ts` に存在しないプロパティIDを `keyProperties` に書いて `npm run validate` を実行したとき、未解決参照エラーで失敗する
11. `npm run build` 後、`/out/llms.txt` にレシピのセクションがあり、`/out/recipes/{id}.md` が全件生成され、`/out/sitemap.xml` に全レシピURLが含まれる
12. ダークモードに切り替えたとき、一覧・詳細ページの背景・文字色が追従する（プレビューiframe内は既存 `sandboxDoc` と同じ紙色固定で可）
13. `/recipes/` および `/recipes/{id}/` を表示したとき、下部ナビの「よみもの」タブがアクティブになる
14. 全レシピのHTML/CSSをそのまま素のHTMLファイルに貼り付けたとき、外部依存なしで見た目が再現される（コピペ即動作）

## 非対応事項（明示的スコープ外）

- **techniques 3件の移設**: URL不変ルールのため行わない。相互リンクはShouldへ
- **animations への逆リンク拡張**: 同じ仕組みで可能だが今回はレシピのみ（スコープ肥大防止）
- **レシピ検索**: サイト内検索統合は既存ストレッチ項目と合わせて別件
- **CMS化・投稿受付**: データはリポジトリ内TSファイルで管理を継続
- **Search Console計測の自動化**: 成功判定はデプロイ後にユーザーが手動確認

## 初期ラインナップ（24件・2026-07-23 ユーザー確定）

- ボタン・操作（4）: ローディング状態付きボタン / コピー完了フィードバックボタン / セグメンテッドコントロール / フローティングアクションボタン
- カード（4）: 記事カード（画像＋タグ） / プロフィールカード / 横並びメディアカード / ホバーで詳細が現れるカード
- フォーム（4）: フローティングラベル入力 / リアルタイムバリデーション表示（`:user-invalid` → 辞書ID `pseudo-user-valid`） / カスタムチェックボックス・ラジオ / スタイル済みレンジスライダー
- ナビゲーション（4）: パンくずリスト / CSSのみタブ切り替え / ドロワーメニュー（最小JS） / ページネーション
- 表示・フィードバック（4）: モーダルダイアログ（`<dialog>`＋最小JS） / ツールチップ（CSSのみ: `position` + `:hover`/`:focus-visible`。popover属性が辞書未収録のため非依存に変更） / アコーディオン（`<details>`） / トースト通知
- レイアウトパターン（4）: ヒーローセクション / 聖杯レイアウト（Grid） / レスポンシブカードグリッド（auto-fit） / スティッキーヘッダー＋フッター
- 注意: techniques 既存の「ボタンデザイン10選」「ドロップダウンメニュー」「料金表」と内容が重複しないよう選定している

## 未解決の問い

すべて解決済み（2026-07-23）:

- **初期ラインナップの承認** → 上記24件でユーザー確定
- **辞書未収録機能への依存** → 洗い出しの結果、疑似クラスは `pseudo-has` / `pseudo-user-valid` / `pseudo-focus-visible` 等の形で収録済み。未収録は popover 属性のみで、ツールチップをCSSのみ実装に差し替えて依存を解消（popover のエントリ追加は将来の辞書拡充として別件）
- **Baseline集計の近似**（プロパティ単位であり値・組み合わせ単位ではない）→ 初回はこの近似で可として確定

## 実装への影響範囲

スタック: Next.js 静的エクスポート（`output: 'export'`）。DBスキーマ変更なし・i18n追加なし。ファクトファイルは未整備（`/setup-project` 推奨）。数値の出典: 収録プロパティ127件は `src/data/cssProperties.json` の実測、初期18〜24件はユーザー決定。

**新規作成:**

- `src/data/recipes.ts` （新規）— レシピデータ本体 + `recipeCategories`
- `src/app/recipes/page.tsx` （新規）— 一覧（Server Component、metadata）
- `src/app/recipes/RecipesClient.tsx` （新規）— 一覧のインタラクション
- `src/app/recipes/[id]/page.tsx` （新規）— 詳細（generateStaticParams / generateMetadata）
- `src/app/recipes/[id]/RecipeDetailClient.tsx` （新規）— 詳細クライアント（`src/app/animations/[id]/AnimationDetailClient.tsx` を雛形にする）
- `src/utils/baselineAggregate.ts` （新規）— keyProperties → 代表Baseline算出
- `src/components/property/sections/RelatedRecipesSection.tsx` （新規）— プロパティ側逆リンク

**変更:**

- `src/types/css.ts` — `Recipe` 型追加（AnimationExample 踏襲）
- `src/utils/sandboxDoc.ts` — `buildSrcDoc` に任意の `js` 引数を追加（後方互換）
- `src/components/Playground.tsx` — JSペイン対応（`initialJs?` 追加。未指定時は現行2ペインのまま＝techniques/animationsに影響なし）
- `src/components/Navigation.tsx` — `/recipes` → 「よみもの」タブ判定を追加
- `src/app/read/page.tsx` — ハブ一覧にレシピ集カードを追加
- `src/components/property/PropertyDetail.tsx` — RelatedRecipesSection の組み込み
- `src/utils/propertyMarkdown.ts` — `recipeToMarkdown` 追加（Copy for AI と `recipes/{id}.md` 生成で共用）
- `scripts/validate/validate-data.ts` — recipes 検証追加
- `scripts/generate/generate-llms.ts` — recipes の llms.txt / .md / sitemap 追加
- `src/hooks/useAnalytics.ts` — レシピ用イベント追加（既存イベント命名に合わせる）

**再利用（変更なし）:**

- `src/components/BaselineBadge.tsx` / `src/components/Breadcrumb.tsx` / `src/components/StructuredData.tsx` / `src/components/CopyForAIButton.tsx`（プロパティ専用のため直接は使わず、実装パターンの参照元とする）

**本番反映:** Vercelへのデプロイは必ずユーザー確認後に行う（グローバル運用ルール）。

## 変更履歴

- **2026-07-23（初回リリース後のユーザー決定）**: Won't としていた「techniques のURL移動・統合」を撤回し、テクニック集をレシピ集へ統合。UI部品系6件（full-bleed-side / equal-height-center / scrollable-table / simple-dropdown-menu / button-designs-10 / pricing-table-design）は `/recipes/` へ、動き系2件（text-hover-underline / hover-image-zoom）は `/animations/` へ移設、重複・解説系2件（button-arrow-hover / flex-prevent-shrink）は削除。全11の旧URL（`/techniques/` 一覧含む）は `vercel.json` の301リダイレクトで新行き先へ接続し、SEO非破壊の原則は「URL不変」から「301で継承」に読み替える。

## 実装ステップ（参考・各ステップ単独でビルド可能）

1. 型・データ雛形・validate拡張（レシピ2〜3件のサンプルで検証を通す）
2. sandboxDoc / Playground のJS対応（既存 techniques / animations の無影響をビルドで確認）
3. `/recipes/` 一覧・`/recipes/[id]/` 詳細（Baseline集計・Copy for AI・aiPrompt含む）
4. プロパティ側逆リンク・ナビ・readハブ・llms/sitemap生成
5. ラインナップ確定（ユーザー承認）→ レシピ本体の投入（カテゴリ単位で追加し、都度 `npm run validate`）
6. `npm run build` で全ページ生成確認 → デプロイはユーザー確認後
