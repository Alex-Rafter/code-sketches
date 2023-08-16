import { ref, computed } from "vue";
import { Hello } from "./Hello.js";
import { Bye } from "./Bye.js";
import { NotFound } from "./NotFound.js";
import { Wrapper } from "./Wrapper.js";

export const Router = {
  setup() {
    const routes = {
      "/": Wrapper,
      "/hello": Hello,
      "/bye": Bye,
    };

    const currentPath = ref(window.location.hash);
    window.addEventListener("hashchange", () => {
      currentPath.value = window.location.hash;
    });

    const currentView = computed(() => {
      return routes[currentPath.value.slice(1) || "/"] || NotFound;
    });

    return { currentPath, currentView };
  },
  template: /*html*/ `

  <component :is="'style'">
    a {
        color: red;
    }
  </component>

  <a href="#/">Home</a> |
  <a href="#/hello">Hello</a> |
  <a href="#/bye">Bye</a> |
  <component :is="currentView" />

  `.trim(),
};
