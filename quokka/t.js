// messing about with template literals and tagged template literals
const str = (x,y) => z`Hello i am a ${x}, and i will be ${y} out.`
function z(strs, ...values) {
    values = values.map(v => v.toUpperCase())
    return strs.map((str, i) => `${str}${values[i] || ''}`).join("")
}

console.log(str('string', 'logged'))