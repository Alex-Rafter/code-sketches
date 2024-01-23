export const sharedCtaLogic = {
    title: null,
    bodyText: null,
    btnText: null,
    single: null,
    aspectRatio: null,
    imgSrc: null,
    valuationPage: "/valuation/multi-step-valuation/",
    serviceBookingPage: "/service-booking/step-1/",

    redirectWithInputValues() {

        if (this.is == 'service-booking') {
            this.redirectWithRegAndMileage();
        } else {
            this.redirectWithReg();
        }

    },
}
