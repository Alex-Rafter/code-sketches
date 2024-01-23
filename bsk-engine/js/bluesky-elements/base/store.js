import { createApp, reactive } from "petite-vue";

export function createGlobalState() {
  window.store = reactive({
    sitename: "Bluesky",
    utils : {
      breakPoint : 'xs',
    },
    ucr: {
      gridType: "grid",
      toggleGridType() {
        const isMob = store.utils.breakPoint.match(/xs|sm/)
        this.gridType = this.gridType === "grid" && ! isMob ? "list" : "grid";
      },
    },
  });

  createApp({ store }).mount();
}
