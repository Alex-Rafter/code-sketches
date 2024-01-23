import { toKebabCase } from '../../shared/kebab-case-tab-name.js';
import { readMore } from '../../shared/read-more.js';

const bskTabs = {
    tabs: null,
    icons: null,
    isOpen: false,
    activeIndex: 0,
    readMore: false,
    rmAccordionStyles: true,
    init(el) {
        if (this.readMore) {
            this.initReadMore();
        }
        this.refreshSlickOnTab(el)
        this.setAccordionStyles()
    },
    setAccordionStyles() {
        if (this.is !== 'accordions') return
        this.rmAccordionStyles = (window.innerWidth > 767)
        window.onresize = () => this.rmAccordionStyles = (window.innerWidth > 767)
    },
    refreshSlickOnTab(el) {
        el.addEventListener('shown.bs.tab', function (event) {
            $(`${event.target.dataset.bsTarget} .slick-slider`).slick('refresh');
        })
    },
    toKebabCase,
    toggleOpen(el) {
        this.resetAllIcons()
        this.setActiveTabIcon(el)
    },
    resetAllIcons() {
        // reset all tabs to default state
        // having to use this method due to limitations of petite vue implementation of template refs
        const closedIcons = this.$refs.tabs.querySelectorAll('[class*="icon-closed"]')
        const openIcons = this.$refs.tabs.querySelectorAll('[class*="icon-open"]')
        closedIcons.forEach(icon => icon.classList.remove("d-none"))
        openIcons.forEach(icon => icon.classList.add("d-none"))
    },
    setActiveTabIcon(el) {
        // set correct icon to show for the tab that was clicked
        const openIcon = el.querySelector(".icon-open")
        const closedIcon = el.querySelector(".icon-closed")
        openIcon.classList.toggle("d-none")
        closedIcon.classList.toggle("d-none")
    },
};

// Merge the readMore object into the bskTabs object so as to use readMore in tabs
Object.assign(bskTabs, readMore)

export { bskTabs }