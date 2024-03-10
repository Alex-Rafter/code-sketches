import { html } from 'https://esm.sh/hono/html';


const Button = () => {
    return html`
    <script type="module">
        import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
        import { store } from '/js/store.js'
        createApp({store}).mount('#clickButton')
    </script>
    <div id="clickButton" v-scope="{toggle : false}">
    <p>{{store.count}}</p>
    <button  @click="toggle = !toggle" :class="(toggle) ? 'blue' : 'red'">Click Me</button>
    <button  @click="store.inc">Inc</button>
    <a href="#/about">ABout</a>
    </div>

    `
}
export { Button };
