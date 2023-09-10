// Messing about with little closure exercises, after reading closure into in Eloquent JS Book.
// Initial exercise was taken from Eloquent JS.
// For the rest, i asked chatgpt to give me a bunch of closure exercises, and these are my workings for them.

// 1 Counter Function
function createCounter() {
    let i = 1
    return () => i++
}

const counter = createCounter()

console.log(counter())
console.log(counter())
console.log(counter())

// 2 Multiplier Function

function createMultiplier(factorOne, factorTwo) {
    return (arg) => (factorOne * factorTwo) * arg
}

const multi = createMultiplier(3, 8)
console.log(multi(4))

// 3 String Appender
function createStringAppender(str) {
    return arg => `${arg} ${str}`
}

const msg = createStringAppender('world!')
console.log(msg('hello'))

// 4 Array accumulator

function arrayAccumulator() {
    const arr = []
    return arg => {
        arr.push(arg)
        return arr
    }
}

const accumulator = arrayAccumulator()
console.log(accumulator(1))
console.log(accumulator(2))
console.log(accumulator(7))

// 5 Event Emitter

function createEmitter() {
    const eventListeners = {}
    return {
        on(event, cb) {

            if (!eventListeners[event]) {
                eventListeners[event] = []
            }

            eventListeners[event].push(cb)

        },
        emit(event) {

            if (eventListeners[event]) {
                eventListeners[event].forEach(cb => cb())
            }

        }
    }
}

const myEmitter = createEmitter()
myEmitter.on('click', () => console.log('test'))
myEmitter.on('click', () => console.log('test 2'))
myEmitter.on('click', () => console.log('test 3'))
myEmitter.on('hover', () => console.log('hovered'))
myEmitter.emit('click')
myEmitter.emit('hover')

// 6 Rate Limiter

function rateLimiter(cb, time) {
    let blockFunc = false

    return () => {
        if (!blockFunc) {
            cb()
            blockFunc = true
            setTimeout(() => blockFunc = false, time)
        }
    }

}

const limitedFunc = rateLimiter(() => console.log('limited click'), 1000)
limitedFunc()
limitedFunc()
limitedFunc()
setTimeout(limitedFunc, 2000)
setTimeout(limitedFunc, 4000)
