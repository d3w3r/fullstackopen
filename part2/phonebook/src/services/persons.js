import axios from 'axios';

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then(response => response.data)
};

const addNew = (newObject) => {
  const request = axios.post(BASE_URL, newObject)
  return request.then(response => response.data)
};

const remove = (id) => {
  const NEW_URL = `${BASE_URL}/${id}`
  const request = axios.delete(NEW_URL);

  return request.then(response => response.data);
};

export default { getAll, addNew, remove };