import { Link } from 'react-router-dom';

const MyButton = ({ cn, children, path, id }) => {
  return (
    <Link to={path + id} className={`btn ${cn}`}>
      {children}
    </Link>
  );
};

MyButton.defaultProps = {
  id: '',
};

export default MyButton;
