export const bskRemoveRepeaterDiv = {
    mounted(el) {
        const repeater = el.children[0]
        repeater.replaceWith(...repeater.children)
    }
  };
