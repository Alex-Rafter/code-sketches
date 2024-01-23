// import { ScrollSpy } from "bootstrap";

export const bskScrollspy = {
    links: [],
    arrOfObjs: [],
    fixToTop: false,
    initalOffsetTop : null,
    init(el) {
        this.arrOfObjs = []
        this.arrOfObjs = JSON.parse(this.links)
        this.setScrollspy()
        this.initalOffsetTop = el.offsetTop
        this.toggleFixed()
    },
    setScrollspy() {
        const baseElement = document.querySelector('body')
        baseElement.classList.add('position-relative')
        const scrollSpy = new ScrollSpy(document.body, {
            target: '#bsk-scrollspy',
            offset: 30
        })
    },
    toggleFixed() {
        const self = this;
        window.onscroll = () => self.fixToTop = window.scrollY > self.initalOffsetTop;
    }
};
