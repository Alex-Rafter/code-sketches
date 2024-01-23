export const bskAccordionItem = {
    title : null,
    content : null,
    show : false,
    init(el) {
        el.parentElement.classList.add("accordion-item");
        const randAlphaNumeric = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        const targetIdToSet = `collapse_${randAlphaNumeric}`;
        const button = this.$refs.button
        const collapse = this.$refs.collapse
        collapse.setAttribute("id", targetIdToSet)
        button.dataset.bsTarget = `#${targetIdToSet}`;
        button.setAttribute("aria-controls", targetIdToSet);
        if (this.show) {
            button.setAttribute("aria-expanded", "true");
            button.classList.remove("collapsed");
            collapse.classList.add("show")
        }
    },
};
