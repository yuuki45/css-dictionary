# CSS辞書 Next.js版

## プロジェクト概要

CSS辞書のNext.js版は、React + ViteからSEO改善のために移行された日本語CSS辞書Webアプリケーションです。検索、カテゴリ分類、逆引き検索、テクニック集を含む、CSSプロパティの包括的な学習ツールとして機能します。

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# 本番用ビルド
npm run build

# 本番サーバーの起動（ビルド後）
npm start

# ESLintの実行
npm run lint

# 依存関係のインストール
npm install
```

## アーキテクチャと構造

### Next.js App Routerの構造
- **ページ**: ファイルベースルーティングでApp Routerを使用
- **レイアウト**: 包括的なSEOメタタグとGoogle Analyticsを含むルートレイアウト
- **静的生成**: すべてのCSSプロパティページがビルド時に事前生成
- **クライアントコンポーネント**: インタラクティブなコンポーネントは'use client'ディレクティブを使用

### 主要ルート
- `/` - 検索と人気プロパティを含むホームページ
- `/property/[id]` - 動的プロパティ詳細ページ（事前生成）
- `/categories` - カテゴリ一覧と詳細ページ
- `/reverse` - 逆引き検索機能
- `/techniques` - CSSテクニック集
- `/favorites` - ユーザーお気に入り（クライアントサイドのみ）
- `/settings` - アプリ設定

### SEO改善
- **静的生成**: SEO向上のためにすべてのプロパティページを事前生成
- **メタタグ**: 各プロパティページの動的メタタグ
- **構造化データ**: WebApplicationのJSON-LDスキーマ
- **Open Graph**: 完全なOGとTwitter Cardサポート
- **サイトマップ**: 静的sitemap.xmlとrobots.txtを含む

### データ構造
- **cssProperties.json**: すべてのCSSプロパティを含むメインデータソース
- **techniques.ts**: モダンCSSテクニックのコレクション
- **usecases.ts**: 「XというCSSプロパティで何を実現するか」の逆引きデータ

### カスタムフック（クライアントサイド）
- **useAnalytics**: Google Analytics 4統合
- **useFavorites**: LocalStorageベースのお気に入り管理
- **useRecentlyViewed**: 最近閲覧したプロパティの追跡
- **useTheme**: ダーク/ライトモード切り替え
- **useLocalStorage**: 汎用localStorageフック
- **useLazyLoading**: パフォーマンス最適化

### ビルド設定
- **静的エクスポート**: `output: 'export'`で静的サイト生成用に設定
- **画像最適化**: 静的エクスポートとの互換性のため無効化
- **末尾スラッシュ**: 静的ホスティングとの互換性向上のため有効化
- **エラーハンドリング**: デプロイ時にTypeScriptとESLintエラーを無視
- **スタイリング**: カスタムアニメーションとダークモードサポートを含むTailwind CSS

## Vite版からの主な変更点

### ルーティング移行
- 状態ベースルーティングからNext.js App Routerに変換
- SEO向上のため各タブが独自のルートを持つ
- プロパティ詳細の動的ルート

### SSG実装
- すべてのプロパティページが静的生成される
- 動的ルートにgenerateStaticParamsを使用
- 動的メタタグにgenerateMetadataを使用

### コンポーネント構造
- ほとんどのコンポーネントは変更なく、クライアントコンポーネントでラップ
- PropertyDetailはサーバーとクライアントコンポーネントに分割
- ナビゲーションはNext.jsルーティングに適応

## 開発メモ

- **テストフレームワークなし**: 現在ユニットテストは実装されていません
- **静的エクスポート**: デプロイ用に静的ファイルをビルド
- **localStorage警告**: SSG中は想定される動作で、ブラウザでは正常に動作
- **日本語UI**: 包括的なSEOメタデータを含む日本語がメイン言語
- **Google Analytics**: トラッキングID G-5JHPBNY2J3で統合
- **パスエイリアス**: `@/*`が`./src/*`にマップされ、インポートがより簡潔に
- **TypeScript**: Next.jsプラグイン統合でストリクトモードが有効

## デプロイ

このアプリケーションは静的エクスポート用に設定されており、Netlify、Vercel、GitHub Pagesなどの任意の静的ホスティングサービスにデプロイできます。ビルドプロセスでは、最適なSEOパフォーマンスのためにビルド時にすべてのページが生成されます。