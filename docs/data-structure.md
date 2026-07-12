# データ構造ドキュメント

## 概要

このドキュメントでは、CSS Dictionary Nextで使用される全てのデータ構造とスキーマを定義します。

## 型定義の場所

全ての型定義は `src/types/css.ts` に集約されています。

## コアデータ型

### CSSProperty

CSSプロパティの情報を表すメインのデータ構造です。

```typescript
export interface CSSProperty {
  id: string;                    // プロパティのユニークID（例: "display", "flex-direction"）
  name: string;                  // プロパティ名（例: "display", "flex-direction"）
  category: string;              // カテゴリ名（正準リストは src/utils/categorySlug.ts）
  description: string;           // プロパティの説明文（50文字以上推奨）
  syntax: string;                // CSS構文（例: "display: flex;"）
  examples: CodeExample[];       // コード例の配列
  tips?: string;                 // 使用上のヒント（オプション）
  commonMistakes?: string;       // よくある間違い（オプション）
  relatedProperties: string[];   // 関連プロパティのID配列（実在するIDのみ。npm run validateで検証）
  browserSupport: BrowserSupport; // ブラウザサポート情報（構造化、W3C Baseline準拠）
  aiNotes?: string;              // AIがこのプロパティでよく間違えるポイント
  promptExamples?: string[];     // AIへの依頼文例
  searchAliases?: string[];      // 日本語検索別名（「角丸」等）
  mdnUrl?: string;               // MDNの該当ページURL
}

export type BaselineStatus = 'widely' | 'newly' | 'limited';

export interface BrowserSupport {
  chrome?: string;          // 初対応バージョン（例: "117"）。未対応ブラウザはフィールド自体を省略
  firefox?: string;
  safari?: string;
  edge?: string;
  baseline: BaselineStatus; // widely: 安定 / newly: 全対応済みだが新しい / limited: 一部未対応
  baselineLowDate?: string; // Baseline Newly到達年月（例: "2023-09"）
  note?: string;            // 部分対応などの補足（日本語）
}
```

#### フィールド詳細

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | ✓ | URL生成とデータ参照に使用される一意の識別子 |
| `name` | string | ✓ | UIに表示されるプロパティ名 |
| `category` | string | ✓ | カテゴリ分類（正準9カテゴリのみ。`npm run validate`で検証） |
| `description` | string | ✓ | プロパティの詳細説明（SEOに重要、50文字以上） |
| `syntax` | string | ✓ | 基本的な使用方法を示す構文 |
| `examples` | CodeExample[] | ✓ | 実用的なコード例の配列 |
| `tips` | string | - | 実務での使用ヒント |
| `commonMistakes` | string | - | 初心者が陥りやすいミス |
| `relatedProperties` | string[] | ✓ | 関連プロパティへのナビゲーション（実在ID必須） |
| `browserSupport` | BrowserSupport | ✓ | ブラウザ対応状況。**手書きせず`web-features`から引く**（`scripts/lib/baseline-source.ts`の`lookupBaseline()`） |
| `aiNotes` | string | - | AIアシスタントがよく間違えるポイント（新規エントリでは必須運用） |
| `promptExamples` | string[] | - | AIへの依頼文例（新規エントリでは必須運用） |
| `searchAliases` | string[] | - | 日本語検索別名 |
| `mdnUrl` | string | - | MDN該当ページ |

### CodeExample

CSSプロパティの使用例を表すデータ構造です。

```typescript
export interface CodeExample {
  code: string;         // サンプルコード（HTML/CSS）
  description: string;  // コード例の説明
  demo?: string;        // デモへのリンク（オプション）
}
```

#### フィールド詳細

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `code` | string | ✓ | シンタックスハイライト用のコードスニペット |
| `description` | string | ✓ | コード例の目的と動作説明 |
| `demo` | string | - | CodePen等の外部デモリンク |

### Technique

CSSテクニック集のデータ構造です。

```typescript
export type Technique = {
  id: string;           // テクニックのユニークID
  title: string;        // テクニックのタイトル
  description: string;  // テクニックの説明
  html: string;         // HTMLコード
  css: string;          // CSSコード
  tips?: string;        // 使用上のヒント（オプション）
};
```

#### フィールド詳細

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | ✓ | URL生成とルーティングに使用 |
| `title` | string | ✓ | テクニックの名称（SEOに重要） |
| `description` | string | ✓ | テクニックの概要と用途 |
| `html` | string | ✓ | HTMLマークアップ例 |
| `css` | string | ✓ | CSSスタイル実装 |
| `tips` | string | - | 実装のポイントとベストプラクティス |

## クライアントサイドデータ型

### Theme

ダークモード/ライトモードの切り替えに使用される型です。

```typescript
export type Theme = 'light' | 'dark';
```

### FavoriteProperty

お気に入りプロパティを管理するためのデータ構造です。

```typescript
export interface FavoriteProperty {
  id: string;        // プロパティID
  addedAt: number;   // 追加日時（Unix timestamp）
}
```

**LocalStorageキー:** `favorites`

#### 使用例
```typescript
const favorites: FavoriteProperty[] = [
  { id: "display", addedAt: 1703001234567 },
  { id: "flex-direction", addedAt: 1703002345678 }
];
```

### RecentProperty

最近閲覧したプロパティを追跡するデータ構造です。

```typescript
export interface RecentProperty {
  id: string;        // プロパティID
  viewedAt: number;  // 閲覧日時（Unix timestamp）
}
```

**LocalStorageキー:** `recentlyViewed`

#### 使用例
```typescript
const recent: RecentProperty[] = [
  { id: "grid-template-columns", viewedAt: 1703003456789 },
  { id: "align-items", viewedAt: 1703004567890 }
];
```

