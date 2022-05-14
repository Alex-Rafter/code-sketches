'use strict';
import { React, ReactDOM, useContext, createContext } from 'https://unpkg.com/es-react/dev';
// https://www.npmjs.com/package/es-react
import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, p, h } = reactHyperscriptHelpers

const Data = createContext({
    message : 'Hello from above!',
    theme : 'warning'
})
// const Theme = createContext('warning');

const Button = () => {
    const {theme, message} = useContext(Data);
    return button(`.btn.btn-${theme}`, `${message}`)
}
const App = () => { return Button() }

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);