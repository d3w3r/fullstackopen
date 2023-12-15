import Course from './Course';

const Curriculum = ({courses}) => {
  const title = 'Web development curriculum';
  const list = courses.map(c => <Course key={c.id} course={c} />);

  return (
    <div>
      <h1>{title}</h1>
      {list}
    </div>
  );
};

export default Curriculum;