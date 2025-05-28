const CACHE_NAME = "shell-only-v1";
const SHELL_ASSETS = ["/index.html"];

// 1. Install: cache only the shell
self.addEventListener("install", (evt) =>
  evt.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(SHELL_ASSETS)))
);

// 2. Activate: clear old caches
self.addEventListener("activate", (evt) =>
  evt.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
        )
      )
  )
);

// 3. Fetch:
self.addEventListener("fetch", (evt) => {
  const req = evt.request;
  const url = new URL(req.url);

  // 1. Skip dev-only Vite/HMR
  if (
    url.pathname.startsWith("/@vite") ||
    url.pathname.startsWith("/@react-refresh")
  ) {
    return;
  }

  // 2. If this is a page navigation…
  if (req.mode === "navigate") {
    evt.respondWith(
      fetch(req) // Try network first
        .then((res) => res) // If online, load real app
        .catch(
          () =>
            // If offline…
            new Response(
              `<!DOCTYPE html>
             <html><body style="text-align:center">
               <h1>No internet</h1>
               <h2> You are Offline! Please check your connection!</h2>
               
             </body></html>`,
              { headers: { "Content-Type": "text/html" } }
            )
        )
    );
    return;
  }
});
