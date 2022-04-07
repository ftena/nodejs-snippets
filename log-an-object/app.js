// More info @ https://nodejs.dev/learn/how-to-log-an-object-in-nodejs

const obj = {
  name: 'joe',
  age: 35,
  person1: {
    name: 'Tony',
    age: 50,
    person2: {
      name: 'Albert',
      age: 21,
      person3: {
        name: 'Peter',
        age: 23
      }
    }
  }
}

// How can you print the whole object?
console.log(JSON.stringify(obj, null, 2))

// A perfect alternative is console.dir
// `depth` tells util.inspect() how many times to recurse while formatting the object, default is 2
console.dir(obj, {
  depth: 10
})

// ...or pass `null` to recurse indefinitely
console.dir(obj, {
  depth: null
})

