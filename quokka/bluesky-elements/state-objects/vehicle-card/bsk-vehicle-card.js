export const bskVehicleCard = {
  mounted(el) {
    function checkBasedOnList() {
      if (
        store.utils.currentBreakPoint.match(/xs|sm/) &&
        store.ucr.gridType === "list"
      ) {
        store.ucr.toggleGridType();
      }
    }
    window.onresize = () => checkBasedOnList();
  },
};
