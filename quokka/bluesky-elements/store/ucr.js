export const ucr = {
  gridType: "grid",
  toggleGridType() {
    const isMob = store.utils.currentBreakPoint.match(/xs|sm/);
    this.gridType = this.gridType === "grid" && !isMob ? "list" : "grid";
  },
};
