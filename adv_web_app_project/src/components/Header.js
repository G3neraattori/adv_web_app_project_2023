import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {


    return(<div>
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand href="/">Navbar</Navbar.Brand>
              <Nav className="ml-auto">
                  <Nav.Link href="code">Code</Nav.Link>

                  {!sessionStorage.getItem('jwtToken') && <Nav.Link href="/login">Login</Nav.Link>}
                  {!sessionStorage.getItem('jwtToken') && <Nav.Link href="/register">Register</Nav.Link>}
                  {sessionStorage.getItem('jwtToken') && <Nav.Link href="/" onClick={() => sessionStorage.clear()}>Logout</Nav.Link>}

              </Nav>
          </Container>
      </Navbar>
  </div>
)}
;

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
