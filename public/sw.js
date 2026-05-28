// Minimal service worker: cache-first for hashed assets, network-first for navigations.
// Bump CACHE_VERSION when you want to invalidate the cache.
const CACHE_VERSION = "v1";
const RUNTIME_CACHE = `runtime-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = ["/", "/favicon.png", "/manifest.webmanifest", OFFLINE_URL];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(RUNTIME_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS).catch(() => undefined))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((key) => key !== RUNTIME_CACHE).map((key) => caches.delete(key)),
      );
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first for navigation requests so users get fresh HTML.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          const cache = await caches.open(RUNTIME_CACHE);
          cache.put(request, fresh.clone()).catch(() => undefined);
          return fresh;
        } catch (error) {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL) || Response.error();
        }
      })(),
    );
    return;
  }

  // Cache-first for static assets.
  if (/\.(?:js|css|webp|png|jpg|jpeg|svg|woff2?|ttf|ico|json|webmanifest)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response;
          }
          const clone = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(request, clone));
          return response;
        });
      }),
    );
  }
});
