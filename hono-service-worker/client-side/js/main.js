import { html } from 'https://esm.sh/hono/html';

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
    <div id="app">
    <h1>Here I am Testing The Newest Middleware from Main Template</h1>
    ${content}
</div>
    `
}

export { Main };