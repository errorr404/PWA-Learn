self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(
    caches.open('static-v3').then(function(cache) {
      console.log('[Service Worker] Precaching App Shell');
      cache.addAll([
        '/index.html',
        '/src/js/app.js',
        '/src/js/feed.js',
        '/src/js/promise.js',
        '/src/js/fetch.js',
        '/src/js/material.min.js',
        '/src/css/app.css',
        '/src/css/feed.css',
        '/src/images/main-image.jpg',
        'https://fonts.googleapis.com/css?family=Roboto:400,700',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  //old cache cleanup
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== 'static-v3' && key !== 'dynamic') {
            console.log('servieWorker removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  console.log('fetch--->', event.request);
  event.respondWith(
    // caches.open('static').then((cache) => {
    //   return cache.match(event.request)
    //     .then(function(response) {
    //       if(response) {
    //         return response;
    //       }
    //       return fetch(event.request).then(res => {
    //         return res;
    //       });
    //     }).catch((err) => {
    //       console.log({ err });
    //   })
    // })
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request).then(res => {
        return caches.open('dynamic').then(cache => {
          cache.put(event.request.url, res.clone());
          return res;
        });
      });
    })
  );
});
