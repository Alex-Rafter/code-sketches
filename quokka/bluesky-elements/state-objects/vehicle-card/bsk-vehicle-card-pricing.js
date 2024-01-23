export const bskVehicleCardPricing = {
  price : null,
  was: null,
  now: null,
  save: null,
  formatThousands(price) {
    if (price !== null && !price.includes(",")) {
      return price.replace(/([0-9]{3})$/, ",$1");
    } else {
      return price;
    }
  },
};
