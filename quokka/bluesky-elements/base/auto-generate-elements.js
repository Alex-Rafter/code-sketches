import { makeComponent } from "./make-component.js";
import { stateObjects } from "../state-objects/index.js";

export function autoGenerateBskElements() {
  const ts = [...new Set(Array.from(document.querySelectorAll("template[bsk-element]")).map(t => t.getAttribute("bsk-element")))]
  const camelCaseTagName = (t) => `${t.replace(/-([a-z])/g, (v) => v[1].toUpperCase())}`;
  const quickComponent = async (t) => {
    const state = !stateObjects[camelCaseTagName(t)]
      ? {}
      : stateObjects[camelCaseTagName(t)];

    makeComponent(
      `${t}`,
      `template[bsk-element="${t}"]`,
      state
    );
  };

  Promise.all(ts.map(quickComponent))
}
