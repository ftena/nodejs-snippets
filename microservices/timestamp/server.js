// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

/* Chain Middleware to Create a Time Server */
app.get('/api/:date?', function(req, res, next) {
  var date = new Date()

  if (req.params.date) {
    date = new Date(req.params.date)

    if (isNaN(date)) {
      date = new Date(Number(req.params.date))
    }
  }

  if (date == 'Invalid Date') {
    res.invalid = true;
  } else {
    req.unix = date.getTime()
    req.utc = date.toUTCString()
  }

  next();
  }, function(req, res) {
    if (res.invalid) {
      res.send({ error: "Invalid Date" })
    } else {
      res.send({ "unix": req.unix, "utc": req.utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
