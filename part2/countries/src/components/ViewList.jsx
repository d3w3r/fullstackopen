const ViewList = ({list, hdlShow}) => {
  const names = list
    .map(({name}) => name.common)
    .map((name, index) => {
      return (
        <div key={index} className="country_element">
          <p>{name}</p>
          <button onClick={hdlShow(name)}>show</button>
        </div>
      )
    })

  return (
    <>
      {names} 
    </>
  )
}

export default ViewList
