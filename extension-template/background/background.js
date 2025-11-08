// background/background.js

// インストール時の初期化
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 初回インストール時
    console.log('CSS Dictionary Inspector installed!');

    // 初期設定
    chrome.storage.sync.set({
      settings: {
        autoOpenDictionary: false,
        showNotifications: true,
        dictionaryUrl: 'http://localhost:3001'
      }
    });

    // ウェルカムページを開く
    chrome.tabs.create({
      url: 'http://localhost:3001/welcome'
    });
  } else if (details.reason === 'update') {
    // アップデート時
    console.log('CSS Dictionary Inspector updated!');
  }
});

// Content ScriptやPopupからのメッセージを処理
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case 'addFavorite':
      handleAddFavorite(request.propertyId)
        .then(result => sendResponse(result))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true; // 非同期レスポンス

    case 'openDictionary':
      handleOpenDictionary()
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;

    case 'saveRecentProperty':
      handleSaveRecentProperty(request.property)
        .then(() => sendResponse({ success: true }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;

    case 'syncFavorites':
      handleSyncFavorites()
        .then(favorites => sendResponse({ success: true, favorites }))
        .catch(error => sendResponse({ success: false, error: error.message }));
      return true;

    default:
      sendResponse({ success: false, error: 'Unknown action' });
  }
});

// お気に入りに追加
async function handleAddFavorite(propertyId) {
  try {
    // ローカルストレージから既存のお気に入りを取得
    const data = await chrome.storage.sync.get(['favorites']);
    const favorites = data.favorites || [];

    // 既に存在する場合はスキップ
    if (favorites.includes(propertyId)) {
      return { success: true, message: 'Already in favorites' };
    }

    // 追加
    favorites.push(propertyId);
    await chrome.storage.sync.set({ favorites });

    // CSS Dictionary Webアプリと同期
    await syncWithWebApp('favorites', favorites);

    return { success: true, message: 'Added to favorites' };
  } catch (error) {
    console.error('Error adding favorite:', error);
    throw error;
  }
}

// CSS Dictionaryを開く
async function handleOpenDictionary() {
  const data = await chrome.storage.sync.get(['settings']);
  const dictionaryUrl = data.settings?.dictionaryUrl || 'http://localhost:3001';

  await chrome.tabs.create({ url: dictionaryUrl });
}

// 最近調査したプロパティを保存
async function handleSaveRecentProperty(property) {
  try {
    const data = await chrome.storage.local.get(['recentProperties']);
    let recentProperties = data.recentProperties || [];

    // 重複を削除
    recentProperties = recentProperties.filter(p => p.name !== property.name);

    // 新しいプロパティを先頭に追加
    recentProperties.unshift({
      name: property.name,
      timestamp: Date.now()
    });

    // 最大20件まで保持
    if (recentProperties.length > 20) {
      recentProperties = recentProperties.slice(0, 20);
    }

    await chrome.storage.local.set({ recentProperties });

    // Popupに通知
    chrome.runtime.sendMessage({ action: 'updateRecent' });

    return { success: true };
  } catch (error) {
    console.error('Error saving recent property:', error);
    throw error;
  }
}

// お気に入りを同期
async function handleSyncFavorites() {
  try {
    // 拡張機能のストレージから取得
    const extensionData = await chrome.storage.sync.get(['favorites']);
    const extensionFavorites = extensionData.favorites || [];

    // Webアプリのお気に入りを取得（LocalStorageをシミュレート）
    // 実際には、WebアプリのAPIを使用するか、
    // Content Scriptを通じてLocalStorageにアクセス
    const webAppFavorites = await getWebAppFavorites();

    // マージ（重複を削除）
    const mergedFavorites = [...new Set([...extensionFavorites, ...webAppFavorites])];

    // 両方に保存
    await chrome.storage.sync.set({ favorites: mergedFavorites });
    await syncWithWebApp('favorites', mergedFavorites);

    return mergedFavorites;
  } catch (error) {
    console.error('Error syncing favorites:', error);
    throw error;
  }
}

// WebアプリのLocalStorageからお気に入りを取得
async function getWebAppFavorites() {
  try {
    const [tab] = await chrome.tabs.query({
      url: 'http://localhost:3001/*'
    });

    if (!tab) {
      return [];
    }

    const result = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const favoritesStr = localStorage.getItem('favorites');
        return favoritesStr ? JSON.parse(favoritesStr) : [];
      }
    });

    return result[0]?.result || [];
  } catch (error) {
    console.log('Could not access web app favorites:', error);
    return [];
  }
}

// WebアプリのLocalStorageにデータを同期
async function syncWithWebApp(key, value) {
  try {
    const [tab] = await chrome.tabs.query({
      url: 'http://localhost:3001/*'
    });

    if (!tab) {
      console.log('CSS Dictionary is not open');
      return;
    }

    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (storageKey, storageValue) => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
      },
      args: [key, value]
    });

    console.log('Synced with web app successfully');
  } catch (error) {
    console.log('Could not sync with web app:', error);
  }
}

// コンテキストメニュー（右クリックメニュー）を追加
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'inspectElement',
    title: 'CSS Dictionaryで調査',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'inspectElement') {
    chrome.tabs.sendMessage(tab.id, { action: 'toggleInspector' });
  }
});

// アイコンクリック時のアクション
chrome.action.onClicked.addListener((tab) => {
  // Popupが開くので、ここでは何もしない
  // 将来的にショートカットキーでインスペクターを起動する場合はここに実装
});

// 定期的なお気に入り同期（5分ごと）
setInterval(async () => {
  try {
    await handleSyncFavorites();
    console.log('Auto-sync completed');
  } catch (error) {
    console.error('Auto-sync failed:', error);
  }
}, 5 * 60 * 1000); // 5分
