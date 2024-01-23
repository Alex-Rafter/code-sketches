import { slickOrGrid } from "./slick-or-grid.js";
export const bskGridMasonry = {
    slickMob : false,
    init(el) {
        if (this.slickMob) {
            slickOrGrid(el);
            window.addEventListener("resize", () => slickOrGrid(el));
        }
    },
};
