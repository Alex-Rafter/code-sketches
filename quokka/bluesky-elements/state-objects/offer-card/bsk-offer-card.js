export const bskOfferCard = {
  imgSrc: null,
  title: null,
  offerText: null,
  offerUrl: null,
  offerPrice: null,
  buttonText: null,
  mounted( el ) {
    const offerText = el.getAttribute( 'offer-text' );
    if (offerText && offerText.length > 60) {
      this.offerText = `${offerText.substring(0,60)}...`;
    }
  }
};
