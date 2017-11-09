var CACHE_NAME = "hacksussex-cache-v0.0.2";
var urlsToCache = [
  "./",
  "/index.html",
  "/schedule.html",
  "/faq.html",
  "/tracks-challenges.html",
  "/sponsors.html",
  "/wording-white.png",
  "/styles/style.css",
  "/images/sponsors/american-express.png",
  "/images/sponsors/rrmc.png",
  "/images/sponsors/refsix.png",
  "/images/sponsors/github.png",
  "/images/sponsors/unity.png",
  "/images/sponsors/balsamiq.png",
  "/images/sponsors/chirp.png",
  "/images/sponsors/twilio.png",
  "/images/sponsors/jetbrains.png",
  "/images/sponsors/mlh.png",
  "/dist.js",
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