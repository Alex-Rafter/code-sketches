export const bskBreadcrumb = {
  divider: "/",
  itemOne: null,
  itemTwo: null,
  itemThree: null,
  itemFour: null,
  itemFive: null,
  items: [],
  // methods
  pushAsObj(itemNumber) {
    const x = this[`item${itemNumber}`].split(",");
    const y = x.map((item) => item.trim().replace(/^\[|\]$/, ""));
    this.items = this.items.concat([{ text: y[0], url: y[1] }]);
  },
  isLastItem(el, index) {
    if (index + 1 == this.items.length) {
      el.removeAttribute("href");
      return "page";
    }
  },
  init(el) {
    const itemsAttrs = ["One", "Two", "Three", "Four", "Five"];
    itemsAttrs.forEach(this.pushAsObj);
  },
};
