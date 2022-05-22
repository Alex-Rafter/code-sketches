const json = require('./dl-full.json')
const descs = json.filter(onlyBlogsToPublish)

function onlyBlogsToPublish(item) {
    // vars
    const isSetToPublish = item.description.includes('#na_publish')
    let isBlogMD = false
    const filenames = item.files
    // actions
    const checkIfBlog = filename => filename.includes('blog.md') && filename
    for (const filename in filenames) if (checkIfBlog(filename)) isBlogMD = true
    if (isSetToPublish && isBlogMD) return item
}

console.log(descs)
