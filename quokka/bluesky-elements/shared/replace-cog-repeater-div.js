export function replaceCogRepeaterDiv(el, repeaterItemSelector) {
    // gets rid of the extra div that the cog repeater adds around repeater items
    const cogRepeater = el.querySelector('div[id*="Repeater"]');
    if (!cogRepeater) return;
    const repeaterItems = Array.from(
        cogRepeater.querySelectorAll(repeaterItemSelector)
    );
    cogRepeater.replaceWith(...repeaterItems);
}
