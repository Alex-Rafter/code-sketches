import { createApp } from "petite-vue";

function makeComponent(state = {}, storeStore = null) {
  //
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
      this.foundSlots = [];

      for (const attr of attrsUsed) {
        //
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
      //
      this.newSlots();
      this.mountEl(state);
    }
    evaluateExpression(expression) {
      return new Function(`return ${expression}`).call(this);
    }
    newSlots() {
      this.foundSlots = [...this.querySelectorAll('[slot]')]
    }
    slots() {
      // get all child elements with of type slot as an array
      const slotsArr = [...this.querySelectorAll('slot')]
      if (slotsArr.length === 0 || this.foundSlots.length === 0) {
        return
      }
      // move all elements with slot attribute to the slot element with matching name attribute
      this.foundSlots.forEach(el => {
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
      const tempObj = {}
      if (storeStore) {
        tempObj.store = storeStore
      }
      tempObj[`X_${className}`] = () => this.state
      this.setAttribute('v-scope', `X_${className}()`)
      createApp(tempObj).mount(this);
    }
  }

  customElements.define(tagName, obj[className]);
}

export { makeComponent };