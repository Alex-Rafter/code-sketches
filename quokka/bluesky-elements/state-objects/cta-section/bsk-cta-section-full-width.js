import { sharedCtaLogic } from './shared-logic.js';

const bskCtaSectionFullWidth = {
  redirectWithRegAndMileage() {
    const registration = this.$refs.regInputFullWidth.value;
    const mileage = this.$refs.mileageFullWidth.value;
    let redirectLink = `${this.serviceBookingPage}?regNumber=${registration}&mileage=${mileage}`;
    window.location.href = redirectLink;
  },
  redirectWithReg() {
    const registration = this.$refs.regInputFullWidth.value;
    window.location.href = `${this.valuationPage}?Registration=${registration}`;
  },
};

Object.assign(bskCtaSectionFullWidth, sharedCtaLogic);

export { bskCtaSectionFullWidth };