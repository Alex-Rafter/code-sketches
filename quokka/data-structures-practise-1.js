// Messing about with string methods after reading chapter 4 on data structures
// in Eloquent JS
// inc experiment with 'this' inside function to emulate
// how string methods work without explict args - eg 'str'/toUpperCase()


// Won't work as string is primitive type
const str = 'Obj string'
str.toUpper = function () {
    return this.toUpperCase()
}

// But passing to string constructor Will work as it creates a new object
// *Not recommended in actual code though
const str = new String('Obj string')
str.toUpper = function () {
    return this.toUpperCase()
}


// Will also work. The call method binds 'this' to the argument passed to the function
const str = 'Obj string'

function toUpper() {
    return this.toUpperCase()
}

console.log(toUpper.call(str))
