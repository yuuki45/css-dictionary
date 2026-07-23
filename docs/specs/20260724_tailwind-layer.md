# 仕様書: Tailwind CSS対応レイヤー（プロパティ対応表＋/tailwind/ハブ）

- 作成日: 2026-07-24 / 状態: 実装完了（2026-07-24。対応119件を投入。マッピング内容の詳細レビューは公開後に随時反映）
- 企画の種: 辞書の既存資産（プロパティ127件・検索・AI協働・LLMO基盤）に「CSS⇄Tailwindの対応関係」レイヤーを重ねる。フェーズ1=プロパティ⇄Tailwind対応データ＋プロパティページ「Tailwindでは」セクション＋検索別名統合＋LLMO反映、フェーズ2=/tailwind/チートシートハブ。対応データはsrc/data/tailwindMap.tsに分離、Tailwind v4基準（v3差分はnote）、疑似クラス→バリアント対応も収録。レシピのTailwind版（フェーズ3）はスコープ外。

## 背景・課題

- メインターゲット「AIと協働する開発者」は、AIが出力したTailwindクラスの意味（→CSS）と、知っているCSSのクラス表記（CSS→）を日常的に往復して調べる。現状この辞書はCSSプロパティ側しか答えられない。
- 「〇〇 tailwind」系の検索クエリは需要が大きいが、既存のチートシート系サイトは単純なユーティリティ対応表止まり。この辞書は疑似クラス（`pseudo-hover`等）・メディア特性を収録済みのため、**Tailwindの「バリアント」（`hover:` / `focus-visible:` / `motion-reduce:` 等）対応表まで作れる**のが差別化。
- 辞書構造との接続（127ページ各所に対応を併記し、逆方向の検索も効く）は、プロパティ辞書にしかできない切り口。
- 成功条件（ユーザー決定 2026-07-24）: **リリース後3ヶ月で、Search Consoleに「〇〇 tailwind」系クエリの表示回数・クリックが計測に現れること**（UIレシピ集と同基準。判定はデプロイ後の運用でユーザーが行う）。

## 要件

### Must（フェーズ1: 対応データとプロパティページ統合）

1. **型**: `src/types/css.ts` に `TailwindMapping` を新設:
   - `classes?`（代表クラスと対応値のペア配列。**網羅はしない**） / `pattern?`（スケール系の一般形。例: `p-{n}`はnが4px刻み） / `arbitrary?`（任意値記法。例: `w-[52px]`） / `variant?`（疑似クラス・メディア特性のバリアント。例: `hover:`） / `note?`（v3差分・注意点）
2. **データ**: `src/data/tailwindMap.ts` に プロパティID → TailwindMapping のマップを新設。cssProperties.jsonには埋め込まない（肥大化回避と独立検証のため）
3. **バージョン方針**: Tailwind **v4基準**。v3との差分がある項目は `note` に明記。データファイル冒頭コメントに基準バージョンを記載
4. **収録方針**: 代表クラス＋パターン表記。全ユーティリティの網羅列挙はしない（公式ドキュメントの複製になり保守不能なため）。対応が存在する全プロパティを対象とし、対応が無いプロパティはデータに含めない
5. **表示**: プロパティ詳細に「Tailwindでは」セクションを新設（`src/components/property/sections/TailwindSection.tsx`）。クラス⇄値の表・パターン・任意値記法・バリアント・noteを表示。マッピングが無いプロパティではセクション自体を出さない
6. **検索統合**: `src/utils/search.ts` の `scoreProperty` にtailwindMap由来の別名（className・variant）を合流させ、サイト内検索でTailwindクラス名からプロパティを引けるようにする（cssProperties.jsonのsearchAliasesは変更しない＝単一ソース維持）
7. **LLMO**: `propertyToMarkdown` に「Tailwindでは」セクションを追記（対応があるプロパティのみ）。`property/{id}.md`・llms-full.txt に自動反映
8. **検証**: `scripts/validate/validate-data.ts` にtailwindMapの検証を追加（propertyId未解決参照・className重複・classes/pattern/variantがすべて空のエントリ）

### Must（フェーズ2: /tailwind/ チートシートハブ）

9. **ルート**: `/tailwind/` 単一ページ（SSG）。tailwindMapとcssPropertiesから生成するカテゴリ別対応表（正準9カテゴリ順）＋バリアント対応表セクション。各行のプロパティ名は `/property/[id]/` へリンク
10. **絞り込み**: クライアント側の絞り込み入力（クラス名・プロパティ名・日本語で対応表を部分一致フィルタ）
11. **Copy for AI**: 対応表全体をMarkdownとしてコピー。同じMarkdownを `tailwind.md` として生成し、llms.txtに行を追加、sitemap.xmlに `/tailwind/` を追加
12. **ナビゲーション**: 「よみもの」タブ配下（`Navigation.tsx` のパス判定＋`/read` ハブへのカード追加）
13. **品質**: ダークモード両対応・コード/クラス名は `font-mono` 表示

### Should（次回以降）

- トップページ（辞書の目次）への /tailwind/ 導線カード
- レシピ詳細「使っているプロパティ」へのTailwindクラス併記
- TailwindSection内のクラス名クリックコピー
- `/modern/` ハブとの相互リンク（v4のOKLCH採用など接点あり）

### Won't（今回やらないと合意）

