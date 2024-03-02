console.log('Hello from index.js');
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('../sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration);
            window.location.reload();
        }, function (err) {
            // Registration failed
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
