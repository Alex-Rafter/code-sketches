import { reactive as r } from "petite-vue";

function reactive(obj) {
    obj._isReactive = true;
    return r(obj)
}

export { reactive }