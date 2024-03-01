import { error, json, Router } from 'itty-router'

const router = Router()


// Define routes
router.get('/', (request) => json([1, 2, 3]))
router.get('/api/data', async (request) => {
    // Handle API data fetch
    return new Response(JSON.stringify({ data: 'Some API data' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
});

router.get('/about', async (request) => {
    // Handle fetching an about page, for example
    return new Response('About Page', { status: 200, headers: { 'Content-Type': 'text/html' } });
});

// Default handler for unmatched routes
router.all('*', () => new Response('Not found', { status: 404 }));


// Add fetch event listener
self.addEventListener('fetch', (event) => {
    console.log('Fetch event', event.request.url);
    // Use router to handle requests
    event.respondWith(router.handle(event.request));
});