import { ref, reactive, computed } from "vue";

export const Hello = {
  setup() {
    const authorObj = reactive({
      author: "John",
      books: [
        { title: "Book 1", year: 2010 },
        { title: "Book 2", year: 2011 },
        { title: "Book 3", year: 2012 },
        { title: "Book 4", year: 2012 },
        { title: "Book 5", year: 2012 },
        { title: "Book 6", year: 2012 },
      ],
    });

    const rmBook = () => authorObj.books.pop();

    const enoughBooksBtnClass = computed(() =>
      authorObj.books.length > 2 ? "btn-primary" : "btn-danger"
    );
    const count = ref(0);
    return { count, authorObj, rmBook, enoughBooksBtnClass };
  },
  template: /*html*/ `

    <h1>Hello</h1>
    <p class="btn" :class="enoughBooksBtnClass" @click="count++">Count: {{count}}</p>
    <button class="btn btn-outline-primary" @click="rmBook">Remove book</button>
    <p>Number of books: {{authorObj.books.length}}</p>

  `.trim(),
  // or `template: '#my-template-element'`
};
