import { app } from './get.js'

// Default handler for unmatched routes
app.all('*', () => new Response('Sorry Not found', { status: 404 }));

export { app };