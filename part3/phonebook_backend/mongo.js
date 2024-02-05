const mongoose = require('mongoose')

const CLI_ARGS = process.argv.slice(2)

const PASSWORD  = CLI_ARGS[0]
const NAME      = CLI_ARGS[1]
const NUMBER    = CLI_ARGS[2]

if (!PASSWORD)  throw new Error('Missing arg PASSWORD')

const URL =
  `mongodb+srv://fullstackopen:${PASSWORD}` +
  '@cluster0.n77wgt9.mongodb.net/phonebook_app?retryWrites=true&w=majority'

mongoose.set('strictQuery', false)
mongoose.connect(URL)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!NAME && !NUMBER) {
  Person.find({})
    .then(r => {
      const recordsSTR = r
        .map(e => `${e.name} ${e.number}`)
        .join('\n')
      console.log(`phonebook:\n${recordsSTR}`)

      mongoose.connection.close()
    })
} else if (NAME && NUMBER) {
  const register = new Person({
    name: NAME,
    number: NUMBER,
  })

  register.save()
    .then(r => {
      console.log(`added ${r.name} number ${r.number} to phonebook`)
      mongoose.connection.close()
    })
} else {
  mongoose.connection.close()

  if (!NAME)    throw new Error('missing arg NAME')
  if (!NUMBER)  throw new Error('missing arg NUMBER')
}
