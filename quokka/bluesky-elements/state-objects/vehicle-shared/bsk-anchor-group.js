// import { ScrollSpy } from "bootstrap";

export const bskAnchorGroup = {
    links: [],
    arrOfObjs: [],
    fixToTop: false,
    initalOffsetTop : null,
    scrollspy : false,
    fixOnScroll : false,
    init(el) {
        this.arrOfObjs = []
        this.arrOfObjs = JSON.parse(this.links)
        if (this.scrollspy == true) {
            this.setScrollspy()
        }
        if (this.fixOnScroll == true) {
            this.initalOffsetTop = el.offsetTop
            this.toggleFixed()
        }
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
