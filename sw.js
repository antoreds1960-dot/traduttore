### 2. File `sw.js` (aggiornato alla v3 per forzare la pulizia della vecchia cache)

```javascript
const CACHE = 'traduttore-offline-v3';
const FILES = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k !== CACHE && !k.includes('transformers') ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
