// popup/popup.js

document.addEventListener('DOMContentLoaded', init);

async function init() {
  // 設定を読み込み
  const settings = await loadSettings();
  applySettings(settings);

  // イベントリスナーを設定
  setupEventListeners();

  // 最近のプロパティを表示
  displayRecentProperties();

  // インスペクターの状態を確認
  checkInspectorState();
}

function setupEventListeners() {
  // インスペクターボタン
  document.getElementById('toggleInspectorBtn').addEventListener('click', toggleInspector);

  // クイックリンク
  document.getElementById('openDictionaryBtn').addEventListener('click', () => {
    openURL('http://localhost:3001');
  });

  document.getElementById('openFavoritesBtn').addEventListener('click', () => {
    openURL('http://localhost:3001/favorites');
  });

  document.getElementById('openHistoryBtn').addEventListener('click', () => {
    displayHistory();
  });

  // 設定
  document.getElementById('autoOpenDictionary').addEventListener('change', (e) => {
    saveSetting('autoOpenDictionary', e.target.checked);
  });

  document.getElementById('showNotifications').addEventListener('change', (e) => {
    saveSetting('showNotifications', e.target.checked);
  });

  // ヘルプ
  document.getElementById('helpBtn').addEventListener('click', (e) => {
    e.preventDefault();
    showHelp();
  });
}

async function toggleInspector() {
  const btn = document.getElementById('toggleInspectorBtn');

  try {
    // アクティブなタブを取得
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // chrome:// や edge:// などの特殊なページではcontent scriptが動作しない
    if (tab.url && (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://') || tab.url.startsWith('about:'))) {
      showError('このページでは拡張機能を使用できません');
      return;
    }

    // Content Scriptにメッセージを送信
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: 'toggleInspector'
    }).catch(async (error) => {
      // Content scriptがまだロードされていない場合、再読み込みを促す
      if (error.message && error.message.includes('Could not establish connection')) {
        // ページをリロードしてcontent scriptを注入
        await chrome.tabs.reload(tab.id);
        // 少し待ってから再試行
        await new Promise(resolve => setTimeout(resolve, 1000));
        return await chrome.tabs.sendMessage(tab.id, { action: 'toggleInspector' });
      }
      throw error;
    });

    if (response && response.isActive) {
      btn.classList.add('active');
      btn.querySelector('.btn-text').textContent = 'インスペクター有効';
    } else {
      btn.classList.remove('active');
      btn.querySelector('.btn-text').textContent = '要素を調査';
    }

    // ポップアップを閉じる
    setTimeout(() => window.close(), 300);
  } catch (error) {
    console.error('Error toggling inspector:', error);
    showError('インスペクターを起動できませんでした。ページをリロードして再度お試しください。');
  }
}

async function checkInspectorState() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: 'getInspectorState'
    });

    const btn = document.getElementById('toggleInspectorBtn');
    if (response && response.active) {
      btn.classList.add('active');
      btn.querySelector('.btn-text').textContent = 'インスペクター有効';
    }
  } catch (error) {
    // Content Scriptがまだ注入されていない可能性がある
    console.log('Inspector not yet initialized');
  }
}

async function displayRecentProperties() {
  const recentList = document.getElementById('recentPropertiesList');

  try {
    const data = await chrome.storage.local.get(['recentProperties']);
    const properties = data.recentProperties || [];

    if (properties.length === 0) {
      recentList.innerHTML = '<p class="empty-message">まだ調査したプロパティがありません</p>';
      return;
    }

    recentList.innerHTML = properties
      .slice(0, 5)
      .map(prop => `
        <div class="recent-item" data-prop="${prop.name}">
          <span class="recent-prop">${prop.name}</span>
          <span class="recent-time">${formatTime(prop.timestamp)}</span>
        </div>
      `)
      .join('');

    // クリックイベント
    recentList.querySelectorAll('.recent-item').forEach(item => {
      item.addEventListener('click', () => {
        const propName = item.dataset.prop;
        openURL(`http://localhost:3001/property/${propName}`);
      });
    });
  } catch (error) {
    console.error('Error loading recent properties:', error);
  }
}

async function loadSettings() {
  const data = await chrome.storage.sync.get(['settings']);
  return data.settings || {
    autoOpenDictionary: false,
    showNotifications: true
  };
}

function applySettings(settings) {
  document.getElementById('autoOpenDictionary').checked = settings.autoOpenDictionary;
  document.getElementById('showNotifications').checked = settings.showNotifications;
}

async function saveSetting(key, value) {
  const data = await chrome.storage.sync.get(['settings']);
  const settings = data.settings || {};
  settings[key] = value;
  await chrome.storage.sync.set({ settings });
}

function openURL(url) {
  chrome.tabs.create({ url });
  window.close();
}

function formatTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'たった今';
  if (minutes < 60) return `${minutes}分前`;
  if (hours < 24) return `${hours}時間前`;
  return `${days}日前`;
}

function displayHistory() {
  // 履歴表示機能（将来的に実装）
  alert('履歴機能は近日公開予定です');
}

function showHelp() {
  const helpMessage = `
CSS Dictionary Inspector の使い方:

1. 「要素を調査」ボタンをクリック
2. Webページ上の要素をクリック
3. CSSプロパティが表示されます
4. 📖アイコンで詳細を確認
5. ⭐アイコンでお気に入りに追加

ショートカット:
- Ctrl+Shift+I (Windows/Linux)
- Cmd+Shift+I (Mac)

問題が発生した場合:
- ページをリロードしてください
- それでも解決しない場合はGitHubで報告してください
  `;

  alert(helpMessage);
}

function showError(message) {
  alert(`エラー: ${message}`);
}

// Background Scriptとの通信
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateRecent') {
    displayRecentProperties();
  }
});