- レシピのTailwind版コード併記（フェーズ3。プレイグラウンドのランタイム/ビルド時コンパイル設計が必要なため別仕様）
- Tailwindのインストール・設定チュートリアル（公式の領分。辞書はCSSが主語）
- 全ユーティリティクラスの網羅列挙（代表＋パターンに限定）
- v3以前の網羅的対応表（noteでの差分言及のみ）

## 受入条件

1. `justify-content` のプロパティページを開いたとき、「Tailwindでは」セクションに `justify-center` 等のクラスと対応値の表が表示される
2. tailwindMapに存在しないプロパティのページを開いたとき、「Tailwindでは」セクションが表示されない
3. サイト内検索に「justify-center」と入力したとき、検索結果に justify-content が表示される
4. `pseudo-hover` のプロパティページを開いたとき、バリアント `hover:` の対応が表示される
5. `/tailwind/` を開いたとき、カテゴリ別の対応表とバリアント対応表が表示され、プロパティ名リンクが実在する `/property/{id}/` に遷移する
6. `/tailwind/` の絞り込み入力に「rounded」と入力したとき、border-radius を含む行だけに絞り込まれる
7. tailwindMapに存在しないプロパティIDを書いて `npm run validate` を実行したとき、未解決参照エラーで失敗する
8. `npm run build` 後、`/out/tailwind/index.html` と `/out/tailwind.md` が生成され、対応があるプロパティの `/out/property/{id}.md` に「Tailwindでは」セクションが含まれ、llms.txtに行が、sitemap.xmlに `/tailwind/` が含まれる
9. `/tailwind/` の「Copy for AI」をクリックしたとき、対応表のMarkdownがクリップボードに入る
10. ダークモードに切り替えたとき、`/tailwind/` とTailwindSectionの背景・文字色が追従する
11. `/tailwind/` を表示したとき、下部ナビの「よみもの」タブがアクティブになる
12. `npm run validate` がエラー0で完了する

## 非対応事項（明示的スコープ外）

- **レシピのTailwind版**: フェーズ3として別仕様（需要をSearch Consoleで確認後に判断）
- **Tailwindチュートリアル・設定解説**: 公式ドキュメントの領分でSEOでも勝てないため
- **searchAliasesへのクラス名直書き**: tailwindMapが単一ソース。検索側で合流させ二重管理を避ける
- **Tailwindバージョン自動追従**: web-featuresのような公式データソースが無いため手動メンテ（noteにv4基準を明記して陳腐化を検知しやすくする）

## 未解決の問い

- ⚠ **初回収録マッピングの内容レビュー**: 対応が存在するプロパティ全件（127件中、実装時に確定。スケール系・レイアウト系はほぼ対応あり、`pseudo-nth-child` のような対応外もある）のデータを作成後、代表クラスの選定と v3差分noteの内容をユーザーがレビューして確定する
- スケール値の換算表記（`p-4` = 16px 等）は `pattern` 欄に一般形として記す方針（実装時に表記を統一。異議がなければこの前提で進める）

## 実装への影響範囲

スタック: Next.js 静的エクスポート。DBスキーマ変更なし・i18n追加なし。ファクトファイル未整備（`/setup-project` 推奨）。数値の出典: プロパティ127件は `src/data/cssProperties.json` の実測。

**新規作成:**

- `src/data/tailwindMap.ts` （新規）— 対応データ本体（v4基準）
- `src/components/property/sections/TailwindSection.tsx` （新規）— プロパティ詳細の「Tailwindでは」
- `src/app/tailwind/page.tsx` （新規）— ハブ（Server Component、metadata、JSON-LD）
- `src/app/tailwind/TailwindClient.tsx` （新規）— 絞り込み・Copy for AI

**変更:**

- `src/types/css.ts` — `TailwindMapping` 型追加
- `src/utils/search.ts` — `scoreProperty` にtailwindMap別名の合流
- `src/utils/propertyMarkdown.ts` — `propertyToMarkdown` へのセクション追記＋`tailwindMapToMarkdown` 追加（Copy for AI と tailwind.md 生成で共用）
- `src/components/property/PropertyDetail.tsx` — TailwindSection の組み込み
- `scripts/validate/validate-data.ts` — tailwindMap 検証追加
- `scripts/generate/generate-llms.ts` — tailwind.md 生成・llms.txt 行追加・sitemap追加
- `src/components/Navigation.tsx` — `/tailwind` → 「よみもの」判定追加
- `src/app/read/page.tsx` — ハブカード追加

**再利用（変更なし）:**

- `src/components/Layout.tsx` / `src/components/Navigation.tsx` / `src/components/Breadcrumb.tsx` / `src/hooks/useAnalytics.ts`（copy_for_ai・searchイベントを流用）/ `.entry-marker` 等のデザイントークン

**本番反映:** push（Vercel自動デプロイ）はユーザー確認後。

## 実装ステップ（参考・各ステップ単独でビルド可能）

1. 型・tailwindMap雛形（代表10件程度）・validate拡張で検証を通す
2. TailwindSection・PropertyDetail組み込み・検索合流・propertyToMarkdown追記
3. `/tailwind/` ハブ（対応表・バリアント表・絞り込み・Copy for AI）・ナビ・readハブ・llms/sitemap
4. マッピング全件投入（カテゴリ単位で追加し都度 `npm run validate`）→ ⚠のユーザーレビュー
5. `npm run build` で全ページ生成確認 → push・デプロイはユーザー確認後
