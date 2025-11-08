# ルーティング設計ドキュメント

## 概要

このドキュメントでは、Next.js App Routerを使用したルーティング設計とURL構造について説明します。

## ルーティング構造

### ファイルシステムベースのルーティング

Next.js 15のApp Routerは、`src/app`ディレクトリの構造に基づいて自動的にルーティングを生成します。

```
src/app/
├── layout.tsx              → ルートレイアウト（全ページ共通）
├── page.tsx                → / (ホームページ)
├── not-found.tsx           → 404エラーページ
│
├── property/               → /property
│   └── [id]/              → /property/:id (動的ルート)
│       ├── page.tsx       → プロパティ詳細ページ
│       └── PropertyDetailClient.tsx
│
├── categories/            → /categories
│   ├── page.tsx          → カテゴリ一覧
│   ├── CategoriesClient.tsx
│   └── [category]/       → /categories/:category (動的ルート)
│       ├── page.tsx
│       └── CategoryDetailClient.tsx
│
├── techniques/            → /techniques
│   ├── page.tsx          → テクニック一覧
│   ├── TechniquesClient.tsx
│   └── [id]/             → /techniques/:id (動的ルート)
│       ├── page.tsx
│       └── TechniqueDetailClient.tsx
│
├── reverse/               → /reverse
│   ├── page.tsx          → 逆引き検索
│   └── ReverseClient.tsx
│
├── favorites/             → /favorites
│   ├── page.tsx          → お気に入り一覧
│   └── FavoritesClient.tsx
│
└── settings/              → /settings
    ├── page.tsx          → 設定ページ
    └── SettingsClient.tsx
```

## URL一覧

### 静的ルート

| URL | ページ | 説明 |
|-----|--------|------|
| `/` | Home | トップページ、検索、人気プロパティ |
| `/categories` | Categories | カテゴリ一覧 |
| `/techniques` | Techniques | テクニック集一覧 |
| `/reverse` | Reverse | 逆引き検索 |
| `/favorites` | Favorites | お気に入り一覧（クライアントのみ） |
| `/settings` | Settings | アプリ設定 |

### 動的ルート

| URL パターン | 例 | ページ | 説明 |
|-------------|-----|--------|------|
| `/property/[id]` | `/property/display` | Property Detail | プロパティ詳細ページ |
| `/categories/[category]` | `/categories/layout` | Category Detail | カテゴリ別プロパティ一覧 |
| `/techniques/[id]` | `/techniques/full-bleed-side` | Technique Detail | テクニック詳細ページ |

## 動的ルートの生成

### generateStaticParams による事前生成

全ての動的ルートはビルド時に静的生成されます。

#### プロパティページ

**ファイル:** `src/app/property/[id]/page.tsx`

```typescript
import cssProperties from '@/data/cssProperties.json';

export async function generateStaticParams() {
  return cssProperties.map((property) => ({
    id: property.id,
  }));
}
```

**生成されるURL例:**
- `/property/display`
- `/property/flex-direction`
- `/property/grid-template-columns`
- ... (200以上のプロパティ)

#### カテゴリページ

**ファイル:** `src/app/categories/[category]/page.tsx`

```typescript
import cssProperties from '@/data/cssProperties.json';
import { toCategorySlug } from '@/utils/categorySlug';

export async function generateStaticParams() {
  const categories = [...new Set(cssProperties.map(p => p.category))];

  return categories.map((category) => ({
    category: toCategorySlug(category),
  }));
}
```

**カテゴリスラッグ変換:**
```typescript
// src/utils/categorySlug.ts
export function toCategorySlug(category: string): string {
  const slugMap: Record<string, string> = {
    'レイアウト': 'layout',
    'テキスト': 'text',
    'ボックスモデル': 'box-model',
    '背景と装飾': 'background',
    'アニメーション': 'animation',
    'カラー': 'color',
    'その他': 'other',
  };
  return slugMap[category] || category.toLowerCase();
}
```

**生成されるURL例:**
- `/categories/layout`
- `/categories/text`
- `/categories/box-model`
- `/categories/background`
- `/categories/animation`
- `/categories/color`

#### テクニックページ

**ファイル:** `src/app/techniques/[id]/page.tsx`

```typescript
import { techniques } from '@/data/techniques';

export async function generateStaticParams() {
  return techniques.map((technique) => ({
    id: technique.id,
  }));
}
```

**生成されるURL例:**
- `/techniques/full-bleed-side`
- `/techniques/equal-height-center`
- `/techniques/text-hover-underline`
- ... (10以上のテクニック)

## メタデータ生成

各ページで動的にメタデータを生成し、SEOを最適化します。

### プロパティページのメタデータ

