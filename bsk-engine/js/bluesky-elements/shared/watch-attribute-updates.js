export function watchAttributeUpdatesAndUpdateState(el) {
    // Select the parent element of `el`
    const parent = el.parentElement;
    // Create a new MutationObserver
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "attributes") {
                this[mutation.attributeName] = mutation.target.getAttribute(mutation.attributeName);
                // console.log(`Attribute ${mutation.attributeName} changed!`);
            }
        });
    });

    // Start observing the parent element for attribute changes
    observer.observe(parent, { attributes: true });
}