// this runs in Node.js on the server.
import { createSSRApp } from 'vue'
// Vue's server-rendering API is exposed under `vue/server-renderer`.
import { renderToString } from 'vue/server-renderer'
import { MainH } from './Mainh.js'

const app = createSSRApp(MainH)
// app.component('Main', Main)

renderToString(app).then((html) => {
  console.log(html)
})
