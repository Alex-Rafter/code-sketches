
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
