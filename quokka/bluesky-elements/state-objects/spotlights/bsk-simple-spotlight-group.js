export const bskSimpleSpotlightGroup = {
  url: null,
  slickAlreadyInit: false,
  initSlick(el) {
    $(el).slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      mobileFirst: true,
      adaptiveHeight: true,
      rows: 0,
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      slide: ".strip-slide",
      mobileFirst: true,
      responsive: [
        {
          breakpoint: 992,
          settings: "unslick",
        },
      ],
    });

    $(el).on("destroy", (event, slick, direction) => {
      this.slickAlreadyInit = false;
    });
  },
  checkIfShouldInitSlick(el) {
    if (!this.slickAlreadyInit && window.innerWidth < 992) {
      const spotlights = el.querySelectorAll("bsk-simple-spotlight");
      spotlights.forEach((spot) => spot.classList.add("strip-slide"));
      this.initSlick(el);
      this.slickAlreadyInit = true;
    }
  },
  init(el) {
    if (this.is === "strip") {
      this.checkIfShouldInitSlick(el);
      window.onresize = () =>
        setTimeout(() => this.checkIfShouldInitSlick(el), 200);
    }
  },
};
