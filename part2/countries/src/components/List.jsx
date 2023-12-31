const List = ({countries}) => {
  if (countries === null || countries.length <= 0 ) {
    return (
      <>
        <p>No matches specify a country in the search bar</p>
      </>
    )
  }

  if (countries.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    )
  }

  if (countries.length === 1) {
    const country = countries[0];

    return (
      <>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {
            Object
              .values(country.languages)
              .map((l, i) => <li key={i}>{l}</li>)
          }
        </ul>
        <img src={country.flags.png} />
      </>
    )
  }

  if (countries.length > 0 && countries.length <= 10) {
    const names = countries.map(country => country.name.common);

    return (
      <pre>
        {names.join('\n')}
      </pre>
    )
  }
}

export default List
