const Total = (props) => {
  const parts = props.course.parts;

  const value =
    parts[0].exercises +
    parts[1].exercises +
    parts[2].exercises +
    parts[3].exercises;

  return (
    <>
      <p><strong>total of {value} exercises</strong></p>
    </>
  );
};

export default Total;