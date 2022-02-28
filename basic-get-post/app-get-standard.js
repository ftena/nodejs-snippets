const https = require('https')
const options = {
	hostname: 'example.com',
	port: 443,
	path: '/todos',
	method: 'GET'
}

const req = https.request(options, res => {
	console.log(`statusCode: ${res.statusCode}`)

	res.on('data', d => {
		console.error("data!")
		process.stdout.write(d)
	})
})

req.on('error', error => {
	console.error("error!")
	console.error(error)
})

req.end()

