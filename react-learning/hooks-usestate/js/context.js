'use strict';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// https://www.npmjs.com/package/es-react
import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, p, h } = reactHyperscriptHelpers

const GridOne = ({ el }) => div('.row', [div('.col-12', [el])])

const App = () => {
    const x = () => p('.text-primary', 'lorem ipsum')
    return div('.container-fluid',
        [GridOne({ el: x() })]
    )
}

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);