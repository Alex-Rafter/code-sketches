import { createApp } from 'https://unpkg.com/petite-vue?module'

function Title(props) {
    return {
        msg: props.msg,
        $template: /*html*/`
        <h1 class="text-6xl text-white bg-green-400 col-span-3 text-center uppercase font-bold flex flex-col justify-center w-full h-full">{{msg}}</h1>`,
        mounted() {
            console.log(`I'm mounted!`)
        }
    }
}

// createApp({
//     Title
// }).mount()
