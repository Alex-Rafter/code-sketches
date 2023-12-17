// import { render } from 'preact'
// import { html } from 'htm'
// import { useEffect } from 'preact/hooks'
// import register from 'preact-custom-element'
// import { signal } from "@preact/signals";
// import { define } from 'preactement';
import { Button } from './ui/Button.js';
import { Message } from './ui/Message.js';

// const count = signal(0);

// const Button = () => {
//     const value = count.value;

//     return html`
//     <div>
//       <p>Count: ${value}</p>
//       <button onClick=${() => count.value++}>click me</button>
//     </div>`
// }




// const Greeting = ({ name = 'World' }) => {

//     useEffect(() => {
//         console.log("mounted");
//     });

//     return html`<p>Hello, ${name}!</p>`
// }

// render(html`<${Greeting} />`, document.body);
// register(Greeting, 'x-greeting', ['name'], { shadow: false });
// define('state-button', () => Button, { attributes: ['name'] });
// define('x-greeting', () => Greeting, { attributes: ['name'] });