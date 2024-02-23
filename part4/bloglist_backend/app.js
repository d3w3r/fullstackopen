const cors      = require('cors')
const express   = require('express')
const mongoose  = require('mongoose')

const middleware  = require('./utils/middleware')
const logger      = require('./utils/logger')
const config      = require('./utils/config')
const blogRouter  = require('./controllers/blog')

const app = express()

mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI)
  .then(() => logger.info('Database connected'))
  .catch((err) => logger.error(err.message))

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
