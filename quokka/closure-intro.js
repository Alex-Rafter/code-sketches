// Messing about with little closure exercises, after reading closure into in Eloquent JS Book.


// 1 Counter Function
function createCounter() {
    let i = 1
    return () => i++
}

const counter = createCounter()

console.log(counter())
console.log(counter())
console.log(counter())

//2 Multiplier Function

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
    let arr = []
    return arg => arr.push(arg) && arr
}

const accumulator = arrayAccumulator()
console.log(accumulator(1))
console.log(accumulator(2))
console.log(accumulator(7))


// 5 Event Emitter

function createEmitter() {
    let eventListeners = {}
    return {
        on(event, cb) {
            eventListeners[event] = cb
        },
        emit(e) {
            eventListeners[e]()
        }
    }
}

const myEmitter = createEmitter()
myEmitter.on("click", () => console.log("test"))
myEmitter.on("hover", () => console.log("hovered"))
myEmitter.emit("click")
myEmitter.emit("hover")

// Rate Limiter

function rateLimiter(cb, time) {
    let x = false
    setTimeout(() => {
        x = true
        console.log("testt", x)
    }, time)
    return () => x && cb()
    // setTimeout()
    // return () => cb()
    // let x = true
    // const x = () => () => cb()
    // setTimeout(() => {
    //     y()
    // }, time)
    // function y() {
    //     return () => cb()
    // }
    // if (x = false) {
    //     return () => cb()
    // }
    // while (x = true) { }

}

const limitedFunc = rateLimiter(() => console.log("limited click"), 1000)
limitedFunc()
limitedFunc()
limitedFunc()
limitedFunc()
limitedFunc()





