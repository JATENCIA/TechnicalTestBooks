const Users = require('../models/users.model')
const bcrypt = require('bcryptjs')
const { createAccessToken } = require('../libs/jwt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const register = async (req, res) => {
  try {
    const { password, ...rest } = req.body

    const userFound = await Users.findOne({ email: rest.email })
    if (userFound) {
      return res.status(400).json(['The email already exists'])
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user = new Users({ ...rest, password: passwordHash })

    const savedUser = await user.save()

    const token = await createAccessToken({ id: savedUser._id })
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    const { _id, username, email, createdAt, updatedAt } = savedUser
    res.status(200).json({ id: _id, username, email, createdAt, updatedAt })
  } catch (error) {
    res.status(500).json({ message: `An error occurred: ${error.message}` })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await Users.findOne({ email })
    if (!user) {
      return res.status(404).json(['User not found'])
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json(['Wrong password'])
    }

    const token = await createAccessToken({ id: user._id })
    res.cookie('token', token)

    const { _id, username, createdAt, updatedAt } = user
    res.status(200).json({ id: _id, username, email, createdAt, updatedAt })
  } catch (error) {
    res.status(500).json({ message: `An error occurred: ${error.message}` })
  }
}

const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      expires: new Date(0)
    })
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: `An error occurred: ${error.message}` })
  }
}

const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json(['Unauthorized'])
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)
    const user = await Users.findById(decoded.id)
    if (!user) {
      return res.status(404).json(['User not found'])
    }

    const { _id, username, email, createdAt, updatedAt } = user
    res.status(200).json({ id: _id, username, email, createdAt, updatedAt })
  } catch (error) {
    res.status(500).json({ message: `An error occurred: ${error.message}` })
  }
}

module.exports = {
  register,
  login,
  logout,
  verifyToken
}
