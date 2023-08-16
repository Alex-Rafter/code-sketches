import { getText } from './getText.js';

getText('all.json')

// https://codepen.io/davehert/pen/MWrYjZy
// Init the carousel
document.addEventListener("DOMContentLoaded", function () {

    var element = document.getElementById("hotKeyCarousel");
    var myCarousel = new bootstrap.Carousel(element, { interval: 2000, ride: 'carousel', pause: false });
    // overrides for BS weakass carousel implementation
    // myCarousel.pause()
    // setInterval(() => myCarousel.next(), 2000);
});