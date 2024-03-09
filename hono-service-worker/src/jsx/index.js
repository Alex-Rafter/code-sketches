/** @jsx jsx */
import { Hono } from 'hono';
import { jsx, Fragment } from 'hono/jsx'
import { jsxRenderer } from 'hono/jsx-renderer'
import { createContext, useContext } from 'hono/jsx'

const themes = {
    light: {
        color: '#000000',
        background: '#eeeeee',
    },
    dark: {
        color: '#ffffff',
        background: '#222222',
    },
}

const lightThemeContext = createContext(themes.light)
const darkThemeContext = createContext(themes.dark)

const app = new Hono();

app.use(
    '*',
    jsxRenderer(
        ({ children }) => {
            const theme = useContext(darkThemeContext)
            return (
                <html>
                    <head>
                        <title>Test</title>
                    </head>
                    <body class="body" style={theme}>{children}</body>
                </html>
            )
        }
    )
)

app.get('/', (c) => {
    const numbers = ['one', 'two', 'three']
    return c.render(
        <Fragment>
            <h1>tester</h1>
            <ul>
                {numbers.map((num) => (<li>{num}</li>))}
            </ul>
        </Fragment>
    )
})


self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);
    if (url.href.includes('petite-vue')) return
    event.respondWith(app.fetch(event.request));
});
