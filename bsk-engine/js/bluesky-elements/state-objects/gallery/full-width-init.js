import { sharedSlickOptions } from "./shared-slick-options.js";
import { sharedThumbsOptions } from "./shared-slick-options.js";

export function fullWidthInit(el) {
  const gallery = el.querySelector(".gallery--fw");
  const thumbs = el.querySelector(".gallery-thumbs--fw");
  $(gallery).slick({
    slide: ".img-slide--fw",
    rows: 0,
    ...sharedSlickOptions,
  });

  $(thumbs).slick({
    slidesPerRow: 2,
    slidesToScroll: 1,
    rows: 2,
    ...sharedThumbsOptions,
  });
  // On before slide change
  $(gallery).on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      const activeThumbs = Array.from(
        document.querySelectorAll(".gallery-thumbs--fw .slick-active picture")
      );
      const indexOfFirstActiveThumb = activeThumbs[0].dataset.imgIndex;
      const indexOfLastActiveThumb = activeThumbs[3].dataset.imgIndex;

      if (nextSlide == slick.$slides.length - 1) {
        $(thumbs).slick("slickGoTo", -1);
      }

      if (currentSlide == slick.$slides.length - 1 && nextSlide == 0) {
        $(thumbs).slick("slickGoTo", 0, true);
      } else if (nextSlide > indexOfLastActiveThumb) {
        $(thumbs).slick("slickNext");
      } else if (nextSlide < indexOfFirstActiveThumb) {
        $(thumbs).slick("slickPrev");
      }
    }
  );
}
