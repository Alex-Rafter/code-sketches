import fs from 'fs'

const x = new Promise((resolve, reject) => fs.readFile('./oop-1.js', 'utf8', (err, res) => ((err) && reject(err)) || resolve(res)))

x
    .then(res => console.log(res))
    .catch(err => console.log('err'))
