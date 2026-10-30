/* SolaRays Dashboard v2 · service worker
   Keeps the app's own files on the device so it opens instantly, even on weak signal.
   Your Google Sheet data is never stored here: it always goes straight to the Apps Script. */
const VERSION = "4aa60313d1";
const CACHE = "srv2-" + VERSION;
const FONTS = "srv2-fonts";
const SHELL = ["./", "index.html", "manifest.webmanifest", "vendor/bootstrap.min.css?v=399b491526", "css/app.css?v=1acd29491b", "js/app.js?v=67d7d03596", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("srv2-") && k !== CACHE && k !== FONTS).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener("message", e => { if (e.data && e.data.type === "skip") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  /* Google Fonts: use the saved copy, refresh it quietly */
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(r => { if (r.ok || r.type === "opaque") c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  if (url.origin !== location.origin || !url.pathname.startsWith(new URL("./", self.registration.scope).pathname)) return;
  /* the app's own files: saved copy first (instant), network only if missing */
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(req, { ignoreSearch: req.mode === "navigate" }) || (req.mode === "navigate" ? await c.match("./") : null);
    if (hit) return hit;
    try {
      const r = await fetch(req);
      if (r.ok) c.put(req, r.clone());
      return r;
    } catch (err) {
      return (await c.match("./")) || Response.error();
    }
  })());
});
