import { Component } from 'preact'
import { html } from 'htm'
import { placeSlotContent } from '../utils/place-slot-content.js';

export class Message extends Component {
    constructor() {
        super();
        this.state = {
            message: 'World'
        };
    }

    componentDidMount() {
        placeSlotContent.bind(this)
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
