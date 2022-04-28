var express = require('express');
var cors = require('cors');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

/* Get Data from POST Requests */
app.post('/api/fileanalyse', function(req, res) {
  console.log("params: " + req.params)
  console.log("body: " + req.body)
  
  res.end()
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
