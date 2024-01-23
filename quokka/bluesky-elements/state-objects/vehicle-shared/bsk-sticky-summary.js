export const bskStickySummary = {
    specOne : null,
    specTwo : null,
    specThree : null,
    price : null,
    fromPrice : false,
    monthlyPrice : null,
    ctaUrl : null,
    btnText : null,
    fixToTop : false,
    init(el) {
        window.onscroll = () => this.toggleFixed(el)
    },
    toggleFixed(el) {
        this.fixToTop = (window.scrollY >= 500) ? true : false;
    }
};
