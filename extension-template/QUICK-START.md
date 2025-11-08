# 🚀 クイックスタートガイド

CSS Dictionary Inspector拡張機能を最速で動かすためのガイドです。

## 📋 前提条件

- Node.js 20以上がインストールされている
- CSS Dictionary Next.jsアプリが動作している（`http://localhost:3001`）
- Google Chrome または Chromiumベースのブラウザ

## ⚡ 5分で動かす

### ステップ1: URL設定（1分）

extension-templateフォルダで以下を実行：

```bash
cd extension-template

# macOS/Linux
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' background/background.js
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' content/content.js
sed -i '' 's|https://your-css-dictionary.com|http://localhost:3001|g' popup/popup.js

# Windows (PowerShell)
(Get-Content background/background.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content background/background.js
(Get-Content content/content.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content content/content.js
(Get-Content popup/popup.js) -replace 'https://your-css-dictionary.com', 'http://localhost:3001' | Set-Content popup/popup.js
```

### ステップ2: 拡張機能を読み込む（2分）

1. Chromeで `chrome://extensions/` を開く
2. 右上の「デベロッパーモード」を**ON**にする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `extension-template` フォルダを選択
5. 拡張機能が読み込まれる ✅

### ステップ3: 動作確認（2分）

1. **Next.jsアプリを起動**
   ```bash
   cd /path/to/css-dictionary-next
   npm run dev
   ```
   `http://localhost:3001` が開けることを確認

2. **適当なWebページを開く**
   - 例: https://example.com
   - または localhost:3001 自体でもOK

3. **拡張機能アイコンをクリック**
   - ツールバーの CSS Inspector アイコンをクリック
   - ポップアップが表示される

4. **要素を調査ボタンをクリック**
   - 「要素を調査」ボタンをクリック
   - カーソルが十字に変わる

5. **ページ上の要素をクリック**
   - 任意の要素をマウスオーバー → ハイライト表示される
   - クリック → CSSパネルが表示される ✅

6. **CSS Dictionaryで開く**
   - CSSパネル内の 📖 アイコンをクリック
   - CSS Dictionaryの該当プロパティページが新しいタブで開く ✅

## ✅ チェックリスト

動作確認が完了したら以下をチェック：

- [ ] ポップアップが正常に開く
- [ ] 「要素を調査」ボタンで要素選択モードが起動する
- [ ] 要素をマウスオーバーするとハイライト表示される
- [ ] 要素をクリックするとCSSパネルが表示される
- [ ] CSSパネルに正しいスタイル情報が表示される
- [ ] 📖 アイコンでCSS Dictionaryが開く
- [ ] 📋 アイコンでクリップボードにコピーできる
- [ ] Escキーでインスペクターモードを終了できる

## 🐛 うまく動かない場合

### 拡張機能が読み込めない

**エラー**: "マニフェストファイルが見つかりません"
- `extension-template` フォルダ直下に `manifest.json` があるか確認
- 正しいフォルダを選択しているか確認

**エラー**: "マニフェストファイルが不正です"
- `manifest.json` の構文エラーがないか確認
- JSONバリデーターで確認: https://jsonlint.com/

### ポップアップが開かない

1. `chrome://extensions/` でエラーを確認
2. 拡張機能の「詳細」→「ビュー: ポップアップ」をクリック
3. DevToolsでエラーメッセージを確認

### 要素を調査ボタンが反応しない

1. ページをリロード
2. `chrome://extensions/` で拡張機能を再読み込み
3. Content Scriptのエラーを確認:
   - ページ上で右クリック → 「検証」
   - Console タブでエラーを確認

### CSS Dictionaryが開かない

1. **URL設定を確認**
   ```bash
   grep "dictionaryUrl" background/background.js
   grep "dictionaryUrl" content/content.js
   ```
   `http://localhost:3001` が表示されればOK

2. **Next.jsアプリが起動しているか確認**
   ```bash
   curl http://localhost:3001
   ```
   HTMLが返ってくればOK

3. **DevToolsでエラーを確認**
   - 拡張機能のポップアップで右クリック → 「検証」
   - Consoleでエラーメッセージを確認

### ブラウザコンソールにエラーが出る

**エラー**: "Uncaught (in promise) Error: Could not establish connection"
- Content Scriptが正しく読み込まれているか確認
- ページをリロードしてみる

**エラー**: "Cannot access 'chrome.runtime'"
- manifest.json の permissions が正しく設定されているか確認

## 📚 次のステップ

### より詳しく知る

- **[README.md](./README.md)** - 機能の詳細説明
- **[CONFIGURATION.md](./CONFIGURATION.md)** - URL設定と環境別ビルド
- **[docs/browser-extension-guide.md](../docs/browser-extension-guide.md)** - 完全な実装ガイド

### アイコンを作成

開発段階ではアイコンなしでも動作しますが、見た目をよくするには：

- **[icons/README.md](./icons/README.md)** を参照してアイコンを作成

### カスタマイズ

- **content/content.css** - インスペクターのスタイルをカスタマイズ
- **popup/popup.css** - ポップアップのスタイルをカスタマイズ
- **manifest.json** - 拡張機能の設定をカスタマイズ

### 本番環境にデプロイ

- **[docs/browser-extension-guide.md](../docs/browser-extension-guide.md)** の「テストとデプロイ」セクションを参照
- Chrome Web Storeへの公開手順を確認

## 💡 開発のヒント

### 変更を反映する

コードを変更したら：

1. `chrome://extensions/` を開く
2. 拡張機能の「再読み込み」ボタンをクリック
3. 対象ページをリロード

### デバッグ方法

**ポップアップをデバッグ:**
1. 拡張機能アイコンを右クリック → 「ポップアップを検証」
2. DevToolsが開く

**Content Scriptをデバッグ:**
1. 対象ページで右クリック → 「検証」
2. Console タブで `console.log()` の出力を確認

**Background Scriptをデバッグ:**
1. `chrome://extensions/` を開く
2. 拡張機能の「詳細」→「バックグラウンドページ」をクリック
3. DevToolsが開く

### よく使うコマンド

```bash
# URL設定を元に戻す（本番用に戻す）
grep -rl "http://localhost:3001" . | xargs sed -i '' 's|http://localhost:3001|https://your-css-dictionary.com|g'

# 拡張機能をパッケージ化（配布用）
zip -r css-dictionary-inspector.zip extension-template/ -x "*.DS_Store" "*.backup" "*.log"
```

## 🎉 完了！

これで CSS Dictionary Inspector 拡張機能が動作するはずです！

問題がある場合は、[GitHub Issues](https://github.com/yourusername/css-dictionary-extension/issues) で報告してください。
