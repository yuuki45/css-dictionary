# ブラウザ拡張機能 実装ガイド

## 概要

CSS Dictionary Inspector - WebページからCSSを学習できるChrome/Firefox拡張機能の完全実装ガイドです。

## プロジェクト構造

```
css-dictionary-extension/
├── manifest.json           # 拡張機能の設定ファイル
├── icons/                  # アイコン画像
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── popup/                  # ポップアップUI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── content/                # コンテンツスクリプト
│   ├── content.js
│   └── content.css
├── background/             # バックグラウンドスクリプト
│   └── background.js
├── lib/                    # 共通ライブラリ
│   ├── storage.js
│   └── api.js
└── assets/                 # その他アセット
    └── styles.css
```

## 実装手順

### フェーズ1: 基本セットアップ（1日目）

#### 1-1. プロジェクト作成
```bash
mkdir css-dictionary-extension
cd css-dictionary-extension
mkdir icons popup content background lib assets
```

#### 1-2. manifest.json作成
```json
{
  "manifest_version": 3,
  "name": "CSS Dictionary Inspector",
  "version": "1.0.0",
  "description": "Webページ上でCSSを調べて学習できる拡張機能",
  "permissions": [
    "activeTab",
    "storage",
    "scripting"
  ],
  "host_permissions": [
    "<all_urls>"
  ],
  "action": {
    "default_popup": "popup/popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content/content.js"],
      "css": ["content/content.css"],
      "run_at": "document_idle"
    }
  ],
  "background": {
    "service_worker": "background/background.js"
  },
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "web_accessible_resources": [
    {
      "resources": ["assets/*"],
      "matches": ["<all_urls>"]
    }
  ]
}
```

### フェーズ2: コンテンツスクリプト実装（2-3日目）

