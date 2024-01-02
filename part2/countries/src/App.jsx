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
  const [country, setCountry] = useState('')

  // Declaration Event-Handlers
  const inputHDL = (event) => {
    const { value } = event.target

    setInputText(value)
    makeQuery(value)
  }
  const showBtn = (name) => () => {
    setCountry(name)
  }

  // Declaration Use-Effects
  const loadData = () => {
    services
      .loadAll()
      .then(data => {
        setCountries(data)
      })
  }
  const showCountry = () => {
    makeQuery(country)
    setInputText(country)
  }

  // Assignation Use-Effects
  useEffect(loadData, [])
  useEffect(showCountry, [country])

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
      <List countries={matching} hdlShow={showBtn} />
    </div>
  )
}

export default App
