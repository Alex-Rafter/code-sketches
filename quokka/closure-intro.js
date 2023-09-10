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

// 4 Array