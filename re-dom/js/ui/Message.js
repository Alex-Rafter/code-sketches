import { Component } from 'base'
import { html } from 'htm'
import register from 'preact-custom-element'


export class Message extends Component {
    constructor() {
        super();
        this.state = {
            message: 'World'
        };
    }

    render({ message }) {
        return html`
        <style>
            h1 {
                color: red;
            }
        </style>
        <div>
            <h1>Hello ${message}!</h1>
            <slot name="child"></slot>
        </div>`;
    }
}


register(Message, 'hello-world', ['message'], { shadow: false });