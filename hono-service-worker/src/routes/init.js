import { Hono } from 'hono';
import { logger } from 'hono/logger'
import { Main } from '../templates/main.js'

const app = new Hono();

// app.use(logger())
app.use('*', async (c, next) => {
    c.setRenderer(content => c.html(Main(content)))
    await next()
})


export { app };
