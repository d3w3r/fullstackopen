const Formulary = ({inputText, inputHDL}) => {
  return (
    <form>
      <p>find countries</p>
      <input
        type="text"
        value={inputText}
        onChange={inputHDL}
      ></input>
    </form>
  )
}

export default Formulary
