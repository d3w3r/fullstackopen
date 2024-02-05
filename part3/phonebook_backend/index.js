require('dotenv').config();
const express = require('express')
const morgan  = require('morgan')

const { Person } = require('./models/person');

const PORT = process.env.PORT || 3001

const app = express()
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

let PERSONS = [
]

app.use(express.static('dist'))
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  Person.find({}).then(data => {
    response.json(data)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) 
    return response
      .status(400)
      .json({ error: "A field is required: [name]"})
  if (!body.number)
    return response
      .status(400)
      .json({ error: "A field is required: [number]"})

  const exists = PERSONS.some(p => p.name === body.name)

  if (exists)
    return response
      .status(400)
      .json({ error: "A field is wrong: [name-already exists]"})

  const person = new Person({
    name: body.name,
    number: body.number,
  })


  person.save(person).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = PERSONS.find(p => p.id === id)

  if (!person)
    return response.status(404).end()
  else
    return response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  Person.findByIdAndDelete(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      response.status(500).end()
    })
});

app.get('/info', (request, response) => {
  const curdate = new Date()
  const messages = [
    `<p>Phonebook has info for ${PERSONS.length} people</p>`,
    `<p>${curdate.toString()}</p>`
  ]

  response.send(messages.join(''))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
