# コンポーネント設計ドキュメント

## 概要

このドキュメントでは、CSS Dictionary Nextで使用される全コンポーネントの設計、責務、使用方法を説明します。

## コンポーネント階層

```
app/
├── layout.tsx (Root Layout)
│   └── Navigation
│       └── ThemeSwitcher
│
├── page.tsx (Home)
│   ├── SearchBar
│   └── PropertyCard[]
│
├── property/[id]/
│   ├── page.tsx (Server Component)
│   └── PropertyDetailClient
│       └── PropertyDetail
│
├── categories/
│   ├── CategoriesClient
│   │   └── CategoryGrid
│   │       └── CategoryList
│   └── [category]/
│       └── CategoryDetailClient
│           └── CategoryDetail
│               └── PropertyCard[]
│
├── techniques/
│   ├── TechniquesClient
│   │   └── Techniques
│   └── [id]/
│       └── TechniqueDetailClient
│
├── reverse/
│   └── ReverseClient
│
├── favorites/
│   └── FavoritesClient
│       └── PropertyCard[]
│
└── settings/
    └── SettingsClient
        └── Settings
```

## コンポーネント詳細

### レイアウトコンポーネント

#### Layout
**ファイル:** `src/app/layout.tsx`
**タイプ:** Server Component

**責務:**
- ルートレイアウトの定義
- メタデータの設定
- Google Analytics初期化
- グローバルスタイルの適用

**主な機能:**
```typescript
export const metadata: Metadata = {
  title: 'CSS Dictionary',
  description: '日本語で学ぶCSSプロパティリファレンス',
  // SEO関連のメタデータ
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        {/* Structured Data */}
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

#### Navigation
**ファイル:** `src/components/Navigation.tsx`
**タイプ:** Client Component (`'use client'`)

**責務:**
- グローバルナビゲーション
- ルート間の遷移
- テーマ切り替えボタン
- レスポンシブメニュー

**Props:** なし

**使用するフック:**
- `usePathname()`: 現在のパスを取得
- `useTheme()`: テーマ状態管理

**主な機能:**
```typescript
'use client';

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { href: '/', label: 'ホーム' },
    { href: '/categories', label: 'カテゴリ' },
    { href: '/techniques', label: 'テクニック' },
    { href: '/reverse', label: '逆引き' },
    { href: '/favorites', label: 'お気に入り' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      {/* ナビゲーションリンク */}
      {/* テーマ切り替えボタン */}
    </nav>
  );
}
```

### 検索・表示コンポーネント

#### SearchBar
**ファイル:** `src/components/SearchBar.tsx`
**タイプ:** Client Component

**責務:**
- CSS検索機能
- リアルタイム検索結果表示
- 検索履歴管理

**Props:**
```typescript
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}
```

**主な機能:**
- デバウンス処理で検索最適化
- キーボードショートカット対応（Cmd/Ctrl + K）
- オートコンプリート機能

**使用例:**
```typescript
<SearchBar
  onSearch={(query) => setSearchQuery(query)}
  placeholder="CSSプロパティを検索..."
/>
```

#### PropertyCard
**ファイル:** `src/components/PropertyCard.tsx`
**タイプ:** Client Component

**責務:**
- CSSプロパティのカード表示
- お気に入りボタン
- プロパティへのリンク

**Props:**
```typescript
interface PropertyCardProps {
  property: CSSProperty;
  showCategory?: boolean;
  compact?: boolean;
}
```

**主な機能:**
```typescript
'use client';

export default function PropertyCard({
  property,
  showCategory = true,
  compact = false,
}: PropertyCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Link href={`/property/${property.id}`}>
      <div className="card hover:shadow-lg transition-shadow">
        <h3>{property.name}</h3>
        <p>{property.description}</p>
        {showCategory && <span>{property.category}</span>}
        <button onClick={toggleFavorite}>
          {isFavorite(property.id) ? '★' : '☆'}
        </button>
      </div>
    </Link>
  );
}
```

#### PropertyDetail
**ファイル:** `src/components/PropertyDetail.tsx`
**タイプ:** Client Component

**責務:**
- プロパティの詳細表示
- コード例の表示
- シンタックスハイライト
- 関連プロパティへのリンク
- 閲覧履歴への追加

**Props:**
```typescript
interface PropertyDetailProps {
  property: CSSProperty;
}
```

**主な機能:**
- コードブロックのコピー機能
- タブによるコード例切り替え
- 関連プロパティの推奨表示

### カテゴリコンポーネント

#### CategoryGrid
**ファイル:** `src/components/CategoryGrid.tsx`
**タイプ:** Client Component

**責務:**
- カテゴリ一覧のグリッド表示
- カテゴリ別プロパティ数表示

**Props:**
```typescript
interface CategoryGridProps {
  categories: { name: string; count: number; slug: string }[];
}
```

#### CategoryList
**ファイル:** `src/components/CategoryList.tsx`
**タイプ:** Client Component

**責務:**
- カテゴリ内プロパティのリスト表示
- ソート・フィルター機能

**Props:**
```typescript
interface CategoryListProps {
  properties: CSSProperty[];
  category: string;
}
```

#### CategoryDetail
**ファイル:** `src/components/CategoryDetail.tsx`
**タイプ:** Client Component

**責務:**
- カテゴリの詳細ページ表示
- プロパティのグループ化

**Props:**
```typescript
interface CategoryDetailProps {
  category: string;
  properties: CSSProperty[];
}
```

### テクニックコンポーネント

#### Techniques
**ファイル:** `src/components/Techniques.tsx`
**タイプ:** Client Component

**責務:**
- テクニック一覧表示
- テクニックのプレビュー
- 検索・フィルター機能

**主な機能:**
```typescript
'use client';

