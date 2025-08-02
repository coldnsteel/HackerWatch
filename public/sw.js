self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('hackerwatch-v1').then(cache => {
      return cache.addAll([
        '/',
        '/public/status.json',
        '/public/intrusion-detection.js',
        '/public/HackerWatch_Manual.pdf',
        '/public/Kozmic_Kasino_Manual.pdf',
        '/public/Personal_Studio_Manual.pdf',
        '/public/Kozmic_RockandBlues_MasterConsole_Manual.pdf'
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
