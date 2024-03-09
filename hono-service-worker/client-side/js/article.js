import { html } from 'https://esm.sh/hono/html';

const Article = () => {
    return html`
    <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'
    console.log('test')
    createApp({toggle : false}).mount('#clickArticle')
    </script>
    <article
    id="clickArticle"
    @click="toggle = !toggle"
    :class="(toggle) ? 'blue' : 'red'"
    style="width: 100vw;height: 50vh;"
    >
        <h2>Some Content</h2>
        <p>Some more content</p>
    </article>
    `
}
export { Article };
