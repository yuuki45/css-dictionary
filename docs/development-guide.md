# 開発ガイドライン

## 概要

このドキュメントでは、CSS Dictionary Nextの開発を行う際の標準的な手順、コーディング規約、ベストプラクティスを定義します。

## 💡 コンテキストエンジニアリングの重要性

このプロジェクトでは、**コンテキストエンジニアリング**のアプローチを採用しています。実装を進める際は、必ずdocsフォルダ内の関連ドキュメントを参照してください。

### なぜコンテキストエンジニアリングが重要か

1. **一貫性の維持**: 既存のパターンや設計思想を理解することで、プロジェクト全体の統一感を保てます
2. **品質の向上**: 過去の知見やベストプラクティスを活用できます
3. **効率的な開発**: 車輪の再発明を避け、既存の仕組みを再利用できます
4. **AI支援の最適化**: AIアシスタントに適切なコンテキストを提供することで、より正確な実装が可能になります

### 実践方法

**実装前のチェックリスト:**
- [ ] [architecture.md](./architecture.md)でプロジェクト全体の構造を確認
- [ ] [data-structure.md](./data-structure.md)で必要なデータ型を確認
- [ ] [components.md](./components.md)で再利用可能なコンポーネントを確認
- [ ] [routing.md](./routing.md)でルーティング設計を確認
- [ ] このdevelopment-guide.mdでコーディング規約を確認

**AIアシスタントへの依頼時:**
```
「docs/components.mdとdocs/data-structure.mdを参照して、
新しい機能を実装してください。既存のパターンに従い、
TypeScript型定義を適切に行ってください。」
```

## 目次

