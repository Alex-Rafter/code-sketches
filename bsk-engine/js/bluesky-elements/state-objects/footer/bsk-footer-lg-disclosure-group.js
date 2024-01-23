export const bskFooterLgDisclosureGroup = {
    sectionOneTitle: null,
    sectionTwoTitle: null,
    sectionBottomTitle: null,
    openDisclosureGroupItems: false,
    isFooterFormVariant: false,
    init(el) {
        this.setDisclosureOpenState(el)
        window.addEventListener('resize', (event) => this.setDisclosureOpenState(el));


        if (this.is == 'footer-form') {
            this.isFooterFormVariant = true;
        }

    },
    setDisclosureOpenState(el) {
        this.openDisclosureGroupItems = window.innerWidth > 991 ? true : false;
    }



};
