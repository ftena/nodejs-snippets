require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // required to parse POST requests
var mongoose = require("mongoose");

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

module.exports = app;