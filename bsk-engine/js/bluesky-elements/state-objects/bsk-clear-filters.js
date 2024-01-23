export const bskClearFilters = {
  resetAll() {
    const arrOfSelects = Array.from(document.querySelectorAll("select"));
    arrOfSelects.forEach((select) => (select.selectedIndex = 0));
  },
};
