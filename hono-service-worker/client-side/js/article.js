import { html } from 'https://esm.sh/hono/html';


const Article = () => {
    return html`
    <article
    @click="store.toggle = !store.toggle"
    :class="(store.toggle) ? 'blue' : 'red'"
    style="width: 100vw;height: 50vh;"
    >
        <h2>Some Content</h2>
        <p>Some more content</p>
        <p>count : {{store.count}}</p>
    </article>
    `
}
export { Article };
