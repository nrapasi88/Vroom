const CACHE = 'car-sales-pro-v1';
const FILES = [
  '.',
  'index.html',
  'manifest.json',
  'assets/hellcat.png',
  'assets/srt.png'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request).catch(()=>caches.match('.')))
  );
});
