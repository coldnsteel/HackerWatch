self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('hackerwatch-v1').then(cache => {
      return cache.addAll([
        '/index.html',
        '/academy.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
