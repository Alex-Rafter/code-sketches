'use strict';
import { minify } from 'https://unpkg.com/csso/dist/csso.esm.js';
import reactHyperscriptHelpers from 'https://cdn.skypack.dev/react-hyperscript-helpers';
import {slugify} from 'https://cdn.skypack.dev/voca';
import { React, ReactDOM } from 'https://unpkg.com/es-react/dev';


const {div, h } = reactHyperscriptHelpers

// export const Style = (selector, styleObj, hoverObj = {}) => {
//     let l = ''
//     if (hoverObj.hover = true) {
//         delete hoverObj.hover
//         l = minify(`${selector}:hover${JSON.stringify(hoverObj).replace(/\",/g, "\";").replace(/\"/g, "")}`).css      
//     }
//     const o = minify(`${selector}${JSON.stringify(styleObj).replace(/\",/g, "\";").replace(/\"/g, "")}`).css
//     const f = o + l
//     return h('style', {}, f)
// }

export const Style = (selector, style, styleObj) => {
    console.log(h('style', style, 'test').props.style)
    const o = minify(`${selector}${JSON.stringify(styleObj).replace(/\",/g, "\";").replace(/\"/g, "")}`).css
    console.log(h('style', style, o))
    return h('style', style, o)
}