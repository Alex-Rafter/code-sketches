import { Hono } from 'hono';
import { html } from 'hono/html'
import { logger } from 'hono/logger'
import { Main } from './templates/main.js'
import { Article } from './templates/article.js'
const app = new Hono();

app.use(logger())
app.use('*', async (c, next) => {
    c.setRenderer(content => c.html(Main(content)))
    await next()
})


app.use('*', async (c, next) => {
    c.setRenderer((content) => {
        return c.html(Main(content))
    })
    await next()
})

const Title = () => {
    return html`<h1>Hello! Hono Again!</h1>`
}

const Span = (content = []) => {
    return html`<span class="new-test">${content[0]}${content[1]}</span>`
}

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

// Default handler for unmatched routes
app.all('*', () => new Response('Not found', { status: 404 }));

// Fetch event handler
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.href.includes('petite-vue')) return
    event.respondWith(app.fetch(event.request));
});

