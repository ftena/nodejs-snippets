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
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

// Create a user schema called userSchema
let userSchema = new Schema({
  username: { type: String, required: true },
});

// Create a model called User from the userSchema
let User = mongoose.model("User", userSchema);

// Exercise
let exerciseSchema = new Schema({
  username: { type: String, required: true },
  description: String,
  duration: Number,
  date: Date
});
let Exercise = mongoose.model("Exercise", exerciseSchema);

// Log
let logSchema = new Schema({
  username: { type: String, required: true },
  count: Number,
  log: [{
    description: String,
    duration: Number,
    date: Date
  }]
});
let Log = mongoose.model("Log", logSchema);

// Post /api/users
app.post('/api/users', function(req, res) {
  // console.log(req.body)

  const newUser = new User
  newUser.username = req.body.username

  newUser.save(function(err, savedDoc) {
    if (err) {
      res.status(400).send(err)
    } else {
      res.json({ username: savedDoc.username, _id: savedDoc._id })
    }
  });
})

// Post /api/users/:_id/exercises
app.post('/api/users/:_id/exercises', async function(req, res) {
  // We will save the document in this case using async/await instead of callbacks
  // more info @ https://mongoosejs.com/docs/async-await.html  

  try {
    const userFound = await User.findById({ _id: req.params._id })

    const newExercise = new Exercise
    newExercise.username = userFound.username
    newExercise.description = req.body.description
    newExercise.duration = req.body.duration

    if (req.body.date) {
      newExercise.date = req.body.date
    } else {
      newExercise.date = new Date()
    }

    // If save is successful, the returned promise will fulfill with the document saved.
    const exercise = await newExercise.save()

    // Save/update log
    const log = await Log.findOne({ username: userFound.username })

    if (!log) { // new log
      const newLog = new Log
      newLog.username = userFound.username
      newLog.count = 1
      newLog.log.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date
      })
      await newLog.save()
    } else { // update log
      log.count += 1
      log.log.push({
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date
      })
      await log.save()
    }

    res.json({
      username: userFound.username,
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString(),
      _id: userFound._id
    })
  } catch (err) {
    // more info @ http://expressjs.com/en/5x/api.html#res.status
    res.status(400).send(err)
  }
})

// GET request to get a list of all users.
app.get('/api/users', async function(req, res) {
  try {
    // find all documents
    const userFounds = await User.find({}, 'username _id')
    res.json(userFounds)
  } catch (err) {
    res.status(400).send(err)
  }
})

/* A GET request to /api/users/:id/logs will return
 * the user object with a log array of all the exercises added.
*/
/* You can add from, to and limit parameters to
 * a GET /api/users/:_id/logs request to retrieve part
 * of the log of any user.
 * /api/users/:_id/logs?[from][&to][&limit]
 * + from and to are dates in yyyy-mm-dd format.
 * + limit is an integer of how many logs to send back.
*/
// Ex: /api/users/62654b72c672a004d6516ffc/logs?from=2022-04-24&to=2022-04-24&limit=3
app.get('/api/users/:_id/logs', async function(req, res) {
  try {
    // object setup
    let log = {
      username: logFound.username,
      count: logFound.count,
      _id: userFound._id,
      log: []
    }

    // destructure and rename the keys
    var { from: fromValue, to: toValue, limit: limitValue } = req.query;
    
    // find user's exercise log
    const userFound = await User.findById({ _id: req.params._id })
    
    // remember: Mongoose queries are not promises.
    // more info @ https://mongoosejs.com/docs/queries.html#queries-are-not-promises
    // and more info @ https://masteringjs.io/tutorials/mongoose/query
    const logFound = Log.findOne({ username: userFound.username })

    if (fromValue) {
      logFound.where('date').gt(from)
    }

    if (toValue) {
      logFound.where('date').lt(toValue)
    }

    if (limitValue) {
      logFound.limit(limitValue)
    }

    logFound.exec(function(err, queriedDoc) {
      if (err) {
        res.status(400).send(err)
      } else {
        // First way
        /*
        for (let i = 0; i < logFound.log.length; i++) {
          log.log.push({
            description: logFound.log[i].description,
            duration: logFound.log[i].duration,
            date: logFound.log[i].date
          })
        }
        */
        console.log("here: " + querieDoc)
        // Second - and better - way
        // Parantheses are needed to return ab object.
        log.log = queriedDoc.log.map(value => ({
          description: value.description,
          duration: value.duration,
          date: new Date(value.date).toDateString()
        }));

        res.json(log)
      }
    });
  } catch (err) {
    res.status(400).send(err)
  }
})

/* *** */
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
