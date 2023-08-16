import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
import { prefetch } from "https://cdn.jsdelivr.net/npm/quicklink@2.3.0/+esm"


function DetailsPreview() {
    return {
        mounted(el) {
            window.bsOffcanvas = new bootstrap.Offcanvas(`#${el.id}`)
        }
    }
}

function PreviewTrigger(props) {
    return {
        // data
        pre: true,
        url: props.url,
        $template: `<button @click="fetch" @vue:mounted="prefetch($el)" class="btn btn-primary">inc</button>`,

        // methods
        showOffcanvas() {
            window.bsOffcanvas.show()
        },

        prefetch(el) {
            if (!this.pre) return
            el.addEventListener('mouseover', () => prefetch(this.url))
        },

        async fetch() {
            console.log(this.url)
            let myObject = await fetch(this.url);
            let myText = await myObject.json();
            Object.keys(myText).forEach(key => preview[key] = myText[key])
            this.showOffcanvas()
        },
    }
}

const preview = reactive({
    message: 'hello world',
})

createApp({ preview, DetailsPreview, PreviewTrigger }).mount()