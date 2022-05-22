function main() {
    "use strict";
    const json = require('./dl-full.json')
    // const fetchGists = () => UrlFetchApp.fetch('https://api.github.com/users/Alex-Rafter/gists')
    // const json = JSON.parse(fetchGists())
    const blogsToPublish = json.filter(onlyReturnBlogsToPublish)





}

main()