import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat)

export const bskReview = {
    imgSrc: null,
    sourceName: null,
    location: null,
    rating: null,
    reviewDate: null,
    solidStars: null,
    emptyStars: null,
    init(el) {
        if (this.rating) {
            this.calcStars();
        }
        if (this.reviewDate) {
            this.reviewDate = this.formatDate(this.reviewDate);
        }
        if (!this.imgSrc) {
            this.imageFallback();
        }
    },
    calcStars() {
        this.solidStars = Math.floor(this.rating);
        this.emptyStars = 5 - this.solidStars;
    },
    imageFallback() {
        this.imgSrc = "https://cogcms.co.uk/media/ytrlnbty/fallback-v2.jpg";
    },
    formatDate(dateString) {
        const dateInCognitionFormat = dayjs(dateString, "DD/MM/YYYY", true);
        const date = dateInCognitionFormat.isValid() ? dateInCognitionFormat : dayjs(dateString);
        const now = dayjs();
        const diffDays = now.diff(date, "day");
        return `${diffDays} days ago`;

    },
};
