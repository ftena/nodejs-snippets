// + info @ https://nodejs.dev/learn/making-http-requests-with-nodejs
// The simplest way to perform an HTTP request using Node.js is to use the Axios library.

const axios = require('axios')

axios
  .get('https://example.com/todos')
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res)
  })
  .catch(error => {
    console.error(error)
  })

