window.addEventListener('DOMContentLoaded', (event) => {
    // Object that we want to bind
    const data = {
        text: ''
    };

    // Proxy handler to react on property changes
    const handler = {
        set(target, property, value) {
            target[property] = value;
            // Update UI when property changes
            if (property === 'text') {
                document.getElementById('myInput').value = value;
                document.getElementById('output').innerText = value;
            }
            return true; // indicates success
        }
    };

    // Creating a proxy with the handler
    const proxyData = new Proxy(data, handler);

    // Event listener for the input to update the proxy (and therefore the data object)
    document.getElementById('myInput').addEventListener('input', function (e) {
        proxyData.text = e.target.value; // This updates the data object and the bound UI elements
    });

    // Now, the data object and the input field are two-way bound.
    // Updating the input field updates the data object, and updating the data object updates the input field.

});