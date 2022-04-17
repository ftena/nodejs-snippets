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
});

// Create a model called User from the userSchema
let User = mongoose.model("User", userSchema);

// Exercise
let exerciseSchema = new Schema({
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

  const newUser = new User
  newUser.username = req.body.username

  newUser.save(function(err, savedDoc) {
    if (err) {
      res.status(400).send(err)
    } else
    {
      res.json({username: savedDoc.username, _id: savedDoc._id})
    }
  }); 
})

// Post api/users
app.post('/api/users/:_id/exercises', async function(req, res)
{
  // We will save the document in this case using async/await instead of callbacks
  // more info @ https://mongoosejs.com/docs/async-await.html
  console.log(req.body)
  console.log(req.params)
  
  try {
    const newExercise = new Exercise
    newExercise.description = req.body.description
    newExercise.duration = req.body.duration
    newExercise.date = req.body.date

    const exercise = await newExercise.save()

    // Save log
    const newLog = new Log
    newLog.username = ""
    newLog.count = 0
    newLog.log.push({description: exercise.description, duration: exercise.duration, date: exercise.date})


    res.json({
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
      _id: exercise._id
     })
  } catch (err) {
    // more info @ http://expressjs.com/en/5x/api.html#res.status
    res.status(400).send(err)
  }
  
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
