// more info @ https://nodejs.dev/learn/working-with-folders-in-nodejs

// Use fs.mkdir() or fs.mkdirSync() to create a new folder.

// Use fs.readdir() or fs.readdirSync() to read the contents of a directory.

const fs = require('fs')
const path = require('path')

const folderPath = '/home/tarod'

console.log("content: ")
console.log(fs.readdirSync(folderPath))

// You can get the full path:
const files = fs.readdirSync(folderPath).map(fileName => {
  return path.join(folderPath, fileName)
})

console.log("full path: ")
console.log(files)

// Use fs.rename() or fs.renameSync() to rename folder.
// The first parameter is the current path, the second the new path.
// fs.renameSync() is the synchronous version.

// Use fs.rmdir() or fs.rmdirSync() to remove a folder.

// Or you can install and make use of the fs-extra module,
// which is very popular and well maintained.
// It's a drop-in replacement of the fs module,
// which provides more features on top of it.


