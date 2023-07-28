/* The line `const jwt = require('jsonwebtoken')` is importing the `jsonwebtoken` library in
JavaScript. This library provides functions for generating and verifying JSON Web Tokens (JWTs). By
assigning the result of the `require` function to the variable `jwt`, you can use the functions
provided by the `jsonwebtoken` library in your code. */
const jwt = require('jsonwebtoken')
const config = require('../config')

/**
 * The function `createAccessToken` generates a JSON Web Token (JWT) with a given payload and returns a
 * promise that resolves with the token.
 * @param payload - The `payload` parameter is an object that contains the data that you want to
 * include in the access token. This data can be used to identify and authenticate the user or provide
 * any other relevant information.
 * @returns The createAccessToken function returns a Promise that resolves to a JSON Web Token (JWT) if
 * it is successfully signed using the jwt.sign method.
 */
const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.JWT_SECRET,
      {
        expiresIn: '2h'
      },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
/* The code `module.exports = { createAccessToken }` is exporting the `createAccessToken` function from
the current module. This allows other modules or files to import and use the `createAccessToken`
function by requiring this module. */

module.exports = {
  createAccessToken
}
