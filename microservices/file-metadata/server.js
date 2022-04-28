const express = require('express');
const multer = require('multer')
const cors = require('cors');
require('dotenv').config()

var app = express();
const upload = multer()

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* Get Data from POST Requests */
// It is important that you use the name field value from the form in your upload function. 
// more info @ https://www.npmjs.com/package/multer
app.post('/api/fileanalyse', upload.single('upfile'), function(req, res, next) {
  console.log(req.file)

  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Your app is listening on port ' + port)
});
