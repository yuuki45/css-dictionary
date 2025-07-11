# CSS 辞書 - CSS プロパティ完全ガイド

すべての CSS プロパティを日本語で解説する学習ツール。実用的なサンプルコード、逆引き検索、最新テクニック集を収録した、初心者から上級者まで使える CSS 学習の決定版ツールです。

## 🌟 特徴

- **包括的なプロパティ辞書**: すべての CSS プロパティを詳細解説
- **逆引き検索**: 「中央寄せしたい」など目的から逆引き可能
- **テクニック集**: 実用的な CSS テクニックをコピペ可能なコード付きで提供
- **ダークモード対応**: 目に優しいダークテーマ
- **PWA 対応**: オフライン利用可能、アプリのようにインストール可能
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応

## 🚀 SEO 対策

このアプリケーションには以下の SEO 対策が実装されています：

### メタタグ最適化

- 詳細なメタディスクリプション
- Open Graph 対応（Facebook、LinkedIn 等での共有最適化）
- Twitter Card 対応
- 日本語キーワード最適化

### 構造化データ

- JSON-LD 形式の構造化データ実装
- WebApplication スキーマ対応
- 検索エンジンでのリッチスニペット表示

### PWA 対応

- Service Worker 導入
- オフライン機能
- アプリインストール可能
- キャッシュ戦略最適化

### パフォーマンス最適化

- 遅延読み込み（Lazy Loading）
- 画像最適化
- キャッシュ戦略
- Core Web Vitals 対応

### サイトマップと robots.txt

- XML サイトマップ生成
- 検索エンジン向けクロール指示
- 適切なインデックス制御

### 動的メタタグ

- ページ遷移時の自動タイトル更新
- 各ページ専用のメタディスクリプション
- プロパティ詳細ページでの個別 SEO 対応

## 🛠️ 技術スタック

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **PWA**: Vite PWA Plugin
- **Icons**: Lucide React

## 📦 インストール・起動

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プレビュー
npm run preview
```

## 🌐 デプロイ

このアプリケーションは以下のプラットフォームに最適化されています：

- **カスタムドメイン**: https://www.css-dictionary.com で公開
- **Netlify**: 自動デプロイ、プレビューデプロイ対応
- **Vercel**: Zero-config deployment
- **GitHub Pages**: 静的ホスティング

### デプロイ推奨設定

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🔍 検索エンジン最適化ガイド

### 1. Google Search Console 登録

- **確認済み**: ZCastaObRG6NadrWmow1BDCi1Y9XzIztalUTr8NRIoc
- サイトマップ送信: `https://www.css-dictionary.com/sitemap.xml`
- インデックス状況確認
- Core Web Vitals 監視

### 2. 内部リンク最適化

- 関連プロパティへの相互リンク
- カテゴリページからの適切なリンク構造
- パンくずナビゲーション（実装予定）

### 3. コンテンツ最適化

- 日本語キーワードの自然な配置
- 実用的なサンプルコード
- ユーザーの検索意図に合致したコンテンツ

### 4. 技術的 SEO

- ページ読み込み速度最適化
- モバイルファーストインデックス対応
- HTTPS 必須

## 📈 分析・改善

- **Google Analytics 4**: 実装済み（G-5JHPBNY2J3）
- **ユーザー行動分析**: ページビュー、プロパティ詳細表示、検索クエリ
- **イベントトラッキング**: お気に入り操作、カテゴリ選択、テーマ変更
- **Core Web Vitals 継続監視**: PWA パフォーマンス測定

### トラッキングイベント

- `page_view`: ページ遷移
- `property_view`: プロパティ詳細表示
- `favorite_add/remove`: お気に入り操作
- `search`: 検索クエリ
- `category_select`: カテゴリ選択
- `usecase_select`: 逆引き検索
- `technique_view`: テクニック表示
- `theme_change`: ダークモード切り替え

## 🤝 コントリビューション

プルリクエスト、Issue 報告を歓迎しています。特に以下の分野での貢献をお待ちしています：

- 新しい CSS プロパティの追加
- テクニック集の拡充
- パフォーマンス改善
- SEO 改善

## 📝 ライセンス

MIT License

---

## 🔗 関連リンク

- [CSS MDN Documentation](https://developer.mozilla.org/ja/docs/Web/CSS)
- [Can I Use](https://caniuse.com/)
- [CSS Tricks](https://css-tricks.com/)
