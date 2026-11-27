### File 2: `sw.js`
Copia questo codice e salvalo come `sw.js` nella **stessa cartella** di `index.html`:

```javascript
const CACHE = 'traduttore-offline-v2';
const FILES = [
  './',
  './index.html',
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.4.0'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});
