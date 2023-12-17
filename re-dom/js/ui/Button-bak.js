import { Component } from 'base'
import { html } from 'htm'
import register from 'preact-custom-element'
import { globalState } from 'store'


export class Button extends Component {
    constructor() {
        super();
        const localState = { message: 'Hello world' };
        this.state = {
            ...localState,
            ...globalState.data
        };
    }

    componentDidMount() {
        const listener = () => this.setState({ ...globalState.data });
        globalState.subscribe(listener);
        this.unsubscribe = () => globalState.unsubscribe(listener);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    increment = () => {
        const newCount = globalState.data.count + 1;
        globalState.update({ count: newCount });
    };


    render({ message }) {
        const { count } = this.state;
        return html`
        <style>
            state-button {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                font-family: sans-serif;

                & button {
                    padding: .625rem;
                    border-radius: .25rem;
                    background-color: #c8ce1a;
                    border-color: #1d1e00;
                    cursor: pointer;
                    box-shadow: none;
                }

                & button.unsub {
                    background-color: #970000;
                    color: #fff;
                }

                & p {
                    margin: 0rem;
                    padding: 0rem;
                    font-size: 2rem;
                    font-weight: 600;
                    color: #1d1e00;
                }
            }
        </style>
        <p>${count}</p>
        <button onClick="${this.increment}">Click me to update state</button>
        <button class="unsub" onClick="${this.unsubscribe}">Unsub</button>
        `;
    }
}


register(Button, 'state-button', ['message'], { shadow: false });