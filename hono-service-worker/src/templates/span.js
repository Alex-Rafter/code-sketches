import { html } from 'hono/html'

const Span = (content = []) => {
    return html`<span class="new-test">${content[0]}${content[1]}</span>`
}

export { Span };