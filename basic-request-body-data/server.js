// + info @ https://nodejs.dev/learn/get-http-request-body-data-using-nodejs

const express = require('express')
const app = express()
const port = 3000

// start HTTP server
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Server ready at http://localhost:${port}`))
// end HTTP server

// server-side code to get the request

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/todo', (req, res) => {
  console.log(req.body.todo)
})
