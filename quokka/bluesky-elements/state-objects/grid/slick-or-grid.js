import { nextArrow, prevArrow } from "../../shared/slick-configs";

export function slickOrGrid(el) {
    const bodyWidth = document.body.clientWidth;
    const elToAddSlickTo = el.querySelector("[slot='grid']");
    const slickIsAlreadyInitialized = el.querySelector(".slick-initialized");

    if (bodyWidth < 992) {
        if (slickIsAlreadyInitialized) {
            return;
        }
        // init slick
        initSlick(elToAddSlickTo);
    } else {
        if (slickIsAlreadyInitialized) {
            // unslick
            $(elToAddSlickTo).slick("unslick");
        }
    }
}

function initSlick(elToAddSlickTo) {
    $(elToAddSlickTo).slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
        lazyLoad: "ondemand",
        adaptiveHeight: true,
        nextArrow,
        prevArrow,
    });
}
