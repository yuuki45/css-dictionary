# アーキテクチャドキュメント

## 概要

CSS Dictionary Nextは、Next.js 15のApp Routerを使用したSEO最適化された日本語CSSリファレンスアプリケーションです。React + ViteからNext.jsへ移行し、静的サイト生成(SSG)によるパフォーマンスとSEOの改善を実現しています。

> **📝 Note**: このドキュメントは、**コンテキストエンジニアリング**の重要なリソースです。新機能の実装やリファクタリングを行う際は、このドキュメントを参照して、プロジェクトの全体像と設計思想を理解してください。特にAIアシスタントに開発を依頼する際は、このドキュメントを明示的に参照することで、一貫性のある実装が可能になります。

## 技術スタック

### コアフレームワーク
- **Next.js 15.4.1**: App Router、SSG、動的ルーティング
- **React 19.1.0**: UI構築
- **TypeScript 5**: 型安全性

### スタイリング
- **Tailwind CSS 3.4.14**: ユーティリティファーストCSS
- **PostCSS**: CSS処理
- **Autoprefixer**: ベンダープレフィックス自動付与

### 開発ツール
- **ESLint**: コード品質管理
- **lucide-react**: アイコンライブラリ

## アーキテクチャパターン

### 1. 静的サイト生成（SSG）

全てのページはビルド時に事前生成されます：

```typescript
// next.config.ts
output: 'export', // 静的エクスポート
images: { unoptimized: true }, // 静的エクスポート用
trailingSlash: true, // 静的ホスティング対応
```

**メリット:**
- 超高速なページロード
- 優れたSEO
- 低コストなホスティング
- CDNによる配信最適化

### 2. ハイブリッドコンポーネント戦略

サーバーコンポーネントとクライアントコンポーネントを適切に分離：

#### サーバーコンポーネント
- ページルート (`page.tsx`)
- レイアウト (`layout.tsx`)
- メタデータ生成

#### クライアントコンポーネント（`'use client'`）
- インタラクティブなUI
- ローカルストレージアクセス
- ブラウザAPI使用
- イベントハンドラー

### 3. ファイルベースルーティング

Next.js App Routerの規約に従った構造：

```
src/app/
├── layout.tsx              # ルートレイアウト
├── page.tsx                # ホームページ
├── property/[id]/          # 動的プロパティページ
│   ├── page.tsx           # サーバーコンポーネント
│   └── PropertyDetailClient.tsx
├── categories/             # カテゴリページ
│   ├── page.tsx
│   ├── CategoriesClient.tsx
│   └── [category]/
│       ├── page.tsx
│       └── CategoryDetailClient.tsx
├── techniques/             # テクニック集
│   ├── page.tsx
│   ├── TechniquesClient.tsx
│   └── [id]/
│       ├── page.tsx
│       └── TechniqueDetailClient.tsx
├── reverse/                # 逆引き検索
├── favorites/              # お気に入り
└── settings/               # 設定
```

## レンダリング戦略

### ビルド時生成（Build Time Generation）

#### 1. プロパティページ
```typescript
// src/app/property/[id]/page.tsx
export async function generateStaticParams() {
  return cssProperties.map((property) => ({
    id: property.id,
  }));
}
```

**生成されるページ数:** 200以上のCSSプロパティページ

#### 2. カテゴリページ
```typescript
// src/app/categories/[category]/page.tsx
export async function generateStaticParams() {
  const categories = [...new Set(cssProperties.map(p => p.category))];
  return categories.map((category) => ({
    category: toCategorySlug(category),
  }));
}
```

#### 3. テクニックページ
```typescript
// src/app/techniques/[id]/page.tsx
export async function generateStaticParams() {
  return techniques.map((technique) => ({
    id: technique.id,
  }));
}
```

### メタデータ生成

