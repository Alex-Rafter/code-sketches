'use strict';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
import htm from 'https://unpkg.com/htm?module'
const html = htm.bind(React.createElement);

const GridOne = (props) => html`
<div className="row">
    <div className="col-12">
        ${props.children}
    </div>
</div>`

const Title = () => html`<h1 className="display-1">Hello</h1>`

const App = () => {
    // return html`<${Title}/>`
    return html`
    <${GridOne}>
        <p>Test</p>
    </${GridOne}>
    `
}

const domContainer = document.querySelector('#root');
ReactDOM.render(html`<${App}/>`, domContainer);