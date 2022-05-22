function main() {
    "use strict";
    const fetchGists = () => UrlFetchApp.fetch('https://api.github.com/users/Alex-Rafter/gists')
    const json = JSON.parse(fetchGists())
    const blogsToPublish = json.filter(onlyReturnBlogsToPublish)

    miniBlog()
}