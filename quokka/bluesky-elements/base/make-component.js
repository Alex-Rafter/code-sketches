import { baseEl } from "./base-class.js";

export function makeComponent(tagName, templateId, state = {}) {
  const className = `${tagName.replace(/-([a-z])/, (v) => v[1].toUpperCase())}`;
  const obj = {};
  const definingAttr =
    Object.keys(state).length !== 0 ? "bsk-advanced" : "bsk-simple";

  obj[className] = class extends baseEl {
    constructor() {
      super();
      this.mountEl(templateId, state);
    }
    connectedCallback() {

      this.slots();
      this.setAttribute(definingAttr, "");

      const componentChildren = Array.from(this.children);
      componentChildren.forEach(removeNullAttrsThatAreString);

      function removeNullAttrsThatAreString(el) {
        el.getAttributeNames().forEach((attr) => {
          const matchFalsy =
            el.getAttribute(attr).match(/null|undefined|false/) !== null;
          const shouldBeRemoved =
            matchFalsy && el.getAttribute(attr) !== "bsk-";
          shouldBeRemoved && el.removeAttribute(attr);
        });
      }

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
  };

  customElements.define(tagName, obj[className]);
}
