import { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsServices from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);

  const hook = () => {
    personsServices
      .getAll()
      .then(persons => setPersons(persons))
  };

  useEffect(hook, []);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [filter, setFilter] = useState('false');
  const [alertMsg, setAlertMsg] = useState(null);
  const [alertType, setAlertType] = useState(null);

  const trackName = (event) => setNewName(event.target.value);
  const trackPhone = (event) => setNewPhone(event.target.value);
  const addName = (event) => {
    event.preventDefault();

    const unknownName = !persons.some(p => p.name === newName);
    const unknownPhone = !persons.some(p => p.number === newPhone);
    const emptyName = newName.trim().length === 0;
    const emptyPhone = newPhone.trim().length === 0;

    if (emptyName || emptyPhone) {
      const msg = `Empty values are not allowed!`;
      alert(msg)
    } else if (!unknownPhone) {
      const msg = `${newPhone} is already added to phonebook`;
      alert(msg);
    } else if (!unknownName) {
      const msg =
        'NAME is already added to phonebook,' +
        'replace the old number with a new one?';
      const msgNoti = `Modified ${newName}`;

      const msgParsed = msg.replace('NAME', newName);
      const toUpdate = window.confirm(msgParsed);

      if (toUpdate) {
        setTimeout(() => {
          setAlertMsg(null);
          setAlertType(null);
        }, 5e3);

        setAlertMsg(msgNoti);
        setAlertType('noti_put');

        const { id } = persons.find(p => p.name === newName);
        const updatedList = persons.map(p => {
          if (p.name !== newName) return p;
          else {
            const oldData = {...p};
            oldData.number = newPhone;
            return oldData;
          }
        });

        const personObj = {
          name: newName,
          number: newPhone,
        };

        personsServices
          .modify(personObj, id)
          .then(() => {
            setPersons(updatedList);
          });
      }
    } else {
      const personObj = {
        name: newName,
        number: newPhone
      };

      personsServices
        .addNew(personObj)
        .then(person => {
          const msgNoti = `Added ${person.name}`;

          setTimeout(() => {
            setAlertMsg(null);
            setAlertType(null);
          }, 5e3);

          setAlertType('noti_new');
          setAlertMsg(msgNoti);
          setPersons(persons.concat(person))
        });
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
  const handlerDelete = id => () => {
    const confirmation = window.confirm(`Delete ${id}?`);

    if (confirmation) {

      personsServices
        .remove(id)
        .then(() => {
          const newList = persons.filter(person => person.id !== id);
          setPersons(newList)
        })
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={alertMsg} type={alertType}/>
      <Filter
        value={newFilter}
        handler={trackFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        handler={addName}
        inputName={{value: newName, handler: trackName}} 
        inputPhone={{value: newPhone, handler: trackPhone}}
      />
      <h3>Numbers</h3>
      <Persons
        toFilter={filter}
        persons={persons}
        filterWord={newFilter} 
        handlerbtn={handlerDelete}
      />
    </div>
  )
}

export default App
