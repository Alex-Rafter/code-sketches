const json = require('./dl-full.json')
const descs = json.filter(checkAndReturn)
// const mdOnly = json.filter(item => item.description.includes('#'))
// const checkAndReturn = x => x.includes('.md') && x

function checkAndReturn(item) {
    // 
    const boolOne = item.description.includes('#na_publish')
    let boolTwo = false
    const filenames = item.files
    // 
    const checkAndLog = filename => filename.includes('blog.md') && filename
    for (const filename in filenames) if (checkAndLog(filename)) boolTwo = true
    // 
    if (boolOne && boolTwo) return item
}

console.log(descs)

// descs.forEach(item => {
//     const arrOfFIles = item.files
//     const checkAndLog = x => x.includes('notes.md') && x
//     for (const x in arrOfFIles) (checkAndLog(x)) && console.log(x) 
// })

// console.log(Object.keys(descs[0].files)[0])
// const checkTrues = (item) => Object.keys(item.files).filter(item => item.includes('blog.md'))
// const justMds = descs.filter(checkTrues)
// const arrayOfTrues = Object.keys(descs[0].files).map(item => item.includes('.md'))
// justMds.forEach(item => console.log(item.files))
// console.log(descs[0].files)
// const data = JSON.parse(json)
// console.log(Object.keys(json[0].description))
// console.log(json[1].description)
// console.log(json[0].files)
// console.log(Object.keys(json[0].files)[0])
// console.log(Object.values(json[0].files)[0])