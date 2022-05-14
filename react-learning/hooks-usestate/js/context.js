'use strict';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';
// https://www.npmjs.com/package/es-react
import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
const { div, h1, h2, h3, button, ul, li, p, h } = reactHyperscriptHelpers

const GridOne = ({ children }) => div('.row', [div('.col-12', [children])])
const Paragraph = ({ text }) => p('.text-primary', `${text}`)
const App = () => { return GridOne({ children: [h1('hello'), h2('bye for now'), Paragraph({ text: 'Thingy' })] }) }

const domContainer = document.querySelector('#root');
ReactDOM.render(h(App), domContainer);