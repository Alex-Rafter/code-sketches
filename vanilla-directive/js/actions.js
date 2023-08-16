(() => {

    const clicker = document.querySelector('#clicker')
    const changingContent = document.querySelector('#changingContent')
    clicker.addEventListener('click', () => changingContent.textContent = "Clicked")

    logOut = (el) => el.style.backgroundColor = 'red'
})();
