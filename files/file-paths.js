// more info @ https://nodejs.dev/learn/nodejs-file-paths

const path = require('path')
const notes = 'test.txt'

console.log(path.dirname(notes) + " / " + 
path.basename(notes) + " / " +
path.extname(notes))

console.log("path.resolve: " + path.resolve(notes))
