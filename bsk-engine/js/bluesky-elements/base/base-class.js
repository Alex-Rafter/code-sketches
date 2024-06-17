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
      let attrValue = this.attributes.getNamedItem(attr).value;
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
    this.mountEl(state);
  }
  evaluateExpression(expression) {
    return new Function(`return ${expression}`).call(this);
  }
  slots() {
    // get all child elements with of type slot as an array
    const slotsArr = Array.from(this.querySelectorAll('slot'))
    if (slotsArr.length === 0) return
    const elsWithSlotAttr = this.querySelectorAll(':scope > [slot]')

    // move all elements with slot attribute to the slot element with matching name attribute
    elsWithSlotAttr.forEach(el => {
      const slotName = el.getAttribute('slot')
      const slotEl = this.querySelector(`slot[name="${slotName}"]`)
      slotEl.replaceWith(el)
    })
  }
  connectedCallback() {
    this.slots();
    if (Object.keys(state).includes("mounted")) {
      this.state.mounted(this);
    }
  }
  disconnectedCallback() {
    if (Object.keys(state).includes("unmounted")) {
      this.state.unmounted(this);
    }
  }
  mountEl(state) {
    this.state = { ...state, ...this.state };
    const templateString = this.state.$template;
    const parser = new DOMParser();
    const doc = parser.parseFromString(templateString, 'text/html');
    const newNode = doc.body.firstChild;
    this.appendChild(newNode);
    createApp(this.state).directive('wrap', wrapDirective).mount(this);
  }
}
