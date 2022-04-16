require('dotenv').config();
var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

// Create a person schema called personSchema
let personSchema = new Schema({
  name: {type: String, required: true},
  age: Number,  
  favoriteFoods: [String]
});

// Create a model called Person from the personSchema
let Person = mongoose.model("Person", personSchema);

/* Create and Save a Record of a Model */
const createAndSavePerson = (done) => {
  let p = new Person;
  
  p.name = "Name"
  p.age = 31
  p.favoriteFoods = ["food1", "food3"]

  // Call the method document.save() on the returned document instance. Pass to it a callback using the Node convention. 
  p.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });  
};

/* Create Many Records with model.create() */
let p1 = new Person;
p1.name = "Name2"
p1.age = 31
p1.favoriteFoods = ["food21", "food23"]

let p2 = new Person;
p2.name = "Name3"
p2.age = 31
p2.favoriteFoods = ["food31", "food33"]

let arrayOfPeople = [p1, p2];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  }); 
};

/* Use model.find() to Search Your Database */
const findPeopleByName = (personName, done) => {
  // Parameter "filter" to find() must be an object
  Person.find({name: personName}, function(err, found) {
    if (err) return console.error(err);
    done(null, found)
  }); 
};

/* Use model.findOne() to Return a Single Matching Document from Your Database */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, found) {
    if (err) return console.error(err);
    done(null, found)
  }); 
};

/* Use model.findById() to Search Your Database By _id */
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, found) {
    if (err) return console.error(err);
    done(null, found)
  }); 
};

/* Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  
  findPersonById(personId, function(err, found) {
    if(err) return console.log(err);
    found.favoriteFoods.push(foodToAdd);
    found.save(function(err, updatedData) {
      if (err) return console.error(err);
      done(null, updatedData)
    })
  });
};

/* Perform New Updates on a Document Using model.findOneAndUpdate() */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {
    new: true
    }, function(err, updatedData) {
      if (err) return console.error(err);
      done(null, updatedData)
  }); 
};

/* Delete One Document Using model.findByIdAndRemove */
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, function(err, removedData) {
    if (err) return console.error(err);
    done(null, removedData)
  }); 
};

/* Delete Many Documents with model.remove() */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  
  Person.remove({name: nameToRemove}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  }); 
};

/* Chain Search Query Helpers to Narrow Search Results */
/* If you don’t pass the callback as the last argument to Model.find() (or to the other search methods), the query is not executed. You can store the query in a variable for later use. This kind of object enables you to build up a query using chaining syntax.*/
const queryChain = (done) => {
  const foodToSearch = "burrito";

  /* Find people who like the food specified by the variable named foodToSearch.
     Sort them by name, limit the results to two documents, and hide their age.
  */  
  Person.find({favoriteFoods: foodToSearch}).sort({ name: 'asc'}).limit(2).select('-age').exec(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

