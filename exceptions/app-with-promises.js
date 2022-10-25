// Exceptions with promises
// Using promises you can chain different operations, and handle errors at the end:

const doSomething1 = new Promise((resolve, reject) => {
  //...
  try {
    resolve()
  } catch (err) {
    //... handle it locally
    throw new Error(err.message)
  }
  //...
});

doSomething1
  .then(() => {console.log("here")})
  .catch(err => console.error(err))


