// + info @ https://nodejs.dev/learn/get-http-request-body-data-using-nodejs

const axios = require('axios')

axios.post('http://localhost:3000/todo', {
  todo: 'Buy the milk'
})

