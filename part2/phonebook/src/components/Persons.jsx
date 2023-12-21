const Persons = (props) => {
  const { toFilter, filterWord, persons } = props;

  return (
    <div>
      {
        toFilter
          ? persons.filter(p => p.name.includes(filterWord)).map(p => <p key={p.id}>{p.name} {p.number}</p>)
          : persons.map(p => <p key={p.id}>{p.name} {p.number}</p>)
      }
    </div>
  );
};

export default Persons;