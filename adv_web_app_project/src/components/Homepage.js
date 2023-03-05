import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

const Homepage = () => (

    <Container className="d-flex flex-column justify-content-center ">
        <h1>Welcome</h1>
            <CardGroup>
                {/*If jwt in session storage then the user is logged in*/}
            {!sessionStorage.getItem('jwtToken') &&
            /*Cards for easy styling. The images are from pexels.com
            * All of the buttons just simply link to another page, except logout clears the session storage, and since no jwt = not logged in user logs out.
            * Then the page is just refreshed to display the correct components*/
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=400"/>
                <Card.Body>
                    <Card.Title>Register</Card.Title>
                    <Card.Text>
                        New user? Register here!
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Button as={Link} to="/Register" variant="primary" size="lg" className="mt-3">Register</Button>
                </Card.Footer>
            </Card>}
            {!sessionStorage.getItem('jwtToken') &&
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
                <Card.Body>
                    <Card.Title>Login</Card.Title>
                    <Card.Text>
                        Existing user? Login here!
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Button as={Link} to="/login" variant="secondary" size="lg" className="mt-3">Login</Button>
                </Card.Footer>
            </Card>}
            {sessionStorage.getItem('jwtToken') &&
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="https://media.istockphoto.com/id/1081842186/fi/valokuva/kirjaudu-ulos-sormi-painamalla-sinist%C3%A4-painiketta.jpg?s=612x612&w=0&k=20&c=87chtlmld1zPW6CgcSWRoq9Ip6-MxU4tPQV2xyrYZ0o="/>
                    <Card.Body>
                        <Card.Title>Logout</Card.Title>
                        <Card.Text>
                            Done browsing? Logout here
                        </Card.Text>

                    </Card.Body>
                    <Card.Footer>
                        <Button as={Link} to="/" variant="secondary" size="lg" className="mt-3" onClick={() => {sessionStorage.clear();window.location.reload()}}>Logout</Button>
                    </Card.Footer>
                </Card>}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=400"/>
                <Card.Body>
                    <Card.Title>Code snippet system</Card.Title>
                    <Card.Text>
                        Want to browse or add new code snippets? You can find all of them here. Only logged in users can post.
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Button as={Link} to="/code" variant="info" size="lg" className="mt-3">Code</Button>
                </Card.Footer>
            </Card>
            </CardGroup>
    </Container>
);

Homepage.propTypes = {};

Homepage.defaultProps = {};

export default Homepage;