#### 2-1. content.js - 要素選択機能
```javascript
// content/content.js

class CSSInspector {
  constructor() {
    this.isActive = false;
    this.selectedElement = null;
    this.overlay = null;
    this.tooltip = null;
    this.setupListeners();
  }

  setupListeners() {
    // バックグラウンドからのメッセージを受信
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'toggleInspector') {
        this.toggle();
        sendResponse({ success: true, active: this.isActive });
      }
      return true;
    });
  }

  toggle() {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  activate() {
    document.addEventListener('mouseover', this.handleMouseOver);
    document.addEventListener('mouseout', this.handleMouseOut);
    document.addEventListener('click', this.handleClick);
    document.body.style.cursor = 'crosshair';

    this.showNotification('要素選択モード: 調べたい要素をクリックしてください');
  }

  deactivate() {
    document.removeEventListener('mouseover', this.handleMouseOver);
    document.removeEventListener('mouseout', this.handleMouseOut);
    document.removeEventListener('click', this.handleClick);
    document.body.style.cursor = '';

    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }

    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  handleMouseOver = (e) => {
    if (!this.isActive) return;

    e.stopPropagation();
    const element = e.target;

    // オーバーレイを表示
    this.highlightElement(element);

    // ツールチップを表示
    this.showTooltip(element, e);
  }

  handleMouseOut = (e) => {
    if (!this.isActive) return;

    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }

    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  handleClick = (e) => {
    if (!this.isActive) return;

    e.preventDefault();
    e.stopPropagation();

    this.selectedElement = e.target;
    this.deactivate();
    this.analyzeElement(this.selectedElement);
  }

  highlightElement(element) {
    const rect = element.getBoundingClientRect();

    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'css-inspector-overlay';
      document.body.appendChild(this.overlay);
    }

    this.overlay.style.top = `${rect.top + window.scrollY}px`;
    this.overlay.style.left = `${rect.left + window.scrollX}px`;
    this.overlay.style.width = `${rect.width}px`;
    this.overlay.style.height = `${rect.height}px`;
  }

  showTooltip(element, event) {
    const tagName = element.tagName.toLowerCase();
    const className = element.className ? `.${element.className.split(' ')[0]}` : '';
    const id = element.id ? `#${element.id}` : '';

    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'css-inspector-tooltip';
      document.body.appendChild(this.tooltip);
    }

    this.tooltip.textContent = `${tagName}${id}${className}`;
    this.tooltip.style.top = `${event.pageY + 10}px`;
    this.tooltip.style.left = `${event.pageX + 10}px`;
  }

  analyzeElement(element) {
    const styles = window.getComputedStyle(element);

    // 重要なCSSプロパティを抽出
    const importantProps = [
      'display', 'position', 'top', 'right', 'bottom', 'left',
      'flex-direction', 'justify-content', 'align-items', 'gap',
      'grid-template-columns', 'grid-template-rows',
      'width', 'height', 'max-width', 'max-height',
      'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
      'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
      'background', 'background-color', 'background-image',
      'color', 'font-size', 'font-weight', 'font-family',
      'border', 'border-radius',
      'box-shadow', 'text-shadow',
      'transform', 'transition', 'animation',
      'opacity', 'z-index', 'overflow'
    ];

    const cssData = {};
    importantProps.forEach(prop => {
      const value = styles.getPropertyValue(prop);
      // デフォルト値や空の値をスキップ
      if (value &&
          value !== 'none' &&
          value !== 'normal' &&
          value !== 'auto' &&
          value !== 'rgba(0, 0, 0, 0)' &&
          value !== '0px') {
        cssData[prop] = value;
      }
    });

    // 要素情報
    const elementInfo = {
      tag: element.tagName.toLowerCase(),
      id: element.id,
      classes: Array.from(element.classList),
      css: cssData
    };

    this.showCSSPanel(elementInfo);
  }

  showCSSPanel(elementInfo) {
    // 既存のパネルを削除
    const existingPanel = document.querySelector('.css-inspector-panel');
    if (existingPanel) {
      existingPanel.remove();
    }

    // パネルを作成
    const panel = document.createElement('div');
    panel.className = 'css-inspector-panel';

    const header = `
      <div class="panel-header">
        <div class="panel-title">
          <span class="icon">📊</span>
          <h3>CSS Properties</h3>
        </div>
        <div class="element-info">
          <span class="tag">&lt;${elementInfo.tag}&gt;</span>
          ${elementInfo.id ? `<span class="id">#${elementInfo.id}</span>` : ''}
          ${elementInfo.classes.length ? `<span class="class">.${elementInfo.classes.join('.')}</span>` : ''}
        </div>
        <button class="close-btn" title="閉じる">×</button>
      </div>
    `;

    const cssEntries = Object.entries(elementInfo.css)
      .map(([prop, value]) => `
        <div class="css-property">
          <div class="prop-info">
            <span class="prop-name">${prop}:</span>
            <span class="prop-value">${this.truncateValue(value)}</span>
          </div>
          <div class="prop-actions">
            <button class="action-btn learn-btn" data-prop="${prop}" title="詳細を見る">
              📖
            </button>
            <button class="action-btn copy-btn" data-value="${this.escapeHtml(prop + ': ' + value)}" title="コピー">
              📋
            </button>
            <button class="action-btn fav-btn" data-prop="${prop}" title="お気に入り">
              ⭐
            </button>
          </div>
        </div>
      `).join('');

    const footer = `
      <div class="panel-footer">
        <button class="footer-btn copy-all-btn">すべてコピー</button>
        <button class="footer-btn open-dictionary-btn">CSS Dictionaryで開く</button>
      </div>
    `;

    panel.innerHTML = header + `<div class="panel-content">${cssEntries}</div>` + footer;
    document.body.appendChild(panel);

    this.attachPanelListeners(panel, elementInfo);
  }

  attachPanelListeners(panel, elementInfo) {
    // 閉じるボタン
    panel.querySelector('.close-btn').addEventListener('click', () => {
      panel.remove();
    });

    // 詳細ボタン
    panel.querySelectorAll('.learn-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prop = e.currentTarget.dataset.prop;
        this.openPropertyPage(prop);
      });
    });

    // コピーボタン
    panel.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const value = e.currentTarget.dataset.value;
        this.copyToClipboard(value);
        e.currentTarget.textContent = '✅';
        setTimeout(() => {
          e.currentTarget.textContent = '📋';
        }, 1000);
      });
    });

    // お気に入りボタン
    panel.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prop = e.currentTarget.dataset.prop;
        this.addToFavorites(prop);
        e.currentTarget.textContent = '✅';
        setTimeout(() => {
          e.currentTarget.textContent = '⭐';
        }, 1000);
      });
    });

    // すべてコピー
    panel.querySelector('.copy-all-btn').addEventListener('click', () => {
      const cssText = Object.entries(elementInfo.css)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join('\n');
      this.copyToClipboard(cssText);
      this.showNotification('CSSをコピーしました！');
    });

    // CSS Dictionary で開く
    panel.querySelector('.open-dictionary-btn').addEventListener('click', () => {
      chrome.runtime.sendMessage({
        action: 'openDictionary'
      });
    });
  }

  openPropertyPage(propertyName) {
    const baseUrl = 'https://your-css-dictionary.com'; // 本番環境のURL
    // const baseUrl = 'http://localhost:3001'; // 開発環境
    window.open(`${baseUrl}/property/${propertyName}`, '_blank');
  }

  addToFavorites(propertyId) {
    chrome.runtime.sendMessage({
      action: 'addFavorite',
      propertyId: propertyId
    }, (response) => {
      if (response.success) {
        this.showNotification(`${propertyId}をお気に入りに追加しました`);
      }
    });
  }

  copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  truncateValue(value, maxLength = 50) {
    if (value.length <= maxLength) return value;
    return value.substring(0, maxLength) + '...';
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'css-inspector-notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// インスタンスを作成
const inspector = new CSSInspector();
```

#### 2-2. content.css - スタイリング
```css
/* content/content.css */

.css-inspector-overlay {
  position: absolute;
  border: 2px solid #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  pointer-events: none;
  z-index: 999999;
  transition: all 0.1s ease;
}

.css-inspector-tooltip {
  position: absolute;
  background: #1f2937;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  pointer-events: none;
  z-index: 1000000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.css-inspector-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 400px;
  max-height: 80vh;
  background: white;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
  z-index: 1000001;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.panel-header {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.panel-title .icon {
  font-size: 20px;
}

.panel-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.element-info {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  font-size: 12px;
  font-family: monospace;
}

.element-info .tag {
  background: #dbeafe;
  color: #1e40af;
  padding: 2px 6px;
  border-radius: 4px;
}

.element-info .id {
  background: #fef3c7;
  color: #92400e;
  padding: 2px 6px;
  border-radius: 4px;
}

.element-info .class {
  background: #d1fae5;
  color: #065f46;
  padding: 2px 6px;
  border-radius: 4px;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.close-btn:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
}

.css-property {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  margin-bottom: 4px;
  border-radius: 6px;
  transition: background 0.2s;
}

.css-property:hover {
  background: #f9fafb;
}

.prop-info {
  flex: 1;
  min-width: 0;
}

.prop-name {
  font-family: monospace;
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.prop-value {
  font-family: monospace;
  font-size: 13px;
  color: #1f2937;
  margin-left: 8px;
  word-break: break-all;
}

.prop-actions {
  display: flex;
  gap: 4px;
  margin-left: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #e5e7eb;
  transform: scale(1.05);
}

.panel-footer {
  padding: 12px 16px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  gap: 8px;
}

.footer-btn {
  flex: 1;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-all-btn {
  background: #f3f4f6;
  color: #374151;
}

.copy-all-btn:hover {
  background: #e5e7eb;
}

.open-dictionary-btn {
  background: #3b82f6;
  color: white;
}

.open-dictionary-btn:hover {
  background: #2563eb;
}

.css-inspector-notification {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: #1f2937;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000002;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.3s ease;
}

.css-inspector-notification.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

/* スクロールバーのスタイリング */
.panel-content::-webkit-scrollbar {
  width: 8px;
}

.panel-content::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 4px;
}

.panel-content::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
```

## テスト方法

### ローカルテスト

#### 1. 拡張機能の読み込み

```bash
# Chromeを開く
chrome://extensions/

# デベロッパーモードを有効化（右上）
# 「パッケージ化されていない拡張機能を読み込む」をクリック
# extension-templateフォルダを選択
```

#### 2. 機能テスト

**要素選択のテスト:**
1. 任意のWebページを開く
2. 拡張機能アイコンをクリック
3. 「要素を調査」ボタンをクリック
4. ページ上の要素をマウスオーバー → ハイライトされるか確認
5. 要素をクリック → CSSパネルが表示されるか確認

**お気に入りのテスト:**
1. CSSパネルで⭐アイコンをクリック
2. chrome.storage を確認:
```javascript
// DevToolsのConsoleで
chrome.storage.sync.get(['favorites'], (data) => {
  console.log(data.favorites);
});
```

**同期のテスト:**
1. CSS Dictionary Webアプリを開く
2. お気に入りを追加
3. 拡張機能のポップアップを開く
4. 最近のプロパティが表示されるか確認

### デバッグ方法

#### Content Scriptのデバッグ

```bash
# Webページ上で右クリック → 「検証」
# Consoleタブでエラーを確認
# Sourcesタブで content.js にブレークポイントを設定
```

#### Popupのデバッグ

```bash
# 拡張機能アイコンを右クリック → 「ポップアップを検証」
# または chrome://extensions/ → 詳細 → ビュー: popup.html
```

#### Background Scriptのデバッグ

```bash
# chrome://extensions/ → 詳細 → Service Worker → 検証
```

## デプロイ手順

### Chrome Web Storeへの公開

#### 準備

1. **アイコンの作成**
```bash
# 必要なサイズ: 16x16, 48x48, 128x128
# PNG形式、透明背景推奨
# Figma, Canvaなどで作成
```

2. **スクリーンショットの準備**
- サイズ: 1280x800 または 640x400
- 形式: PNG or JPEG
- 枚数: 最低1枚、推奨3-5枚

3. **プロモーション用画像（オプション）**
- 小: 440x280
- 大: 920x680
- マーキー: 1400x560

#### 公開プロセス

**Step 1: デベロッパー登録**
```
1. Chrome Web Store Developer Dashboard にアクセス
   https://chrome.google.com/webstore/devconsole

2. Googleアカウントでログイン

3. 登録料 $5 を支払い（一度のみ）
```

**Step 2: 拡張機能のパッケージ化**
```bash
# extension-templateフォルダをZIPに圧縮
cd extension-template
zip -r css-dictionary-inspector.zip .

# または手動で：
# フォルダを右クリック → 圧縮
# manifest.jsonがZIPのルートにあることを確認
```

**Step 3: アップロード**
```
1. Developer Dashboardで「新しいアイテム」をクリック
2. ZIPファイルをアップロード
3. ストアの掲載情報を入力:
   - 名前: CSS Dictionary Inspector
   - 簡単な説明: WebページからCSSを学習
   - 詳細な説明: (機能の詳細)
   - カテゴリ: Developer Tools
   - 言語: 日本語
4. スクリーンショットをアップロード
5. プライバシーポリシー URL（必須）
6. プロモーション用画像（オプション）
```

**Step 4: 審査・公開**
```
1. 「公開」をクリック
2. 審査待ち（通常1-3営業日）
3. 承認されたら自動的に公開
```

### プライバシーポリシー

拡張機能には**プライバシーポリシーが必須**です。

**例（privacy-policy.md）:**

```markdown
# Privacy Policy for CSS Dictionary Inspector

## データ収集
この拡張機能は以下のデータを収集します：
- お気に入りに追加したCSSプロパティ
- 最近調査したプロパティの履歴
- 拡張機能の設定

## データの使用
収集したデータは以下の目的でのみ使用されます：
- 拡張機能の機能提供
- ユーザー体験の向上

## データの共有
収集したデータは第三者と共有されません。

## データの保存
全てのデータはローカル（chrome.storage）に保存され、
クラウドには送信されません。

## お問い合わせ
your-email@example.com
```

このファイルをGitHub Pagesなどで公開し、URLを登録します。

### Firefox Add-onsへの公開

#### Firefox用の修正

**manifest.json の互換性調整:**
```json
{
  "manifest_version": 2,
  "browser_specific_settings": {
    "gecko": {
      "id": "css-dictionary-inspector@yourdomain.com",
      "strict_min_version": "109.0"
    }
  }
}
```

#### 公開手順

```
1. Firefox Add-on Developer Hub にアクセス
   https://addons.mozilla.org/developers/

2. 「Submit a New Add-on」をクリック

3. ZIPファイルをアップロード

4. 審査（通常1-2週間）

5. 承認後、公開
```

### バージョン管理

新しいバージョンをリリースする際：

```json
// manifest.json
{
  "version": "1.1.0",  // セマンティックバージョニング
  "version_name": "1.1.0 - New Features"
}
```

**バージョン番号の規則:**
- メジャー.マイナー.パッチ
- メジャー: 大きな変更、破壊的変更
- マイナー: 新機能追加
- パッチ: バグ修正

## 運用とメンテナンス

### ユーザーフィードバックの収集

```javascript
// Google Analyticsの統合（オプション）
// background.js に追加

const GA_TRACKING_ID = 'UA-XXXXX-Y';

function trackEvent(category, action, label) {
  fetch(`https://www.google-analytics.com/collect`, {
    method: 'POST',
    body: new URLSearchParams({
      v: '1',
      tid: GA_TRACKING_ID,
      cid: 'unique-client-id',
      t: 'event',
      ec: category,
      ea: action,
      el: label
    })
  });
}

