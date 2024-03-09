import { Hono } from 'https://esm.sh/hono';
import { logger } from 'https://esm.sh/hono/logger';
import { html } from 'https://esm.sh/hono/html';
import { Main } from './main.js';

const app = new Hono()

app.use('*', async (c, next) => {
    c.setRenderer(content => c.html(Main(content)))
    await next()
})

const Nav = html`
<nav>
<a href="#/" id="home">Home</a> |
<a href="#/about" id="about">About</a>
</nav>
`

// Define routes
// app.get('/', (c) => c.text('Welcome to the Home Page!'));
// app.get('/about', (c) => c.text('This is the About Page.'));
// app.get('/about', (c) => c.html('This is the About Page.'));
app.get('/', (c) => {
    return c.render(Nav)
})
app.get('/about', (c) => {
    return c.render('This is the About Page.')
})

// Function to handle client-side navigation
// Function to handle client-side navigation
const navigate = () => {
    const path = decodeURI(window.location.hash.substring(1));
    console.log('Navigating to:', path);
    const url = new URL(path, document.location.origin);
    // Create a request object that mimics the Fetch API's request structure
    const request = new Request(url, {
        method: 'GET',
        headers: new Headers(), // Add any required headers here
        // Additional properties as needed
    });
    console.log('Request:', request)

    // Use Hono's dispatch method with the improved request object
    app.fetch(request).then((response) => {
        response.text().then((text) => {
            document.body.innerHTML = text;
        });
    });
};


// Intercept link clicks
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const path = event.target.getAttribute('href');
        history.pushState(null, '', path);
        navigate(path);
    });
});

// Handle back/forward navigation
window.addEventListener('popstate', () => {
    navigate(document.location.pathname);
});

// Initial navigation to home
navigate('/');
