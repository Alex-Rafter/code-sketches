import anime from "anime";
import { h } from "preact";
import { useRef, useEffect } from "hooks";
import htm from "htm";
import register from "preact-custom-element";
const html = htm.bind(h);

export function Circle() {

  const input = useRef(null);

  function animate() {
    const animeConfig = {
      targets: input.current,
      translateX: 250,
      rotate: "1turn",
      backgroundColor: "#FFF",
      duration: 800,
      easing: "easeInOutQuad",
      direction: "alternate",
    };

    anime(animeConfig);
  }

  return html`
    <style>
      .circle {
        width: 100px;
        height: 100px;
        background-color: var(--primary);
        border-radius: 50%;
        cursor: pointer;
      }
    </style>
    <div class="circle" ref=${input} onclick=${animate}></div>
  `;
}

register(Circle, "my-circle", [], { shadow: true });
