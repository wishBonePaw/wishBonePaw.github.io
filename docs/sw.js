self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing service worker ...", event);
  caches.open("static").then(function (cache) {
    console.log("[Service Worker] Precaching App Shell");
    cache.add("/src/js/app.js");
  });
});

self.addEventListener("activate", function (event) {
  return self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(fetch(event.request));
});
