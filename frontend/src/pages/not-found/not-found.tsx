import './not-found.scss';
import { Container } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Container
      fluid
      className='vh-100 d-flex align-items-center justify-content-center'
    >
      <h1>Page not found</h1>
    </Container>
  );
};

export default NotFound;
