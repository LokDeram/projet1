self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("static-cache").then(cache =>
      cache.addAll([
        "/", 
        "/index.html",
        "/icon-192.png"
      ])
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  const url = event.request.url;

 
  if (url.includes("donnees.montreal.ca")) {
    event.respondWith(
      caches.open("api-cache").then(cache =>
        fetch(event.request)
          .then(response => {
            if (response.ok) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => cache.match(event.request))
      )
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).catch(() => caches.match("/index.html"));
      })
    );
  }
});


self.addEventListener("push", function(event) {
  console.log(" Push reçu par le service worker !");
  const data = event.data?.json() || {
    title: "Nouvelle alerte",
    body: "Une nouvelle alerte est disponible.",
  };

  const options = {
    body: data.body,
    icon: "/icon-192.png", 
    badge: "/icon-192.png"
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});


