import { html } from 'hono/html'

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

export { Layout };