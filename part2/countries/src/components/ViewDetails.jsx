import serviceWeather from './../services/weather'

const ViewDetails = ({country}) => {
  const curweather = country.weather.current

  const iconWeather = serviceWeather
    .createUrlIcon(curweather.weather[0].icon)
  const args = {
    name: country.name.common,
    capital: country.capital.at(0),
    area: country.area,
    languages: Object.values(country.languages),
    url: country.flags.png,
    temperature: curweather.temp,
    wind: curweather.wind_speed,
    urlWeather: iconWeather,
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
      <img src={args.url} />
      <h2>Weather in {args.capital}</h2>
      <p>temperature {args.temperature} Celcius</p>
      <img src={args.urlWeather} />
      <p>wind {args.wind} m/s</p>
    </>
  )
}

export default ViewDetails
