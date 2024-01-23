export const wrapDirective = (ctx) => {
    const el = ctx.el
    const elLastChild = el.children[el.children.length - 1]
    const elToAppendTo = elLastChild === undefined ? el : elLastChild
    const elParent = ctx.el.parentElement
    const elParentChildren = Array.from(elParent.children)
    const fragment = document.createDocumentFragment()

    //
    elParent.lastElementChild.remove()
    elParentChildren.forEach(child => (child !== el) && fragment.appendChild(child))
    elToAppendTo.appendChild(fragment)
    elParent.appendChild(el)

     return () => {
      // cleanup if the element is unmounted
    }
  }