export const bskThumbnailLogoLinks = {
    logoLinkOne: null,
    logoLinkTwo: null,
    logoLinkThree: null,
    logoLinkFour: null,
    logoLinkFive: null,
    logoLinkSix: null,
    logoCols : 6,
    totalLogoLinksToInject: [],
    init(el) {
        this.totalLogoLinksToInject = [];
        const linkArr = Object.keys(this).filter(key => key.includes("logoLink"));
        linkArr.forEach((link, index) => {
            const x = this[link];
            if (this[link]) {
                this.totalLogoLinksToInject.push(x);
            }

        })
        this.logoCols = this.totalLogoLinksToInject.length;
    },
    splitAndTrim(csv, index) {
        return csv.split(',')[index].trim()
    }
};
