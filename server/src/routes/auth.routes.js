const { Router } = require('express')
const router = Router()

const validateSchema = require('../middleware/validator.middleware')
const { loginSchema, registerSchema } = require('../schemas/auth.schema')
const {
  register,
  login,
  logout,
  verifyToken
} = require('../controllers/auth.controller')

router.post('/logout', logout)
router.post('/login', validateSchema(loginSchema), login)
router.post('/register', validateSchema(registerSchema), register)
router.get('/verify-token', verifyToken)

module.exports = router
