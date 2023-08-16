import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
import { prefetch } from "https://cdn.jsdelivr.net/npm/quicklink@2.3.0/+esm"


const urlAndPreFetch = (ctx) => {
    console.log(ctx.el)
    ctx.el.dataset.url = ctx.exp
    if (ctx.modifiers.prefetch) 
    ctx.el.addEventListener('mouseenter', () => prefetch(ctx.exp))
    return () => { }
}


// const preFetch = (ctx) => {
//     ctx.el.addEventListener('mouseenter', () => prefetch(ctx.exp))
//     ctx.el.dataset.url = ctx.exp
//     return () => { }
// }


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
        pre : true,
        url : props.url,
        $template : `<button @click="fetch" @vue:mounted="prefetch($el)" class="btn btn-primary">inc</button>`,
 
        // methods
        showOffcanvas() {
            window.bsOffcanvas.show()
        },

        prefetch(el) {
            if (! this.pre) return 
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

// function PreviewTrigger() {
//     return {
//         showOffcanvas() {
//             window.bsOffcanvas.show()
//         },
    
//         async fetch(el) {
//             console.log(el.target)
//             const file = el.target.dataset.url
//             let myObject = await fetch(file);
//             let myText = await myObject.json();
//             Object.keys(myText).forEach(key => preview[key] = myText[key])
//             this.showOffcanvas()
//         },
//     }
// }


const preview = reactive({

    message: 'hello world',
 
    // showOffcanvas() {
    //     window.bsOffcanvas.show()
    // },

    // async fetch(el) {
    //     console.log(el.target)
    //     const file = el.target.dataset.url
    //     let myObject = await fetch(file);
    //     let myText = await myObject.json();
    //     Object.keys(myText).forEach(key => this[key] = myText[key])
    //     this.showOffcanvas()
    // },
})

createApp({ preview, DetailsPreview, PreviewTrigger }).directive('url', urlAndPreFetch).mount()


// const itemsToMount = { store, Offcanvas }
// const root = document.getElementById("root")
