/*
Fizzbuzz exercise from Eloquent JS

Print all the numbers from 1 to 100, with these exceptions :

    - For numbers divisible by 3, print "Fizz" instead of the number.
    - For numbers divisible by 5 (and not 3), print "Buzz" instead.
    - For numbers that are divisible by both 3 and 5, print "FizzBuzz".

*/

const obj = {
    3: 'Fizz',
    5: 'Buzz'
}

for (let i = 1; i < 100; i++) {
    let output = '';
    Object.keys(obj).forEach(key => output += (i % key === 0) ? obj[key] : '')
    console.log(output || i)
}
