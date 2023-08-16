import anime from "anime";
import { h } from "preact";
import htm from "htm";
import register from "preact-custom-element";
const html = htm.bind(h);

// import { Title } from "./Title.js";

export function App(props) {
  return html`
    <section>
     <slot name="title"></slot>
     <slot></slot>
    </section>
  `;
}

register(App, "my-app", ["name"], { shadow: true });
