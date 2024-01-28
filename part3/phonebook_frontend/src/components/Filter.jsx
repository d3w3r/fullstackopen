const Filter = (props) => {
  const { value, handler } = props;

  return (
    <div>
      filter shown with: <input value={value} onChange={handler}/>
    </div>
  );
}

export default Filter;