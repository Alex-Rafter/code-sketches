import {Router} from "itty-router"
import {message } from "./message.js"
const router = Router()
router.get("/links", () => {
    return new Response("GET /links")
})

router.get("/tester", () => {
    return new Response(`GET /tester ${message}`)
})
router.get("*", () => {
    return new Response("GET *")
})
addEventListener("fetch", event => {
    event.respondWith(router.handle(event.request))
})

// export default {
// 	async fetch(request, env, ctx) {
// 		return new Response('Hello World!');
// 	},
// };


// addEventListener('fetch', event => {
// 	event.respondWith(handleRequest(event.request))
//   })

//   async function handleRequest(request) {
// 	const url = new URL(request.url);
// 	const status = url.searchParams.get('status');

// 	if (status) {
// 	  return new Response(`userStatus updated to ${status}`);
// 	} else {
// 	  return new Response('No status provided', { status: 400 });
// 	}
//   }
