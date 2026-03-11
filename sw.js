const CACHE_NAME = 'nadzom-v2';
const assets = [
  './',
  './index.html',
  'https://raw.githubusercontent.com/ippnuda-reborn-91/takbiran/main/Nadzom%20luru%20ilmu.mp3'
];

// Tahap Instalasi (Simpan ke Cache)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch (Ambil dari Cache jika Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});