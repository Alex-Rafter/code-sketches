import { slickOrGrid } from "../../shared/slick-or-grid.js";
import { nextArrow, prevArrow } from "../../shared/slick-configs.js";

export const bskOpeningHoursSimple = {
  init(el) {
    slickOrGrid(this.$refs.slider, this.slickInstance);
    window.addEventListener("resize", () => slickOrGrid(this.$refs.slider, this.slickInstance));
  },

  slickInstance(selector) {
    return $(selector).slick({
      dots: true,
      infinite: true,
      speed: 500,
      fade: true,
      cssEase: "linear",
      lazyLoad: "ondemand",
      adaptiveHeight: true,
      nextArrow,
      prevArrow,
    })
  }

};
