import { Hono } from 'https://esm.sh/hono';
import { logger } from 'https://esm.sh/hono/logger';
import { html } from 'https://esm.sh/hono/html';
import { Main } from './main.js';
import { Article } from './article.js';

const app = new Hono()

// app.use(logger())

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
    return c.render(Article())
})

// Function to handle client-side navigation
// Function to handle client-side navigation
const navigate = () => {
    const path = decodeURI(window.location.hash.substring(1));
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
            const tempDom = new DOMParser().parseFromString(text, 'text/html');
            const originalScript = tempDom.querySelector('script');
            if (originalScript) {
                const script = document.createElement('script');
                script.type = 'module'; // Copy any attributes needed
                script.textContent = originalScript.textContent; // Set the script content

                // Remove the original script to avoid duplicates or confusion
                originalScript.parentNode.removeChild(originalScript);

                // Append the new script element where you need it, for example, to the container or document.head
                document.head.appendChild(script); // Or use container.appendChild(script) if it needs to be in a specific place

            }








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
navigate();
