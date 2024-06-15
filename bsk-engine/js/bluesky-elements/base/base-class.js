import { createApp } from "petite-vue";
import { wrapDirective } from "../directives/wrap.js";

export class baseEl extends HTMLElement {
  constructor() {
    super();
    const attrsUsed = this.getAttributeNames();
    this.state = {
      is: 'default',
      icon: null,
      icons: '',
    };
    for (const attr of attrsUsed) {
      // loop through all attributes and add them to state
      // if the value is true or false, convert to boolean
      let attrValue = this.attributes.getNamedItem(attr).value;


      // let isTrueOrFalse = (/^(true|false)$/).test(attrValue.toLowerCase());
      // attrValue = (isTrueOrFalse) ? attrValue.toLowerCase() === "true" : attrValue;


      if (attr.startsWith(':')) {
        const propName = attr.slice(1);
        try {
          const value = this.evaluateExpression(attrValue);
          this.state[propName.replace(/-([a-z])/g, (v) => v[1].toUpperCase())] = value
        } catch (e) {
          console.error(`Failed to evaluate expression: ${newValue}`, e);
        }
      } else {
        this.state[attr.replace(/-([a-z])/g, (v) => v[1].toUpperCase())] = attrValue
      }


    }
  }
  evaluateExpression(expression) {
    return new Function(`return ${expression}`).call(this);
  }
  mountEl(state) {
    console.log("mountEl", state);
    this.state = { ...state, ...this.state };
    const templateString = this.state.$template;
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateString, 'text/html');
    const newNode = doc.body.firstChild;
    this.appendChild(newNode);
    createApp(this.state).directive('wrap', wrapDirective).mount(this);
  }
}
