# CLAUDE.md

このファイルは、このリポジトリでコードを操作する際のClaude Code (claude.ai/code)へのガイダンスを提供します。

## プロジェクト概要

これは、SEO改善のためReact + ViteからNext.jsに移行された日本語CSS辞書Webアプリケーションです。検索、カテゴリ分類、逆引き検索、テクニック集を含む、CSSプロパティの包括的な学習ツールとして機能します。

## 🎯 コンテキストエンジニアリングアプローチ

このプロジェクトは**コンテキストエンジニアリング**手法を採用しています。機能を実装する前に：

1. **必ずdocs/フォルダを参照する** - 包括的な技術ドキュメントが含まれています
2. **確認すべき主要ドキュメント：**
   - `docs/architecture.md` - プロジェクト全体のアーキテクチャと設計パターン
   - `docs/data-structure.md` - 全てのデータ型とスキーマ
   - `docs/components.md` - コンポーネント設計パターンと使用方法
   - `docs/routing.md` - URL構造とルーティング実装
   - `docs/development-guide.md` - コーディング規約とベストプラクティス

3. **タスク開始時には、参照しているドキュメントを明記する** - 既存パターンとの整合性を確保

## 開発コマンド

```bash
# 開発サーバー起動（ポート3001で実行）
npm run dev

# プロダクションビルド（/outディレクトリに出力）
npm run build

# プロダクションサーバー起動（ビルド後）
npm start

# ESLint実行
npm run lint

# ESLintエラーを自動修正
npm run lint -- --fix

# 依存関係のインストール
npm install
```

## アーキテクチャと構造

### コアアーキテクチャパターン：SSGとクライアントインタラクションのハイブリッド

**静的サイト生成（SSG）：**
- 全ページがビルド時にnext.config.tsの`output: 'export'`で事前生成される
- 動的ルートは`generateStaticParams()`で全ての組み合わせを事前生成
- 200以上のCSSプロパティページ、10以上のテクニックページ、カテゴリページが全て静的生成される
- ビルド結果は`/out`ディレクトリに出力され、任意の静的ホストにデプロイ可能

**コンポーネント分割戦略：**
```
src/app/[route]/
├── page.tsx                    # Server Component（データ取得、メタデータ）
└── [Route]Client.tsx           # Client Component（インタラクティブ機能、localStorage）
```

サーバーコンポーネントが担当：
- JSONファイルからのデータ取得
- SEOのための`generateMetadata()`
- 事前生成のための`generateStaticParams()`

クライアントコンポーネント（`'use client'`）が担当：
- ユーザーインタラクション（クリック、入力）
- ブラウザAPI（localStorage、window）
- 状態管理（useState、useEffect）
- カスタムフック（useTheme、useFavorites等）

### 主要ルートと事前生成

全ての動的ルートはビルド時に事前生成されます：

```typescript
// プロパティページ: /property/[id]
generateStaticParams() {
  return cssProperties.map(p => ({ id: p.id }));
  // 生成例: /property/display, /property/flex-direction, など
}

// カテゴリページ: /categories/[category]
generateStaticParams() {
  return categories.map(c => ({ category: toCategorySlug(c) }));
  // 生成例: /categories/layout, /categories/text, など
}

// テクニックページ: /techniques/[id]
generateStaticParams() {
  return techniques.map(t => ({ id: t.id }));
}
```

### データアーキテクチャ

**主要データソース（src/data/）：**
- `cssProperties.json` - 200以上のCSSプロパティ（例、説明、ブラウザサポート）
- `techniques.ts` - HTML/CSSコード付きCSSテクニックデモ
- `usecases.ts` - 逆引きマッピング（ユースケース → 関連プロパティ）

**データフロー：**
```
JSON/TSファイル → Server Componentでインポート → Client Componentに渡す → レンダリング
```

**重要なデータ型（src/types/css.ts）：**
```typescript
CSSProperty {
  id, name, category, description, syntax,
  examples: CodeExample[], relatedProperties, browserSupport
}

Technique {
  id, title, description, html, css, tips
}
```

### カスタムフックパターン

`src/hooks/`の全てのフックはLocalStorage永続化パターンに従います：
- `useFavorites()` - お気に入りCSSプロパティの管理
- `useRecentlyViewed()` - 閲覧履歴の追跡
- `useTheme()` - ライト/ダークモードの設定を永続化
- `useLocalStorage<T>()` - 汎用localStorageラッパー
- `useAnalytics()` - Google Analytics 4統合（GA ID: G-5JHPBNY2J3）

