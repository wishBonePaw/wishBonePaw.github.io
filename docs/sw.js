self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing service worker ...", event);
  caches.open("static").then(function (cache) {
    console.log("[Service Worker] Precaching App Shell");
    cache.addAll([
      "/",
      "/index.html",
      "/src/js/app.js",
      "/src/js/feed.js",
      "/src/js/promise.js",
      "/src/js/fetch.js",
      "/src/js/material.min.js",
      "/src/css/app.css",
      "/src/css/feed.css",
      "/src/images/DogBone_Blue_360x159.png",
      "https://fonts.googleapis.com/css?family=Roboto:400,700",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
      "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
    ]);
  });
});

self.addEventListener("activate", function (event) {
  return self.clients.claim();
});

// todo: if (response && cacheNotExpired) { use cache } else { fetch }
// todo: cache only 200 responses
// todo: clone fetch response stream
// https://www.thecodeship.com/web-development/guide-service-worker-pitfalls-best-practices/

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.open(CACHE).then((cache) => {
//       return cache.match(event.request).then((response) => {
//         return response || fetch(event.request).then((response) => {
//           if (response.status === 200) {
//             cache.put(event.request, response.clone());
//           }

//           return response;
//         })
//       });
//     })
//   );
// });

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        //return response;
        return fetch(event.request);
      } else {
        return fetch(event.request);
      }
    })
  );
});
