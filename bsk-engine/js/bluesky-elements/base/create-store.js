import { reactive } from "petite-vue";

function createStore(obj) {
    obj._isReactive = true;
    return reactive(obj)
}

export { createStore }