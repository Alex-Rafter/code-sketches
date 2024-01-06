// Calling prototype methods of same name as object's
// Using super to do this with multiple levels of inheritance
// Only needed when using methods of the same name.
// The method call on inherited methods works with both super
// and older approach when the method names aren't the same.
const action = {
    type: 'actions',
    makeNoise() {
        return `woof`
    }
}

const dog = {
    type: 'animal',
    makeNoise() {
        // Super works regardless of levels inheritance
        return super.makeNoise()
        // Using below errors with more than 1 level of inheritance
        // return Object.getPrototypeOf(this).makeNoise.call(this)
    }
}

Object.setPrototypeOf(dog, action)
const lab = {
    type() {
        return super.type
    }
}

Object.setPrototypeOf(lab, dog)
// Object.create(dog)
console.log(lab.makeNoise())
console.log(lab.type())