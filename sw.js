const CACHE = 'sched-v1';
const ASSETS = ['/', '/index.html', '/manifest.json', '/sw.js'];

// ─── Install: cache assets ───────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

// ─── Activate: clean old caches ──────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// ─── Fetch: serve from cache first ───────────────────────────────────────────
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => caches.match('/index.html')))
  );
});

// ─── Notification click ───────────────────────────────────────────────────────
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(list => {
    for (const c of list) if (c.url && 'focus' in c) return c.focus();
    if (clients.openWindow) return clients.openWindow('/');
  }));
});

// ─── Message from main page: schedule today's notifications ──────────────────
let scheduled = [];

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SCHEDULE') {
    // Clear old timers
    scheduled.forEach(id => clearTimeout(id));
    scheduled = [];

    const slots = e.data.slots; // [{label, time, ms}]
    const now = Date.now();

    slots.forEach(slot => {
      const delay = slot.ms - now;
      if (delay < 0) return; // already passed

      const id = setTimeout(() => {
        self.registration.showNotification(`⏰ ${slot.label}`, {
          body: slot.time,
          icon: '/icon-192.png',
          badge: '/icon-72.png',
          tag: slot.label,
          renotify: true,
          requireInteraction: false,
          silent: false,
          data: { url: '/' }
        });
      }, delay);

      scheduled.push(id);
    });

    console.log(`[SW] Scheduled ${slots.length} notifications`);
  }
});
