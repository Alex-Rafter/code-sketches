'use strict';
// import React from "https://cdn.skypack.dev/react";
// import ReactDOM from 'https://cdn.skypack.dev/react-dom';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// https://www.npmjs.com/package/es-react

import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, h } = reactHyperscriptHelpers


const App = () => {
    const [text, setText] = React.useState('Hello Prev World!')
    const [count, setCount] = React.useState(0);
    // Similar to componentDidMount and componentDidUpdate:
    React.useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });


    const objOfEVents = {
        // onMouseOver: () => setText('You have scrolled over me'),
        // onMouseOut: () => setText('Bye, you have scrolled out')
    }

    const btnEvents = {
        title : 0,
        onClick: (e) => {
            // console.log(e.target.title)
            // if (e.target.title >= 2) 
            setText('more than nine button clicks')

            // setCount(count + 1)
            // e.target.title++
        } 
    }

    let n = 0
    const x = () => {
        if (n > 0) return
        setText('more than nine button clicks')
        n++
    }

    if (count === 3) x()
    

    const Button = () => button('.btn.btn-primary', btnEvents, `Clicked ${count} times`)

    return div([h1('.display-1', objOfEVents, text,), Button()])
}

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);