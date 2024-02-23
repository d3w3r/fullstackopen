const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})
const Blog = mongoose.model('Blog', blogSchema)

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.error(err.message))

app.use(express.json())
app.use(cors())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(founded => response.send(founded))
    .catch(err => response.status(500).send({ error: err.message }))
})
app.post('/api/blogs', (request, response) => {
  const { body } = request

  const blog = new Blog(body)

  blog
    .save()
    .then(saved => response.status(201).json(saved))
    .catch(err => response.status(500).send({ error: err.message }))
})

app.listen(
  process.env.PORT,
  () => console.log(`Server running on port ${process.env.PORT}`)
)
