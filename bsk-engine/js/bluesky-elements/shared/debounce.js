export function debounce(obj, timeoutLength = 100) {
    let timeoutFunc;
    window.addEventListener("resize", () => {
        clearTimeout(timeoutFunc);
        timeoutFunc = setTimeout(() => obj.fn(), timeoutLength);
    });
}