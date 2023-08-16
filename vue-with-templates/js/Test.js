import { ref } from "vue";

export const TitleTest = {
  setup() {
    const count = ref(0);
    return { count };
  },
  template: '#titleTest',
  // or `template: '#my-template-element'`
};
