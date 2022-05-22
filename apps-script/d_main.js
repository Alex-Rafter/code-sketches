function main() {
    "use strict";
    const fetchGists = () => UrlFetchApp.fetch('https://api.github.com/users/Alex-Rafter/gists')
    const json = JSON.parse(fetchGists())
    const blogsToPublish = json.filter(onlyReturnBlogsToPublish)
    miniBlog()

    class BlogArticle {
        constructor(description, created_at, updated_at, url) {
            this.description = description;
            this.created_at = created_at;
            this.updated_at = updated_at;
            this.url = url;
        }
    }

    // funcs
    function onlyReturnBlogsToPublish(item) {
        // vars
        let [isBlogMD, isSetToPublish] = [false, false]
        const filenames = item.files
        // actions
        isSetToPublish = item.description.includes('#na_publish')
        const checkIfBlog = filename => filename.includes('blog.md') && filename
        for (const filename in filenames) if (checkIfBlog(filename)) isBlogMD = true
        if (isSetToPublish && isBlogMD) return item

        function miniBlog() {
            const miniBlog = item => new BlogArticle(item.description, item.created_at, item.created_at, item.files['blog.md'].raw_url)
            const minimalBlogsToPublish = blogsToPublish.map(miniBlog)
            minimalBlogsToPublish.forEach(item => {
                const gistAsMd = () => UrlFetchApp.fetch(item.url)
                const gistAsHTML = marked.parse(gistAsMd)
                item.content = gistAsHTML
            })

            console.log(miniBlog)
        }

    }
}

main()
