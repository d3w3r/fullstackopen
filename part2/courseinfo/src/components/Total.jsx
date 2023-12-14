const Total = (props) => {
  const parts = props.course.parts;

  const value =
    parts[0].exercises +
    parts[1].exercises +
    parts[2].exercises;

  return (
    <>
      <p>Number of exercises {value}</p>
    </>
  );
};

export default Total;