import { h } from "https://esm.sh/preact";
import register from "https://esm.sh/preact-custom-element";
import htm from "https://esm.sh/htm";
const html = htm.bind(h);

// Global Styles
import { Styles } from "./Styles.js";


function App({name}) {
  const logger = (msg) => console.log("logger", msg);
  return html`
    <${Styles}/>
    <div>
        <h1>Hello ${name}!</h1>
        <button onClick=${() => logger("passsed")}>Click me</button>
        <slot name="content"></slot>
    </div>
  `;
}

register(App, "my-button", ["name"], { shadow: true });
// render(html`<${App} name="World" />`, document.body);
