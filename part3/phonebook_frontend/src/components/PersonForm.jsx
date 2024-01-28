const PersonForm = (props) => {
  const { handler, inputName, inputPhone } = props; 

  return (
    <form onSubmit={handler}>
      <div>
        name: <input value={inputName.value} onChange={inputName.handler}/>
      </div>
      <div>
        phone: <input value={inputPhone.value} onChange={inputPhone.handler}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;