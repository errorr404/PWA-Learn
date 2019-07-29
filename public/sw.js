self.addEventListener('install', e => {
  // console.log('Installing servie Worker--->', e);
});

self.addEventListener('activate', e => {
  // console.log('activating a servie Worker---->', e);
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  // console.log(' fetch is triggered---->', e);
});
