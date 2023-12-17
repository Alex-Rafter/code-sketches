import { render } from 'preact'
import { html } from 'htm'
import { useEffect } from 'preact/hooks'
import register from 'preact-custom-element'
import { count, incrementCount } from 'signals'
// import { signal } from "@preact/signals";
import { define } from 'preactement';


// const count = signal(0);

const CountOutput = () => {
    const value = count.value;
    return html`
    <style>
        count-output {
            p {
                font-size: 2rem;
            }
        }
    </style>
    <p>Count: ${value}</p>
    `
}

export const Button = () => {
    const value = count.value;
    useEffect(
        () => {
            console.log("mounted");

            return () => {
                console.log("unmounted");
            };
        },
        []
    );

    return html`
    <div>
      <p>Count: ${value}</p>
      <button onClick=${incrementCount}>click me</button>
    </div>`;
}


// export class Button extends Component {
//     constructor() {
//         super();
//         this.state = {
//             value: count.value
//         };
//     }

//     componentDidMount() {
//         console.log('mounted', this.state.value);
//     }

//     componentWillUnmount() {

//     }

//     increment = () => {
//         console.log('incrementing');
//         count.value++;
//         console.log(count.value);
//     };


//     render({ message }) {
//         return html`
//         <style>
//             state-button {
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 justify-content: center;
//                 gap: 1rem;
//                 font-family: sans-serif;

//                 & button {
//                     padding: .625rem;
//                     border-radius: .25rem;
//                     background-color: #c8ce1a;
//                     border-color: #1d1e00;
//                     cursor: pointer;
//                     box-shadow: none;
//                 }

//                 & button.unsub {
//                     background-color: #970000;
//                     color: #fff;
//                 }

//                 & p {
//                     margin: 0rem;
//                     padding: 0rem;
//                     font-size: 2rem;
//                     font-weight: 600;
//                     color: #1d1e00;
//                 }
//             }
//         </style>
//         <p>${this.state.value}</p>
//         <button onClick="${this.increment}">Click me to update state</button>
//         `;
//     }
// }

// export class Button extends Component {
//     constructor() {
//         super();
//         this.state = {
//             value: count.value
//         };
//     }

//     componentDidMount() {
//         console.log('mounted', this.state.value);
//     }

//     componentWillUnmount() {

//     }

//     increment = () => {
//         console.log('incrementing');
//         count.value++;
//         console.log(count.value);
//     };


//     render({ message }) {
//         return html`
//         <style>
//             state-button {
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 justify-content: center;
//                 gap: 1rem;
//                 font-family: sans-serif;

//                 & button {
//                     padding: .625rem;
//                     border-radius: .25rem;
//                     background-color: #c8ce1a;
//                     border-color: #1d1e00;
//                     cursor: pointer;
//                     box-shadow: none;
//                 }

//                 & button.unsub {
//                     background-color: #970000;
//                     color: #fff;
//                 }

//                 & p {
//                     margin: 0rem;
//                     padding: 0rem;
//                     font-size: 2rem;
//                     font-weight: 600;
//                     color: #1d1e00;
//                 }
//             }
//         </style>
//         <p>${this.state.value}</p>
//         <button onClick="${this.increment}">Click me to update state</button>
//         `;
//     }
// }

define('count-output', () => CountOutput);
define('state-button', () => Button, { attributes: ['message'] });
// register(Button, 'state-button', ['message'], { shadow: false });

// render(html`<${Button} />`, document.body);