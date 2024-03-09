import { app } from './all.js'

// Fetch event handler
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.href.includes('petite-vue')) return
    event.respondWith(app.fetch(event.request));
});

