import { colours } from './colours.js';

const basePadding = {
    padding: '30px 0 30px 0'
}

const borderBase = (colour) => `1px solid ${colour}`

const borderBottom = {
    borderBottom: borderBase(colours.light)
}
const borderTop = {
    borderTop: borderBase(colours.light)
}
const borderLeft = {
    borderLeft: borderBase(colours.light)
}
const borderRight = {
    borderRight: borderBase(colours.light)
}

export { basePadding, borderBase, borderBottom, borderTop, borderLeft, borderRight };