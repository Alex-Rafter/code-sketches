import anime from "anime";
import { h } from "preact";
import { useRef, useEffect } from "hooks";
import htm from "htm";
import register from "preact-custom-element";
import styles from '/css/global.css' assert { type: "css" };
const html = htm.bind(h);

export function Title({ title }) {

    const titleRef = useRef(null);
    // create useEffect
    useEffect(() => {
        const sheet = new CSSStyleSheet();
        const myCustomElem = titleRef.current
        console.log(myCustomElem)
        // myCustomElem.shadowRoot.adoptedStyleSheets = [styles];
    }, []);

  return html`
      <h1 ref=${titleRef}>${title}</h1>
  `;
}

register(Title, "my-title", ["name"], { shadow: true });
