export const wrapDirective = (ctx) => {
    const el = ctx.el
    let elLastChild = el.children[el.children.length - 1]

    function updateLastChild(theEl) {
      if (theEl != undefined && theEl.children.length > 0) {
        elLastChild = theEl.children[theEl.children.length - 1];
        updateLastChild(elLastChild);
      }
    };

    updateLastChild(elLastChild)

    const elToAppendTo = elLastChild === undefined ? el : elLastChild
    const elParent = ctx.el.parentElement
    const elParentChildren = Array.from(elParent.children)
    const fragment = document.createDocumentFragment()

    //
    elParent.lastElementChild.remove()
    elParentChildren.filter(child => (child !== el && child.tagName !== 'STYLE')).forEach(child => fragment.appendChild(child))
    elToAppendTo.appendChild(fragment)
    elParent.appendChild(el)

     return () => {
      // cleanup if the element is unmounted
    }
  }