## 重要な実装パターン

### 1. 新しいCSSプロパティの追加

`src/data/cssProperties.json`にプロパティを追加する場合：
```json
{
  "id": "unique-kebab-case",
  "name": "property-name",
  "category": "レイアウト|テキスト|ボックスモデル|背景と装飾|アニメーション|カラー|その他",
  "description": "SEO用に50文字以上",
  "syntax": "property: value;",
  "examples": [{ "code": "...", "description": "..." }],
  "relatedProperties": ["array", "of", "ids"],
  "browserSupport": "詳細な文字列"
}
```
次回ビルド時に`/property/[id]/`で自動的にページが生成されます。

### 2. 新しいテクニックの追加

`src/data/techniques.ts`の配列に追加：
```typescript
{
  id: "kebab-case-id",
  title: "日本語タイトル",
  description: "このテクニックの説明",
  html: "HTMLコード例",
  css: "CSSコード例",
  tips?: "実装のヒント"
}
```
`/techniques/[id]/`で自動的にルートが生成されます。

### 3. 新しいルートの作成

新しいトップレベルルートの場合：
1. `src/app/[route]/page.tsx`を作成（Server Component）
2. インタラクティブ機能が必要な場合は`src/app/[route]/[Route]Client.tsx`を作成
3. パターン：
```typescript
// page.tsx
export const metadata = { title: '...', description: '...' };
export default function Page() {
  return <RouteClient />;
}

// RouteClient.tsx
'use client';
export default function RouteClient() {
  // インタラクティブロジックをここに
}
```

### 4. TypeScriptとパスエイリアス

- 全ての型定義は`src/types/css.ts`に配置
- パスエイリアス：`@/*` → `src/*`（tsconfig.jsonで設定）
- インポート例：`import cssProperties from '@/data/cssProperties.json'`
- Strictモード有効だが、デプロイ時はビルドエラーを無視（`ignoreBuildErrors: true`）

### 5. Tailwind CSSでのスタイリング

- モバイルファースト：`class="base md:medium lg:large"`
- ダークモード：`class="bg-white dark:bg-gray-900"`
- カスタムアニメーションは`src/app/globals.css`に配置
- コンポーネントスタイリングパターン：再利用可能なパターンはCSSファイルではなくコンポーネントに抽出

## 重要なビルド制約

**静的エクスポート設定（next.config.ts）：**
```javascript
output: 'export',              // 静的HTML生成
trailingSlash: true,           // 静的ホスティング用にURLを/で終了
images: { unoptimized: true }, // 静的エクスポートでは画像最適化なし
eslint: { ignoreDuringBuilds: true },
typescript: { ignoreBuildErrors: true }
```

**影響：**
- サーバーサイドランタイムなし（APIルート、サーバーアクション不可）
- 全てのデータはビルド時に利用可能である必要がある
- `localStorage`はビルド中にエラーを投げる（`typeof window !== 'undefined'`チェックでラップ）
- 全ての画像は最適化なしか外部CDNを使用する必要がある

## よくある問題と解決策

**問題：** ビルド中に`localStorage is not defined`
**解決策：** 常にブラウザ環境をチェック：
```typescript
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```
または既にこれを処理しているフック（useLocalStorage、useFavorites、useTheme）を使用。

**問題：** ページ読み込み時にダークモードがフラッシュする
**解決策：** root layout.tsxに既にテーマ初期化スクリプトがある - このパターンを維持。

**問題：** 新しい動的ルートが生成されない
**解決策：** `generateStaticParams()`がエクスポートされ、ビルド時に全ての可能なパラメータを返すことを確認。

## 開発ワークフロー

1. **実装前：** 既存パターンについてdocs/ファイルを確認
2. **コンポーネント変更：** 再利用可能なコンポーネントについて`docs/components.md`を確認
3. **データ変更：** `docs/data-structure.md`のスキーマに対して検証
4. **新しいルート：** `docs/routing.md`のパターンに従う
5. **スタイリング：** 既存のTailwindパターンを使用、ダークモード対応を確認
6. **テスト：** 手動テストのみ（現在テストフレームワークなし）
7. **ビルド検証：** `npm run build`を実行して静的生成が成功することを確認