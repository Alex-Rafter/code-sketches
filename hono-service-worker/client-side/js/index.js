import { Hono } from 'https://esm.sh/hono';
import { logger } from 'https://esm.sh/hono/logger';

const app = new Hono()
// app.use(logger())
app.use(async (c, next) => {
    console.log(`XX [${c.req.method}] ${c.req.url}`)
    await next()
})
// Define routes
app.get('/', (c) => c.text('Welcome to the Home Page!'));
// app.get('/about', (c) => c.text('This is the About Page.'));
app.get('/about', (c) => c.html('This is the About Page.'));

// Function to handle client-side navigation
// Function to handle client-side navigation
const navigate = (path) => {
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
            console.log('Response:', text);
            document.body.innerHTML = text;
            // document.getElementById('content').innerText = text;
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
// navigate('/');
