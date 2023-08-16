import { ref } from "vue";
import { Title } from "./Title.js";
import { TitleTest } from "./Test.js";

export const Wrapper = {
  components: {
    Title,
    TitleTest,
  },
  setup() {
    const count = ref(0);
    const text = ref("I am the prop text");
    return { count, text };
  },
  template: /*html*/ `

  <section>
        <Title :text="text" />
        <hr>
        <TitleTest />
  </section>

  `.trim(),
  // or `template: '#my-template-element'`
};
