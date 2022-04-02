// More info @ https://nodejs.dev/learn/error-handling-in-nodejs

// An exception is created using the throw keyword
// An exception handler is a try/catch statement.
try {
    throw new Error('Ran out of coffee')
} catch (e)
{
    console.log(e)
}

// Catching uncaught exceptions
process.on('uncaughtException', err => {
  console.error('There was an uncaught error', err)
  process.exit(1) //mandatory (as per the Node.js docs)
})

throw new Error('uncaughtException!')