```typescript
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const property = cssProperties.find(p => p.id === id);

  if (!property) {
    return {
      title: 'プロパティが見つかりません - CSS Dictionary',
    };
  }

  return {
    title: `${property.name} - CSS Dictionary`,
    description: property.description,
    openGraph: {
      title: `${property.name} - CSS Dictionary`,
      description: property.description,
      type: 'article',
      locale: 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${property.name} - CSS Dictionary`,
      description: property.description,
    },
  };
}
```

### カテゴリページのメタデータ

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const categoryName = fromCategorySlug(category);
  const properties = cssProperties.filter(p => p.category === categoryName);

  return {
    title: `${categoryName}カテゴリ (${properties.length}件) - CSS Dictionary`,
    description: `${categoryName}に関連するCSSプロパティ一覧です。`,
  };
}
```

## ナビゲーション実装

### Link コンポーネントの使用

```typescript
import Link from 'next/link';

// 静的リンク
<Link href="/categories">カテゴリ一覧</Link>

// 動的リンク
<Link href={`/property/${property.id}`}>
  {property.name}
</Link>

// カテゴリリンク
<Link href={`/categories/${toCategorySlug(category)}`}>
  {category}
</Link>
```

### useRouter による programmatic navigation

```typescript
'use client';

import { useRouter } from 'next/navigation';

export default function Component() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/property/display');
  };

  return <button onClick={handleNavigation}>移動</button>;
}
```

### usePathname でアクティブリンクを判定

```typescript
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/categories', label: 'カテゴリ' },
    { href: '/techniques', label: 'テクニック' },
  ];

  return (
    <nav>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={pathname === item.href ? 'active' : ''}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

## 検索パラメータの取扱い

### useSearchParams によるクエリパラメータ取得

```typescript
'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div>
      <p>検索キーワード: {query}</p>
    </div>
  );
}
```

### URLにクエリパラメータを追加

```typescript
'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <input
      type="text"
      onChange={(e) => handleSearch(e.target.value)}
      placeholder="検索..."
    />
  );
}
```

## エラーハンドリング

### 404 Not Found

**ファイル:** `src/app/not-found.tsx`

```typescript
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">ページが見つかりません</p>
      <Link href="/" className="btn-primary">
        ホームに戻る
      </Link>
    </div>
  );
}
```

### notFound() による明示的な404

```typescript
import { notFound } from 'next/navigation';

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;
  const property = cssProperties.find(p => p.id === id);

  if (!property) {
    notFound(); // 404ページを表示
  }

  return <PropertyDetailClient property={property} />;
}
```

## リダイレクト

### redirect() によるサーバーサイドリダイレクト

```typescript
import { redirect } from 'next/navigation';

export default async function OldPage() {
  redirect('/new-page'); // 新しいページにリダイレクト
}
```

### ミドルウェアでのリダイレクト（将来の拡張）

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 旧URLから新URLへのリダイレクト
  if (request.nextUrl.pathname.startsWith('/old-path')) {
    return NextResponse.redirect(new URL('/new-path', request.url));
  }
}
```

## 静的エクスポート設定

### next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: 'export',              // 静的エクスポート
  trailingSlash: true,           // URLの末尾にスラッシュを追加
  images: {
    unoptimized: true,           // 画像最適化を無効化
  },
};
```

### trailingSlash の影響

```
trailingSlash: true の場合:
/property/display → /property/display/
/categories/layout → /categories/layout/

静的ホスティングで index.html として生成:
out/property/display/index.html
out/categories/layout/index.html
```

## パフォーマンス最適化

### Prefetching

Next.jsは`<Link>`コンポーネントで自動的にプリフェッチを行います。

```typescript
// デフォルトでプリフェッチ有効
<Link href="/property/display">Display</Link>

// プリフェッチを無効化
<Link href="/property/display" prefetch={false}>Display</Link>
```

### 動的インポート

```typescript
import dynamic from 'next/dynamic';

// コンポーネントの動的インポート
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <p>読み込み中...</p>,
  ssr: false, // クライアントサイドのみでレンダリング
});
```

## SEO最適化

### サイトマップ

**ファイル:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/property/display/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- その他のURL -->
</urlset>
```

### robots.txt

**ファイル:** `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

## ルーティングのベストプラクティス

### 1. 一貫性のあるURL構造
- ケバブケース使用: `/property/flex-direction`
- 階層的な構造: `/categories/layout/`
- 末尾スラッシュの統一: `trailingSlash: true`

### 2. SEOフレンドリーなURL
- 意味のあるパス名を使用
- IDではなく説明的なスラッグを使用
- 日本語は避け、英語のスラッグを使用

### 3. エラーハンドリング
- 適切な404ページ
- ユーザーフレンドリーなエラーメッセージ
- ホームへの戻りリンク

### 4. パフォーマンス
- 静的生成を最大限活用
- 適切なプリフェッチ設定
- 不要なリダイレクトを避ける

### 5. アクセシビリティ
- セマンティックなリンクテキスト
- aria-currentでアクティブリンクを示す
- キーボードナビゲーション対応
