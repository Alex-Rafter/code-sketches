const arr = [1, 2, 3, 4, 5]

const obj = {
    process(arr) {
        // in the below the arrow function doesn't need to use the thisArg after the callback
        // this is because arrow functions are lexically bound to the object they are part of
        // arr.forEach((value, index, arr) => this.logger(value, index, arr))
        arr.forEach(function (value, index, arr) { this.logger(value, index, arr) }, objTwo)
    },
    logger(item, i, arr) {
        console.log(`
        objOne Logger
        the item is : ${item}
        the index is : ${i}
        it's array is ${arr}
        passed obj is ${this}
        `)
    }
}

const objTwo = {
    process(arr) {
        // in the below the arrow function doesn't need to use the thisArg after the callback
        // this is because arrow functions are lexically bound to the object they are part of
        // arr.forEach((value, index, arr) => this.logger(value, index, arr))
        arr.forEach(function (value, index, arr) { this.logger(value, index, arr) }, this)
    },
    logger(item, i, arr) {
        console.log(`
        objTwo Logger
        the item is : ${item}
        the index is : ${i}
        it's array is ${arr}
        passed obj is ${this}
        `)
    }
}


obj.process(arr)