// 使用例
trackEvent('Extension', 'Inspector Activated', 'Button Click');
```

### エラーレポート

```javascript
// エラーを収集
chrome.runtime.onError.addListener((error) => {
  // エラーログをサーバーに送信
  fetch('https://your-api.com/errors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      error: error.message,
      stack: error.stack,
      version: chrome.runtime.getManifest().version
    })
  });
});
```

### 自動更新

Chrome Web Storeに新しいバージョンをアップロードすると、
ユーザーの拡張機能は**自動的に更新**されます。

更新内容を通知する場合：

```javascript
// background.js
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'update') {
    const thisVersion = chrome.runtime.getManifest().version;
    console.log(`Updated to version ${thisVersion}`);

    // 更新情報ページを開く（オプション）
    chrome.tabs.create({
      url: `https://your-css-dictionary.com/extension/updates?v=${thisVersion}`
    });
  }
});
```

## よくある質問（FAQ）

### Q: Content Security Policyで動作しないサイトがある

**A:** 一部のサイト（GitHub、Google等）は厳格なCSPを使用しています。
manifest.jsonに以下を追加：

```json
{
  "content_security_policy": {
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}
```

### Q: ローカルファイル（file://）で動作しない

**A:** Chromeの拡張機能設定で「ファイルのURLへのアクセスを許可する」を有効化してください。

### Q: お気に入りが消えた

**A:** chrome.storage.syncは制限があります：
- 最大100KB
- 最大512アイテム
- アイテムあたり最大8KB

制限を超える場合は chrome.storage.local を使用してください。

## 次のステップ

### 機能追加のアイデア

1. **CSS Linter統合**
   - 不適切なCSSを検出
   - ベストプラクティスの提案

2. **パフォーマンス分析**
   - レンダリングブロックするCSSを検出
   - 最適化の提案

3. **ダークパターン検出**
   - アクセシビリティの問題を指摘
   - WCAG準拠チェック

4. **スニペット保存**
   - 便利なCSSパターンを保存
   - チーム間で共有

5. **AIによるCSS提案**
   - 自然言語でCSS生成
   - コードの改善提案

### コミュニティ構築

- Discord サーバーの開設
- GitHub Discussions の活用
- ユーザー投稿のテクニック集

## まとめ

このガイドに従えば、完全に機能するブラウザ拡張機能を作成できます。

**実装の順序:**
1. ✅ 基本セットアップ（manifest.json）
2. ✅ Content Script（要素選択）
3. ✅ Popup UI（設定画面）
4. ✅ Background Script（お気に入り同期）
5. ✅ テスト
6. ✅ デプロイ

**開発時間の目安:**
- 基本機能: 1週間
- テスト・調整: 3-5日
- デザイン: 2-3日
- ドキュメント: 1-2日
**合計: 2-3週間**

ご質問があれば、いつでもお聞きください！

## 参考リンク

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Firefox Extension Workshop](https://extensionworkshop.com/)
- [MDN Web Extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)

### フェーズ3: ポップアップUI実装（3-4日目）

#### 3-1. popup.html
```html
<!-- popup/popup.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Dictionary Inspector</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="popup-container">
    <header class="popup-header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">📖</span>
          <h1 class="logo-text">CSS Inspector</h1>
        </div>
        <div class="version">v1.0.0</div>
      </div>
    </header>

    <main class="popup-main">
      <!-- インスペクターボタン -->
      <section class="inspector-section">
        <button id="toggleInspectorBtn" class="inspector-btn">
          <span class="btn-icon">🔍</span>
          <span class="btn-text">要素を調査</span>
        </button>
        <p class="inspector-hint">
          クリックして、Webページ上の要素を選択してください
        </p>
      </section>

      <!-- クイックアクセス -->
      <section class="quick-access-section">
        <h2 class="section-title">クイックアクセス</h2>
        <div class="quick-links">
          <a href="#" id="openDictionaryBtn" class="quick-link">
            <span class="link-icon">🏠</span>
            <span class="link-text">CSS Dictionary</span>
          </a>
          <a href="#" id="openFavoritesBtn" class="quick-link">
            <span class="link-icon">⭐</span>
            <span class="link-text">お気に入り</span>
          </a>
          <a href="#" id="openHistoryBtn" class="quick-link">
            <span class="link-icon">🕐</span>
            <span class="link-text">履歴</span>
          </a>
        </div>
      </section>

      <!-- 最近調査したプロパティ -->
      <section class="recent-section">
        <h2 class="section-title">最近調査したプロパティ</h2>
        <div id="recentPropertiesList" class="recent-list">
          <p class="empty-message">まだ調査したプロパティがありません</p>
        </div>
      </section>

      <!-- 設定 -->
      <section class="settings-section">
        <h2 class="section-title">設定</h2>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" id="autoOpenDictionary" class="setting-checkbox">
            <span>自動的にCSS Dictionaryで開く</span>
          </label>
        </div>
        <div class="setting-item">
          <label class="setting-label">
            <input type="checkbox" id="showNotifications" class="setting-checkbox" checked>
            <span>通知を表示</span>
          </label>
        </div>
      </section>
    </main>

    <footer class="popup-footer">
      <a href="https://github.com/yourusername/css-dictionary-extension" target="_blank" class="footer-link">
        GitHub
      </a>
      <a href="#" id="helpBtn" class="footer-link">
        ヘルプ
      </a>
    </footer>
  </div>

  <script src="popup.js"></script>
</body>
</html>
```

続きは次のメッセージで提供します。このガイドは非常に長いので、段階的に提供しますね。