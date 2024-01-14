const uniqueItems = new Set()
uniqueItems.add('a')
uniqueItems.add(1)
uniqueItems.add([1, 2, 3])
uniqueItems.add({ a: 1, b: 2 })

// console.log(uniqueItems.size) // 4
// console.log(uniqueItems.has('a')) // true
uniqueItems.delete(1)
// console.log(uniqueItems.size) // 3
// console.log(uniqueItems) // false
//uniqueItems.clear()
// console.log(uniqueItems.size) // 0

const flexibleCollection = new Map()
flexibleCollection.set('a', 1)
const obj = { b: 2 }
flexibleCollection.set(obj, { keyPropValue: 2 })
console.log(flexibleCollection.has(obj))
