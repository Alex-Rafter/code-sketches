import { createApp } from "petite-vue";
import { wrapDirective } from "../directives/wrap.js";

export class baseEl extends HTMLElement {
  constructor() {
    super();
    const attrsUsed = this.getAttributeNames();
    this.state = {
      is : 'default',
      icon : null,
      icons : '',
    };
    for (const attr of attrsUsed) {
      // loop through all attributes and add them to state
      // if the value is true or false, convert to boolean
      let attrValue = this.attributes.getNamedItem(attr).value;
      let isTrueOrFalse = (/^(true|false)$/).test(attrValue.toLowerCase());
      attrValue = (isTrueOrFalse) ? attrValue.toLowerCase() === "true" : attrValue;
      this.state[attr.replace(/-([a-z])/g, (v) => v[1].toUpperCase())] = attrValue
    }
  }
  mountEl(selector, state) {
    this.state = { ...state, ...this.state };
    const template = document.querySelector(`${selector}`);
    this.appendChild(template.content.cloneNode(true));
    createApp(this.state).directive('wrap', wrapDirective).mount(this);
  }
}
