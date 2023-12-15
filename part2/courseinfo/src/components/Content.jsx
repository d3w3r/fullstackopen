import Part from './Part';

const Content = ({course}) => {
  const { parts } = course;
  const list = parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />);

  return (
    <div>
      {list}
    </div>
  );
};

export default Content;