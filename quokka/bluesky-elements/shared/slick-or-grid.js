export function slickOrGrid(elToAddSlickTo, slickOptions) {
    const bodyWidth = document.body.clientWidth;
    const slickIsAlreadyInitialized = elToAddSlickTo.classList.contains("slick-initialized");

    if (bodyWidth < 992) {
        initIfNotInitializedAlready()
    } else {
        unslickIfInitialized()
    }

    function initIfNotInitializedAlready() {
        if (!slickIsAlreadyInitialized) {
            slickOptions(elToAddSlickTo);
        }
    }

    function unslickIfInitialized() {
        if (slickIsAlreadyInitialized) {
            $(elToAddSlickTo).slick("unslick");
        }
    }
}
