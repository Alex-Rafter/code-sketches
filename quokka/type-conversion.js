// Explicitly convert types
let amount = '1000'
let flNum = '10.5'

// amount = parseInt(amount)
// amount = +amount
amount = Number(amount)

// amount = amount.toString()
amount = String(amount)

// console.log(typeof amount) // string

// flNum = parseFloat(flNum)
// flNum = Number(flNum)

console.log(typeof flNum) // string