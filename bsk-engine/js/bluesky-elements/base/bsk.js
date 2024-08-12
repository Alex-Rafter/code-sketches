import { reactive } from "create-store"
import { makeComponent } from "make-component"
// import { wrapDirective } from "../directives/wrap.js";

function bsk(components) {
    let storeStore = null;
    //
    const toKebabCase = (str) => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    // first set the store
    for (const key in components) {
        if (components[key]._isReactive) {
            storeStore = components[key];
            break;
        }
    }

    for (const key in components) {
        //
        const obj = components[key];
        obj.tagName = toKebabCase(key);

        if (!components[key]._isReactive && !customElements.get(obj.tagName)) {
            makeComponent(obj, storeStore);
        }
    }
}



export { bsk, reactive };