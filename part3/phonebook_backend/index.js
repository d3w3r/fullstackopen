const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001
let PERSONS = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456",
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345",
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.use(express.json())

app.get('/api/persons', (request, response) => {
  response.json(PERSONS)
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
    if (person.id === id)
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
