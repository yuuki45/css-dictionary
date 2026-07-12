// 自己破壊用Service Worker。
// 旧バージョンがキャッシュ対策目的でSWを登録していたため、
// 既存クライアントのSWを確実に解除するために当面残置する（数ヶ月後に削除予定）。
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
