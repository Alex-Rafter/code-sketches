const file = Bun.file("./index.html")
const html = await file.text()

const server = Bun.serve({
    port: 3000,
    fetch(request) {
        return new Response(html, {
            method: "POST",
            body: html,
            headers: { "Content-Type": "text/html" }
        });
    },
});

console.log(`Listening on localhost:${server.port}`);