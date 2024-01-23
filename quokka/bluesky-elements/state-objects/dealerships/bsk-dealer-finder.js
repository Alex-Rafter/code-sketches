export const bskDealerFinder = {
  tabs: null,
  offsetTop: null,
  offsetTopMob: null,
  inlineCssVars: {},
  rowCols : null,
  init(el) {
    this.setInlineCssVars()
  },
  lCaseNoSpaces(text) {
    return text.toLowerCase().replace(/\s/g, '-')
  },
  setInlineCssVars() {
    this.inlineCssVars = {}
    if (this.offsetTop) {
      this.inlineCssVars['--offset-top'] = this.offsetTop;
    }
    if (this.offsetTopMob) {
      this.inlineCssVars['--offset-top-mob'] = this.offsetTopMob;
    }
  }
};