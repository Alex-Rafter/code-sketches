export const bskCarouselBanner = {
  youtubeId : null,
  heroBgHeight : '100vh',
  heroBgHeightMobile : 'calc(100vh - 93px);',
  dots : false,
  arrows : true,
  init(el) {
    $('bsk-carousel-banner .slider').slick({
        rows: 0,
        dots: this.dots,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        lazyLoad: 'ondemand',
        adaptiveHeight: true,
        arrows: this.arrows,
        nextArrow: `
        <button class="carousel-control-next" type="button">
            <i class="fa-regular fa-angle-right display-3" aria-hidden="true"></i><span class="visually-hidden">Next</span>
        </button>`,
        prevArrow: `
        <button class="carousel-control-prev" type="button">
            <i class="fa-regular fa-angle-left display-3" aria-hidden="true">
            <span class="visually-hidden">Previous</span>
        </button>`,
      })
  },
};
