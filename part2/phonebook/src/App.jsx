import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    {  id: 1, name: 'Arto Hellas', phone: '3204582922'},
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const trackPhone = (event) => setNewPhone(event.target.value);
  const trackName = (event) => setNewName(event.target.value);
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


  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map(p => <p key={p.id}>{p.name} {p.phone}</p>)}
      </div>
    </div>
  )
}

export default App
