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

const Article = () => {
    return html`
    <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'
    createApp({toggle : false,init(el) {console.log("init", el)}}).mount('#clickArticle')
    </script>
    <article id="clickArticle"  @vue:mounted="init($el)" :class="(toggle) ? 'blue' : 'red'" style="width: 100vw;height: 50vh;" @click="toggle = !toggle">
        <h2>Some Content</h2>
        <p>Some more content</p>
    </article>
    `
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


export { Main, Layout, Article };