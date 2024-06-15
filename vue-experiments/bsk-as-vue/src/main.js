

// main.js
// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler'

// import App from './App.vue'
import CapDataPoint from './components/CapDataPoint.vue'


const app = createApp({
    data() {
        return {
            message: 'Hello Vue 3!'
        }
    }
})
app.component('cap-data-point', CapDataPoint)
app.mount('#app')


