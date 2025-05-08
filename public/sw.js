// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE = "nenana-offline-v1";
// Update this version number when you want to force cache refresh
const VERSION = '1';

// Pre-cache important resources
const offlineResources = [
  '/',
  '/offline',
  '/manifest.json'
];

// Install stage: pre-cache the offline resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE + VERSION).then(function(cache) {
      return cache.addAll(offlineResources);
    }).then(function() {
      // Force new service worker to become active right away
      return self.skipWaiting();
    })
  );
});

// When the service worker is activated, clear old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE + VERSION) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    }).then(function() {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch handler to respond with cached content when possible
self.addEventListener('fetch', function(event) {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
          // Return cached version
          return cachedResponse;
        }

        // Otherwise, fetch from network
        return fetch(event.request).then(function(response) {
          // Return the network response
          return response;
        }).catch(function() {
          // If both cache and network fail, show offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/offline');
          }
          
          // Return empty response for non-HTML requests
          return new Response('', {
            status: 408,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
    );
  }
});

// Listen for the skipWaiting message
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
