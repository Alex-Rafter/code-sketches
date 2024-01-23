import { slickOrGrid } from "../../shared/slick-or-grid.js";

export const bskCapDataPointGroup = {

    init(el) {
        this.$nextTick(() => {
            const slider = el.querySelector('[slot="cards"]');
            $(slider).slick({
                // don't set to infinite : true, it causes card components to be duplicated
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
                dots: true,
                appendDots: $('.cap-data-point-group-slider-dots'),
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 3,
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 6,
                            slidesToScroll: 4,
                        }
                    },
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 8,
                            slidesToScroll: 4,
                        }
                    }
                ]
            });
        });

    },



};
