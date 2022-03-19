// more ino @ https://nodejs.dev/learn/working-with-file-descriptors-in-nodejs

const fs = require('fs')

fs.open('test.txt', 'r', (err, fd) => {
  //fd is our file descriptor
  console.log(fd)
})


/* You can also open the file by using the fs.openSync method, which returns
 * the file descriptor, instead of providing it in a callback:
 */
try {
  const fd = fs.openSync('test.txt', 'r')
} catch (err) {
  console.error(err)
}

// Node.js file stats
fs.stat('test.txt', (err, stats) => {
  if (err) {
    console.error(err)
    return
  }
  //we have access to the file stats in `stats`
  console.log(stats)
  console.log(stats.isFile()) //true
  console.log(stats.isDirectory()) //false
  console.log(stats.isSymbolicLink()) //false
  console.log(stats.size) //1024000 //= 1MB
})
