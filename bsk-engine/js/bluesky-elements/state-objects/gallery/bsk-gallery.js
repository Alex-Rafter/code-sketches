import { standardInit } from "./standard-init.js";
import { fullWidthInit } from "./full-width-init.js";

export const bskGallery = {
  images: null,
  hasImages: true,
  imgCount: 0,
  thumbs: true,
  thumbsToShow: 4,
  cognoimageUrl: "https://bluesky.sirv.com/Websites/cog_boilerplate/images/noimage/cognoimage.png",
  videoUrl: null,
  dynamicVideoHeight: {
    height: "auto",
  },
  galleryClick(el) {
    $(".gallery--fw").slick("slickGoTo", el.dataset.imgIndex);
  },
  init(el) {
    this.imgCount = this.images.split(',').length

    if (this.imgCount < 2 && this.images.split(',')[0] == '~') {
      this.hasImages = false;
    }

    if (this.is === "full-width") {
      fullWidthInit(el);
    } else {
      const self = this;
      $(el).on('init', function (event, slick) {
        setTimeout(() => self.getFirstSlideHeight(), 100)
        window.addEventListener("resize", self.getFirstSlideHeight);
      });
      standardInit(el, this.thumbsToShow);
    }
    this.listenForVideoLaunch()
  },
  getFirstSlideHeight() {
    const firstSlideHeight = document.querySelector(".slick-slide").offsetHeight;
    this.dynamicVideoHeight.height = `${firstSlideHeight - 20}px`;
  },
  listenForVideoLaunch() {
    document.addEventListener("launch-video", () => this.$refs["video-fancybox"].click())
  }


};
