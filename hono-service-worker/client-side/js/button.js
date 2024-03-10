import { html } from 'https://esm.sh/hono/html';


const Button = () => {
    return html`
    <div>
        <p>{{store.count}}</p>
        <button  @click="toggle = !toggle" :class="(store.toggle) ? 'blue' : 'red'">Click Me</button>
        <button  @click="store.inc">Inc</button>
        <a href="#/about">About</a>
    </div>
    `
}
export { Button };
