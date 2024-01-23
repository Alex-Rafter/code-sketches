import anime from 'animejs';
export const readMore = {
    showAllContent: false,
    fullHeight: null,
    partiallyHiddenHeight: null,
    dynamicInlineStyles: null,
    initReadMore(el) {
        this.dynamicInlineStyles = {}
        this.setInlineStylesState();
        window.addEventListener('resize', () => this.setInlineStylesState());
    },
    setInlineStylesState() {
        this.dynamicInlineStyles = null

        this.$nextTick(() => {
            this.fullHeight = this.$refs.content.offsetHeight;
            this.partiallyHiddenHeight = (0 + this.$refs.content.offsetTop / 3);
            this.dynamicInlineStyles = {}
            this.dynamicInlineStyles.height = this.showAllContent === true ? `${this.fullHeight}px` : `${this.partiallyHiddenHeight}px`
        });

    },
    toggleMoreSpecs(el) {
        const specItems = this.$refs.content
        const animeConfig = {
            targets: specItems,
            easing: 'easeInOutQuad',
            duration: 750,
            height: this.showAllContent === true ? this.partiallyHiddenHeight : this.fullHeight,
        }
        anime(animeConfig);
        this.showAllContent = !this.showAllContent;
    },
}