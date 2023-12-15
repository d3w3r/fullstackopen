import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 },
  ]);
  const [newName, setNewName] = useState('');

  const trackInput = (event) => setNewName(event.target.value);
  const addName = (event) => {
    event.preventDefault();
    const personObj = { id: persons.length + 1, name: newName };
    setPersons(persons.concat(personObj));
    setNewName('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={trackInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(p => <p key={p.id}>{p.name}</p>)}
      </div>
    </div>
  )
}

export default App