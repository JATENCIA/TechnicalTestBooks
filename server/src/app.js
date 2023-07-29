const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const router = require('./routes/index.routes')
const cookieParser = require('cookie-parser')
require('./db')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  cors({
    origin: 'https://technical-test-books-qq9k.vercel.app',
    credentials: true
  })
)

app.use(morgan('dev'))
app.use('/api', router)

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Technical Test Books')
})

module.exports = app
