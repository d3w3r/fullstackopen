const blogRouter = require('express').Router()

const Blog = require('./../models/blog')

blogRouter.get('/', (request, response, next) => {
  Blog.find({})
    .then(blogs => response.send(blogs))
    .catch(error => next(error))
})

blogRouter.post('/', (request, response, next) => {
  const { body } = request

  const blog = new Blog(body)

  blog.save()
    .then(saved => response.status(201).json(saved))
    .catch(error => next(error))
})

module.exports = blogRouter
