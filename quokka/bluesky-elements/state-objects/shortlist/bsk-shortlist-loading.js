export const bskShortlistLoading = {
    loading : true,
    init(el) {
       // listen for event emitted from shortlist ajax when fetch is complete and before items added to dom
        document.addEventListener("shortlistLoaded", e => this.loading = false)
    }
}