const CACHE_NAME = 'app-cache';

const urlsToCache = [
  '/css/styles.css',
  '/js/load-data.js',
  '/js/main.js',
  '/fonts/redemption.woff',
  '/images/fav/apple-touch-icon.png',
  '/images/fav/favicon-32x32.png',
  '/images/fav/favicon-16x16.png',
  '/images/fav/site.webmanifest',
  '/images/main-teaser.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache
        .match(event.request)
        .then((response) => {
          if (!response) {
            throw new Error(`${event.request} not found in cache`);
          }

          return response;
        })
        .catch(() => {
          return fetch(event.request).then((response) => {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
    })
  );
});