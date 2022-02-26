require('dotenv').config(); // read env vars

const http = require('http');

const hostname = process.env.HOST
const port = process.env.PORT

// The createServer() method of http creates a new HTTP server and returns it.
/* Whenever a new request is received, the request event is called, providing 
 * two objects: a request (an http.IncomingMessage object) and a response
 * (an http.ServerResponse object).
 */
/* 'request' provides the request details.
 * Through it, we access the request headers and request data.
 * 'response' is used to populate the data we're going to return to the client.
*/
const server = http.createServer((req, res) => {
  // We set the statusCode property to 200, to indicate a successful response.
  res.statusCode = 200;
  // We set the Content-Type header:
  res.setHeader('Content-Type', 'text/html');
  // We set the Content-Type header:
  res.end('<h1>Hello World</h1>');
});

// When the server is ready, the callback function is called, in this case informing us that the server is running.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
