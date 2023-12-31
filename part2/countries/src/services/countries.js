import axios from 'axios'

const loadAll = () => {
  const BASE_URL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const request = axios.get(BASE_URL);

  return request.then(response => response.data);
}

export default { loadAll }
