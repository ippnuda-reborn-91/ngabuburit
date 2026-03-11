const CACHE_NAME = 'nadzom-v3';
const MUSIC_URL = 'https://raw.githubusercontent.com/ippnuda-reborn-91/takbiran/main/Nadzom%20luru%20ilmu.mp3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  MUSIC_URL
];

// Simpan semua file saat instalasi
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Menggunakan request dengan mode 'cors' untuk memastikan file musik tersimpan
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => {
    return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
  }));
});

// Ambil file dari cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
