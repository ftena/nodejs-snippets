// more info @ https://nodejs.dev/learn/reading-files-with-nodejs
// more info @ https://nodejs.dev/learn/writing-files-with-nodejs

const fs = require('fs')

fs.readFile('./test.txt', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

// Writing
const content = 'Some content!'

fs.writeFile('./test.txt', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

// Alternatively, you can use the synchronous version fs.readFileSync():
try {
  const data = fs.readFileSync('./test.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}

// By default, this API will replace the contents of the file if it does already exist.
// You can modify the default by specifying a flag:
fs.writeFile('./test.txt', content, { flag: 'a+' }, err => {})

// A handy method to append content to the end of a file is fs.appendFile()
// (and its fs.appendFileSync() counterpart):

fs.appendFile('file.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //done!
})
