export const bskInlineOfferCard = {
    offerTitle: null,
    offerBody: null,
    offerFinanceDetails: null,
    lineClampLength : 3,
    init(el, component) {
        this.offerFinanceDetails = JSON.parse(
            el.closest(component).getAttribute("offer-finance-details").replace(/`/g, '"')
        );
    }
};
