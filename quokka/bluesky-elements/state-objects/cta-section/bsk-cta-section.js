import { sharedCtaLogic } from './shared-logic.js';

const bskCtaSection = {

  redirectWithRegAndMileage() {
    const registration = this.$refs.regInput.value;
    const mileage = this.$refs.mileage.value;
    let redirectLink = `${this.serviceBookingPage}?regNumber=${registration}&mileage=${mileage}`;
    window.location.href = redirectLink;
},

  redirectWithReg() {
    const registration = this.$refs.regInput.value;
    window.location.href = `${this.valuationPage}?Registration=${registration}`;
  },
}

Object.assign(bskCtaSection, sharedCtaLogic);

export { bskCtaSection };
