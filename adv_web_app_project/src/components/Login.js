import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Handlers for the text fields
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    //post to authentication.
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:5000/users/authenticate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //If it was success login and set jwt token
                if (data.success) {
                    sessionStorage.setItem("jwtToken", data.token);
                    sessionStorage.setItem("user", JSON.stringify(data.user))
                    //redirect
                    navigate('/code')
                    //this is for the header to reload.
                    window.location.reload()
                } else {
                    // handle login failure
                }
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control required type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control required type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
        </div>
    );
}

export default Login;