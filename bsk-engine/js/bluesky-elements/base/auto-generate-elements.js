import { makeComponent } from "./make-component.js";
// import { stateObjects } from "../state-objects/index.js";

export function autoGenerateBskElement(component) {
  console.log("component x: ", component);
  // const toKebabCase = (str) => {
  //   return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  // };
  // console.log("component", component, Object.keys(component)[0]);
  // const tagName = toKebabCase(Object.keys(Object.keys(component)[0]))
  // console.log("tagName", tagName);


  // const tagName = toKebabCase(Object.keys(component)[0])
  console.log("yy", Object.values(component)[1]);
  // console.log("tagName is", component.values(component)[0]);

  makeComponent(
    Object.values(component)[1]
  );

  return;
}
