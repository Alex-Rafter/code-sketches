import { html } from 'https://esm.sh/hono/html';


const Article = () => {

    const script = html`
    <script type="module">
    import { createApp } from 'https://unpkg.com/petite-vue?module'
    import { store } from '/js/store.js'
    function Tester() {
        return {
            toggle: false
        }
    }
    createApp({store, Tester}).mount('#clickArticle')
    </script>
    `
    return html`
    ${script}
    <article
    v-scope="Tester()"
    id="clickArticle"
    @click="toggle = !toggle"
    :class="(toggle) ? 'blue' : 'red'"
    style="width: 100vw;height: 50vh;"
    >
        <h2>Some Content</h2>
        <p>Some more content</p>
        <p>count : {{store.count}}</p>
    </article>
    `
}
export { Article };
