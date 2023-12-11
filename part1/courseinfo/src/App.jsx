const Header = (props) => {
  const course = props.course;
  return (
    <>
      <h1>{course.name}</h1>
    </>
  );
};
const Part = (props) => {
  return (
    <>
      <p>
        {props.name} {props.exercises}
      </p>
    </>
  );
};
const Content = (props) => {
  const parts = props.course.parts;

  const part1 = parts[0];
  const part2 = parts[1];
  const part3 = parts[2];

  return (
    <div>
      <Part name={part1.name} exercises={part1.exercises} />
      <Part name={part2.name} exercises={part2.exercises} />
      <Part name={part3.name} exercises={part3.exercises} />
    </div>
  );
};
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

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundaments of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ]
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
