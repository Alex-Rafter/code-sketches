export const bskCarouselBannerSlide = {
    buttonText: null,
    linkUrl: null,
    headline: null,
    synopsis: null,
    overlay: true,
    imgSrc: null,
    imgSrcSmall: null,
    imgSrcLarge: null,
    youtubeId: null,
    videoIsInit: false,
    delayVideoLoad: false,
    fadeOutVideo: false,
    initVideo() {
        if (
            !this.youtubeId ||
            this.videoIsInit ||
            store.utils.currentBreakPoint.match(/xs|sm/)
        )
            return;

        this.videoIsInit = true;

        setTimeout(
            () => {
                window.ytInitMain();
                setInterval(this.checkIfVideoIsPlaying, 1000);
            },
            this.delayVideoLoad ? 3000 : 0
        );
    },
    init(el) {
        this.initVideo();
        document.addEventListener(
            "breakPointChange",
            this.initVideo.bind(this)
        );
    },
    checkIfVideoIsPlaying() {
        if (
            window.isVideoPlaying &&
            this.youtubeId &&
            window.isVideoPlaying(this.youtubeId)
        ) {
            this.fadeOutVideo = true;
        }
    },
};
