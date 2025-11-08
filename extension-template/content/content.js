// content/content.js
// CSS Inspector - Content Script

class CSSInspector {
  constructor() {
    this.isActive = false;
    this.overlay = null;
    this.tooltip = null;
    this.panel = null;
    this.currentElement = null;
    this.boundHandlers = {
      mouseover: this.handleMouseOver.bind(this),
      mouseout: this.handleMouseOut.bind(this),
      click: this.handleClick.bind(this),
      keydown: this.handleKeyDown.bind(this)
    };
  }

  // インスペクターを起動
  activate() {
    if (this.isActive) return;
    this.isActive = true;

    // オーバーレイとツールチップを作成
    this.createOverlay();
    this.createTooltip();

    // イベントリスナーを追加
    document.addEventListener('mouseover', this.boundHandlers.mouseover, true);
    document.addEventListener('mouseout', this.boundHandlers.mouseout, true);
    document.addEventListener('click', this.boundHandlers.click, true);
    document.addEventListener('keydown', this.boundHandlers.keydown, true);

    // カーソルを変更
    document.body.style.cursor = 'crosshair';

    console.log('CSS Inspector activated');
  }

  // インスペクターを無効化
  deactivate() {
    if (!this.isActive) return;
    this.isActive = false;

    // イベントリスナーを削除
    document.removeEventListener('mouseover', this.boundHandlers.mouseover, true);
    document.removeEventListener('mouseout', this.boundHandlers.mouseout, true);
    document.removeEventListener('click', this.boundHandlers.click, true);
    document.removeEventListener('keydown', this.boundHandlers.keydown, true);

    // UI要素を削除（パネルは残す）
    this.removeOverlay();
    this.removeTooltip();
    // this.removePanel(); // パネルは表示したままにする

    // カーソルを元に戻す
    document.body.style.cursor = '';

    console.log('CSS Inspector deactivated');
  }

  // トグル
  toggle() {
    if (this.isActive) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  // オーバーレイを作成
  createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'css-inspector-overlay';
    document.body.appendChild(this.overlay);
  }

