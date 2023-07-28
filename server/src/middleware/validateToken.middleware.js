const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')

const authRequired = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    })
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({
        message: 'Invalid token'
      })

    req.user = decoded
    next()
  })
}

module.exports = authRequired
