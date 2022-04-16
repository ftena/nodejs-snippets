const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser'); // required to parse POST requests
var mongoose = require("mongoose");
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

/* Use body-parser to parse post requests */
app.use(bodyParser.urlencoded({ extended: false}))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

// Create a user schema called userSchema
let userSchema = new Schema({
  username: {type: String, required: true},
  age: Number,  
  favoriteFoods: [String]
});

// Create a model called User from the userSchema
let User = mongoose.model("User", userSchema);

// Exercise
let exerciseSchema = new Schema({
  username: {type: String, required: true},
  description: String,  
  duration: Number,
  date: Date
});
let Exercise = mongoose.model("Exercise", exerciseSchema);

// Log
let logSchema = new Schema({
  username: {type: String, required: true},
  count: Number,  
  log: [{description: String,  
  duration: Number,
  date: Date}]
});
let Log = mongoose.model("Log", logSchema);

// Post api/users
app.post('/api/users', function(req, res)
{
  console.log(req.body)
  res.end()  
})

// Post api/users
app.post('/api/users/:_id/exercises', function(req, res)
{
  console.log(req.body)
  res.end()  
})




const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
