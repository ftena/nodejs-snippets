require('dotenv').config(); // read env vars

const http = require('http');

const hostname = process.env.HOST
const port = process.env.PORT

// The createServer() method of http creates a new HTTP server and returns it.
const server = http.createServer((req, res) => {
  // We set the statusCode property to 200, to indicate a successful response.
  res.statusCode = 200;
  // We set the Content-Type header:
  res.setHeader('Content-Type', 'text/plain');
  // We set the Content-Type header:
  res.end('Hello World');
});

// When the server is ready, the callback function is called, in this case informing us that the server is running.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
