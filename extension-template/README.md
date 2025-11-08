# CSS Dictionary Inspector - ブラウザ拡張機能

CSS Dictionary と連携して、Webページ上のCSS分析と学習を支援するブラウザ拡張機能です。

## 機能

- 🔍 **要素検査**: Webページ上の任意の要素をクリックしてCSSを確認
- 📖 **CSS Dictionary連携**: プロパティの詳細ページへ直接ジャンプ
- ⭐ **お気に入り同期**: 拡張機能とWebアプリでお気に入りを同期
- 🕐 **履歴管理**: 最近調査したプロパティの記録
- 📋 **コピー機能**: CSSを簡単にコピー

## インストール方法

### 開発版（ローカル）

1. このリポジトリをクローン
```bash
git clone https://github.com/yourusername/css-dictionary-extension.git
cd css-dictionary-extension
```

2. **⚙️ URL設定（重要）**

   開発環境で使用する前に、CSS Dictionary WebアプリのURLを設定する必要があります。

   詳細は **[CONFIGURATION.md](./CONFIGURATION.md)** を参照してください。

   クイック設定（localhost:3001の場合）:
   ```bash
   cd extension-template
   sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' background/background.js
   sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' content/content.js
   sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' popup/popup.js
   ```

3. Chromeで拡張機能ページを開く
   - `chrome://extensions/` にアクセス
   - 右上の「デベロッパーモード」を有効化

4. 「パッケージ化されていない拡張機能を読み込む」をクリック

5. `extension-template` ディレクトリを選択

### Chrome Web Store（公開後）

Chrome Web Storeで「CSS Dictionary Inspector」を検索してインストール

## 使い方

### 基本的な使用方法

1. **拡張機能アイコンをクリック**
   - ブラウザのツールバーにあるアイコンをクリック

2. **「要素を調査」ボタンをクリック**
   - 要素選択モードが有効化されます

3. **調べたい要素をクリック**
   - ページ上の要素をクリックすると、CSSパネルが表示されます

4. **CSSプロパティを確認**
   - 📖 アイコン: CSS Dictionaryで詳細を見る
   - 📋 アイコン: プロパティをコピー
   - ⭐ アイコン: お気に入りに追加

### ショートカットキー

- **Ctrl+Shift+I** (Windows/Linux)
- **Cmd+Shift+I** (Mac)

拡張機能のポップアップを開きます。

### 右クリックメニュー

任意の要素を右クリック → 「CSS Dictionaryで調査」を選択

## 開発

### 必要な環境

- Node.js 20以上
- Chrome または Chromium系ブラウザ

### セットアップ

```bash
# 依存関係のインストール（将来的にビルドツールを使用する場合）
npm install

# 開発モード
npm run dev

# ビルド
npm run build
```

### ファイル構造

```
extension/
├── manifest.json          # 拡張機能の設定
├── popup/                 # ポップアップUI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/               # コンテンツスクリプト
│   ├── content.js
│   └── content.css
├── background/            # バックグラウンドスクリプト
│   └── background.js
├── icons/                 # アイコン画像
└── README.md
```

### デバッグ

1. `chrome://extensions/` を開く
2. 拡張機能の「詳細」をクリック
3. 「バックグラウンドページ」または「ビュー」の「popup.html」をクリック
4. DevToolsが開きます

## CSS Dictionary Webアプリとの連携

### お気に入りの同期

拡張機能とWebアプリは、以下のキーでLocalStorageを共有します：

- `favorites`: お気に入りプロパティのID配列
- `recentlyViewed`: 最近見たプロパティ

### データ形式

```javascript
// お気に入り
localStorage.setItem('favorites', JSON.stringify([
  { id: 'display', addedAt: 1234567890 },
  { id: 'flex-direction', addedAt: 1234567891 }
]));

// 最近見たプロパティ
localStorage.setItem('recentlyViewed', JSON.stringify([
  { id: 'grid', viewedAt: 1234567890 },
  { id: 'position', viewedAt: 1234567891 }
]));
```

## トラブルシューティング

### 拡張機能が動作しない

1. ページをリロードしてください
2. 拡張機能を無効化→有効化してください
3. Chrome を再起動してください

### CSSが表示されない

- 一部のサイトではContent Security Policyにより動作しない場合があります
- chrome:// や file:// スキームのページでは動作しません

### お気に入りが同期されない

- CSS Dictionary Webアプリのタブを開いた状態で、拡張機能を使用してください
- 手動同期: ポップアップの設定から「今すぐ同期」をクリック

## ライセンス

MIT License

## コントリビューション

プルリクエストを歓迎します！

1. フォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. コミット (`git commit -m 'Add amazing feature'`)
4. プッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## サポート

- 問題を報告: [GitHub Issues](https://github.com/yourusername/css-dictionary-extension/issues)
- 質問: [Discussions](https://github.com/yourusername/css-dictionary-extension/discussions)

## 更新履歴

### v1.0.0 (2025-01-XX)

- 初回リリース
- 要素検査機能
- CSS Dictionary連携
- お気に入り同期
- 履歴管理
