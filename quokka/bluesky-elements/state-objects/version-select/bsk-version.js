import anime from 'animejs';
import { arrayFromCsv } from '../../shared/array-from-csv.js';

export const bskVersion = {
    version: null,
    manufacturer: null,
    model: null,
    currentVehicleModelVersion: null,
    price: null,
    specItems: null,
    modalCtaOneUrl: null,
    modalCtaTwoUrl: null,
    usedVehiclePageUrl: null,
    showAllSpecs: false,
    specsFullHeight: null,
    specsPartiallyHiddenHeight: null,
    specsDynamicInlineStyles: null,
    init(el) {
        this.setSpecItemsState();
        window.addEventListener('resize', () => this.setSpecItemsState());
        if (this.manufacturer && this.model && this.version) {
            this.updateCurrentVehicleModelVersion();
        }
    },
    setSpecItemsState() {
        this.specsDynamicInlineStyles = null

        this.$nextTick(() => {
            this.specsFullHeight = this.$refs.specNoModal.offsetHeight;
            this.specsPartiallyHiddenHeight = (0 + this.$refs.specNoModal.children[11].offsetTop);
            this.specsDynamicInlineStyles = {}
            this.specsDynamicInlineStyles.height = this.showAllSpecs === true ? `${this.specsFullHeight}px` : `${this.specsPartiallyHiddenHeight}px`
        });

    },

    updateCurrentVehicleModelVersion() {
        this.currentVehicleModelVersion = `${this.manufacturer} ${this.model} ${this.version}`;
    },
    toggleMoreSpecs(el) {
        const specItems = this.$refs.specNoModal
        const animeConfig = {
            targets: specItems,
            easing: 'easeInOutQuad',
            duration: 750,
            height: this.showAllSpecs === true ? this.specsPartiallyHiddenHeight : this.specsFullHeight,
        }
        anime(animeConfig);
        this.showAllSpecs = !this.showAllSpecs;
    },
    arrayFromCsv
};
