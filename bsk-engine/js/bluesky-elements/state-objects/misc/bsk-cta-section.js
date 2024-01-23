export const bskCtaSection = {
    is : 'default',
    aspectRatio: '16/9',
    redirectToValuationPage(el) {
      if (this.is === 'default') return
      console.log('redirectToValuationPage', this.$refs.regInput.value)
      // const url = `/valuation/multi-step-valuation/?Registration=${this.$refs.regInput}`
    },
    init(el) {
      console.log('bskCtaSection', el)
    }
  };