各ページで動的にSEO最適化されたメタデータを生成：

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = cssProperties.find(p => p.id === params.id);

  return {
    title: `${property.name} - CSS Dictionary`,
    description: property.description,
    openGraph: {
      title: `${property.name} - CSS Dictionary`,
      description: property.description,
      type: 'article',
    },
  };
}
```

## データフロー

```
┌─────────────────────────────────────────────────────┐
│                  ビルドプロセス                      │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│            静的データ (JSON/TS)                      │
│  • cssProperties.json (CSSプロパティ)                │
│  • techniques.ts (テクニック集)                      │
│  • usecases.ts (逆引きデータ)                        │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│          generateStaticParams()                      │
│  全ページパスを事前生成                              │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│          サーバーコンポーネント                      │
│  • データフェッチ                                    │
│  • メタデータ生成                                    │
│  • 初期HTML生成                                      │
└─────────────────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────┐
│         クライアントコンポーネント                   │
│  • インタラクティブ機能                             │
│  • LocalStorage (お気に入り、閲覧履歴)              │
│  • テーマ切り替え                                    │
│  • Google Analytics                                  │
└─────────────────────────────────────────────────────┘
```

## 状態管理戦略

### クライアントサイド状態

カスタムフックによる状態管理：

1. **useLocalStorage**: 汎用LocalStorage管理
2. **useFavorites**: お気に入り管理
3. **useRecentlyViewed**: 閲覧履歴管理
4. **useTheme**: ダークモード切り替え
5. **useAnalytics**: Google Analytics追跡

### サーバーサイド状態

- 静的データのインポート
- ビルド時のデータ処理
- メタデータ生成

## パフォーマンス最適化

### 1. 静的生成による最適化
- 全ページの事前生成
- CDN配信
- ゼロサーバーサイドレンダリングコスト

### 2. クライアント最適化
- **useLazyLoading**: コンテンツの遅延ロード
- **Intersection Observer**: ビューポート監視
- **動的インポート**: 必要に応じたコード分割

### 3. キャッシュ戦略
```typescript
// cacheUtils.ts
- バージョンベースのキャッシュ管理
- LocalStorageキャッシュ
- ビルドバージョンによる自動無効化
```

## SEO最適化

### 1. メタタグ最適化
- 動的title/description
- Open Graph対応
- Twitter Card対応

### 2. 構造化データ
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CSS Dictionary",
  "description": "...",
  "applicationCategory": "EducationalApplication"
}
```

### 3. サイトマップ/Robots
- `sitemap.xml`: 全ページのURL一覧
- `robots.txt`: クローラー制御

### 4. Google Analytics
- GA4統合 (G-5JHPBNY2J3)
- ページビュー追跡
- イベント追跡

## セキュリティとエラーハンドリング

### エラーページ
- `not-found.tsx`: 404ページ
- カスタムエラーハンドリング

### ビルド設定
```typescript
// next.config.ts
typescript: {
  ignoreBuildErrors: true, // デプロイ優先
},
eslint: {
  ignoreDuringBuilds: true, // デプロイ優先
},
```

## デプロイメント

### ビルドプロセス
```bash
npm run build
# → 静的ファイルを /out に生成
```

### ホスティング対応
- Vercel（推奨）
- Netlify
- GitHub Pages
- Cloudflare Pages
- その他の静的ホスティングサービス

### デプロイメント要件
- Node.js 20以上
- npm 依存関係インストール
- ビルドコマンド: `npm run build`
- 出力ディレクトリ: `out/`

## 移行履歴

### React + Vite → Next.js移行の主な変更点

1. **ルーティング**: React Router → App Router
2. **レンダリング**: クライアントサイド → 静的生成
3. **状態管理**: Context API → カスタムフック（維持）
4. **ビルド**: Vite → Next.js
5. **SEO**: 基本的なメタタグ → 包括的なSEO最適化

## 今後の拡張可能性

### 推奨される改善点
1. **テスト**: Jest + React Testing Library導入
2. **CMS統合**: HeadlessCMS連携でコンテンツ管理
3. **検索最適化**: Algolia等の検索サービス統合
4. **PWA化**: オフライン対応
5. **多言語対応**: i18n統合

### スケーラビリティ
- 静的生成により、トラフィック増加に強い
- CDN配信で世界中で高速
- サーバーレスなので運用コスト低
