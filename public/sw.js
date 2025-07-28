// Service Worker for cache busting
const CACHE_NAME = 'css-dictionary-v' + Date.now();

self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    // Delete all old caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Take control of all clients immediately
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  // Always fetch from network, never from cache
  event.respondWith(
    fetch(event.request.clone()).catch(() => {
      // Fallback for offline
      return caches.match(event.request);
    })
  );
});