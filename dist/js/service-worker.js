const CACHE_NAME = 'app-cache';

const urlsToCache = [
  '/',
  '/css/styles.css',
  '/js/load-data.js',
  '/js/service-worker-controller.js',
  '/fonts/redemption.woff',
  '/images/fav/apple-touch-icon.png',
  '/images/fav/favicon-32x32.png',
  '/images/fav/favicon-16x16.png',
  '/images/fav/site.webmanifest',
  '/images/main-teaser.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(urlsToCache);
  });
});

self.addEventListener('fetch', (event) => {
  if (
    event.request.method === 'POST' ||
    event.request.url.includes('/get-notification')
  ) {
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const responseFromCaches = await cache.match(event.request);
    if (responseFromCaches) {
      return responseFromCaches;
    }
    const responseFromServer = await fetch(event.request);
    await cache.put(event.request.url, responseFromServer.clone());
    return responseFromServer;
  })());
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  self.registration.showNotification(data.title, {
    body: 'Howdy pardner!',
    icon: '/images/fav/android-chrome-384x384.png',
  });
});
