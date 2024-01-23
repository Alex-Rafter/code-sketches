import { sharedSlickOptions } from "./shared-slick-options.js";
import { sharedThumbsOptions } from "./shared-slick-options.js";

export function standardInit(el, thumbsToShow) {
  const gallery = el.querySelector(".gallery:not(.gallery--fw)");
  const thumbs = el.querySelector(".gallery-thumbs:not(.gallery-thumbs--fw)");
  $(gallery).slick({
    slide: ".img-slide",
    asNavFor: thumbs,
    ...sharedSlickOptions,
  });

  $(thumbs).slick({
    rows: 0,
    slidesToShow: thumbsToShow,
    slidesToScroll: 1,
    asNavFor: gallery,
    centerMode: false,
    focusOnSelect: true,
    ...sharedThumbsOptions,
  });
}
