import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/not-found/not-found';
import AttributeList from './pages/attribute-list/attribute-list';
import AttributeDetail from './pages/attribute-detail/attribute-detail';
import Home from './pages/home/home';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { routes } from './shared/routes';

const Navigation = () => {
  return (
    <Navbar expand='lg' className='bg-body-tertiary fixed-top'>
      <Container fluid>
        <Navbar.Brand href={routes.home}>Home</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href={routes.attributes}>Attributes</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const App = () => {
  return (
    <div className='App position-relative'>
      <Navigation />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.attributes} element={<AttributeList />} />
        <Route
          path={`${routes.attributes}/:id`}
          element={<AttributeDetail />}
        />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
