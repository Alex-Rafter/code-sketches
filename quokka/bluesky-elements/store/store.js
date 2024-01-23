import { createApp, reactive } from "petite-vue";
import { ucr } from "./ucr.js";
import { utils } from "./utils.js";
import { sl } from "./shortlist.js";
import { capModal } from "./cap-modal.js";

export function createGlobalState() {
  window.store = reactive({
    sitename: "Bluesky",
    utils,
    ucr,
    sl,
    capModal
  });

  createApp({ store }).mount();
}
