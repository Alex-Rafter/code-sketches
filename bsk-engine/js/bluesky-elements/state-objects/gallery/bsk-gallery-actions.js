
export const bskGalleryActions = {
    init(el) {
        if (this.is == 'buttons') {
            // allows setting the is attribute on the bsk-gallery-actions children
            const x = Array.from(el.children[0].children).filter((child) => child.tagName.startsWith('BSK'));
            x.forEach(child => this.updateAttributes(child, 'is', 'buttons'))
        }
    },
    updateAttributes(el, attribute, value) {
        this.$nextTick(() => {
            el.setAttribute(attribute, value);
        });
    }
};
