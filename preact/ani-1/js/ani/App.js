import anime from "anime";
import { h } from "preact";
import htm from "htm";
import register from "preact-custom-element";
import { useRef, useEffect } from "hooks";
const html = htm.bind(h);


export function App(props) {

  const titleRef = useRef(null);

  useEffect(() => {
console.log("titleRef", titleRef)

    // anime({
    //   targets: titleRef.current,
    //   translateX: '90vw',
    //   rotate: "1turn",
    //   duration: 400,
    //   loop: true,
    //   direction: "alternate",
    //   easing: "easeInOutSine",
    // })

  }, []);


  return html`
  <style>
    /* .item {
      width: 100px;
      height: 100px;
      background-color: var(--gray-3);
    } */

    section {
      margin: 0 auto;
      width: 100vw;
      display : grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(4, 22.5vh);
      grid-gap: 1rem;
    }

    section div {
      height: 100%;
      width: 100%;
      background-color: var(--gray-3);
    }
</style>
    <section ref=${titleRef}>

<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>

    </section>
  `;
}

register(App, "ani-one", ["name"], { shadow: true });
