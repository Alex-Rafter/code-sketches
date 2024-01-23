import { createGlobalState } from "../store/store.js";
import { autoGenerateBskElements } from "./auto-generate-elements.js";

window.addEventListener('DOMContentLoaded', (event) => {
    createGlobalState();
    autoGenerateBskElements();
    store.utils.setUtilsBreakPoint();
    store.sl.checkIfSession();
});

window.onresize = () => store.utils.setUtilsBreakPoint();