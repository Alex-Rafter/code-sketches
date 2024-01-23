import { slickOrGrid } from "./slick-or-grid.js";
export const bskGridSlickToRow = {
    init(el) {
        slickOrGrid(el);
        window.addEventListener("resize", () => slickOrGrid(el));
    },
};