## データソース

### cssProperties.json

メインのCSSプロパティデータベースです。

**ファイルパス:** `src/data/cssProperties.json`

**構造:**
```json
[
  {
    "id": "display",
    "name": "display",
    "category": "レイアウト・配置",
    "description": "要素の表示方法を指定するプロパティ",
    "syntax": "display: block | inline | flex | grid | none;",
    "examples": [
      {
        "code": ".container {\n  display: flex;\n}",
        "description": "フレックスボックスレイアウトを適用"
      }
    ],
    "tips": "displayはレイアウトの基本となる重要なプロパティです",
    "relatedProperties": ["flex-direction", "grid-template-columns"],
    "browserSupport": {
      "chrome": "1",
      "firefox": "1",
      "safari": "1",
      "edge": "12",
      "baseline": "widely",
      "baselineLowDate": "2015-07"
    }
  }
]
```

**プロパティ数:** 105（`npm run validate` が件数と整合性を検証）

### techniques.ts

CSSテクニック集のデータです。

**ファイルパス:** `src/data/techniques.ts`

**エクスポート:**
```typescript
export const techniques: Technique[] = [
  {
    id: "full-bleed-side",
    title: "左右片方だけinner幅を超えて横幅いっぱいにする",
    description: "親のpaddingやmax-widthに制限されず...",
    html: "<section class=\"container\">...</section>",
    css: ".container { max-width: 720px; ... }",
    tips: "左右どちらでも応用可能..."
  },
  // ... more techniques
];
```

**テクニック数:** 10以上（継続的に追加）

### usecases.ts

逆引き検索用のデータです。

**ファイルパス:** `src/data/usecases.ts`

**構造:**
```typescript
export const usecases: Usecase[] = [
  {
    id: "center",
    label: "中央寄せしたい",
    description: "要素やテキストを中央に配置したい場合",
    propertyIds: ["justify-content", "align-items", "text-align", "margin"],
  },
  // ... more use cases
];
```

## データバリデーション

`npm run validate`（`scripts/validate/validate-data.ts`）がCIとローカルで以下を検証します：

**エラー（ビルドを止める）:**
- `id`: 一意であること
- `category`: 正準カテゴリ名であること（`src/utils/categorySlug.ts` が単一ソース）
- `examples`: 少なくとも1つのコード例
- `relatedProperties` / `usecases.propertyIds`: 全参照が実在するIDに解決すること（自己参照・重複も禁止）
- `browserSupport`: 構造化オブジェクトで、`baseline` が widely/newly/limited のいずれか

**警告:**
- `description`: 50文字未満
- `baseline` が `web-features` パッケージの最新値と不一致（データ陳腐化の検知）

### カテゴリ一覧

正準カテゴリは `src/utils/categorySlug.ts` の9種のみ（スラッグとの対応も同ファイルが単一ソース）：

1. **レイアウト・配置** (layout)
2. **テキスト・フォント** (text)
3. **背景・装飾** (background)
4. **アニメーション・エフェクト** (animation)
5. **スペーシング・サイズ** (spacing)
6. **レスポンシブ・関数** (responsive)
7. **インタラクション・UX** (interaction)
8. **擬似クラス** (pseudo-class)
9. **その他** (other)

## データアクセスパターン

### 1. プロパティの取得

```typescript
// JSONを直接importせず、型付き中央モジュールを経由する
import { cssProperties } from '@/data/properties';

// ID指定で取得
const property = cssProperties.find(p => p.id === 'display');

// カテゴリで絞り込み
const layoutProps = cssProperties.filter(
  p => p.category === 'レイアウト・配置'
);
```

### 2. テクニックの取得

```typescript
import { techniques } from '@/data/techniques';

// ID指定で取得
const technique = techniques.find(t => t.id === 'full-bleed-side');

// 全テクニック取得
const allTechniques = techniques;
```

### 3. 検索機能

```typescript
import { searchProperties } from '@/utils/search';

// キーワード検索
const results = searchProperties(cssProperties, 'flex');
// → name, description, syntaxから部分一致検索
```

## データ拡張ガイドライン

### 新しいCSSプロパティを追加する場合

1. `cssProperties.json`に新しいオブジェクトを追加
2. 全ての必須フィールドを記入
3. 最低1つのコード例を含める
4. 関連プロパティを正確に設定
5. カテゴリを適切に選択

### 新しいテクニックを追加する場合

1. `techniques.ts`の配列に新しいオブジェクトを追加
2. `id`はケバブケース（例: "new-technique-name"）
3. HTML/CSSコードは実際に動作するものを記載
4. `tips`で実装のポイントを解説

### バリデーションルール

```typescript
// 新規プロパティ追加時のチェックリスト
const isValidProperty = (prop: CSSProperty): boolean => {
  return !!(
    prop.id &&
    prop.name &&
    prop.category &&
    prop.description.length >= 50 &&
    prop.syntax &&
    prop.examples.length > 0 &&
    Array.isArray(prop.relatedProperties) &&
    prop.browserSupport
  );
};
```

## パフォーマンス最適化

### データサイズ
- `cssProperties.json`: ~200KB
- `techniques.ts`: ~50KB
- 全て静的インポートによりビルド時にバンドル

### 検索最適化
- クライアントサイド検索は`useMemo`でメモ化
- デバウンス処理により無駄な再レンダリングを防止

### キャッシュ戦略
```typescript
// LocalStorageキャッシュ
const STORAGE_KEYS = {
  FAVORITES: 'favorites',
  RECENT: 'recentlyViewed',
  THEME: 'theme',
  CACHE_VERSION: 'cacheVersion'
};
```
