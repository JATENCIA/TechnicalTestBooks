/* The line `const { z } = require('zod')` is importing the `zod` library and assigning the `z` object
from the library to a constant named `z`. This allows the code to use the methods and
functionalities provided by the `zod` library to create and validate schemas. */
const { z } = require('zod')

/* The code is defining a schema for user registration. It uses the `zod` library to create a schema
object using the `z.object()` method. The schema object has three properties: `username`,
`password`, and `email`. */
const registerSchema = z.object({
  username: z.string({
    required_error: 'Username is required'
  }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(8, { message: 'Password must be at least 8 characters long' }),
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({ message: 'Invalid email' })
})

/* The `loginSchema` constant is defining a schema for user login. It uses the `zod` library to create
a schema object using the `z.object()` method. The schema object has two properties: `email` and
`password`. */
const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required'
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Password is required'
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
})

module.exports = { registerSchema, loginSchema }
