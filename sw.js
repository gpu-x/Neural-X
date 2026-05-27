const CACHE = 'nx-v3';
// Ho rimosso il punto iniziale './' per rendere i percorsi relativi alla root del sito
const ASSETS = [
  '/', 
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k !== CACHE).map(k => caches.delete(k))
    ))
  );
  // Forza il controllo immediato
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      return r || fetch(e.request).then(res => {
        // Cloniamo la risposta prima di salvarla
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Se la rete fallisce, restituisci sempre la index
        return caches.match('/index.html');
      });
    })
  );
});
