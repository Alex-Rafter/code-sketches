function Phone(make, price) {
    this.make = make
    this.price = price
}

Phone.prototype.priceStr = function () {
    return `price : £${this.price}`
}

const p3330 = new Phone('Nokia', 69)
const pixel6a = new Phone('Google', 699)

// console.log(p3330.priceStr())

function x() {
    const _name = 'Alex'

    return {
        _name: _name,
        get name() {
            return this._name.toUpperCase()
        }
    }
}

const objy = x()

console.log(objy)

// console.log('p3330', p3330)
// console.log('Pixel6a', pixel6a)
