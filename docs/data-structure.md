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
  category: string;              // カテゴリ名（例: "レイアウト", "テキスト"）
  description: string;           // プロパティの説明文
  syntax: string;                // CSS構文（例: "display: flex;"）
  examples: CodeExample[];       // コード例の配列
  tips?: string;                 // 使用上のヒント（オプション）
  commonMistakes?: string;       // よくある間違い（オプション）
  relatedProperties: string[];   // 関連プロパティのID配列
  browserSupport: string;        // ブラウザサポート情報
}
```

#### フィールド詳細

| フィールド | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `id` | string | ✓ | URL生成とデータ参照に使用される一意の識別子 |
| `name` | string | ✓ | UIに表示されるプロパティ名 |
| `category` | string | ✓ | カテゴリ分類（フィルタリングに使用） |
| `description` | string | ✓ | プロパティの詳細説明（SEOに重要） |
| `syntax` | string | ✓ | 基本的な使用方法を示す構文 |
| `examples` | CodeExample[] | ✓ | 実用的なコード例の配列 |
| `tips` | string | - | 実務での使用ヒント |
| `commonMistakes` | string | - | 初心者が陥りやすいミス |
| `relatedProperties` | string[] | ✓ | 関連プロパティへのナビゲーション |
| `browserSupport` | string | ✓ | ブラウザ対応状況 |

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
    "category": "レイアウト",
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
    "browserSupport": "全モダンブラウザ対応"
  }
]
```

**プロパティ数:** 200以上

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
export const usecases = [
  {
    id: "center-horizontal",
    question: "要素を水平方向に中央揃えしたい",
    properties: ["margin", "text-align", "justify-content"],
    category: "配置"
  },
  // ... more use cases
];
```

## データバリデーション

### 必須フィールドチェック

全てのCSSプロパティは以下のフィールドが必須です：
- `id`: 空でない文字列
- `name`: 空でない文字列
- `category`: 有効なカテゴリ名
- `description`: 50文字以上推奨
- `syntax`: 有効なCSS構文
- `examples`: 少なくとも1つのコード例
- `relatedProperties`: 配列（空でも可）
- `browserSupport`: 空でない文字列

### カテゴリ一覧

CSSプロパティは以下のカテゴリに分類されます：

1. **レイアウト** - display, position, flex, grid関連
2. **テキスト** - font, text, line関連
3. **ボックスモデル** - margin, padding, border, width, height
4. **背景と装飾** - background, border-radius, shadow
5. **アニメーション** - transition, animation, transform
6. **カラー** - color, opacity関連
7. **その他** - 上記以外のプロパティ

## データアクセスパターン

### 1. プロパティの取得

```typescript
import cssProperties from '@/data/cssProperties.json';

// ID指定で取得
const property = cssProperties.find(p => p.id === 'display');

// カテゴリで絞り込み
const layoutProps = cssProperties.filter(
  p => p.category === 'レイアウト'
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
