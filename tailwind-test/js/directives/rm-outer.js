export const rmOuter = (ctx) => {
    ctx.el.replaceWith(ctx.el.querySelector(`*`))
    return () => {
        // cleanup
    }

};