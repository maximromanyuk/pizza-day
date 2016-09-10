const cacheName = 'pizzaDay-pwa';
const filesToCache = [
 '../imports/ui/layouts/master_layout.html'
];

self.addEventListener('install', function(e) {
 console.log('[ServiceWorker] Install');
 e.waitUntil(
  caches.open(cacheName).then(function(cache) {
   console.log('[ServiceWorker] Caching app shell');
   return cache.addAll(filesToCache);
  })
 );
});

self.addEventListener('fetch', function(e) {
 console.log(e.request.url);
 e.respondWith(
  caches.match(e.request).then(function(response) {
   return response || fetch(e.request);
  })
 );
});
