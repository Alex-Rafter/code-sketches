function messagesToUser(...messages) {
    messages.forEach((message) => {
        console.log(`Hello ${message}`);
    });
}

const messages = ['World', 'Laptop', 'Terminal'];

messagesToUser(...messages);

