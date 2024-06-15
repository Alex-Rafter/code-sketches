// import { baseEl } from "./base-class.js";
import { createApp } from "petite-vue";
import { wrapDirective } from "../directives/wrap.js";

function bsk(components) {
    const toKebabCase = (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };

    for (const key in components) {
        const obj = components[key];
        obj.tagName = toKebabCase(key);

        if (!customElements.get(obj.tagName)) {
            makeComponent(obj);
        }

    }
}

function makeComponent(state = {}) {
    const tagName = `${state.tagName}`;
    const className = `${tagName.replace(/-([a-z])/, (v) => v[1].toUpperCase())}`;
    const obj = {};

    obj[className] = class extends HTMLElement {
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
        connectedCallback() {
            this.slots();

            if (Object.keys(state).includes("mounted")) {
                this.state.mounted(this);
            }
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
        disconnectedCallback() {
            if (Object.keys(state).includes("unmounted")) {
                this.state.unmounted(this);
            }
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

    customElements.define(tagName, obj[className]);
}

export { bsk, makeComponent };