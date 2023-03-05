import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Homepage = () => (

    <Container className="d-flex flex-column justify-content-center ">
        <h1>Welcome</h1>
        <Container className="d-flex flex-row justify-content-around align-items-center h-100">
            <Button as={Link} to="/Register" variant="primary" size="lg" className="mt-3">
                Register
            </Button>
            <Button as={Link} to="/login" variant="secondary" size="lg" className="mt-3">
                Login
            </Button>
            <Button as={Link} to="/code" variant="info" size="lg" className="mt-3">
                Code
            </Button>
        </Container>
    </Container>
);

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