  // オーバーレイを削除
  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
  }

  // ツールチップを作成
  createTooltip() {
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'css-inspector-tooltip';
    document.body.appendChild(this.tooltip);
  }

  // ツールチップを削除
  removeTooltip() {
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  // マウスオーバーハンドラー
  handleMouseOver(event) {
    if (!this.isActive) return;

    event.preventDefault();
    event.stopPropagation();

    const element = event.target;

    // インスペクター自身の要素は無視
    if (this.isInspectorElement(element)) return;

    this.currentElement = element;

    // オーバーレイを更新
    this.updateOverlay(element);

    // ツールチップを更新
    this.updateTooltip(element, event);

  }

  // マウスアウトハンドラー
  handleMouseOut(event) {
    if (!this.isActive) return;

    event.preventDefault();
    event.stopPropagation();

    this.hideOverlay();
    this.hideTooltip();
  }

  // クリックハンドラー
  handleClick(event) {
    if (!this.isActive) return;

    event.preventDefault();
    event.stopPropagation();

    const element = event.target;

    // インスペクター自身の要素は無視
    if (this.isInspectorElement(element)) return;

    // CSS情報を表示
    this.showCSSPanel(element);
  }

  // キーボードハンドラー
  handleKeyDown(event) {
    if (!this.isActive) return;

    // Escキーでインスペクターを終了
    if (event.key === 'Escape') {
      event.preventDefault();
      this.deactivate();
    }
  }

  // オーバーレイを更新
  updateOverlay(element) {
    if (!this.overlay) return;

    const rect = element.getBoundingClientRect();
    this.overlay.style.display = 'block';
    this.overlay.style.top = `${rect.top + window.scrollY}px`;
    this.overlay.style.left = `${rect.left + window.scrollX}px`;
    this.overlay.style.width = `${rect.width}px`;
    this.overlay.style.height = `${rect.height}px`;
  }

  // オーバーレイを非表示
  hideOverlay() {
    if (this.overlay) {
      this.overlay.style.display = 'none';
    }
  }

  // ツールチップを更新
  updateTooltip(element, event) {
    if (!this.tooltip) return;

    const tagName = element.tagName.toLowerCase();
    // className が文字列でない場合（SVG要素など）に対応
    const classNameStr = typeof element.className === 'string'
      ? element.className
      : (element.className.baseVal || '');
    const className = classNameStr ? `.${classNameStr.split(' ').filter(c => c).join('.')}` : '';
    const id = element.id ? `#${element.id}` : '';

    this.tooltip.textContent = `${tagName}${id}${className}`;
    this.tooltip.style.display = 'block';
    this.tooltip.style.top = `${event.pageY + 10}px`;
    this.tooltip.style.left = `${event.pageX + 10}px`;
  }

  // ツールチップを非表示
  hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.display = 'none';
    }
  }

  // CSSパネルを表示
  showCSSPanel(element) {
    // 既存のパネルを削除
    this.removePanel();

    // パネルを作成
    this.panel = document.createElement('div');
    this.panel.className = 'css-inspector-panel';

    // インラインスタイルで確実に表示（CSSの競合を避ける）
    this.panel.style.cssText = `
      position: fixed !important;
      top: 50% !important;
      left: 50% !important;
      transform: translate(-50%, -50%) !important;
      width: 600px !important;
      max-width: 90vw !important;
      max-height: 80vh !important;
      background-color: #ffffff !important;
      border: none !important;
      border-radius: 12px !important;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5) !important;
      z-index: 2147483647 !important;
      overflow: auto !important;
      display: block !important;
      padding: 20px !important;
      opacity: 1 !important;
      visibility: visible !important;
      pointer-events: auto !important;
    `;

    // ヘッダー
    const header = this.createPanelHeader(element);
    this.panel.appendChild(header);

    // CSS情報
    const cssInfo = this.createCSSInfo(element);
    this.panel.appendChild(cssInfo);

    document.body.appendChild(this.panel);

    // インスペクターを無効化
    this.deactivate();
  }

  // パネルヘッダーを作成
  createPanelHeader(element) {
    const header = document.createElement('div');
    header.className = 'css-inspector-panel-header';

    const tagName = element.tagName.toLowerCase();
    // className が文字列でない場合（SVG要素など）に対応
    const classNameStr = typeof element.className === 'string'
      ? element.className
      : (element.className.baseVal || '');
    const className = classNameStr ? `.${classNameStr.split(' ').filter(c => c).join('.')}` : '';
    const id = element.id ? `#${element.id}` : '';

    const title = document.createElement('h3');
    title.textContent = `${tagName}${id}${className}`;
    header.appendChild(title);

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.className = 'css-inspector-close-btn';
    closeBtn.onclick = () => this.removePanel();
    header.appendChild(closeBtn);

    return header;
  }

  // CSS情報を作成
  createCSSInfo(element) {
    const container = document.createElement('div');
    container.className = 'css-inspector-info';

    const computedStyle = window.getComputedStyle(element);

    // プロパティのカテゴリー定義（マッピング用）
    const categoryMap = {
      // レイアウト
      'display': 'レイアウト', 'position': 'レイアウト', 'top': 'レイアウト', 'right': 'レイアウト',
      'bottom': 'レイアウト', 'left': 'レイアウト', 'z-index': 'レイアウト', 'float': 'レイアウト',
      'clear': 'レイアウト', 'overflow': 'レイアウト', 'overflow-x': 'レイアウト', 'overflow-y': 'レイアウト',
      'visibility': 'レイアウト', 'clip': 'レイアウト', 'clip-path': 'レイアウト',

      // サイズ
      'width': 'サイズ', 'height': 'サイズ', 'min-width': 'サイズ', 'min-height': 'サイズ',
      'max-width': 'サイズ', 'max-height': 'サイズ', 'box-sizing': 'サイズ',

      // マージン・パディング
      'margin': 'スペーシング', 'margin-top': 'スペーシング', 'margin-right': 'スペーシング',
      'margin-bottom': 'スペーシング', 'margin-left': 'スペーシング',
      'padding': 'スペーシング', 'padding-top': 'スペーシング', 'padding-right': 'スペーシング',
      'padding-bottom': 'スペーシング', 'padding-left': 'スペーシング',

      // ボーダー
      'border': 'ボーダー', 'border-width': 'ボーダー', 'border-style': 'ボーダー',
      'border-color': 'ボーダー', 'border-radius': 'ボーダー',
      'border-top': 'ボーダー', 'border-right': 'ボーダー', 'border-bottom': 'ボーダー', 'border-left': 'ボーダー',
      'border-top-width': 'ボーダー', 'border-right-width': 'ボーダー', 'border-bottom-width': 'ボーダー', 'border-left-width': 'ボーダー',
      'border-top-style': 'ボーダー', 'border-right-style': 'ボーダー', 'border-bottom-style': 'ボーダー', 'border-left-style': 'ボーダー',
      'border-top-color': 'ボーダー', 'border-right-color': 'ボーダー', 'border-bottom-color': 'ボーダー', 'border-left-color': 'ボーダー',
      'border-top-left-radius': 'ボーダー', 'border-top-right-radius': 'ボーダー',
      'border-bottom-right-radius': 'ボーダー', 'border-bottom-left-radius': 'ボーダー',
      'outline': 'ボーダー', 'outline-width': 'ボーダー', 'outline-style': 'ボーダー', 'outline-color': 'ボーダー', 'outline-offset': 'ボーダー',

      // テキスト
      'color': 'テキスト', 'font-size': 'テキスト', 'font-family': 'テキスト', 'font-weight': 'テキスト',
      'font-style': 'テキスト', 'line-height': 'テキスト', 'text-align': 'テキスト',
      'text-decoration': 'テキスト', 'text-transform': 'テキスト', 'letter-spacing': 'テキスト',
      'word-spacing': 'テキスト', 'white-space': 'テキスト', 'text-indent': 'テキスト',
      'text-shadow': 'テキスト', 'font-variant': 'テキスト', 'text-overflow': 'テキスト',
      'word-wrap': 'テキスト', 'word-break': 'テキスト', 'vertical-align': 'テキスト',

      // 背景
      'background': '背景', 'background-color': '背景', 'background-image': '背景',
      'background-size': '背景', 'background-position': '背景', 'background-repeat': '背景',
      'background-attachment': '背景', 'background-clip': '背景', 'background-origin': '背景',

      // Flexbox
      'flex-direction': 'Flexbox', 'flex-wrap': 'Flexbox', 'justify-content': 'Flexbox',
      'align-items': 'Flexbox', 'align-content': 'Flexbox', 'flex': 'Flexbox',
      'flex-grow': 'Flexbox', 'flex-shrink': 'Flexbox', 'flex-basis': 'Flexbox',
      'align-self': 'Flexbox', 'order': 'Flexbox',

      // Grid
      'grid-template-columns': 'Grid', 'grid-template-rows': 'Grid', 'grid-gap': 'Grid', 'gap': 'Grid',
      'grid-column': 'Grid', 'grid-row': 'Grid', 'grid-area': 'Grid',
      'grid-template-areas': 'Grid', 'grid-auto-columns': 'Grid', 'grid-auto-rows': 'Grid', 'grid-auto-flow': 'Grid',
      'column-gap': 'Grid', 'row-gap': 'Grid',

      // エフェクト
      'opacity': 'エフェクト', 'transform': 'エフェクト', 'transition': 'エフェクト',
      'animation': 'エフェクト', 'box-shadow': 'エフェクト', 'filter': 'エフェクト',
      'transform-origin': 'エフェクト', 'transition-property': 'エフェクト', 'transition-duration': 'エフェクト',
      'transition-timing-function': 'エフェクト', 'transition-delay': 'エフェクト',
      'animation-name': 'エフェクト', 'animation-duration': 'エフェクト', 'animation-timing-function': 'エフェクト',

      // その他
      'cursor': 'その他', 'pointer-events': 'その他', 'user-select': 'その他',
      'resize': 'その他', 'list-style': 'その他', 'list-style-type': 'その他',
      'table-layout': 'その他', 'border-collapse': 'その他', 'border-spacing': 'その他'
    };

    // デフォルト値や意味のない値を除外
    const skipValues = [
      'none', 'normal', 'auto', 'initial', 'inherit', 'unset',
      '0px', 'rgba(0, 0, 0, 0)', 'transparent', ''
    ];

    // すべてのプロパティを取得してカテゴリー別に分類
    const categorizedProps = {};

    for (let i = 0; i < computedStyle.length; i++) {
      const prop = computedStyle[i];
      const value = computedStyle.getPropertyValue(prop);

      // スキップする値をチェック
      if (skipValues.includes(value) || value.trim() === '') {
        continue;
      }

      // カテゴリーを決定
      const category = categoryMap[prop] || 'その他';

      if (!categorizedProps[category]) {
        categorizedProps[category] = [];
      }

      categorizedProps[category].push({ prop, value });
    }

    // カテゴリーの表示順序
    const categoryOrder = [
      'レイアウト', 'サイズ', 'スペーシング', 'ボーダー',
      'テキスト', '背景', 'Flexbox', 'Grid', 'エフェクト', 'その他'
    ];

    // 各カテゴリーのセクションを作成
    categoryOrder.forEach(categoryName => {
      const properties = categorizedProps[categoryName];
      if (!properties || properties.length === 0) return;

      const categorySection = document.createElement('div');
      categorySection.className = 'css-inspector-section';

      const categoryTitle = document.createElement('h4');
      categoryTitle.style.cursor = 'pointer';
      categoryTitle.style.userSelect = 'none';

      const propertyList = document.createElement('div');
      propertyList.className = 'css-inspector-property-list';

      // プロパティをアルファベット順にソート
      properties.sort((a, b) => a.prop.localeCompare(b.prop));

      properties.forEach(({ prop, value }) => {
        const propertyItem = this.createPropertyItem(prop, value);
        propertyList.appendChild(propertyItem);
      });

      // 折りたたみ機能
      categoryTitle.addEventListener('click', () => {
        if (propertyList.style.display === 'none') {
          propertyList.style.display = 'block';
          categoryTitle.textContent = `▼ ${categoryName} (${properties.length})`;
        } else {
          propertyList.style.display = 'none';
          categoryTitle.textContent = `▶ ${categoryName} (${properties.length})`;
        }
      });

      categoryTitle.textContent = `▼ ${categoryName} (${properties.length})`;
      categorySection.appendChild(categoryTitle);
      categorySection.appendChild(propertyList);
      container.appendChild(categorySection);
    });

    // セクション: ボックスモデル
    const boxSection = this.createBoxModelSection(element, computedStyle);
    container.insertBefore(boxSection, container.firstChild);

    return container;
  }

  // プロパティアイテムを作成
  createPropertyItem(property, value) {
    const item = document.createElement('div');
    item.className = 'css-inspector-property-item';

    const propName = document.createElement('span');
    propName.className = 'css-inspector-property-name';
    propName.textContent = property;

    const propValue = document.createElement('span');
    propValue.className = 'css-inspector-property-value';
    propValue.textContent = value;

    // CSS Dictionaryで開くボタン
    const openBtn = document.createElement('button');
    openBtn.className = 'css-inspector-open-btn';
    openBtn.textContent = '📖';
    openBtn.title = 'CSS Dictionaryで開く';
    openBtn.onclick = () => this.openInDictionary(property);

    // コピーボタン
    const copyBtn = document.createElement('button');
    copyBtn.className = 'css-inspector-copy-btn';
    copyBtn.textContent = '📋';
    copyBtn.title = 'コピー';
    copyBtn.onclick = () => this.copyToClipboard(`${property}: ${value};`);

    item.appendChild(propName);
    item.appendChild(propValue);
    item.appendChild(openBtn);
    item.appendChild(copyBtn);

    return item;
  }

  // ボックスモデルセクションを作成
  createBoxModelSection(element, computedStyle) {
    const section = document.createElement('div');
    section.className = 'css-inspector-section';

    const title = document.createElement('h4');
    title.textContent = 'ボックスモデル';
    section.appendChild(title);

    const boxModel = document.createElement('div');
    boxModel.className = 'css-inspector-box-model';

    const margin = this.getBoxValues(computedStyle, 'margin');
    const padding = this.getBoxValues(computedStyle, 'padding');
    const border = this.getBoxValues(computedStyle, 'border', 'width');

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    boxModel.innerHTML = `
      <div class="box-margin">
        <div class="box-label">margin</div>
        <div class="box-value">${margin.top} ${margin.right} ${margin.bottom} ${margin.left}</div>
        <div class="box-border">
          <div class="box-label">border</div>
          <div class="box-value">${border.top} ${border.right} ${border.bottom} ${border.left}</div>
          <div class="box-padding">
            <div class="box-label">padding</div>
            <div class="box-value">${padding.top} ${padding.right} ${padding.bottom} ${padding.left}</div>
            <div class="box-content">
              <div class="box-label">content</div>
              <div class="box-value">${width.toFixed(0)}×${height.toFixed(0)}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    section.appendChild(boxModel);
    return section;
  }

  // ボックスモデルの値を取得
  getBoxValues(computedStyle, property, suffix = '') {
    const sides = ['top', 'right', 'bottom', 'left'];
    const values = {};

    sides.forEach(side => {
      const prop = suffix
        ? `${property}-${side}-${suffix}`
        : `${property}-${side}`;
      const value = computedStyle.getPropertyValue(prop);
      values[side] = value || '0';
    });

    return values;
  }

  // パネルを削除
  removePanel() {
    if (this.panel) {
      this.panel.remove();
      this.panel = null;
    }
  }

  // CSS Dictionaryで開く
  async openInDictionary(property) {
    try {
      const data = await chrome.storage.sync.get(['settings']);
      const dictionaryUrl = data.settings?.dictionaryUrl || 'http://localhost:3001';

      // プロパティ名を正規化
      const propertyId = property.toLowerCase();

      // プロパティページのURLを構築
      const propertyPageUrl = `${dictionaryUrl}/property/${propertyId}`;

      // まずCSS Dictionaryに該当ページが存在するかチェック
      try {
        const response = await fetch(propertyPageUrl, { method: 'HEAD' });

        if (response.ok) {
          // ページが存在する場合はCSS Dictionaryで開く
          window.open(propertyPageUrl, '_blank');

          // 最近調査したプロパティに追加
          chrome.runtime.sendMessage({
            action: 'saveRecentProperty',
            property: { name: property }
          });
        } else {
          // 404の場合はMDN Web Docsで開く
          this.openInMDN(property);
        }
      } catch (fetchError) {
        // ネットワークエラーの場合はMDNにフォールバック
        console.log('Could not reach CSS Dictionary, opening MDN instead');
        this.openInMDN(property);
      }
    } catch (error) {
      console.error('Error opening dictionary:', error);
      // エラーの場合もMDNにフォールバック
      this.openInMDN(property);
    }
  }

  // MDN Web Docsで開く
  openInMDN(property) {
    const propertyId = property.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
    const mdnUrl = `https://developer.mozilla.org/ja/docs/Web/CSS/${propertyId}`;
    window.open(mdnUrl, '_blank');

    // 通知を表示
    this.showNotification(`${property} プロパティをMDNで開きました`);
  }

  // クリップボードにコピー
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      this.showNotification('コピーしました！');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      this.showNotification('コピーに失敗しました');
    }
  }

  // 通知を表示
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
    }, 2000);
  }

  // インスペクター要素かチェック
  isInspectorElement(element) {
    return element.classList.contains('css-inspector-overlay') ||
           element.classList.contains('css-inspector-tooltip') ||
           element.classList.contains('css-inspector-panel') ||
           element.closest('.css-inspector-panel') !== null;
  }
}

// インスタンスを作成
const inspector = new CSSInspector();

// Background ScriptやPopupからのメッセージを受信
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'toggleInspector') {
    inspector.toggle();
    sendResponse({ success: true, isActive: inspector.isActive });
  }
  return true;
});

// ページロード時にメッセージ
console.log('CSS Dictionary Inspector content script loaded');
