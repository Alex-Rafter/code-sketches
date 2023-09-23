/*
Bean counting
Write a function countBs that takes a string as its only argument
and returns a number that indicates how many uppercase “B” characters
there are in the string.

Next, write a function called countChar that behaves like countBs,
except it takes a second argument that indicates the character
that is to be counted (rather than counting only uppercase “B” characters).
Rewrite countBs to make use of this new function.

*/

// First Task
const countBsFirstVersion = (string) => Array.from(string).filter(c => c === 'B').length

// console.log(countBsFirstVersion('BigBBB String'))

// Second Task with re-worked countBs function
const countChar = (string, char) => Array.from(string).filter(c => c === char).length
const countBs = (string) => countChar(string, 'B')

// console.log(countChar('Big BBB String', 'B'))
console.log(countBs('Big Basic Box', 'B'))