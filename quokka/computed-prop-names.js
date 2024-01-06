const obj = {
    init() {
        this.updatePropNames()
    },
    updatePropNames() {
        const randomString = Math.random().toString(36).substring(5)
        this[randomString] = randomString
        console.log(obj)
    }
}

obj.init()

const objTwo = (() => {
    const randomString = Math.random().toString(36).substring(5)
    return {
        init() {
            this.updatePropNames()
        },
        updatePropNames() {
            this[randomString] = randomString
            console.log(obj)
        }
    }
})()

objTwo.init()
