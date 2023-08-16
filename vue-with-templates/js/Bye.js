import { ref } from "vue";

export const Bye = {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: /*html*/ `

    <h1>Bye!</h1>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam asperiores architecto eius eligendi deleniti, ratione dicta magni porro vero ipsum corporis deserunt consequuntur illum quae officia. Nemo, sit quos!</p>

  `.trim(),
  // or `template: '#my-template-element'`
};