export default function Techniques() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTechniques, setFilteredTechniques] = useState(techniques);

  useEffect(() => {
    const filtered = techniques.filter(t =>
      t.title.includes(searchTerm) ||
      t.description.includes(searchTerm)
    );
    setFilteredTechniques(filtered);
  }, [searchTerm]);

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <div className="grid gap-6">
        {filteredTechniques.map(technique => (
          <TechniqueCard key={technique.id} technique={technique} />
        ))}
      </div>
    </div>
  );
}
```

### 設定コンポーネント

#### Settings
**ファイル:** `src/components/Settings.tsx`
**タイプ:** Client Component

**責務:**
- アプリ設定管理
- テーマ切り替え
- データクリア機能
- キャッシュ管理

**主な機能:**
```typescript
'use client';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { clearFavorites } = useFavorites();
  const { clearHistory } = useRecentlyViewed();

  return (
    <div className="settings">
      <section>
        <h2>表示設定</h2>
        <button onClick={toggleTheme}>
          {theme === 'light' ? 'ダークモード' : 'ライトモード'}
        </button>
      </section>

      <section>
        <h2>データ管理</h2>
        <button onClick={clearFavorites}>お気に入りをクリア</button>
        <button onClick={clearHistory}>閲覧履歴をクリア</button>
      </section>
    </div>
  );
}
```

## ページコンポーネント（Server Components）

### Home Page
**ファイル:** `src/app/page.tsx`

**責務:**
- トップページの表示
- 人気プロパティの表示
- 最近追加されたプロパティ

### Property Detail Page
**ファイル:** `src/app/property/[id]/page.tsx`

**主な機能:**
```typescript
export async function generateStaticParams() {
  return cssProperties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = cssProperties.find(p => p.id === params.id);

  return {
    title: `${property.name} - CSS Dictionary`,
    description: property.description,
  };
}
```

### Categories Page
**ファイル:** `src/app/categories/page.tsx`

**責務:**
- カテゴリ一覧ページ
- カテゴリ別プロパティ数の集計

## カスタムフック

### useTheme
**ファイル:** `src/hooks/useTheme.ts`

**責務:** テーマ状態管理

**API:**
```typescript
const { theme, setTheme, toggleTheme } = useTheme();
```

### useFavorites
**ファイル:** `src/hooks/useFavorites.ts`

**責務:** お気に入り管理

**API:**
```typescript
const {
  favorites,
  addFavorite,
  removeFavorite,
  isFavorite,
  toggleFavorite,
  clearFavorites
} = useFavorites();
```

### useRecentlyViewed
**ファイル:** `src/hooks/useRecentlyViewed.ts`

**責務:** 閲覧履歴管理

**API:**
```typescript
const {
  recentlyViewed,
  addToRecent,
  clearHistory
} = useRecentlyViewed();
```

### useAnalytics
**ファイル:** `src/hooks/useAnalytics.ts`

**責務:** Google Analytics追跡

**API:**
```typescript
const { trackPageView, trackEvent } = useAnalytics();

// 使用例
trackPageView('/property/display');
trackEvent('favorite', 'add', 'display');
```

### useLazyLoading
**ファイル:** `src/hooks/useLazyLoading.ts`

**責務:** コンテンツの遅延ロード

**API:**
```typescript
const { ref, isVisible } = useLazyLoading();

<div ref={ref}>
  {isVisible && <HeavyComponent />}
</div>
```

### useLocalStorage
**ファイル:** `src/hooks/useLocalStorage.ts`

**責務:** LocalStorage管理

**API:**
```typescript
const [value, setValue] = useLocalStorage<T>(key, initialValue);
```

## スタイリング規約

### Tailwind CSS使用ガイドライン

#### レスポンシブデザイン
```typescript
// モバイルファースト
<div className="w-full md:w-1/2 lg:w-1/3">

// ブレークポイント
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px
```

#### ダークモード対応
```typescript
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

#### アニメーション
```typescript
// トランジション
<button className="transition-all duration-300 hover:scale-105">

// カスタムアニメーション（globals.css）
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

## コンポーネント作成ガイドライン

### 新規コンポーネント作成時のチェックリスト

1. **適切なタイプを選択**
   - サーバーコンポーネント or クライアントコンポーネント
   - `'use client'`ディレクティブの必要性を確認

2. **Props型定義**
   ```typescript
   interface ComponentProps {
     required: string;
     optional?: number;
   }
   ```

3. **ドキュメントコメント**
   ```typescript
   /**
    * コンポーネントの説明
    * @param props - プロパティの説明
    */
   ```

4. **エラーハンドリング**
   - 必要に応じてエラーバウンダリ
   - フォールバックUI

5. **アクセシビリティ**
   - セマンティックHTML
   - ARIA属性
   - キーボード操作対応

6. **パフォーマンス**
   - React.memo()による最適化
   - useMemo/useCallbackの適切な使用
   - 遅延ローディング

### コンポーネント配置ルール

```
src/
├── app/                    # ページコンポーネント
│   └── [route]/
│       ├── page.tsx       # Server Component
│       └── *Client.tsx    # Client Component
│
└── components/            # 共通コンポーネント
    └── *.tsx             # 再利用可能なコンポーネント
```

## テスト戦略（今後の実装推奨）

### ユニットテスト
```typescript
// 推奨: Jest + React Testing Library
describe('PropertyCard', () => {
  it('should render property name', () => {
    // テストコード
  });
});
```

### インテグレーションテスト
- ページ全体の動作確認
- ルーティングテスト

### E2Eテスト
- Playwright/Cypress推奨
- 主要なユーザーフローの確認
