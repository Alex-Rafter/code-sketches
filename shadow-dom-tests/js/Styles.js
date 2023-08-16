import { h } from "https://esm.sh/preact";
import { useEffect, useRef } from "https://esm.sh/preact/hooks";
import htm from "https://esm.sh/htm";

const html = htm.bind(h);

export const Styles = () => {
    const linkRef = useRef(null);
    useEffect(() => linkRef.current.setAttribute('href', window.stylesheetHref), []);
    return html`<link rel="stylesheet" ref=${linkRef}/>`
}