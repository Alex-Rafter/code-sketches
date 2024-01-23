export const bskAccordionGroup = {
    flush: false,
    alwaysOpen: false,
    init(el) {
        const randAlphaNumeric = Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5);
        const id = `accordionGroup_${randAlphaNumeric}`;
        el.setAttribute("id", id);
        const nestedAccordionItems = el.querySelectorAll(
            "bsk-accordion-item .accordion-collapse"
        );
        if (this.flush) {
            el.classList.add("accordion-flush");
        }
        if (!this.alwaysOpen) {
            nestedAccordionItems.forEach(
                (item) => (item.dataset.bsParent = `#${id}`)
            );
        }
    },
};
