/*
Minimum
The previous chapter introduced the standard function Math.min
that returns its smallest argument.
We can build something like that now.
Write a function min that takes two arguments and returns their minimum.
*/

function min(numOne, numTwo) {
    if (isNaN(numOne) || isNaN(numTwo)) return 'error'
    return numOne < numTwo ? numOne : numTwo
}

// const min = (numOne, numTwo) => numOne < numTwo ? numOne : numTwo

console.log(min(0, 10));
console.log(min(0, -10));

