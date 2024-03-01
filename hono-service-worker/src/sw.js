import { Hono } from 'hono';
import { html } from 'hono/html'
const app = new Hono();

app.use('*', async (c, next) => {
    c.setRenderer((content) => {
        return c.html(
            /*html*/
            `<html>
            <head>
            <title>Experiment</title>
          </head>
                <body>
                    <h1>Testing New Middleware</h1>
                    ${content}
                </body>
            </html>
            `
        )
    })
    await next()
})


const Layout = (content) => {
    return html`
        <html>
            <head>
                <title>Hono App</title>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;
}


app.get('/', (c) => {
    const title = html`<h1>Hello! Hono Again!</h1>`
    // return c.html(Layout(title))
    return c.render(title)
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
    console.log('Fetch event', event.request.url);
    // Use Hono to handle requests
    event.respondWith(app.fetch(event.request));
});
