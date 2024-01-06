// Calling prototype methods of same name as object's
// Using super to do this with multiple levels of inheritance
const action = {
    type: 'actions',
    makeNoise() {
        return `woof`
    }
}

const dog = {
    makeNoise() {
        // Super works regardless of levels inheritance
        return super.makeNoise()
        // Using below errors with more than 1 level of inheritance
        // return Object.getPrototypeOf(this).makeNoise.call(this)
    }
}

Object.setPrototypeOf(dog, action)
const lab = Object.create(dog)
console.log(lab.makeNoise())