1. [開発環境のセットアップ](#開発環境のセットアップ)
2. [開発ワークフロー](#開発ワークフロー)
3. [コーディング規約](#コーディング規約)
4. [Git運用](#git運用)
5. [テスト](#テスト)
6. [デプロイメント](#デプロイメント)
7. [トラブルシューティング](#トラブルシューティング)

## 開発環境のセットアップ

### 必要な環境

- **Node.js**: 20.0.0以上
- **npm**: 10.0.0以上
- **エディタ**: VS Code推奨

### VS Code 推奨拡張機能

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

### 初期セットアップ手順

```bash
# 1. リポジトリのクローン
git clone <repository-url>
cd css-dictionary-next

# 2. 依存関係のインストール
npm install

# 3. 開発サーバーの起動
npm run dev

# 4. ブラウザで確認
# http://localhost:3001 にアクセス
```

### 環境変数

現在、環境変数は使用していませんが、将来的に必要な場合は`.env.local`ファイルを作成します。

```bash
# .env.local の例（将来的に使用する場合）
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 開発ワークフロー

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev
# → http://localhost:3001

# プロダクションビルド
npm run build

# プロダクションサーバー起動（ビルド後）
npm start

# ESLint実行
npm run lint

# ESLint修正
npm run lint -- --fix
```

### 開発の流れ

1. **Issue確認/作成**
   - 実装する機能やバグをIssueとして記録

2. **ブランチ作成**
   ```bash
   git checkout -b feature/new-feature
   # or
   git checkout -b fix/bug-description
   ```

3. **開発**
   - コードを書く
   - 動作確認
   - リントチェック

4. **コミット**
   ```bash
   git add .
   git commit -m "feat: 新機能の追加"
   ```

5. **プッシュ & プルリクエスト**
   ```bash
   git push origin feature/new-feature
   ```

6. **レビュー & マージ**

## コーディング規約

### TypeScript

#### 型定義

```typescript
// ✅ Good: 明示的な型定義
interface Props {
  id: string;
  name: string;
  optional?: number;
}

// ❌ Bad: any型の使用
const data: any = fetchData();

// ✅ Good: 適切な型推論を利用
const data = fetchData(); // 型推論される場合
```

#### 関数定義

```typescript
// ✅ Good: アロー関数とexport
export const fetchProperty = (id: string): CSSProperty | undefined => {
  return cssProperties.find(p => p.id === id);
};

// ✅ Good: async/await
export const loadData = async (): Promise<Data> => {
  const response = await fetch('/api/data');
  return response.json();
};
```

#### Null/Undefined チェック

```typescript
// ✅ Good: オプショナルチェイニング
const name = property?.name;

// ✅ Good: Nullish coalescing
const value = data ?? defaultValue;

// ❌ Bad: 冗長なチェック
if (data !== null && data !== undefined) {
  // ...
}
```

### React / Next.js

#### コンポーネント定義

```typescript
// ✅ Good: 明示的なProps型定義
interface ComponentProps {
  title: string;
  description?: string;
}

export default function Component({ title, description }: ComponentProps) {
  return (
    <div>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
```

#### Hooks の使用

```typescript
// ✅ Good: カスタムフックの命名
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  // ...
  return { favorites, addFavorite, removeFavorite };
}

// ✅ Good: useEffect の依存配列
useEffect(() => {
  fetchData(id);
}, [id]); // idが変更されたときのみ実行
```

#### Client/Server Component の区別

```typescript
// Server Component (デフォルト)
// src/app/page.tsx
export default function Page() {
  // サーバーサイドで実行
  const data = await fetchData();
  return <div>{data}</div>;
}

// Client Component
// src/components/Interactive.tsx
'use client';

export default function Interactive() {
  // ブラウザで実行
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

### CSS / Tailwind CSS

#### クラス名の順序

```typescript
// ✅ Good: 論理的な順序
<div className="
  flex items-center justify-between
  w-full h-12
  px-4 py-2
  bg-white dark:bg-gray-900
  border border-gray-200
  rounded-lg
  shadow-sm
  hover:shadow-md
  transition-shadow duration-300
">
```

#### レスポンシブデザイン

```typescript
// ✅ Good: モバイルファースト
<div className="
  text-sm md:text-base lg:text-lg
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
">
```

#### ダークモード対応

```typescript
// ✅ Good: ダークモードのバリエーション
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-700
">
```

### ファイル・フォルダ命名規則

```
✅ Good:
src/
├── app/
│   ├── page.tsx              # ページコンポーネント
│   └── layout.tsx            # レイアウト
├── components/
│   ├── PropertyCard.tsx      # PascalCase
│   └── SearchBar.tsx
├── hooks/
│   ├── useFavorites.ts       # camelCase with 'use' prefix
│   └── useTheme.ts
├── utils/
│   ├── search.ts             # camelCase
│   └── categorySlug.ts
└── types/
    └── css.ts                # camelCase

❌ Bad:
src/
├── components/
│   ├── property-card.tsx     # kebab-case（避ける）
│   └── searchBar.tsx         # 命名が不統一
```

## Git運用

### ブランチ戦略

```
main (本番)
  ↓
develop (開発)
  ↓
feature/xxx (機能開発)
fix/xxx (バグ修正)
hotfix/xxx (緊急修正)
```

### ブランチ命名規則

```bash
# 機能追加
feature/add-new-property-filter
feature/improve-search-performance

# バグ修正
fix/property-detail-not-found
fix/dark-mode-flash

# ホットフィックス
hotfix/critical-security-patch
```

### コミットメッセージ規約

[Conventional Commits](https://www.conventionalcommits.org/)形式を推奨

```bash
# フォーマット
<type>: <subject>

# 例
feat: CSSプロパティのフィルター機能を追加
fix: ダークモードでの表示崩れを修正
docs: READMEにインストール手順を追加
style: コードフォーマットを修正
refactor: 検索ロジックをリファクタリング
perf: 画像の遅延読み込みを改善
test: PropertyCardのテストを追加
chore: 依存関係を更新
```

#### Type一覧

| Type | 説明 | 例 |
|------|------|-----|
| `feat` | 新機能 | feat: お気に入りソート機能 |
| `fix` | バグ修正 | fix: 404ページの表示エラー |
| `docs` | ドキュメント | docs: APIドキュメント追加 |
| `style` | コードスタイル | style: ESLintエラー修正 |
| `refactor` | リファクタリング | refactor: hooks整理 |
| `perf` | パフォーマンス | perf: 画像最適化 |
| `test` | テスト | test: ユニットテスト追加 |
| `chore` | その他 | chore: 依存関係更新 |

## テスト

### テスト戦略（今後の実装推奨）

現在、テストフレームワークは導入されていませんが、以下を推奨します。

#### ユニットテスト（Jest + React Testing Library）

```bash
# インストール
npm install --save-dev jest @testing-library/react @testing-library/jest-dom

# テスト実行
npm test
```

#### テストファイルの配置

```
src/
├── components/
│   ├── PropertyCard.tsx
│   └── PropertyCard.test.tsx
├── hooks/
│   ├── useFavorites.ts
│   └── useFavorites.test.ts
└── utils/
    ├── search.ts
    └── search.test.ts
```

#### テストの書き方

```typescript
// PropertyCard.test.tsx
import { render, screen } from '@testing-library/react';
import PropertyCard from './PropertyCard';

describe('PropertyCard', () => {
  const mockProperty = {
    id: 'display',
    name: 'display',
    category: 'レイアウト',
    description: 'テスト',
    // ...
  };

  it('should render property name', () => {
    render(<PropertyCard property={mockProperty} />);
    expect(screen.getByText('display')).toBeInTheDocument();
  });

  it('should render category when showCategory is true', () => {
    render(<PropertyCard property={mockProperty} showCategory={true} />);
    expect(screen.getByText('レイアウト')).toBeInTheDocument();
  });
});
```

## デプロイメント

### ビルドプロセス

```bash
# 1. 依存関係のインストール
npm install

# 2. ビルド
npm run build
# → out/ ディレクトリに静的ファイルが生成

# 3. ビルド結果の確認
ls out/
```

### デプロイ先の推奨

#### Vercel（最も推奨）

```bash
# Vercel CLIのインストール
npm i -g vercel

# デプロイ
vercel
```

**設定:**
- Build Command: `npm run build`
- Output Directory: `out`
- Install Command: `npm install`

#### Netlify

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

#### GitHub Pages

```bash
# package.jsonにbasePath設定が必要な場合
# next.config.ts
const nextConfig = {
  output: 'export',
  basePath: '/repository-name',
};
```

### デプロイ前チェックリスト

- [ ] `npm run build` が成功する
- [ ] `npm run lint` がエラーなし
- [ ] 全てのページが正しく生成されている
- [ ] 画像やアセットが正しく読み込まれる
- [ ] ダークモードが正常に動作する
- [ ] お気に入り機能が動作する
- [ ] Google Analyticsが設定されている

## パフォーマンス最適化

### 画像最適化

```typescript
// Next.js Imageコンポーネント（将来的な改善案）
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="説明"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
```

### コード分割

```typescript
// 動的インポート
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  {
    loading: () => <Skeleton />,
    ssr: false
  }
);
```

### メモ化

```typescript
// useMemo
const filteredProperties = useMemo(() => {
  return properties.filter(p => p.category === category);
}, [properties, category]);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// React.memo
export default React.memo(PropertyCard);
```

## トラブルシューティング

### よくある問題と解決策

#### 1. ビルドエラー

**問題:** `npm run build` が失敗する

**解決策:**
```bash
# キャッシュをクリア
rm -rf .next
rm -rf out
rm -rf node_modules
npm install
npm run build
```

#### 2. LocalStorageエラー

**問題:** `localStorage is not defined`

**解決策:**
```typescript
// クライアントコンポーネントで使用
'use client';

// または条件チェック
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```

#### 3. ダークモードのフラッシュ

**問題:** ページ読み込み時にテーマが一瞬切り替わる

**解決策:**
```typescript
// layout.tsxでscriptタグを追加
<script
  dangerouslySetInnerHTML={{
    __html: `
      (function() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.classList.add(theme);
      })();
    `,
  }}
/>
```

#### 4. 動的ルートが生成されない

**問題:** ビルド時に動的ページが作成されない

**解決策:**
```typescript
// generateStaticParamsが正しく実装されているか確認
export async function generateStaticParams() {
  return items.map((item) => ({
    id: item.id,
  }));
}
```

### デバッグツール

```bash
# Next.jsのビルド詳細を確認
npm run build -- --debug

# 開発モードでエラー詳細を表示
npm run dev
```

## コードレビューガイドライン

### レビュー時のチェックポイント

- [ ] コードが規約に従っている
- [ ] 型定義が適切
- [ ] エラーハンドリングが実装されている
- [ ] パフォーマンスに問題がない
- [ ] セキュリティリスクがない
- [ ] アクセシビリティが考慮されている
- [ ] テストが書かれている（推奨）
- [ ] ドキュメントが更新されている

### レビューコメントの例

```typescript
// ✅ Good: 建設的なコメント
// 💡 suggestion: useMemoを使って最適化できます
const filtered = useMemo(() => items.filter(...), [items]);

// 🐛 bug: null チェックが必要です
if (!property) {
  return <NotFound />;
}

// ⚠️ warning: セキュリティリスクがあります
// dangerouslySetInnerHTMLの使用は慎重に
```

## 参考リソース

### 公式ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### コミュニティ
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/next.js)

### ツール
- [Can I Use](https://caniuse.com/) - ブラウザサポート確認
- [Bundle Analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) - バンドルサイズ分析
