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

  const id = Math.trunc(Math.random() * 1e8)
    .toString()
    .padStart(8, '0')
  const person = {
    id,
    name: body.name,
    number: body.number,
  };

  PERSONS.push(person)
  response.json(person)
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
  const id = Number(request.params.id)
  const result = PERSONS.reduce((result, person) => {
    const idPerson = Number(person.id)
    if (idPerson === id)
      result.removed = person;
    else 
      result.persons.push(person)

    return result
  }, { removed: null, persons: [] })

  PERSONS = result.persons

  if (result.removed === null)
    return response.status(404).end()
  else
    return response.status(204).end()
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
