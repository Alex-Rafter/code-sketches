import { h } from 'vue'

export const MainH = {

    // template: /*html*/ `
    // <div>
    //     <h1>{{ message }}</h1>
    //     <p>{{count}}</p>
    //     <p>{{publishedBooksMessage}}</p>

    //     <button @click="changeMessage">Change</button>
    //     <button @click="emptyArray">Empty</button>
    // </div>
    // `,
    // 
    data() {
        return {
            count: 1,
            message: 'Hello Vue!',
            author: {
                name: 'John Doe',
                books: ['Book 1', 'Book 2', 'Book 3']
            }
        }
    },
    // 
    methods: {
        changeMessage() {
            this.message = 'Hello Vue 3!'
        },
        emptyArray() {
            this.author.books = []
        }
    },
    //   
    computed: {
        publishedBooksMessage() {
            return this.author.books.length > 0 ? 'Yes' : 'No'
        }
    },
    mounted() {
        console.log(this.count)
        this.count = 2
    },
    render() {
        return h('div', [
            h('h1', this.message),
            h('p', this.count),
            h('p', this.publishedBooksMessage),
            h('button', { onClick: this.changeMessage }, 'Change'),
            h('button', { onClick: this.emptyArray }, 'Empty')
        ])
    }

}