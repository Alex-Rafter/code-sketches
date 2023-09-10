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

    const

    return {
        eventListeners: [],
        on(event, cb) {
            this.eventListeners.push({ event: cb })
        },
        emit(e) {
            Object.keys(this.eventListeners).find(e)
        }
    }
}

const emit = createEmitter()
console.log(emit.on("click", () => console.log("test")))
