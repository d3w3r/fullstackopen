import Part from './Part';

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

export default Content;