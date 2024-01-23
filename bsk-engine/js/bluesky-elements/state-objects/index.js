import { docsAll } from "./docs/index.js";
import { miscAll } from "./misc/index.js";
import { vehicleCardAll } from "./vehicle-card/index.js";
import { vehicleSharedAll } from "./vehicle-shared/index.js";
import { bskUcrGrid } from "./used-list/ucr-grid.js";
import { offerCardAll } from "./offer-card/index.js";
import { dealershipsAll } from "./dealerships/index.js";
import { carouselBannerAll } from "./hero/index.js";
import { galleryAll } from "./gallery/index.js";
import { spotlightsAll } from "./spotlights/index.js";
import { ctaSectionAll } from "./cta-section/index.js";
import { shortlistAll } from "./shortlist/index.js";
import { pageHeroAll } from "./page-hero/index.js";
import { footerAll } from "./footer/index.js";
import { headerAll } from "./header/index.js";
import { thumbnailAll } from "./thumbnail/index.js";
import { gridAll } from "./grid/index.js";
import { accordionAll } from "./accordion/index.js";
import { openingHoursAll } from "./opening-hours/index.js";
import { locationAll } from "./location/index.js";
import { reviewAll } from "./reviews/index.js";
import { versionSelectAll } from "./version-select/index.js";
import { newVehicleAll } from "./new-vehicle/index.js";
import { articleAll } from "./article/index.js";
import { standardCarousel } from "./carousel/index.js";

const stateObjects = {
    bskUcrGrid,
    ...galleryAll,
    ...vehicleCardAll,
    ...vehicleSharedAll,
    ...miscAll,
    ...docsAll,
    ...offerCardAll,
    ...dealershipsAll,
    ...carouselBannerAll,
    ...spotlightsAll,
    ...ctaSectionAll,
    ...shortlistAll,
    ...pageHeroAll,
    ...footerAll,
    ...headerAll,
    ...thumbnailAll,
    ...gridAll,
    ...accordionAll,
    ...openingHoursAll,
    ...locationAll,
    ...reviewAll,
    ...versionSelectAll,
    ...newVehicleAll,
    ...articleAll,
    ...standardCarousel,
};

export { stateObjects };
