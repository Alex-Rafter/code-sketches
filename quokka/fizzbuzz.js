/*
Fizzbuzz exercise from Eloquent JS

Print all the numbers from 1 to 100, with these exceptions :

    - For numbers divisible by 3, print "Fizz" instead of the number.
    - For numbers divisible by 5 (and not 3), print "Buzz" instead.
    - For numbers that are divisible by both 3 and 5, print "FizzBuzz".

*/

const divisibleByThree = (num) => num % 3 === 0
const divisibleByFive = (num) => num % 5 === 0

for (let i = 0; i < 100; i++) {
    let currentNum = (i + 1)
    if (divisibleByThree(currentNum) && divisibleByFive(currentNum)) {
        console.log(`FizzBuzz(${currentNum})`)
    } else if (divisibleByThree(currentNum)) {
        console.log(`Fizz(${currentNum})`)
    } else if (divisibleByFive(currentNum)) {
        console.log(`Buzz(${currentNum})`)
    } else {
        console.log(`${currentNum}`)
    }
}
