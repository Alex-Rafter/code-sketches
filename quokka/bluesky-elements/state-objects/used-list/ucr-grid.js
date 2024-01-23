export const bskUcrGrid = {
    listTransition : false,
    gridTransition : false,
    replaceCogRepeaterDiv(el) {
        const cogRepeater = el.querySelector('div[id*="RepeaterUpdatePanel"]');
        if (!cogRepeater) return;
        const repeaterItems = Array.from(cogRepeater.querySelectorAll('bsk-vehicle-card'));
        cogRepeater.replaceWith(...repeaterItems)
    },
    init(el) {
        const childEls = Array.from(el.querySelectorAll('bsk-vehicle-card'))
        childEls.forEach((el, index) => {
            el.setAttribute('style', `--grid-item-index : ${index}`)
        })
        this.replaceCogRepeaterDiv(el)
    }
  };
