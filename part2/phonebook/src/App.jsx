import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {  id: 1, name: 'Arto Hellas', phone: '3204582922'},
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filter, setFilter] = useState('false');

  const trackName = (event) => setNewName(event.target.value);
  const trackPhone = (event) => setNewPhone(event.target.value);
  const addName = (event) => {
    event.preventDefault();

    const unknownName = !persons.some(p => p.name === newName);
    const unknownPhone = !persons.some(p => p.number === newPhone);
    const emptyName = newName.trim().length === 0;
    const emptyPhone = newPhone.trim().length === 0;


    if (!unknownName) {
      const msg = `${newName} is already added to phonebook`;
      alert(msg);
    } else if (!unknownPhone) {
      const msg = `${newPhone} is already added to phonebook`;
      alert(msg);
    } else if (emptyName || emptyPhone) {
      const msg = `Empty values are not allowed!`;
      alert(msg)
    } else {
      const personObj = {
        id: persons.length + 1,
        name: newName,
        phone: newPhone
      };
      setPersons(persons.concat(personObj));
    }

    setNewName('');
    setNewPhone('');
  };
  const trackFilter = (event) => {
    const value = event.target.value;

    if (value.trim().length === 0) setFilter(false);
    else setFilter(true);

    setNewFilter(value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={trackFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={trackName}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={trackPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {
          filter
            ? persons.filter(p => p.name.includes(newFilter)).map(p => <p key={p.id}>{p.name} {p.phone}</p>)
            : persons.map(p => <p key={p.id}>{p.name} {p.phone}</p>)
        }
      </div>
    </div>
  )
}

export default App
