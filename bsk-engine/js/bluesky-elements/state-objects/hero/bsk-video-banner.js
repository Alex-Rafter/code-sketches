export const bskVideoBanner = {
    youtubeId: null,
    heroBgHeight: "100vh",
    heroBgHeightMobile: "calc(100vh - 93px);",
    buttonText: null,
    buttonUrl: null,
    headline: null,
    synopsis: null,
    init(el) {
        window.ytInitMain();
    },
};
