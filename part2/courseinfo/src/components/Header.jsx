const Header = (props) => {
  const course = props.course;
  return (
    <>
      <h2>{course.name}</h2>
    </>
  );
};

export default Header;