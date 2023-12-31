// Importing Locals Libraries
import Formulary from './components/Formulary'
import List from './components/List'

import services from './services/countries';

// Importing External Libraries
import { useState, useEffect } from 'react'

const App = () => {
  // Declaration UseStates
  const [inputText, setInputText] = useState('')
  const [countries, setCountries] = useState(null)
  const [matching, setMatching] = useState(null)

  // Declaration Event-Handlers
  const inputHDL = (event) => {
    const { value } = event.target

    setInputText(value)
    makeQuery(value)
  }

  // Declaration Use-Effects
  const loadData = () => {
    services
      .loadAll()
      .then(data => {
        setCountries(data)
      })
  }
  // Assignation Use-Effects
  useEffect(loadData, [])

  // Declaration Custom-Actions
  const makeQuery = (value) => {
    const query = value.trim().toUpperCase()

    if (query === '') {
      setMatching(null)
    } else {
      const matches = countries.filter(country => {
        const name = country.name.common.toUpperCase()
        if (name.includes(query)) return true;
      });

      setMatching(matches);
    }
  }

  return (
    <div>
      <Formulary inputHDL={inputHDL} inputText={inputText} />
      <List countries={matching} />
    </div>
  )
}

export default App
