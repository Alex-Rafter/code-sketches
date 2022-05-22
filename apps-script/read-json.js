function main() {

    const fetchGists = () => UrlFetchApp.fetch('https://api.github.com/users/Alex-Rafter/gists')
    const json = JSON.parse(fetchGists())
    const blogsToPublish = json.filter(onlyReturnBlogsToPublish)

    function onlyReturnBlogsToPublish(item) {
        // vars
        let [isBlogMD, isSetToPublish] = [false, false]
        const filenames = item.files
        // actions
        isSetToPublish = item.description.includes('#na_publish')
        const checkIfBlog = filename => filename.includes('blog.md') && filename
        for (const filename in filenames) if (checkIfBlog(filename)) isBlogMD = true
        if (isSetToPublish && isBlogMD) return item
    }

    console.log(blogsToPublish)
}

main()