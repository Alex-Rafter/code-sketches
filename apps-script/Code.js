import fetch from 'node-fetch';

async function myFunction() {


    // https://developers.google.com/apps-script/guides/services/external
    // https://hawksey.info/blog/2016/08/working-with-github-repository-files-using-google-apps-script-examples-in-getting-writing-and-committing-content/#gref
    // https://ramblings.mcpher.com/drive-sdk-and-github/getting-your-apps-scripts-to-github/
    // http://github-tools.github.io/github/docs/3.2.3/Gist.html
    // https://github.com/github-tools/github

    // var gh = new GitHub();

    // var gist = gh.getGist('a8c9e2fd8cfb637cbd760a0d943bd6c9');

    // gist.read(function (err, gist, xhr) {
    //     console.log(gist)
    // });
    // gists_url=https://api.github.com/users/Alex-Rafter/gists{/gist_id}

    var url = 'https://api.github.com/gists/a8c9e2fd8cfb637cbd760a0d943bd6c9'
    var urlUser = 'https://api.github.com/users/Alex-Rafter/gists'
    var response = await fetch(urlUser);
    var respObj = await response.json() 
    console.log(respObj)
    // Logger.log(json.files.content);

}

myFunction()
