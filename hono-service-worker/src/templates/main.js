import { html } from 'hono/html'

const GenericHeadTags = ({ title, description } = {}) => {
    return html`
        <title>${title || 'this is a default title'}</title>
        <meta name="description" content="${description || 'This is a description'}">
        <style>
            body {
                font-family: Arial, sans-serif;
                color : red;
            }
            article {
                cursor: pointer;
            }
            .blue {
                color: blue;
            }

            .red {
                color: red;
            }
        </style>
    `;
}


const Main = (content) => {
    return html`
        <html>
            <head>
                ${GenericHeadTags({ title: 'My Little Hono App', description: 'Tinkering is fun!' })}
             </head>
            <body id="app">
                <h1>Here I am Testing The Newest Middleware from Main Template</h1>
                ${content}
            </body>
        </html>
    `
}

export { Main };