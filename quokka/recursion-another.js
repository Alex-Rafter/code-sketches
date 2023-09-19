/*
Recursion - Taken from exercises at the end of Functions chapter in Eloquent JS.

- Zero is even.
- One is odd.
- For any other number N, its evenness is the same as N - 2.

Define a recursive function isEven corresponding to this description.
The function should accept a single parameter (a positive, whole number) and return a Boolean.

Test it on 50 and 75. See how it behaves on -1.
Why? Can you think of a way to fix this?

*/

function isEven(wholeNum) {
    const newWholeNum = (wholeNum - 2 < 0) ? wholeNum + 2 : wholeNum - 2
    if (wholeNum === 0 || newWholeNum === 0) {
        return true
    } else if (wholeNum === 1 || newWholeNum === 1) {
        return false
    }
    else {
        return isEven(newWholeNum)
    }
}

console.log(isEven(-1))
