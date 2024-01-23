import { makeComponent } from "./make-component.js";
// import { stateObjects } from "../state-objects/index.js";

export function autoGenerateBskElement(component) {
    console.log("component x: ", component);
    // console.log("yy", Object.values(component)[1]);
    // console.log("tagName", tagName);
    // const toKebabCase = (str) => {
    //   return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    // };
    makeComponent(
        component
    );

    return;
}
