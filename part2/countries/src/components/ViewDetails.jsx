const ViewDetails = ({country}) => {
  const args = {
    name: country.name.common,
    capital: country.capital.at(0),
    area: country.area,
    languages: Object.values(country.languages),
    url: country.flags.png,
  }


  return (
    <>
      <h1>{args.name}</h1>
      <p>capital {args.capital}</p>
      <p>area {args.area}</p>
      <h3>languages:</h3>
      <ul>
        {
          args
            .languages
            .map((l, i) => <li key={i}>{l}</li>)
        }
      </ul>
      <img src={args.url}/>
    </>
  )
}

export default ViewDetails
