// + info @ https://nodejs.dev/learn/the-nodejs-event-emitter
// .on() is exactly the same as .addListener() in the EventEmitter object (source: https://stackoverflow.com/questions/29861608/)

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100)

