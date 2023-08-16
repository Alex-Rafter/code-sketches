function watch() {
    const dataWatchEls = Array.from(document.querySelectorAll('[data-blu-watch]'))
    if (!dataWatchEls.length > 0) return
    dataWatchEls.forEach(el => main(el))

}

function main(el) {
    // Parse data-attr contents into array with 2 items
    // 1st : the dom el to watch for mutations
    // 2nd : the function to call on mutation
    let watchData = el.dataset.bluWatch.replace(/[\[|\]]/g, '').split(',');
    watchData = watchData.map(item => item.trim())

    if (typeof watchData[1] === 'undefined') return
    obsy(el, watchData)
}


function obsy(el, watchData) {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // Dynamically call the function set in the data-blu-watch attr
            // The function is passed one argument : 
            // the dom el that the data-attr was set on. 
            // This enables the dom el to be manipulated 
            // inside the dynamically called function
             window[`${watchData[1]}`](el)
        });
    });

    observer.observe(document.getElementById(`${watchData[0]}`), {
        attributes: true,
        childList: true,
        characterData: true
    });
}


window.addEventListener('load', watch)