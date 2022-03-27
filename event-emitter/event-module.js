// more methods and details @ https://nodejs.dev/learn/the-nodejs-events-module

const EventEmitter = require('events')
const door = new EventEmitter()

// emit() Emits an event. It synchronously calls every event listener in the order they were registered.
door.emit("open") // emitting the event "open"

console.log(door.listenerCount('open')) // nothing happens... yet

// on() Adds a callback function that's called when an event is emitted.
door.on('open', () => {
  console.log('Door was opened')
})

console.log(door.listenerCount('open'))
door.emit("open") // emitting the event "open"
