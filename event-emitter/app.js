// + info @ https://nodejs.dev/learn/the-nodejs-event-emitter

const EventEmitter = require('events')
const eventEmitter = new EventEmitter()

eventEmitter.on('start', (start, end) => {
  console.log(`started from ${start} to ${end}`)
})

eventEmitter.emit('start', 1, 100)

