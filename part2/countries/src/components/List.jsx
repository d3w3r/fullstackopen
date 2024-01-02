import ViewMessage from './ViewMessage'
import ViewList from './ViewList'
import ViewDetails from './ViewDetails'

const List = ({countries, hdlShow}) => {
  const messages = {
    manyResults: 'Too many matches, specify another filter',
    aloneResult: 'No matches specify a country in the search-bar',
  }

  if (countries === null || countries.length <= 0 ) {
    return (
      <div>
        <ViewMessage message={messages.aloneResult} />
      </div>
    )
  }

  if (countries.length > 10) {
    return (
      <div>
        <ViewMessage message={messages.manyResults} />
      </div>
    )
  }

  if (countries.length === 1) {
    const country = countries[0];

    return (
      <div>
        <ViewDetails country={country} />
      </div>
    )
  }

  if (countries.length > 0 && countries.length <= 10) {
    return (
      <div>
        <ViewList list={countries} hdlShow={hdlShow} />
      </div>
    )
  }
}

export default List
