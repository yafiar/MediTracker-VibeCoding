// Basic service worker scaffold for future push notification support.
// Currently it enables caching of static assets and acts as placeholder.

const CACHE_NAME = 'meditracker-static-v1';
const ASSETS = [
  '/',
  '/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith(
    caches.match(request).then(cached => cached || fetch(request))
  );
});

// Placeholder push event (future extension).
self.addEventListener('push', (event) => {
  if (!event.data) return;
  const data = event.data.json();
  const title = data.title || 'Medicine Reminder';
  const options = {
    body: data.body || 'Time to take your medicine',
    icon: '/favicon.ico'
  };
  event.waitUntil(self.registration.showNotification(title, options));
});
