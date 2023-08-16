import { ref } from "vue";

export const Title = {
  props: ["text"],
  setup() {
    const count = ref(0);
    return { count };
  },
  template: /*html*/ `

    <h1>{{text || 'no text'}}</h1>

  `.trim(),
  // or `template: '#my-template-element'`
};
