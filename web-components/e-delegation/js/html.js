html(strings, ...values) {
    let htmlString = strings.reduce((result, string, i) => {
        return result + string + (values[i] || '');
    }, '');

    const clickAttribute = htmlString.match(/@click="(.*?)"/)
    // clickAttribute && console.log(clickAttribute[1])
    if (clickAttribute[1]) {
        const eventName = 'click';
        const handler = clickAttribute[1]
        this.addEventListener(eventName, this[handler]);
        // element.removeAttribute('@click');
    }

    // return element;
    return htmlString;
}

export { html }