const https = require('https')
const options = {
	hostname: 'example.com',
	port: 443,
	path: '/todos',
	method: 'GET'
}

/* https.request() returns an instance of the http.ClientRequest class.
 * The ClientRequest instance is a writable stream.
 * Streams can be readable, writable, or both. All streams are instances of EventEmitter.
 * https://nodejs.org/api/stream.html#stream
 * https://nodejs.org/api/events.html#class-eventemitter
 */
const req = https.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`)

	res.on('data', d => {
		console.error("data!")
		// process.stdout.write(d)
	})
})

req.on('error', error => {
	console.error("error!")
	console.error(error)
})

req.end()

