import { app } from './init.js'
import { html } from 'hono/html'
import { logger } from 'hono/logger'
import { Article } from '../templates/article.js'
import { Span } from '../templates/span.js'
import { Title } from '../templates/title.js'

app.get('/', (c) => {
    return c.render(Span([Title(), Article()]))
})

app.get('/api/data', async (c) => {
    // Handle API data fetch
    return new Response(JSON.stringify({ data: 'Some Hono API data' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
});

app.get('/about', async (c) => {
    // Handle fetching an about page, for example
    return new Response('About Page', { status: 200, headers: { 'Content-Type': 'text/html' } });
});

export { app };