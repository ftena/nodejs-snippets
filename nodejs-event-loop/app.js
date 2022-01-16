// The Node.js Event Loop
// more info @ https://nodejs.dev/learn/the-nodejs-event-loop
/*
 * Almost all the I/O primitives in JavaScript are non-blocking.
 * Network requests, filesystem operations, and so on.
 * Being blocking is the exception, and this is why JavaScript is based 
 * so much on callbacks, and more recently on promises and async/await.
*/

const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
	console.log('foo')
	// The use case of setTimeout(() => {}, 0) is to call a function,
	// but execute it once every other function in the code has executed.
	setTimeout(bar, 0)
	// Promises: it's a way to execute the result of an async function as
	// soon as possible, rather than being put at the end of the call stack.
	new Promise((resolve, reject) =>
		resolve('should be right after baz, before bar')
	).then(resolve => console.log(resolve))
	baz()
}

foo()
