import { html } from 'https://esm.sh/hono/html';
import { reactive } from 'https://unpkg.com/petite-vue?module'

const store = reactive({
    count: 0,
    inc() {
        this.count++
        console.log('count:', this.count)
    }
})

export { store }
