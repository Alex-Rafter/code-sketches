export const utils = {
  currentBreakPoint: "xs",
  breakPoints: {
    567: "sm",
    768: "md",
    992: "lg",
    1200: "xl",
    1600: "xxl",
  },
  setUtilsBreakPoint() {

    const breakPointChangeEvent = new CustomEvent("breakPointChange", {
      bubbles: true,
      detail: { breakPoint: this.currentBreakPoint },
    });

    // cast the key in the for of loop below to an integer
    for (const [key, value] of Object.entries(this.breakPoints)) {
      if (window.innerWidth > parseInt(key)) {
        this.currentBreakPoint = this.breakPoints[key];
        document.dispatchEvent(breakPointChangeEvent);
      }
    }

  },
};

