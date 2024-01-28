const Persons = (props) => {
  const { toFilter, filterWord, persons, handlerbtn } = props;
  let filteredList;

  if (toFilter)
    filteredList = persons.filter(person => person.name.includes(filterWord));
  else
    filteredList = Array.from(persons);

  return (
    <div>
      {filteredList.map(e => <p key={e.id}>{e.name} {e.number} <button onClick={handlerbtn(e.id)}>delete</button></p>)}
    </div>
  );
};

export default Persons;