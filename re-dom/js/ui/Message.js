import { Component } from 'base'
import { html } from 'htm'
import { define } from 'preactement';
import { useEffect } from 'preact/hooks'


export const Message = ({ message = 'test', childSlot }) => {
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
    <style>
        h1 {
            color: red;
        }
    </style>
    <div>
        <h1>Hello ${message}!</h1>
        <slot>${childSlot}</slot>
    </div>`;
}


// export class Message extends Component {
//     constructor() {
//         super();
//         this.state = {
//             message: 'World'
//         };
//     }

//     render({ message }) {
//         return html`
//         <style>
//             h1 {
//                 color: red;
//             }
//         </style>
//         <div>
//             <h1>Hello ${message}!</h1>
//             <slot name="child"></slot>
//         </div>`;
//     }
// }


define('hello-world', () => Message, { attributes: ['message'] });
