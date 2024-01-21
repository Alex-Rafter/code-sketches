const sampler = new Map()
sampler.set('a', 1)
sampler.set('b', 2)
sampler.set('c', 3)
sampler.set('d', 4)

const iterator = sampler[Symbol.iterator]()
console.log(iterator.next())

for (const [key, value] of sampler) {
    console.log(key, value)
}

