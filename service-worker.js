var CACHE_NAME = "hacksussex-cache-v0.1.0";
var urlsToCache = [
  "./",
  "/index.html",
  "/styles/style.css",
  "/favicon.ico",
  "/browserconfig.xml",
  "/manifest.json",
  "/fonts/Quicksand/Quicksand-Bold.eot",
  "/fonts/Quicksand/Quicksand-Bold.woff2",
  "/fonts/Quicksand/Quicksand-Bold.woff",
  "/fonts/Quicksand/Quicksand-Bold.ttf",
  "/fonts/Quicksand/Quicksand-Bold.svg"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if(CACHE_NAME != cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});