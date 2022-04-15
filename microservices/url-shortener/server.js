require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser'); // required to parse POST requests
// more info about body-parser: https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
var validUrl = require('valid-url');

// Basic Configuration
const port = process.env.PORT || 3000;
let urls = [];
let short_url = 0;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

/* Use body-parser to Parse POST Requests */
app.use(bodyParser.urlencoded({ extended: false }))

/* Get Data from POST Requests */
app.post('/api/shorturl', function(req, res) {
  console.log(req.body.url)

  if (validUrl.isWebUri(req.body.url)) {
    urls.push(req.body.url)
    res.json({ original_url: req.body.url, short_url: short_url++ })  
  } else {
    res.json({ error: 'invalid url' })
  }
});

/* Redirect */
app.get('/api/shorturl/:shorturl', function(req, res) {
  console.log(urls[req.params.shorturl])
  res.redirect(urls[req.params.shorturl])
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
