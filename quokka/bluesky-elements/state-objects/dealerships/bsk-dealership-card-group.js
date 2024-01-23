import { replaceCogRepeaterDiv } from "../../shared/replace-cog-repeater-div";
export const bskDealershipCardGroup = {
    replaceCogRepeaterDiv,
    init(el) {
        this.replaceCogRepeaterDiv(el, "bsk-dealership-card");
        $(el).slick({
            speed: 300,
            infinite: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
            lazyLoad: "ondemand",
            dots: true,
            arrows: true,
            prevArrow:
                '<button class="carousel-control-prev d-none d-lg-inline-block" type="button"><i class="far fa-angle-left text-muted display-1"></i><span class="visually-hidden">Previous</span></button>',
            nextArrow:
                '<button class="carousel-control-next d-none d-lg-inline-block" type="button"><i class="far fa-angle-right text-muted display-1"></i><span class="visually-hidden">Next</span></button>',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    },
                },
                {
                    breakpoint: 1450,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4,
                    },
                },
            ],
        });
    },
};
