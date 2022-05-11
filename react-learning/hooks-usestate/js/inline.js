'use strict';
// import React from "https://cdn.skypack.dev/react";
// import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// https://www.npmjs.com/package/es-react
import { minify } from 'https://unpkg.com/csso/dist/csso.esm.js';
import { Style } from './Style.js'

import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, h } = reactHyperscriptHelpers


const App = () => {
    const [text, setText] = React.useState(`test`)
    const [count, setCount] = React.useState(0)


    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    const x = () => setText(text => text = `more than ${count} button clicks`)


    const Button = () => {

        const css = {
            color: 'red, blue,green',
            border: '1px solid red',
        }

        const cssHover = {
            hover : true,
            color: 'yellow',
            border: '1px solid red',
            fontSize : '50px',
        }

        return div([Style('.btn', {style : cssHover}, css), button(`.btn.btn-primary`, null, `Clicked ${count} times`)])
    }

    return div([h1('.display-1', text), Button()])
}

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);