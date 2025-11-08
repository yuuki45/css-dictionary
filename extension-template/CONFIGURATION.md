# 拡張機能の設定ガイド

このドキュメントでは、CSS Dictionary Inspector拡張機能を開発環境や本番環境で使用するための設定方法を説明します。

## 📝 URL設定

拡張機能は、CSS Dictionary Webアプリと連携して動作します。以下のファイルでURL設定が必要です：

### 設定が必要なファイル

1. **background/background.js**
2. **content/content.js**
3. **popup/popup.js**

## 🔧 開発環境での設定

### ローカル開発の場合

Next.jsアプリが `http://localhost:3001` で動作している場合：

#### 1. background/background.js の設定

```javascript
// 変更前
dictionaryUrl: 'https://your-css-dictionary.com'

// 変更後
dictionaryUrl: 'http://localhost:3001'
```

以下の箇所を変更：
- **10-14行目**: 初期設定のdictionaryUrl
- **89行目**: handleOpenDictionary関数のデフォルトURL
- **156行目**: getWebAppFavorites関数のURL
- **182行目**: syncWithWebApp関数のURL

#### 2. content/content.js の設定

```javascript
// 変更前（367行目付近）
const dictionaryUrl = data.settings?.dictionaryUrl || 'https://your-css-dictionary.com';

// 変更後
const dictionaryUrl = data.settings?.dictionaryUrl || 'http://localhost:3001';
```

#### 3. popup/popup.js の設定

```javascript
// 変更前（48行目付近）
const dictionaryUrl = data.settings?.dictionaryUrl || 'https://your-css-dictionary.com';

// 変更後
const dictionaryUrl = data.settings?.dictionaryUrl || 'http://localhost:3001';
```

### 一括置換コマンド

以下のコマンドで一括置換できます（macOS/Linux）：

```bash
cd extension-template

# バックアップを作成
cp background/background.js background/background.js.backup
cp content/content.js content/content.js.backup
cp popup/popup.js popup/popup.js.backup

# 一括置換（開発環境用）
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' background/background.js
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' content/content.js
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' popup/popup.js
```

Windowsの場合（PowerShell）：

```powershell
cd extension-template

# バックアップを作成
Copy-Item background/background.js background/background.js.backup
Copy-Item content/content.js content/content.js.backup
Copy-Item popup/popup.js popup/popup.js.backup

# 一括置換（開発環境用）
(Get-Content background/background.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content background/background.js
(Get-Content content/content.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content content/content.js
(Get-Content popup/popup.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content popup/popup.js
```

## 🚀 本番環境での設定

### 本番URLの設定

本番環境でデプロイする際は、実際のドメインに置き換えます：

```bash
# 例: https://css-dictionary.example.com の場合
sed -i '' 's|https://your-css-dictionary.com|https://css-dictionary.example.com|g' background/background.js
sed -i '' 's|https://your-css-dictionary.com|https://css-dictionary.example.com|g' content/content.js
sed -i '' 's|https://your-css-dictionary.com|https://css-dictionary.example.com|g' popup/popup.js
```

## 🔐 セキュリティ設定

### Content Security Policy (CSP)

Next.jsアプリ側で、拡張機能からのアクセスを許可する必要がある場合があります。

**next.config.js** に以下を追加：

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' chrome-extension://*;"
          }
        ]
      }
    ];
  }
};
```

### CORS設定

拡張機能からAPIにアクセスする場合、CORS設定が必要になる場合があります。

**pages/api/[endpoint].ts** の例：

```typescript
export default function handler(req, res) {
  // 拡張機能からのアクセスを許可
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // ... 残りのハンドラーコード
}
```

## 📦 環境別ビルド

### 開発用と本番用で別々にビルド

環境ごとに異なる設定ファイルを用意することを推奨します：

```bash
extension-template/
├── config/
│   ├── development.js   # 開発環境用設定
│   └── production.js    # 本番環境用設定
└── build-scripts/
    ├── build-dev.sh     # 開発用ビルドスクリプト
    └── build-prod.sh    # 本番用ビルドスクリプト
```

### config/development.js

```javascript
export const CONFIG = {
  dictionaryUrl: 'http://localhost:3001',
  environment: 'development',
  debug: true
};
```

### config/production.js

```javascript
export const CONFIG = {
  dictionaryUrl: 'https://css-dictionary.example.com',
  environment: 'production',
  debug: false
};
```

### ビルドスクリプトの例

**build-scripts/build-dev.sh**:

```bash
#!/bin/bash

echo "Building for development..."

# 設定ファイルをコピー
cp config/development.js config.js

# プレースホルダーURLを開発用URLに置換
find . -type f -name "*.js" -exec sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' {} +

echo "Development build complete!"
```

## ✅ 設定確認チェックリスト

本番公開前に以下を確認してください：

- [ ] background/background.js のURLが正しい
- [ ] content/content.js のURLが正しい
- [ ] popup/popup.js のURLが正しい
- [ ] manifest.json のhomepage_urlが正しい
- [ ] manifest.json のauthorが更新されている
- [ ] アイコンファイルが配置されている
- [ ] テスト環境で動作確認済み
- [ ] 本番環境のCSP/CORS設定が完了

## 🐛 トラブルシューティング

### 拡張機能がWebアプリに接続できない

1. **URLの確認**
   - ブラウザのDevToolsを開く
   - Consoleでエラーメッセージを確認
   - URLが正しいか確認

2. **CORS エラー**
   - Webアプリ側でCORS設定を確認
   - chrome-extension:// からのアクセスを許可

3. **CSP エラー**
   - Webアプリ側のCSP設定を確認
   - frame-ancestorsを確認

### LocalStorage同期が動作しない

1. **同一オリジンの確認**
   - 拡張機能とWebアプリが同じデータにアクセスしているか確認
   - chrome.storage.sync と localStorage は別物

2. **権限の確認**
   - manifest.json で "storage" 権限が有効か確認
   - host_permissions が正しく設定されているか確認

## 📚 関連ドキュメント

- [README.md](./README.md) - 基本的な使い方
- [docs/browser-extension-guide.md](../docs/browser-extension-guide.md) - 詳細な実装ガイド
- [manifest.json](./manifest.json) - 拡張機能の設定ファイル

## 🔄 バージョン管理

設定ファイルは `.gitignore` に追加することを推奨：

```gitignore
# 環境固有の設定
config.js
*.backup

# 開発用の一時ファイル
.DS_Store
*.log
```

これにより、開発者ごとに異なる設定を持つことができます。
