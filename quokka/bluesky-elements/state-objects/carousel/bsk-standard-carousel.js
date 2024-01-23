import { nextArrow, prevArrow } from '../../shared/slick-configs.js';

export const bskStandardCarousel = {
    arrows: false,
    dots: false,
    infinite: false,
    adaptiveHeight: false,
    variableWidth: false,
    fade: false,
    autoplay: false,
    speed: '300',
    rmRepeater: false,
    autoplaySpeed: '3000',
    autoplayPauseOnHover: false,
    vertical: false,
    centerMode: false,
    centerPadding: '30px',
    uniqueTarget: 'standard-carousel',
    cog: false,
    xxlItems: 4,
    xxlScroll: 4 || xxlItems,
    xlItems: 3,
    xlScroll: 3 || xlItems,
    lgItems: 3,
    lgScroll: 3 || lgItems,
    mdItems: 2,
    mdScroll: 2 || mdItems,
    smItems: 2,
    smScroll: 2 || smItems,


    init(el) {

        if (this.rmRepeater) {
            const repeater = el.querySelector('[id*="RepeaterUpdatePanel"]')
            if (! repeater) return
            repeater.replaceWith(...repeater.children)
        }

        const config = {
            dots: this.dots,
            arrows: this.arrows,
            infinite: this.infinite,
            fade: this.fade,
            autoplay: this.autoplay,
            autoplaySpeed: this.autoplaySpeed,
            autoplayPauseOnHover: this.autoplayPauseOnHover,
            speed: this.speed,
            adaptiveHeight: this.adaptiveHeight,
            variableWidth: this.variableWidth,
            vertical: this.vertical,
            centerMode: this.centerMode,
            centerPadding: this.centerPadding,
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            lazyLoad: 'ondemand',
            cssEase: 'linear',
            nextArrow: nextArrow,
            prevArrow: prevArrow,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        slidesToShow: Number(this.smItems),
                        slidesToScroll: Number(this.smScroll),
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: Number(this.mdItems),
                        slidesToScroll: Number(this.mdScroll),
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: Number(this.lgItems),
                        slidesToScroll: Number(this.lgScroll),
                    }
                },
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: Number(this.xlItems),
                        slidesToScroll: Number(this.xlScroll),
                    }
                },
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: Number(this.xxlItems),
                        slidesToScroll: Number(this.xxlScroll)
                    }
                },
            ],


        }

        this.$nextTick(() => $(el.querySelector('[slot="cards"]')).slick(config));

    },


};