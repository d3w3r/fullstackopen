import axios from 'axios'

// FSO(Full Stack Open), P2(Part 2)
const API_KEY = import.meta.env.VITE_FSO_P2_APIKEY
const BASE_URL = {
  host: 'https://api.openweathermap.org',
  endpoint: 'data/3.0/onecall',
  args: {
    longitude:  'lon=VALUE',
    latitude:   'lat=VALUE',
    units:      'units=imperial',
    apikey:     `appid=${API_KEY}`,
  }
}
const ICONS_URL = "https://openweathermap.org/img/wn/IDCODE@2x.png"

// LL (Longitude-Latitude)
const getByLL = (longitude, latitude) => {
  const NEW_URL =
    BASE_URL.host +
    "/" +
    BASE_URL.endpoint +
    "?" +
    BASE_URL.args.longitude.replace('VALUE', longitude) +
    "&" +
    BASE_URL.args.latitude.replace('VALUE', latitude) +
    "&" +
    BASE_URL.args.units +
    "&" +
    BASE_URL.args.apikey.replace('VALUE', API_KEY)
    
  const request = axios.get(NEW_URL)

  return request.then(response => response.data)
}

const createUrlIcon = (idCode) => {
  return ICONS_URL.replace('IDCODE', idCode)
}

export default { getByLL, createUrlIcon }
