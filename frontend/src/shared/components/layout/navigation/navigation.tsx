import React from 'react';
import './navigation.scss';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { routes } from '../../../routes';
import { useNavigate } from 'react-router-dom';
import { LocalStorageService } from '../../../services/local-storage.service';

const Navigation = () => {
  const navigate = useNavigate();
  const navigateHomeAndCleanLocalStorage = () => {
    LocalStorageService.removeSearchText();
    LocalStorageService.removeSortDir();
    LocalStorageService.removeSortBy();

    navigate(routes.home);
  };

  return (
    <Navbar expand='lg' className='bg-body-tertiary fixed-top'>
      <Container fluid>
        <Navbar.Brand
          className='cursor-pointer'
          onClick={navigateHomeAndCleanLocalStorage}
        >
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0 navigation-nav' navbarScroll>
            <Nav.Link href={routes.attributes}>Attributes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
